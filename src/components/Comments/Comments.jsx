import React from 'react';
import './Comments.css'

const Comments = ({comments, delComment, handleOpenModal}) => {
    return (
        <div className="comments__container">
            {comments&&comments.length ? comments.map(comment => 
                <div key={comment.id} className="comment">
                    <div className='comment__body'>
                        <span className='comment__author'>{comment.name}</span>
                        {comment.body}
                    </div>
                    <div className="comment__actions">
                        <div className="btn" onClick={()=>handleOpenModal(comment.id)}>edit</div>
                        <div className="btn delete__btn" onClick={()=>delComment(comment.id)}>delete</div>
                    </div>
                </div>
            ) : 'No any comments yet...'}
        </div>
    );
};

export default Comments;