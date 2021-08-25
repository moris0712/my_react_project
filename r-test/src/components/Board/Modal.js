import React, { Component } from "react";
import './Modal.css';
import axios from 'axios';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';

class Modal extends Component {

    constructor(props) {
        super(props);

        this.handleTextArea = this.handleTextArea.bind(this);
        this.handleSubmitComment = this.handleSubmitComment.bind(this);

        this.state = {
            textarea_length: 0,
            textarea: ''
        }; // user_idx: 유저 idx (게시판글쓸때 수정), 나머지는 싹다 board 변수

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
                    this.props.reload_comment(this.props.idx);
                })
                .catch(err => {
                    console.error(err);
                });
            }
        }
    }

    handleRecommend = (isrecommend,comment_idx) => {
        axios({
            method: "post",
            url: 'http://localhost:3001/comment_recommend',
            data: {
                recommend: isrecommend,
                board_idx: this.props.idx,
                comment_idx: comment_idx
            }
        })
            .then(res => {
                this.props.reload_comment(this.props.idx);
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
                                        <div className="comment_count">{this.props.comment.length} Comment(s)</div>
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
                                        
                                        { this.props.comment && this.props.comment.map( (comment) =>{
                                           return(
                                                <div className="comments_inner_div" key={comment.idx}>
                                                    <div>{comment.writer}</div>
                                                    <div>{new Date(comment.upd_date).toLocaleString()}</div>
                                                    <div>{comment.comment}</div>
                                                    <div className="comments_inner_div_footer">
                                                        <button className="reply_btn btn">답글</button>
                                                        <span className="recommend_icon_div">
                                                           <FavoriteOutlinedIcon className={comment.isrecommend ? "already_recommend_icon" : "recommend_icon"} onClick={() => { this.handleRecommend(comment.isrecommend, comment.idx)}}/>
                                                           <span className="recommend_count">{comment.recommend}</span>
                                                        </span>
                                                    </div>
                                                </div> 
                                            );
                                        })
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