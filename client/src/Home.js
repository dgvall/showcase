import React from 'react'
import "./Home.css"

import ArtworkContainer from './ArtworkContainer'

function Home({ art, currentUser, updateUserLikedArtworks }) {

  return (
    <div>
      {
        art &&
          <ArtworkContainer
            artworks = {art}
            currentUser = {currentUser}
            updateUserLikedArtworks = {updateUserLikedArtworks}
          />
      }
    </div>
  )
}

export default Home