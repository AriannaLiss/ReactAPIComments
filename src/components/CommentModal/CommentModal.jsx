import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useEffect, useState } from 'react';

const Modal = ({open, handleClose,title, submitText, submitHandle, comment, setComment, isEdit}) => {

    const setName = (name) => {
        setComment(prev => {return{...prev, name:name}})
    }

    const setBody = (body) => {
        setComment(prev => {return{...prev, body:body}})
    }

    useEffect(()=>{console.log(comment)},[comment])
      
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent margin='normal'>
                {isEdit ?
                    <div><span className='comment__author'>{comment.name}</span> said:</div> :
                    <TextField
                        label='Name'
                        id='name'
                        fullWidth
                        value={comment.name}
                        onChange={(e)=>{setName(e.target.value)}}
                    />}
                <TextField
                    margin='normal'
                    label='Body'
                    id='body'
                    fullWidth
                    multiline
                    placeholder='Input your comment...'
                    value={comment.body}
                    onChange={(e)=>setBody(e.target.value)}
                    rows='5'
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={submitHandle}>{submitText}</Button>
            </DialogActions>
        </Dialog>
    );
};

export default Modal;