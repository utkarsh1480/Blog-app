import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import appWriteService from '../../appwrite/configuration.js'
import { Container, PostForm } from '../index.js';

function EditPost() {
    const[post, SetPost] = useState(null);
    const slug = useParams();
    const navigate = useNavigate();

    useEffect(() =>{
           if(slug){ 
             appWriteService.getPost({slug}).then((post) =>{
                if(post){
                    SetPost(post)
                } 
             })

           }else {
                    navigation('/')
                }
        
       
    },[slug, post])

  return post ? 
  <div className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  
  : null
}

export default EditPost