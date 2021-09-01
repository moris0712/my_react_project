import React, { Component } from "react";
import './Modal.css';
import axios from 'axios';
import Comment from './Comment';
import Reply from './Reply';

class Modal extends Component {

    constructor(props) {
        super(props);

        this.handleTextArea = this.handleTextArea.bind(this);
        this.handleSubmitComment = this.handleSubmitComment.bind(this);

        this.state = {
            Board_Comment: '',
            textarea_length: 0,
            textarea: ''
        }; 

    }

    componentDidMount() {  // 모달창 열리자마자 댓글불러오기
        this.load_comment(this.props.idx);
    }

    handleTextArea = (e) => {
        
        this.setState({
            textarea_length: this.getTextLength(e.target.value),
            textarea: e.target.value
        })
        // console.log(this.state.textarea_length);
    };



    handleSubmitComment = (e) => {
        if(this.state.textarea_length>300)
            alert('댓글은 300자 이하로 입력해주세요.');
        else{
            if(window.confirm('댓글을 등록하시겠습니까?')){
                axios({
                    method: "post",
                    url: 'http://localhost:3001/submit_comment',
                    data: {
                        text: this.state.textarea,
                        board_idx: this.props.idx
                    }
                })
                .then(res => {
                    this.setState({
                        textarea: '',
                        textarea_length: 0
                    })
                    this.load_comment(this.props.idx);
                })
                .catch(err => {
                    console.error(err);
                });
            }
        }
    }

    load_comment = (idx) => { // 댓글 불러오기 / 댓글 새로고침
        axios({
            method: "post",
            url: 'http://localhost:3001/board_comment',
            data: {
                idx: idx
            }
        })
            .then(res => {
                this.setState({
                    Board_Comment: res.data
                })
            })
            .catch(err => {
                console.error(err);
            });

    }



    getTextLength = (str) => { // 영어 1바이트 한글 2바이트
        var len = 0;
        for (var i = 0; i < str.length; i++) {
            if (escape(str.charAt(i)).length == 6) {
                len++;
            }
            len++;
        }
        return len;
    }

    render(){
        return(
            <div className={this.props.open ? 'openModal modal' : 'modal'}>
                {this.props.open ? (
                    this.props.content && this.props.content.map( (content) =>{
                        return(
                            <section key={content.idx}>
                                <header>
                                    {content.title}
                                    <button className="close" onClick={this.props.close}> &times; </button>
                                    <div className="inform">
                                        <p>작성자: {content.writer}</p>
                                        <p><span className="date">게시일: {new Date(content.ins_date).toLocaleDateString()}</span><span className="date">마지막 수정일: {new Date(content.upd_date).toLocaleDateString()}</span> <span className="hit">조회수: {content.hit}</span> </p>
                                    </div>
                                </header>
                                
                                <main>
                                    {content.content}
                                    <div className="comment_div">
                                        <div className="comment_count">{this.state.Board_Comment.length} Comment(s)</div>
                                        <div className="comment_inner_div">
                                            <div className="id">{this.props.nickname}</div>
                                            <div className='comment_input_div'>
                                                <textarea className='comment_input' name="comment" value={this.state.textarea} placeholder="댓글을 남겨주세요" onChange={this.handleTextArea}/>
                                            </div>
                                            <div className="comment_btn_div">
                                                <span className="comment_length">{this.state.textarea_length} / 300</span>
                                                <button className="comment_btn btn" onClick={this.handleSubmitComment}>등록</button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="comments_div">
                                        
                                        { this.state.Board_Comment && 
                                            this.state.Board_Comment.map( 
                                                (comment, index) =>
                                                    comment.parent_idx==0 && (
                                                        <React.Fragment key={index}>
                                                            <Comment
                                                                comment={comment}
                                                                board_idx={this.props.idx}
                                                                reload_comment={this.load_comment}
                                                            />
                                                            <Reply
                                                                key ={index}
                                                                commentList={this.state.Board_Comment}
                                                                parentCommentId={comment.idx}
                                                                board_idx={this.props.idx}
                                                                reload_comment={this.load_comment}
                                                            />
                                                        </React.Fragment>
                                                    )
                                                )
                                        }
                                    </div>
                                </main>



                                <footer>
                                    <button className="close" onClick={this.props.close}> close </button>
                                </footer>
                            </section>
                        );
                    })

                ) : null}
            </div>
        )
    }

}
export default Modal;