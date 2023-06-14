import React, { useEffect, useState } from 'react';
import Comments from './components/Comments/Comments';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import {deleteComment, get, post, put} from './utils/fetch.js'
import uuid from 'react-uuid';
import './App.css'
import Modal from './components/CommentModal/CommentModal';
import { Alert } from '@mui/material';
import Loader from './UI/Loader/Loader';

const App = () => {    
    const initComment = {
        name:'',
        body:''
    }

    const [comment,setComment] = useState(initComment)
    const [comments, setComments] = useState();
    const [openModal, setOpenModal] = useState(false);
    const [isEdit, setEdit] = useState(undefined);
    const [response, setResponse] = useState();
    const [body, setBody] = useState('')
    const [msg, setMsg] = useState('Comment was successfuly send.')
    const [errMsg, setErrMsg] = useState('There is an error.')
    const [isSuccess, setSuccess] = useState(false);
    const [isError, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    function getComments(){
        makeRequest(get,'',setComments);
    }

     function makeRequest(request,successMsg,setResult=setBody){
        setLoading(true);

        request()
        .then(response => {
            setMsg(successMsg);
            setResponse(response);
            return response.json()
        })
        .then(body => setResult(body))
        .catch(err => {
            console.log('error!!!')
            showErrorAlert(err);
        })
        .finally(()=>{
            setLoading(false);
        })
    }

    function postComment(){
        makeRequest(()=>post(comment.name, comment.body),'Comment was successfuly send.')
    }
    
    function putComment(){
        makeRequest(()=>put(comment.id, comment.name, comment.body),`Comment ${comment.id} was successfuly updated.`)
    }
    
    function delComment (id) {
        makeRequest(()=>deleteComment(id),`Comment ${id} was successfuly deleted.`)
        setComments(comments.filter(comment => comment.id != id));
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

    const showSuccessAlert = () => {
        setSuccess(true);
        setTimeout(()=>setSuccess(false),3000)
    }


    const showErrorAlert = (err) => {
        console.log('error!!!!')
        setErrMsg(`There is an error ${err}.`);
        setError(true);
        setTimeout(()=>setError(false),3000)
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
        isEdit?putComment():postComment();
        setComments(updComments)
        handleCloseModal();
    }

    useEffect(() => {
        getComments()
    },[])

    useEffect(()=>{
        if (!response) return;
        response.status>=200&&response.status<300&&showSuccessAlert();
        response.status>=300&&showErrorAlert(response.status);
        console.log(response)
    },[response])

    useEffect(()=>{
        body&&console.log('respond:',body);
    },[body])

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
            {isError&&<Alert className='alert' severity='error'>{errMsg}</Alert>}
            {msg&&isSuccess&&<Alert className='alert' severity='success'>{msg}</Alert>}
            {loading&&<Loader/>}
        </div>
    );
};

export default App;