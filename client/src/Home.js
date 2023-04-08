import React from 'react'
import ArtworkContainer from './ArtworkContainer'
import "./Home.css"

function Home({art, currentUser, updateUserLikedArtworks}) {

  const likedArtworks = []

    if(currentUser) {
      currentUser.liked_artworks.map((a) => {
        likedArtworks.push(a.id)
        })
    }
  return (
    <div>
      {
        art
        ?
        <ArtworkContainer
          artworks = {art}
          currentUser = {currentUser}
          updateUserLikedArtworks = {updateUserLikedArtworks}
        />
        : null
      }
      {/* {
        art.map((a) => {
          let liked = false
          const found = likedArtworks.find((likedArt) => likedArt === a.id)
          if (found) {
            liked = true
          }
          return (
            <PreviewArtwork
              key = {a.id}
              id = {a.id}
              image_url = {a.image_url}
              tags = {a.tags}
              title = {a.title}
              likes = {a.likes}
              user = {a.user}
              likedByUser = {liked}
            />
          )
        })
      } */}
    </div>
  )
}

export default Home