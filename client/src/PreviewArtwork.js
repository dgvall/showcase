import React, {useState} from 'react'
import './PreviewArtwork.css'

function PreviewArtwork({id, image_url, tags, likes, title, user}) {
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
            <p>⭐ {likes}</p>
          </div>
      }
    </div>
  )
}

export default PreviewArtwork