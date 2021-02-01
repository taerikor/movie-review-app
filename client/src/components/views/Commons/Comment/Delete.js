import axios from 'axios'
import React from 'react'
import { message } from 'antd';
import { withRouter } from 'react-router-dom';

function Delete({commentId,filterState}) {
    
    const onDeleteClick = () => {
        let variable = {
                commentId
            }

            axios.post('/api/comment/deleteComment',variable)
            .then(res=>{
                if(res.data.success){
                    message.success('Delete Comment Success')
                    filterState(res.data.comment)
                }else{
                    alert('failed to delete')
                }
            })
    }
    return (
        <span onClick={onDeleteClick} style={{cursor:'pointer'}}>
            DEL
        </span>
    )
}

export default withRouter(Delete)
