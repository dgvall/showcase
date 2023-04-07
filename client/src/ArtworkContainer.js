import React from 'react'
import PreviewArtwork from './PreviewArtwork'
import './ArtworkContainer.css'

function ArtworkContainer({artworks}) {
  return (
    <div className = "art-container">
        {
            artworks.map((a) => {
              console.log(a)
              return (
                <PreviewArtwork
                  key = {a.id}
                  id = {a.id}
                  image_url = {a.image_url}
                  likes = {a.likes}
                  title = {a.title}
                  user = {a.user}
                />
              )
            })
        }
  </div>
  )
}

export default ArtworkContainer