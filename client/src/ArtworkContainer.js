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

  console.log(likedArtworks)
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
            console.log(a)
            let liked = isLiked(a)
            return (
              <PreviewArtwork
                key = {a.id}
                id = {a.id}
                image_url = {a.image_url}
                likes = {a.likes}
                title = {a.title}
                user = {a.user}
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