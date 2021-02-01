import React, { useEffect, useState } from 'react'
import { LikeOutlined,LikeFilled,DislikeFilled,DislikeOutlined} from '@ant-design/icons';
import axios from 'axios';

function Like({movie,movieId,commentId,userId}) {
    const [likeAction,setLikeAction] = useState(false)
    const [dislikeAction,setDislikeAction] = useState(false)
    const [likes,setLikes] = useState(0)
    const [dislikes,setDislikes] = useState(0)

    let likeVariable = {};

    if(movie){
        likeVariable ={ 
            movieId,
            userId
        }
    }else{
        likeVariable = {
            commentId,
            userId
        }
    }

    useEffect(()=> {
        axios.post('/api/like/getLikes',likeVariable)
        .then(res =>{
            if(res.data.success){
                setLikes(res.data.likes.length)

                res.data.likes.map(like => {
                    if(like.userId === userId) {
                        setLikeAction(true)
                    }
                })
            }else{
                alert('failed get Likes')
            }
        })
        axios.post('/api/like/getDislikes',likeVariable)
        .then(res =>{
            if(res.data.success){
                setDislikes(res.data.dislikes.length)

                res.data.dislikes.map(dislike => {
                    if(dislike.userId === userId) {
                        setDislikeAction(true)
                    }
                })
            }else{
                alert('failed get Likes')
            }
        })
    },[likeVariable,userId])

    const onLikeClick = () => {
        if(likeAction){
            axios.post('/api/like/unLike',likeVariable)
            .then(res => {
                if(res.data.success){
                    setLikeAction(false)
                    setLikes(likes - 1)
                }else{
                    alert('failed to unlike')
                }
            })
        }else{
            axios.post('/api/like/onLike',likeVariable)
            .then(res => {
                if(res.data.success){
                    setLikeAction(true)
                    setLikes(likes + 1)
                    if(dislikeAction){
                        setDislikes(dislikes - 1)
                        setDislikeAction(false)
                    }
                }else{
                    alert('failed to onlike')
                }
            })
        }

    }
    const onDisLikeClick = () => {
        if(dislikeAction){
            axios.post('/api/like/unDislike',likeVariable)
            .then(res => {
                if(res.data.success){
                    setDislikeAction(false)
                    setDislikes(dislikes - 1)
                }else{
                    alert('failed to undislike')
                }
            })
        }else{
            axios.post('/api/like/onDislike',likeVariable)
            .then(res => {
                if(res.data.success){
                    setDislikeAction(true)
                    setDislikes(dislikes + 1)
                    if(likeAction){
                        setLikes(likes - 1)
                        setLikeAction(false)
                    }
                }else{
                    alert('failed to ondislike')
                }
            })
        }

    }
    return (
        <React.Fragment>
        <span key="comment-basic-like">
            {likeAction?<LikeFilled onClick={onLikeClick}/>:<LikeOutlined onClick={onLikeClick}/>}
            <span style={{ paddingLeft: '8px', cursor: 'auto' }}>{likes}</span>
        </span>&nbsp;&nbsp;
        <span key="comment-basic-dislike">
            {dislikeAction?<DislikeFilled onClick={onDisLikeClick}/>:<DislikeOutlined onClick={onDisLikeClick}/>}
            <span style={{ paddingLeft: '8px', cursor: 'auto' }}>{dislikes}</span>
        </span>
    </React.Fragment>
    )
}

export default Like
