import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { API_KEY, API_URL, IMAGE_BASE_URL } from '../../Config'
import { Descriptions } from 'antd';

function ActorDetailPage({match}) {
    const [actor,setActor] = useState([])
    const {params:{castId}} = match
    useEffect(()=>{
        axios.get(`${API_URL}person/${castId}?api_key=${API_KEY}&language=en-US`)
        .then(res => {
            console.log(res.data)
            setActor(res.data)
        })

    },[])

    const Demo = () => {       
    return <div>
          <Descriptions
            title="Profile"
            bordered='false'
            column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
          >
            <Descriptions.Item label="birthday">{actor.birthday}</Descriptions.Item>
            <Descriptions.Item label="defartment">{actor.known_for_department}</Descriptions.Item>
            <Descriptions.Item label="place of birth">{actor.place_of_birth}</Descriptions.Item>
            <Descriptions.Item label="gender">{actor.gender===1?'Female':'Male'}</Descriptions.Item>
            <Descriptions.Item label="populate">{actor.populate}</Descriptions.Item>
            <Descriptions.Item label="Biography">
            {actor.biography}
            </Descriptions.Item>
          </Descriptions>
        </div>}
      ;
      
    return (
        <div style={{minHeight:'100rem'}}>
            <section style={{width:'100%',minHeight:'30rem',position:'absolute' ,backgroundColor:'#eef2f3'}} />
            <div style={{display:'flex',justifyContent:'center'}}>
            {actor.profile_path&& <img style={{maxWidth:'25rem',maxHeight:'35rem',position:'absolute',zIndex:'1',borderRadius:'5px'}} src={`${IMAGE_BASE_URL}original${actor.profile_path}`}/>}
            <div style={{maxWidth:'40rem',maxHeight:'60rem',position:'absolute',top:'70%',backgroundColor:'#eef3f9',padding:'7rem 2rem',display:'flex',flexDirection:'column'}}>
            <h1>{actor.name}</h1>
            <Descriptions
            title="Profile"
            bordered='false'
            column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
          >
            <Descriptions.Item label="birthday">{actor.birthday}</Descriptions.Item>
            <Descriptions.Item label="defartment">{actor.known_for_department}</Descriptions.Item>
            <Descriptions.Item label="place of birth">{actor.place_of_birth}</Descriptions.Item>
            <Descriptions.Item label="gender">{actor.gender===1?'Female':'Male'}</Descriptions.Item>
            <Descriptions.Item label="popularity">{actor.popularity}</Descriptions.Item>
            <Descriptions.Item label="Biography">
            {actor.biography}
            </Descriptions.Item>
          </Descriptions>
            </div>
            </div>
        </div>
    )
}

export default withRouter(ActorDetailPage)
