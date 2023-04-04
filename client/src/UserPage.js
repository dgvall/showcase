import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'

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
    <div>
      
    </div>
  )
}

export default UserPage;

