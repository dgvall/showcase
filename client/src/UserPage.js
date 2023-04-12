import React, { useEffect } from 'react'
import {useParams} from 'react-router-dom'
import ArtworkContainer from './ArtworkContainer'

import "./UserPage.css"

function UserPage({ setSelectedUser, selectedUser, currentUser, updateUserLikedArtworks }) {
  const { username } = useParams()

  useEffect(() => {
    if(currentUser) {
      if(currentUser.username === username) {
        setSelectedUser(currentUser)
      }
      else {
        console.log("I NEED TO FETCH")
        fetch(`/users/${username}`)
          .then((r) => {
            if (r.ok) {
              r.json().then((userData) => setSelectedUser(userData))
            }
        })
      }
    } else {
      fetch(`/users/${username}`)
      .then((r) => {
        if (r.ok) {
          r.json().then((userData) => setSelectedUser(userData))
        }
    })
    }
  }, [username, currentUser])

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
                    selectedUser.artworks[0]
                      ?
                        <ArtworkContainer
                          artworks = {selectedUser.artworks}
                          currentUser = {currentUser}
                          updateUserLikedArtworks = {updateUserLikedArtworks}
                      />
                      : <div>{selectedUser.username} has no artworks</div>
                  }
                </div>
                <h1>Liked</h1>
                <div>
                  {
                    selectedUser.liked_artworks[0]
                      ?
                        <ArtworkContainer
                          artworks = {selectedUser.liked_artworks}
                          currentUser = {currentUser}
                          updateUserLikedArtworks = {updateUserLikedArtworks}
                        />
                      : <div>{selectedUser.username} has no liked artworks</div>
                    }
                </div>
              </div>
            </div>
           : <div className = "not-found">User Not Found!</div>
      }
    </>
  )
}

export default UserPage;

