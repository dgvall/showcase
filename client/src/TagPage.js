import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import "./TagPage.css"

import ArtworkContainer from './ArtworkContainer'

function TagPage({currentUser, updateUserLikedArtworks}) {
  const {name} = useParams()
  const [tagObj, setTagObj] = useState(null)

  useEffect(() => {
    fetch(`/tags/${name}`)
    .then((r) => {
      if (r.ok) {
        r.json().then((art) => setTagObj(art))
      }
    })
  }, [name])

  return (
    <div>
      {
        tagObj
          ?
            <div>
              <p className = "tag-header">"{name}" results:</p>
                <ArtworkContainer
                artworks = {tagObj.artworks}
                currentUser = {currentUser}
                updateUserLikedArtworks = {updateUserLikedArtworks}
              />
            </div>
          : <p className = "tag-header">"{name}" has no artworks</p>
      }
    </div>
  )
}

export default TagPage
