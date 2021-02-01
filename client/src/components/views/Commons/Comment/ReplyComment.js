import React, { useEffect, useState } from 'react'
import SingleComment from './SingleComment'

function ReplyComment({parentCommentId,commentList,postId,rerenderComponent,filterState}) {
    const [childCommentNumber,setChildCommentNumber] = useState(0)
    const [openReplyComments,setOpenReplyComments] = useState(false)

    useEffect(() => {

        let commentNumber = 0;
        commentList.map((comment) => {

            if (comment.responseTo === parentCommentId) {
                commentNumber++
            }
        })
        setChildCommentNumber(commentNumber)
    }, [commentList, parentCommentId])

    const onToggleReplyComments = () => {
        setOpenReplyComments(!openReplyComments)
    }

    let renderReplyComment = (parentCommentId) =>
    commentList.map((comment, index) => (
        <React.Fragment key={index}>
            {comment.responseTo === parentCommentId &&
                <div style={{ width: '80%', marginLeft: '40px' }}>
                    <SingleComment filterState={filterState} comment={comment} postId={postId} rerenderComponent={rerenderComponent} />
                    <ReplyComment filterState={filterState} commentList={commentList} postId={postId} parentCommentId={comment._id} rerenderComponent={rerenderComponent} />
                </div>
            }
        </React.Fragment>
    ))

    return (
        <div>
        {childCommentNumber > 0 &&
            <p style={{ fontSize: '14px', margin: 0, color: 'gray',cursor:'pointer'}}
                onClick={onToggleReplyComments} >
                View {childCommentNumber} more comment(s)
         </p>
        }

        {openReplyComments &&
            renderReplyComment(parentCommentId)
        }

    </div>
    )
}

export default ReplyComment
