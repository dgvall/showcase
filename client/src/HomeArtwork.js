import React, {useState} from 'react'
import './HomeArtwork.css'

function HomeArtwork({id, image_url, tags, user_likes, title, user}) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className = "home-art-container"
      onMouseEnter = {() => setHovered(true)}
      onMouseLeave = {() => setHovered(false)}
    >
      <img alt = {title} src = {image_url}/>
      {
        hovered &&
          <div className = "hover-details">
            <div>
              <h3>{title}</h3>
              <p>{user.username}</p> 
            </div>
            <p>⭐ {user_likes.length}</p>
          </div>
      }
    </div>
  )
}

export default HomeArtwork