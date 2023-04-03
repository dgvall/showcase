import React, { useState } from 'react'
import {useHistory} from 'react-router-dom'

function UploadForm() {
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
        history.push("/")
      })

    console.log("Submitted!")
  }

  function handleTagSubmit(e) {
    e.preventDefault()
    setTags(() => [...tags, tag])
    setTag("")
  }

  return (
    <div>
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

    <button onClick = {handleSubmit} className = "form-button">Upload</button>
  </div>
  )
}

export default UploadForm