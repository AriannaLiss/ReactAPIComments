import React, { useEffect, useState } from 'react';
import Comments from './components/Comments/Comments';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import {deleteComment, get, post, put} from './utils/fetch.js'
import uuid from 'react-uuid';
import './App.css'
import Modal from './components/Modal/Modal';
import { Alert, containerClasses } from '@mui/material';
import Loader from './UI/Loader/Loader';
import { validation } from './utils/validation';

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

    function makeRequest(request, successHandler, successMsg){
        setLoading(true);
        let status;
        request()
        .then(resp => {
            setMsg(successMsg);
            setResponse(resp);
            status = resp.status
            return resp.json()
        })
        .then(body => {
            setBody(body)
            console.log(status)
            status>=200&&status<300 && successHandler(body)
        })
        .catch(err => {
            showErrorAlert(err);
        })
        .finally(()=>{
            setLoading(false);
        })
    }

    function getComments(){
        makeRequest(get, setComments, '');
    }

    function postComment(){
        console.log('POST');
        makeRequest(
            ()=>post(comment.name, comment.body),
            updAddComment,
            'Your comment was successfuly send.'
        );
    }
    
    function putComment(){
        console.log('PUT');
        makeRequest(
            ()=>put(comment.id, comment.name, comment.body),
            updEditComment,
            `Comment ${comment.id} was successfuly updated.`)
    }
    
    function delComment (id) {
        console.log('DELETE');
        makeRequest(
            ()=>deleteComment(id),
            ()=>updDelComment(id),
            `Comment ${id} was successfuly deleted.`
        );
    }


    const updAddComment = (body) => {
        comment.id = body.id;
        if (!validation(body, comment, showErrorAlert)) return;
        comment.id = uuid();
        setComments(prev => [...prev, comment])
        handleCloseModal();
    }
    
    const updEditComment = (body) => {
        if (!validation(body, comment, showErrorAlert)) return;
        let updComments = []
        updComments = [...comments];
        const oldComment = updComments.find(c => c.id===comment.id);
        oldComment.body=comment.body;
        setComments(updComments)
        handleCloseModal();
    }
        
    const updDelComment = (id) => {
        setComments(comments.filter(comment => comment.id != id))
    }


    const handleOpenModal = () => {
        setComment(initComment);
        setEdit(false);
        setOpenModal(true);
    }

    const handleEditModal = (id) =>{
        setComment(comments.find((c) => c.id===id));
        setEdit(true)
        setOpenModal(true);
    }

    const handleCloseModal = () => {
        setOpenModal(false);
    }

    const showSuccessAlert = () => {
        setSuccess(true);
        setTimeout(()=>setSuccess(false),3000)
    }

    const showErrorAlert = (err) => {
        setErrMsg(`There is an error ${err}.`);
        setError(true);
        setTimeout(()=>setError(false),3000)
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
                title={isEdit ? 'Edit comemnt' : 'Add new comment'}
                isEdit = {isEdit}
                submitText={isEdit ? 'Edit' : 'Send comment'}
                submitHandle={isEdit ? putComment : postComment}
            />
            {loading && <Loader/>}
            {msg && isSuccess && <Alert className='alert' severity='success'>{msg}</Alert>}
            {isError && <Alert className='alert' severity='error'>{errMsg}</Alert>}
        </div>
    );
};

export default App;