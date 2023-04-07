import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import './PreviewArtwork.css'

function PreviewArtwork({id, image_url, tags, likes, title, user, likedByUser, updateUserLikedArtworks}) {
  const [hovered, setHovered] = useState(false)
  // const [liked, setLiked] = useState(likedByUser)
  const history = useHistory()
  function handleLike() {
    const artwork = {
      id: id,
      likes: likes,
      title: title,
      image_url: image_url,
      user: user
    }
    if(likedByUser === false) {
      fetch("/user_likes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ artwork_id: id })
      }).then((r) => {
        if (r.ok) {
          r.json().then((user_like) => {
            updateUserLikedArtworks(artwork)
          })
        }
      })
    }
    else if(likedByUser === true){
      fetch(`/user_likes/${id}`, {
        method: "DELETE"
    }).then((r) => {
      if(r.ok) {
        updateUserLikedArtworks(artwork)
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
                likedByUser
                ? "Unlike"
                : "Like"
              }</p>
          </div>
      }
    </div>
  )
}

export default PreviewArtwork