import React, { Component } from "react";
import './Modal.css';
import axios from 'axios';
// import Reply from './Reply';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';



function Comment (props) {

    const [OpenReply, setOpenReply] = React.useState(false);
    const [Reply_Comment, setReply_Comment] = React.useState('');

    return(
        <div className='commentsjs_div' >
            <div>{props.comment.writer}</div>
            <div>{new Date(props.comment.upd_date).toLocaleString()}</div>
            <div>{props.comment.comment}</div>
            <div className={props.comment.ismine == true ? "comments_inner_div_footer" : ""} >

                {props.comment.ismine == true && (
                    <span className="comment_edit_delete_btn">
                        <button>수정</button>
                        <button>삭제</button>
                    </span>
                )
                }
                <span className="recommend_icon_div">
                    <FavoriteOutlinedIcon className={props.comment.isrecommend ? "already_recommend_icon" : "recommend_icon"} onClick={() => props.handleRecommend(props.comment.isrecommend,props.board_idx,props.comment.idx)} />
                    <span className="recommend_count">{props.comment.recommend}</span>
                </span>

            </div>
        </div>
    );
}

export default Comment;