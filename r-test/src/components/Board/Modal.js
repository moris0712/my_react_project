import React, { Component } from "react";
import './Modal.css';


class Modal extends Component {

    constructor(props) {
        super(props);

        this.handleTextArea = this.handleTextArea.bind(this);
        this.state = {
            textarea_length: 0,
            isComment: this.props.comment.length
        }; // user_idx: 유저 idx (게시판글쓸때 수정), 나머지는 싹다 board 변수

    }

    // componentDidUpdate(){
    //     console.log(this.state.isComment);
    // }

    handleTextArea = (e) => {
        
        this.setState({
            textarea_length: this.getTextLength(e.target.value)
        })
        console.log(this.state.textarea_length);
    };

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
                                        <div className="comment_count">n Comment(s)</div>
                                        <div className="comment_inner_div">
                                            <div className="id">{JSON.parse(sessionStorage.getItem('useInfo')).name}</div>
                                            <div className='comment_input_div'>
                                                <textarea className='comment_input' name="comment" placeholder="댓글을 남겨주세요" onChange={this.handleTextArea}/>
                                            </div>
                                            <div className="comment_btn_div">
                                                <span className="comment_length">{this.state.textarea_length} / 300</span>
                                                <button className="comment_btn btn">등록</button>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        
                                        { this.props.comment && this.props.comment.map( (comment) =>{
                                           console.log('길이: '+this.props.comment.length);
                                           return(
                                                <div key={comment.idx}>
                                                    <div>{new Date(comment.ins_date).toLocaleDateString()}</div>
                                                    <div>{new Date(comment.upd_date).toLocaleDateString()}</div>
                                                    <div>{comment.comment}</div>
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