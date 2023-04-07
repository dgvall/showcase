import React, {useState} from 'react'
import PreviewArtwork from './PreviewArtwork'
import './RowsOfArtwork.css'

function RowsOfArtwork({artworks}) {
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

export default RowsOfArtwork