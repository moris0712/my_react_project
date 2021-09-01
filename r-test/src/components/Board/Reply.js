import React, { Component } from "react";
import './Modal.css';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';



function Reply(props) {

    const [ChildCommentNumber, setChildCommentNumber] = React.useState(0);
    const [OpenReplyComments, setOpenReplyComments] = React.useState(false);
    React.useEffect(() => {
        let commentNumber = 0;
        props.commentList.map((comment, index) => {
            if (comment.parent_idx === props.parentCommentId) {
                commentNumber++;
            }
        });
        setChildCommentNumber(commentNumber);
    }, [props.commentList]); //commentList가 바뀔때마다 실행이될 수 있도록해야됨


    const renderReplyComment = (parentCommentId) => 
    
        props.commentList.map((comment, index) => (
            <React.Fragment key={index} >
                {comment.parent_idx === parentCommentId && (
                    <div className="reply_comments_inner_div">
                        <div>{comment.writer}</div>
                        <div>{new Date(comment.upd_date).toLocaleString()}</div>
                        <div>{comment.comment}</div>
                        <div className="comments_inner_div_footer">
                            <div>
                                <span className="recommend_icon_div">
                                    <FavoriteOutlinedIcon className={comment.isrecommend ? "already_recommend_icon" : "recommend_icon"} />
                                    <span className="recommend_count">{comment.recommend}</span>
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </React.Fragment>
        ));
  
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