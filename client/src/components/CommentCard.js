import React from 'react'
function CommentCard(props) {
    const { comment, user } = props;
    return(
        <div className={"comment-card"}>
            {user} says: {comment}
        </div>
    );
}
export default CommentCard;