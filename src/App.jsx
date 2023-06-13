import React, { useEffect, useState } from 'react';
import Comments from './components/Comments/Comments';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import {get} from './utils/fetch.js'
import uuid from 'react-uuid';
import './App.css'
import Modal from './components/CommentModal/CommentModal';

const App = () => {    
    const initComment = {
        name:'',
        body:''
    }

    const [comment,setComment] = useState(initComment)
    const [comments, setComments] = useState();
    const [openModal, setOpenModal] = useState(false);
    const [isEdit, setEdit] = useState(undefined)
    
    async function getComments(){
        setComments(await get());
    }

    const handleOpenModal = () => {
        setOpenModal(true);
    }

    const handleEditModal = (id) =>{
        setComment(comments.find((c) => c.id===id));
        setEdit(true)
        setOpenModal(true);

    }

    const handleCloseModal = () => {
        setOpenModal(false);
        setComment(initComment);
        setEdit(false);
    }

    const addComment = () => {
        let updComments = []
        if(comment.id){
            updComments = [...comments];
            const oldComment = updComments.find(c => c.id===comment.id);
            oldComment.body=comment.body;
        } else {
            comment.id = uuid();
            updComments = [...comments, comment]
        }
        setComments(updComments)
        handleCloseModal();
    }

    useEffect(() => {getComments()},[])

    const delComment = (id) => {
        setComments(comments.filter(comment => comment.id != id));
    }
    return (
        <div className="container">
            <div className="new-comment btn" onClick={handleOpenModal}>
                <ChatBubbleOutlineIcon className='new-comment__icon'/> Add new comment...
            </div>
            <Comments comments={comments} delComment={delComment} handleOpenModal={handleEditModal}/>
            <Modal 
                comment={comment}
                setComment={setComment}
                open={openModal} 
                handleClose={handleCloseModal} 
                title={isEdit?'Edit comemnt':'Add new comment'}
                isEdit = {isEdit}
                submitText={isEdit?'Edit':'Send comment'}
                submitHandle={addComment}
            />
        </div>
    );
};

export default App;