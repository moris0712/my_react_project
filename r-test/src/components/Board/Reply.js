import React, { Component } from "react";
import './Modal.css';
import axios from 'axios';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import Arrow from '../../img/arrow.png'


function Reply(props) {

    const [ChildCommentNumber, setChildCommentNumber] = React.useState(0);
    const [OpenReplyComments, setOpenReplyComments] = React.useState(false);
    const [TextArea, setTextArea] = React.useState('');
    const [TextLength, setTextLength] = React.useState(0);

    React.useEffect(() => {
        let commentNumber = 0;
        props.commentList.map((comment, index) => {
            if (comment.parent_idx === props.parentCommentId) {
                commentNumber++;
            }
        });
        setChildCommentNumber(commentNumber);
    }, [props.commentList]); //commentList가 바뀔때마다 실행이될 수 있도록해야됨


    const handleTextArea = (event) => {
        setTextLength(props.getTextLength(event.currentTarget.value))
        setTextArea(event.currentTarget.value);
    }


    const renderReplyComment = (parentCommentId) => 
        
            props.commentList.map((comment, index) => (
                <React.Fragment key={index} >
                    {comment.parent_idx === parentCommentId && (
                        <div className="reply_comments_inner_div">
                            <img className="arrow" src={Arrow} />
                            <span className="reply_comments">
                                <div>{comment.writer}</div>
                                <div>{new Date(comment.upd_date).toLocaleString()}</div>
                                <div>{comment.comment}</div>
                                <div className={comment.ismine==true ? "comments_inner_div_footer" : ""} >

                                        {comment.ismine==true  && (
                                            <span className="comment_edit_delete_btn">
                                                <button>수정</button>
                                                <button>삭제</button>
                                            </span>
                                            )
                                        }

                                        <span className="recommend_icon_div">
                                            <FavoriteOutlinedIcon className={comment.isrecommend ? "already_recommend_icon" : "recommend_icon"} onClick={() => props.handleRecommend(comment.isrecommend, props.board_idx, comment.idx)} />
                                            <span className="recommend_count">{comment.recommend}</span>
                                        </span>
                                </div>
                            </span>
                        </div>
                    )}
                </React.Fragment>
            )).concat(
            <div className="reply_comment_div" key="-1"> {/* key가 중복되서 -1로 떄려박음 */}
                <div className="reply_comment_inner_div">
                    <div className="id">{props.nickname}</div>
                    <div className='reply_comment_input_div'>
                        <textarea className='reply_comment_input' name="comment" value={TextArea} placeholder="댓글을 남겨주세요" onChange={handleTextArea} />
                    </div>
                    <div className="comment_btn_div">
                        <span className="comment_length">{TextLength} / 300</span>
                            <button className="comment_btn btn" onClick={()=> {props.handleSubmitComment(TextArea, TextLength, props.board_idx, props.parentCommentId)}}>등록</button>
                    </div>
                </div>
            </div>
            )

  

  
    const onHandleChange = () => {
        setOpenReplyComments(!OpenReplyComments);
    };
    return (
        <div>
            {ChildCommentNumber > 0 && (
                <span
                    className="view_reply_more_btn"
                    onClick={onHandleChange}
                >
                    View {ChildCommentNumber} more comment(s)
                </span>
            )}
            {OpenReplyComments && renderReplyComment(props.parentCommentId)}
            {/*대댓글을 달때 눌리며 나오고 아니면숨긴상태*/}
        </div>
    );
}


export default Reply;