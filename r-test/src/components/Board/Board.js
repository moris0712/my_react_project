import React, { Component } from "react";
import axios from 'axios';
import './Board.css';
import Modal from './Modal';


// material-ui Table
import { makeStyles, useTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

// material-ui Table text-fields
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';


const useStyles1 = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
}));

function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div className={classes.root}>
            <IconButton 
                className="IconButton"
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton className="IconButton" onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton 
                className="IconButton"
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                className="IconButton"
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </div>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};









class Board extends Component {

    constructor(props) {
        super(props);

        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
        this.handleSearchList = this.handleSearchList.bind(this);

        this.state = {
            Board_List: [],  // 출력할 게시판 리스트
            Original_Board_List: [],  // 전체 게시판 리스트 저장
            Board_list_length: 0,
            Board_rows_per_page: 5,
            Board_page: 0, 
            value: '제목',
            input: '',
            open: false,
            Board_Content: [],
            Board_Comment: [],
            Board_idx: 0,
            No_result: '게시물이 존재하지 않습니다',
            isLogin: false
        }; // user_idx: 유저 idx (게시판글쓸때 수정), 나머지는 싹다 board 변수

    }

    // 게시판 리스트 불러오는 함수
    load_list = async () => {
        axios({
            method: "get",
            url: 'http://localhost:3001/board'
        })
        .then(res => {
            this.setState({
                Board_List: res.data,
                Original_Board_List: res.data,
                Board_list_length: res.data.length,
            });
        })
        .catch(err => {
            console.error(err);
        });
    }

    componentDidMount() {
        this.load_list();
        // 시작하자마자 게시판 리스트 불러오기
 
    }


    // 작성일 표시해주는 함수
    caculate_date(db_time){
        var time_interval = (new Date().getTime() - new Date(db_time))/1000 ;
        if(time_interval < 60){
            return "방금";
        }
        else if(time_interval >= 60 && time_interval < 3600){
            return Math.floor(time_interval/60)+ "분 전";
        }
        else if (time_interval >= 3600 && time_interval < 86400) {
            return Math.floor(time_interval / 3600) + "시간 전";
        }
        else if (time_interval >= 86400 && time_interval < 2419200) {
            return Math.floor(time_interval / 86400) + "일 전";
        }
        else{
            return new Date(db_time).toLocaleDateString();
        }
    }

    handleChangePage = (event, newPage) => {
        this.setState({Board_page: newPage});
    };

    handleChangeRowsPerPage = (event) => {
        this.setState({
            Board_page: 0,
            Board_rows_per_page: parseInt(event.target.value, 10)
        });
    };

    handleSelectChange = (event) => {
        this.setState({ value: event.target.value });
    }

    handleInputChange = (event) => {
        this.setState({ input: event.target.value});
    }
    
    handleSearchList = () =>{ // 게시판 검색
        
        const search_list = this.state.Original_Board_List.filter((list) => {
            if (this.state.value === "제목")
                return list.title.toLowerCase().includes(this.state.input.toLowerCase());
            else if (this.state.value === "내용")
                return list.content.toLowerCase().includes(this.state.input.toLowerCase());
            else if (this.state.value === "작성자")
                return list.writer.toLowerCase().includes(this.state.input.toLowerCase());
            else
                console.log("에러");
        });
        this.setState({ 
            Board_List: search_list,
            Board_list_length: search_list.length
        });


    }

    keyPress = (e) =>{ // textarea 엔터키 제출
        if(e.keyCode === 13){
            this.handleSearchList();
        }
    }


    handleOpen = (idx) => { // 모달창 열기
 
        if(!this.props.isLogin){
            alert('로그인이 필요한 서비스입니다.');
            document.location.href="/login"
        }
        else{
            const click_list = this.state.Original_Board_List.filter((list) => {
                return list.idx === idx
            });

            this.setState({
                Board_Content: click_list,
                open: true,
                Board_idx: idx
            })


            axios({
                method: "post",
                url: 'http://localhost:3001/view_count',
                data: {
                    idx: idx
                }
            })
                .then(res => {
                    // console.log(res);
                })
                .catch(err => {
                    console.error(err);
                });

            document.body.style.overflow = "hidden";
        }

        
    };





    handleClose = () => {
        this.setState({ open: false });
        document.body.style.overflow = "unset"
    };

    No_result = () => { // 진짜..
    return (
        <TableRow className="TableRow" key="0">
            <TableCell className="TableCell" colSpan='6' align="center">조건에 맞는 게시물이 존재하지않습니다.</TableCell>
        </TableRow>
    );
}
    render() {

        return (
            <div className="Table_Component">
                <div className="btn_div">
                    <Paper  className="Search_root">
                        <IconButton className="Search_icon" aria-label="menu">
                            <select className="Search_select" value={this.state.value} onChange={this.handleSelectChange}>
                                <option value="제목" defaultValue>제목</option>
                                <option value="내용">내용</option>
                                <option value="작성자">작성자</option>
                            </select>
                        </IconButton>
                        <InputBase
                            className="Search_input"
                            placeholder={this.state.value+' 검색'}
                            value={this.state.input}
                            onChange={this.handleInputChange}
                            onKeyDown={this.keyPress}
                        />
                        <IconButton className="Search_icon_glasses" onClick={this.handleSearchList} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                </div>
                <div className="Table_div">
                    <Paper className="Paper">
                        <Table className="Table" >
                            <TableHead>
                                <TableRow>
                                    <TableCell className="TableCell" width='10%' align="center">번호</TableCell>
                                    <TableCell className="TableCell" width='20%' align="center">제목</TableCell>
                                    <TableCell className="TableCell" width='30%' align="center">내용</TableCell>
                                    <TableCell className="TableCell" width='15%' align="center">작성자</TableCell>
                                    <TableCell className="TableCell" width='15%' align="center">작성일</TableCell>
                                    <TableCell className="TableCell" width='10%' align="center">조회수</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                            {
                                this.state.Board_List && this.state.Board_list_length>0 ?
                                    (this.state.Board_rows_per_page > 0
                                        ? this.state.Board_List.slice(this.state.Board_page * this.state.Board_rows_per_page, this.state.Board_page * this.state.Board_rows_per_page + this.state.Board_rows_per_page)
                                        : this.state.Board_List
                                    )
                                    .map((list) => {
                                        return(
                                            <TableRow className="TableRow" key={list.idx} onClick={() => this.handleOpen(list.idx)}>
                                                <TableCell className="TableCell" width='10%' align="center">{list.rownum}</TableCell>
                                                <TableCell className="TableCell" width='20%' align="center">{list.title}</TableCell>
                                                <TableCell className="TableCell" width='30%' align="center">{list.content}</TableCell>
                                                <TableCell className="TableCell" width='15%' align="center">{list.writer}</TableCell>
                                                <TableCell className="TableCell" width='15%' align="center">{this.caculate_date(list.upd_date)}</TableCell>
                                                <TableCell className="TableCell" width='10%' align="center">{list.hit}</TableCell>
                                            </TableRow>
                                        );
                                    }) 
                                    :
                                    this.No_result()
                                
                            }
                            </TableBody>
                            <TableFooter className="TableFooter">
                                <TableRow>
                                    <TablePagination className="TablePagination"
                                        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1}]}
                                        colSpan={5}
                                        count={this.state.Board_list_length}
                                        rowsPerPage={this.state.Board_rows_per_page}
                                        page={this.state.Board_page}
                                        SelectProps={{
                                            inputProps: { 'aria-label': 'rows per page' },
                                            native: true,
                                        }}
                                        onPageChange={this.handleChangePage}
                                        onRowsPerPageChange={this.handleChangeRowsPerPage}
                                        ActionsComponent={TablePaginationActions}
                                    />
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </Paper>
                </div>
                
                { this.state.open && (
                    <Modal open={this.state.open}
                        close={this.handleClose}
                        content={this.state.Board_Content}
                        idx={this.state.Board_idx}
                        nickname={this.props.nickname}
                    />
                    )
                }
                

                <div className="btn_div">
                    <button className="btn" >게시하기</button>
                </div>
            </div>
        );
    }

}
export default Board;