import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import ArtworkContainer from './ArtworkContainer'

function TagPage() {
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
        <ArtworkContainer
          artworks = {tagObj.artworks}
        />
        : null
      }
    </div>
  )
}

export default TagPage
