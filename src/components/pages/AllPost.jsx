import React, {useEffect, useState} from 'react'
import {PostCard} from '../index.js'
import appWriteService from '../../appwrite/configuration.js'
import {Container} from '../index.js'


function AllPost() {
    const [post, Setpost] = useState([]);

      useEffect(() =>{
        appWriteService.getPosts([]).then((post) => {
          if(post){
            Setpost(post.documents);
          }
        })
      }, [])
  return (
  <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {post.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
            </Container>
    </div>
  )
}

export default AllPost