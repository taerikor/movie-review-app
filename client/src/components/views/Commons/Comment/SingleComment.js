import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Comment, Avatar, Button, Input } from 'antd';
import axios from 'axios';
import Delete from './Delete';
import Like from '../Like';
const { TextArea } = Input;

function SingleComment({comment,postId,rerenderComponent,filterState}) {
    const [openReply,setOpenReply] = useState(false)
    const [commentValue,setCommentValue] = useState('')
    const user = useSelector(state => state.user)


    const onToggleRepley = () => {
        setOpenReply(!openReply)
    }

    const onChange = (e) => {
        const {target:{value}} = e;
        setCommentValue(value)
    }

    const onSubmit = (e) => {
        e.preventDefault();

        let saveCommentVariable ={
            content:commentValue,
            writer:user.userData._id,
            responseTo:comment._id,
            postId
        }

        
        axios.post('/api/comment/saveComment',saveCommentVariable)
        .then(res=>{
            if(res.data.success){
                rerenderComponent(res.data.result)
                setCommentValue('')
            }else{
                alert('failed to save comment')
            }
        })
    }

    let actions = []

    if(user.userData._id === comment.writer._id){
        actions = [<Like commentId={comment._id} userId={localStorage.getItem('userId')}/>,
        <span onClick={onToggleRepley} key="comment-basic-reply-to">Reply to </span>,
        <Delete comment filterState={filterState} commentId={comment._id}/>
    ]
    }else {
        actions =[<Like commentId={comment._id} userId={localStorage.getItem('userId')}/>,
        <span onClick={onToggleRepley} key="comment-basic-reply-to">Reply to </span>
    ]

    }
    return (
        <div>
        <Comment
            actions={actions}
            author={comment.writer.name}
            avatar={
                <Avatar
                    src={comment.writer.image}
                    alt="image"
                />
            }
            content={
                <p>
                    {comment.content}
                </p>
            }
        ></Comment>


        {openReply &&
            <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                <TextArea
                    style={{ width: '100%', borderRadius: '5px' }}
                    onChange={onChange}
                    value={commentValue}
                    placeholder="write some comments"
                />
                <br />
                <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</Button>
            </form>
        }

    </div>
    )
}

export default SingleComment
