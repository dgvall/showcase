import React from 'react'
import HomeArtwork from './HomeArtwork'
import "./Home.css"

function Home({art}) {
  return (
    <div id = "home-art-container">
      {
        art.map((a) => {
          return (
            <HomeArtwork
              key = {a.id}
              id = {a.id}
              image_url = {a.image_url}
              tags = {a.tags}
              title = {a.title}
              user_likes = {a.user_likes}
            />
          )
        })
      }
    </div>
  )
}

export default Home