import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import './PreviewArtwork.css'

function PreviewArtwork({id, image_url, likes, title, user, likedByUser, updateUserLikedArtworks, preview}) {
  const [hovered, setHovered] = useState(false)
  const [updatedLikes, setUpdatedLikes] = useState(likes)
  const history = useHistory()
  
  function handleLike() {
    if (!preview) {
      const artwork = {
        id: id,
        likes: updatedLikes,
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
            r.json().then(() => {
              setUpdatedLikes(() => updatedLikes + 1)
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
          setUpdatedLikes(() => updatedLikes -1)
          updateUserLikedArtworks(artwork)
        }
      })
      }
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
            { user
              ?
                <>
                <div>
                <h3
                  onClick = {() => {
                    if (!preview) {
                      history.push(`/users/${user.username}/artworks/${id}`)
                    }
                  }}
                >{title}</h3>
                <p
                  onClick = {() => {
                    if (!preview) {
                      history.push(`/users/${user.username}`)
                    }
                  }}
                >{user.username}</p> 
                </div>
                {
                  likedByUser
                  ?
                    <p
                      className = "artwork-likes"
                      onClick = {handleLike}
                    >⭐ {updatedLikes}</p>
                  :
                    <p
                      className = "artwork-likes"
                      onClick = {handleLike}
                    >★ {updatedLikes}</p>
                }
              </>
              
              : null
            }
          </div>
      }
    </div>
  )
}

export default PreviewArtwork