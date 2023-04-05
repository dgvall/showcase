import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import './PreviewArtwork.css'

function PreviewArtwork({id, image_url, tags, likes, title, user}) {
  const [hovered, setHovered] = useState(false)
  const history = useHistory()
  return (
    <div
      className = "home-art-container"
      onMouseEnter = {() => setHovered(true)}
      onMouseLeave = {() => setHovered(false)}
    >
      <img
        alt = {title}
        src = {image_url}
      />
      {
        hovered &&
          <div className = "hover-details">
            <div>
              <h3
                onClick = {() => history.push(`/users/${user.username}/artworks/${id}`)}
              >{title}</h3>
              <p
                onClick = {() => history.push(`/users/${user.username}`)}
              >{user.username}</p> 
            </div>
            <p>⭐ {likes}</p>
          </div>
      }
    </div>
  )
}

export default PreviewArtwork