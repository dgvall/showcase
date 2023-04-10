import React, { useState, useEffect } from 'react'
import {useHistory, useParams} from 'react-router-dom'
import PreviewArtwork from './PreviewArtwork'

function EditArtwork({currentUser, updateUserArtwork}) {
  const [title, setTitle] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [tag, setTag] = useState("")
  const [tags, setTags] = useState([])
  const [canEdit, setCanEdit] = useState(false)
  const [selectedArtwork, setSelectedArtwork] = useState(null)

  const history = useHistory()
  const {username, id} = useParams()

  useEffect(() => {
    if(currentUser) {
      if(currentUser.username === username) {
        setCanEdit(true)
        const art = currentUser.artworks.find((a) => a.id === parseInt(id))
        setSelectedArtwork(art)
        setTitle(art.title)
        setImageUrl(art.image_url)
        let tagsArr = []
        art.tags.map((t) => tagsArr.push(t.name))
        setTags(tagsArr)
      }
    }
  }, [id, currentUser])

  function handleSubmit(e) {
    e.preventDefault()

    const artworkData = {
      title,
      tags,
      image_url: imageUrl,
    }

  //  update fetch here

    fetch(`/artworks/${selectedArtwork.id}`, {
      method: "PATCH",
      headers: {
       "Content-Type": "application/json" 
      },
      body: JSON.stringify(artworkData)
    })
      .then(r => {
        if(r.ok) {
          console.log(selectedArtwork)
          r.json().then((artwork) => {
            updateUserArtwork(artwork)
            history.push(`/users/${username}/artworks/${id}`)
          })
        }
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
    <h2 className = "form-header">Edit Artwork</h2>
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
    <ul>
    {
     tags.map((t) => {
      return (
        <li
          key = {t}
        >{t}</li>
      )
     })
    }
    </ul>

    <div id = "button-container">
      <button onClick = {handleSubmit} className = "form-button">Edit</button>
    </div>
    
  </div>
  )
}

export default EditArtwork