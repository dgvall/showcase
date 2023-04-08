import React, {useEffect, useState} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import PreviewArtwork from './PreviewArtwork'
import ArtworkContainer from './ArtworkContainer'

function ArtworkPage({currentUser, updateUserLikedArtworks, setSelectedUser, selectedUser}) {
  // const [selectedUser, setSelectedUser] = useState(null)
  const [selectedArtwork, setSelectedArtwork] = useState(null)
  const { username, id } = useParams()
  const history = useHistory()

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

  return (
    
    <div>
      {
        selectedArtwork
        ?
        <>
        <img
          className = "full-artwork"
          src = {selectedArtwork.image_url}
          alt = {selectedArtwork.title}
        />
        <h1>{selectedArtwork.title}</h1>
        <p
          onClick = {() => history.push(`/users/${username}`)}
        >{selectedUser.username}</p>
        <p>{selectedArtwork.likes} Likes</p>
        <p>Tags:</p>
        <ul>
          {
            selectedArtwork.tags.map((t, index) => {
              return (
                <li
                  key = {index}
                >{t.name}</li>
              )
            })
          }
        </ul>
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
