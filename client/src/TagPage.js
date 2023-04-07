import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import PreviewArtwork from './PreviewArtwork'

function TagPage() {
  const {name} = useParams()
  const [taggedArtworks, setTaggedArtworks] = useState(null)

  useEffect(() => {
    fetch(`/tags/${name}`)
    .then((r) => {
      if (r.ok) {
        r.json().then((art) => setTaggedArtworks(art))
      }
    })
  }, [name])

  return (
    <div>

    {
      taggedArtworks
      ?
      <div>
        {
            taggedArtworks.artworks.map((a) => {
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
      : `Tag Does Not Exist`
    }
  </div>
  )
}

export default TagPage
