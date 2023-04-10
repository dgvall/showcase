import React, {useEffect, useState} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import PreviewArtwork from './PreviewArtwork'
import ArtworkContainer from './ArtworkContainer'

import "./ArtworkPage.css"

function ArtworkPage({currentUser, updateUserLikedArtworks, setSelectedUser, selectedUser, deleteUserArtwork}) {
  // const [selectedUser, setSelectedUser] = useState(null)
  const [selectedArtwork, setSelectedArtwork] = useState(null)
  const [canEdit, setCanEdit] = useState(false)
  const { username, id } = useParams()
  const history = useHistory()

  useEffect(() => {
    if(currentUser) {
      if(currentUser.username === username) {
        setSelectedUser(currentUser)
        setCanEdit(true)
      }
      else {
        console.log("I NEED TO FETCH")
        fetch(`/users/${username}`)
          .then((r) => {
            if (r.ok) {
              r.json().then((userData) => setSelectedUser(userData))
            }
            else {
              console.log("render this error in error state, probably something like user not found")
            }
        })
      }
    } else {
      fetch(`/users/${username}`)
      .then((r) => {
        if (r.ok) {
          r.json().then((userData) => setSelectedUser(userData))
        }
        else {
          console.log("render this error in error state, probably something like user not found")
        }
    })
    }
    // if (username !== null || "artworks") {
    //   console.log("user changed!")
    //   fetch(`/users/${username}`)
    //     .then((r) => {
    //       if (r.ok) {
    //         r.json().then((userData) => {
    //           setSelectedUser(userData)
    //           const art = userData.artworks.find(a => a.id === parseInt(id))
    //           setSelectedArtwork(art)
    //         })
    //       }
    //       else {
    //         console.log("render this error in error state, probably something like user not found")
    //       }
    //     })
    //   }
  }, [username, currentUser])

  // console.log(selectedArtwork)

  // If username doesn't change but id does, we don't need to fetch again
  useEffect(() => {
    if (selectedUser) {
      console.log("artwork id changed! no fetch required!")
      const art = selectedUser.artworks.find((a) => a.id === parseInt(id))
      setSelectedArtwork(art)
    }
  }, [id, selectedUser])

  function handleDeleteArtwork() {
    fetch(`/artworks/${selectedArtwork.id}`, {
      method: "DELETE",
    })
      .then((r) => {
        if (r.ok) {
          deleteUserArtwork(selectedArtwork.id)
          history.push(`/users/${username}`)
        }
      })
  }

  return (
    
    <div>
      {
        selectedArtwork
        ?
        <>
        <div className = "full-artwork-container">
          <div>
            <img
            className = "full-artwork"
            src = {selectedArtwork.image_url}
            alt = {selectedArtwork.title}
          />
            {
              canEdit
              ?
              <div>
                <button
                  onClick = {() => history.push(`/users/${selectedUser.username}/artworks/${selectedArtwork.id}/edit`)}
                >Edit Artwork</button>
                <button
                  onClick = {handleDeleteArtwork}
                >Delete Artwork</button>
              </div>
              : null
            }
          </div>
          <div className = "full-artwork-details">
            <div className = "full-artwork-header">
              <h1>{selectedArtwork.title}</h1>
              <h1 className = "hyphen">-</h1>
              <h1
                className = "full-artwork-username"
                onClick = {() => history.push(`/users/${username}`)}
              >{selectedUser.username}</h1>
            </div>
              <p>{selectedArtwork.likes} Likes</p>
            <div>
              <p>Tags:</p>
              <ul>
                {
                  selectedArtwork.tags.map((t, index) => {
                    return (
                      <li
                        className = "full-artwork-tags"
                        onClick = {() => history.push(`/tags/${t.name}`)}
                        key = {index}
                      >{t.name}</li>
                    )
                  })
                }
              </ul>
            </div>
          </div>
        </div>
       
        <h1>More from {selectedUser.username}!</h1>
        <div className = "user-page-artwork">
              {
                selectedUser.artworks[0]
                ?
                <ArtworkContainer
                  artworks = {selectedUser.artworks}
                  currentUser = {currentUser}
                  updateUserLikedArtworks = {updateUserLikedArtworks}
                />
                // selectedUser.artworks.map((a) => {
                //   const userObj = {
                //     id: selectedUser.id,
                //     username: selectedUser.username,
                //     image_url: selectedUser.image_url
                //   }
                //   return (
                //     <PreviewArtwork
                //       key = {a.id}
                //       id = {a.id}
                //       image_url = {a.image_url}
                //       tags = {a.tags}
                //       title = {a.title}
                //       user = {userObj}
                //       likes = {a.likes}
                //       likedByUser = {true}
                //     />
                //   )
                // })
                : <div>{selectedUser.username} has no other artworks</div>
              }
            </div>
        </>
        : null
      }
    </div>
  )
}

export default ArtworkPage
