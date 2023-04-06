import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import './PreviewArtwork.css'

function PreviewArtwork({id, image_url, tags, likes, title, user, likedByUser}) {
  const [hovered, setHovered] = useState(false)
  const [liked, setLiked] = useState(likedByUser)
  const history = useHistory()

  function handleLike() {
    if(liked === false) {
      fetch("/user_likes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ artwork_id: id })
      }).then((r) => {
        if (r.ok) {
          setLiked(true)
        }
      })
    }
    else {
      fetch(`/user_likes/${id}`, {
        method: "DELETE"
    }).then((r) => {
      if(r.ok) {
        setLiked(false)
      }
    })
    }
  }
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
            <p
              onClick = {handleLike}
            >⭐ {likes}</p>
            <p>{
                liked
                ? "Hello"
                : "No"
              }</p>
          </div>
      }
    </div>
  )
}

export default PreviewArtwork