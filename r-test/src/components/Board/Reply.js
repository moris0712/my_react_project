import React, { Component } from "react";
import './Modal.css';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';

const Reply = (props) => {
    return(
        props.reply_comment && props.reply_comment.map((comment) => {
            <div className="comments_inner_div" key={comment.idx}>
                <div>{comment.writer}</div>
                <div>{new Date(comment.upd_date).toLocaleString()}</div>
                <div>{comment.comment}</div>
                <div className="comments_inner_div_footer">
                    <div>
                        <button className="reply_btn btn" onClick={() => { this.show_reply_comment(comment.idx) }}>답글</button>
                        <span className="recommend_icon_div">
                            <FavoriteOutlinedIcon className={comment.isrecommend ? "already_recommend_icon" : "recommend_icon"} onClick={() => { this.handleRecommend(comment.isrecommend, comment.idx) }} />
                            <span className="recommend_count">{comment.recommend}</span>
                        </span>
                    </div>
                </div>
            </div>
        })
    );
}

export default Reply;