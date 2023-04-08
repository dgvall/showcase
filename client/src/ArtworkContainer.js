import React, {useState, useEffect} from 'react'
import PreviewArtwork from './PreviewArtwork'
import './ArtworkContainer.css'

function ArtworkContainer({artworks, currentUser, updateUserLikedArtworks}) {
  const [likedArtworks, setLikedArtworks] = useState([])

  useEffect(() => {
    if(currentUser) {
      let arr = []
      currentUser.liked_artworks.map((a) => {
        arr.push(a.id)
      })
      setLikedArtworks(arr)
    }
  }, [currentUser])

  function isLiked(a) {  
    if(currentUser) {
      const liked = likedArtworks.some((likedArt) => likedArt === a.id)
      return liked
    }
  }
  return (
    <div className = "art-container">
        {
          artworks.map((a) => {
            let liked = isLiked(a)
            let user
            if (a.user) {
              user = a.user
            } else {
              user = {
                id: currentUser.id,
                image_url: currentUser.image_url,
                username: currentUser.username
              }
            }
            return (
              <PreviewArtwork
                key = {a.id}
                id = {a.id}
                image_url = {a.image_url}
                likes = {a.likes}
                title = {a.title}
                user = {user}
                likedByUser = {liked}
                updateUserLikedArtworks = {updateUserLikedArtworks}
              />
            )
          })
        }
    </div>
  )
}

export default ArtworkContainer