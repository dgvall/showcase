import React, {useState} from 'react'
import './HomeArtwork.css'

function HomeArtwork({id, image_url, tags, user_likes, title}) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className = "home-art-container"
      onMouseEnter = {() => setHovered(true)}
      onMouseLeave = {() => setHovered(false)}
    >
      <img src = {image_url}/>
      {
        hovered &&
          <div className = "hover-details">
            <div>
              <h3>{title}</h3>
              <p>name</p> 
            </div>
            <p>⭐ {user_likes.length}</p>
          </div>
      }
    </div>
  )
}

export default HomeArtwork