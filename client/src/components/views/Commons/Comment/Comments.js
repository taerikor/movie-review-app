import React, { useState } from 'react'
import { Button, Input } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';
const { TextArea } = Input;

function Comments({rerenderComponent,postId,commentList,filterState}) {
    const [commentValue,setCommentValue] = useState('')
    const user = useSelector(state => state.user)


    const onChange = (e) => {
        const {target:{value}} = e;
        setCommentValue(value)
    }

    const onSubmit = (e) =>{
        e.preventDefault();

        let saveCommentVariable ={
            content:commentValue,
            writer:user.userData._id,
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
    return (
        <div>
        <br />
        <hr />
        <h2> Replies</h2>
        {/* Root Comment Form */}
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

        {/* Comment Lists  */}

        {commentList && commentList.map((comment, index) => (
            (!comment.responseTo &&
                <React.Fragment key={index}>
                    <SingleComment filterState={filterState} comment={comment} postId={postId} rerenderComponent={rerenderComponent} />
                    <ReplyComment filterState={filterState} commentList={commentList} postId={postId} parentCommentId={comment._id} rerenderComponent={rerenderComponent} />
                </React.Fragment>
            )
        ))}




    </div>
    )
}

export default Comments
