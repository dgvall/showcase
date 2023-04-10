import React, { useState } from 'react'
import {useHistory} from 'react-router-dom'
import PreviewArtwork from './PreviewArtwork'

import "./UploadForm.css"

function UploadForm({addUserArtwork, currentUser}) {
  const [title, setTitle] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [tag, setTag] = useState("")
  const [tags, setTags] = useState([])

  const history = useHistory()

  function handleSubmit(e) {
    e.preventDefault()

    const artworkData = {
      title,
      tags,
      image_url: imageUrl,
    }

    fetch('/artworks', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(artworkData)
    })
      .then(res => res.json())
      .then(artwork => {
        console.log(artwork)
        addUserArtwork(artwork)
        history.push(`/users/${artwork.user.username}/artworks/${artwork.id}`)
      })

    console.log("Submitted!")
  }

  function handleTagSubmit(e) {
    e.preventDefault()
    setTags(() => [...tags, tag])
    setTag("")
  }

  return (
    <div id = "upload-container">
    <h2 className = "form-header">Upload Artwork</h2>
    <form className = "form" onSubmit = {handleSubmit}>
      <input
        className = "form-input"
        onChange = {(e) => setTitle(e.target.value)}
        value = {title}
        placeholder = "Title"
      />

      <input
        className = "form-input"
        onChange = {(e) => setImageUrl(e.target.value)}
        value = {imageUrl}
        placeholder = "Image Url"
      />
    </form>
    <form className = "form" onSubmit = {handleTagSubmit}>
    <input
      className = "form-input"
      onChange = {(e) => setTag(e.target.value)}
      value = {tag}
      placeholder = "Tag"
    />
   <PreviewArtwork
        id = {0}
        image_url = {imageUrl}
        likes = {0}
        title = {title}
        user = {currentUser}
        likedByUser = {false}
        preview = {true}
    />
    </form>

    {
      tags.map((t, index) => {
        return (
          <li
            key = {index}
          >{t}</li>
        )
      })
    }
    <div id = "button-container">
      <button onClick = {handleSubmit} className = "form-button">Upload</button>
    </div>
    
  </div>
  
  )
}

export default UploadForm