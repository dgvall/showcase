import React from 'react'
import PreviewArtwork from './PreviewArtwork'
import "./Home.css"

function Home({art}) {
  console.log(art)
  return (
    <div id = "home-art-container">
      {
        art.map((a) => {
          return (
            <PreviewArtwork
              key = {a.id}
              id = {a.id}
              image_url = {a.image_url}
              tags = {a.tags}
              title = {a.title}
              likes = {a.likes}
              user = {a.user}
            />
          )
        })
      }
    </div>
  )
}

export default Home