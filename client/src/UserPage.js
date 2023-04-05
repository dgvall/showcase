import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import HomeArtwork from './HomeArtwork'

import "./UserPage.css"

function UserPage({setSelectedUser, selectedUser}) {
  const { username } = useParams()

  useEffect(() => {
    if (username !== null || "artworks") {
      console.log(username)
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
                selectedUser.artworks.map((a) => {
                  return (
                    <HomeArtwork
                      key = {a.id}
                      id = {a.id}
                      image_url = {a.image_url}
                      tags = {a.tags}
                      title = {a.title}
                      username = {selectedUser.username}
                      user_likes = {"0"}
                    />
                  )
                })
                : <div>{selectedUser.username} has no artworks</div>
              }
            </div>
            <h1>Liked</h1>
            <div className = "user-page-artwork">
              {   
                  selectedUser.liked_artworks[0]
                  ?
                  selectedUser.liked_artworks.map((a) => {
                    return (
                      <HomeArtwork
                        key = {a.id}
                        id = {a.id}
                        image_url = {a.image_url}
                        tags = {a.tags}
                        title = {a.title}
                        username = {selectedUser.username}
                        user_likes = {"0"}
                      />
                    )
                  })
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

