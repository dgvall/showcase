import React from 'react'
import './HomeArtwork.css'

function HomeArtwork({id, image_url, tags, user_likes, title}) {
  return (
    <div className = "home-art-container">
      <img src = {image_url}/>
      <div className = "hover-details">
        <div>
          <h3>{title}</h3>
          <p>name</p> 
        </div>
        <p>⭐ {user_likes.length}</p>
      </div>
    </div>
  )
}

export default HomeArtwork