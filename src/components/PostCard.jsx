import React from 'react'
import AppwriteService from '../appwrite/configuration.js'
import {Link} from 'react-router-dom'
function PostCard({$id, title, featuredImage}) {
  const previewSrc = featuredImage ? AppwriteService.getFileView(featuredImage) : "";
  console.log("featuredImage:", featuredImage, "previewSrc:", previewSrc);
  return (
    <Link to={`/post/${$id}`}>
      <div className='w-full bg-gray-100 rounded-xl p-4'>
        <div className='w-full justify-center mb-4'>
          {previewSrc ? (
            <img src={previewSrc} alt={title} />
          ) : null}
        </div>
        <h2 className='text-xl font-bold'>
          {title}
        </h2>
      </div>
    </Link>
  )
}

export default PostCard