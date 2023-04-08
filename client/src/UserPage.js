import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import PreviewArtwork from './PreviewArtwork'
import ArtworkContainer from './ArtworkContainer'

import "./UserPage.css"

function UserPage({setSelectedUser, selectedUser, currentUser, updateUserLikedArtworks}) {
  const { username } = useParams()

  useEffect(() => {
    if (username !== null || "artworks") {
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
  }, [username])

  if (selectedUser) {
    console.log(selectedUser.artworks)
  }

  return (
    <>
      {
        selectedUser
        ?
        <div>
          <div className = "profile-info">
            <img alt = {selectedUser.username} src = {selectedUser.image_url}/>
            <h1>{selectedUser.username}</h1>
          </div>
          <div id = "user-art-container">
            <h1>Gallery</h1>
            <div className = "user-page-artwork">
              {
                selectedUser.artworks
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
                //     />
                //   )
                // })
                : <div>{selectedUser.username} has no artworks</div>
              }
            </div>
            <h1>Liked</h1>
            <div className = "user-page-artwork">
              {
                  selectedUser.liked_artworks[0]
                  ?
                  <ArtworkContainer
                    artworks = {currentUser.liked_artworks}
                    currentUser = {currentUser}
                    updateUserLikedArtworks = {updateUserLikedArtworks}
                 />
                  : <div>{selectedUser.username} has no liked artworks</div>
                }
            </div>
          </div>
        </div>
      : <div>
        User not found, append error here?
        </div>
      }
    </>
  )
}

export default UserPage;

