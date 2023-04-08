// import logo from './logo.svg';

import React, {useState, useEffect} from "react"
import {Switch, Route, useHistory} from "react-router-dom"
import './App.css';

import NavBar from "./NavBar"
import Login from "./Login"
import SignUp from "./SignUp"
import UploadForm from "./UploadForm"
import Home from "./Home";
import ArtworkPage from "./ArtworkPage";
import UserPage from "./UserPage";
import TagPage from "./TagPage"

function App() {
  const [user, setUser] = useState(null)
  const [homeArtworks, setHomeArtworks] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const history = useHistory()

  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user))
      }
    })

    fetch("/artworks")
    .then((r) => r.json())
    .then((art) => setHomeArtworks(art))
  }, [])

  function updateUserLikedArtworks(artwork) {
    if (user) {
      const isLiked = user.liked_artworks.some((a) => a.id === artwork.id)

    if (isLiked) {
      const updatedArtworks = user.liked_artworks.filter((a) => a.id !== artwork.id)
      setUser({...user, liked_artworks: updatedArtworks})
    }
    else {
      const updatedArtworks = [...user.liked_artworks, artwork]
      setUser({...user, liked_artworks: updatedArtworks})
    }
    }
  }
  function onSearch(e, tagName) {
    e.preventDefault()
    history.push(`/tags/${tagName}`)
  }

  function onLogout() {
    fetch("/logout", {
      method: "DELETE"
    })
    .then((r) => {
      if (r.ok) {
        setUser(null)
        setSelectedUser(null)
        history.push("/artworks")
      }
    })
  }

  return (
    <div className="App">
      <NavBar user = {user} handleLogout = {onLogout} handleSearch = {onSearch}/>
      {/* <ArtworkContainer
        artworks = {homeArtworks}
        currentUser = {user}
        updateUserLikedArtworks = {updateUserLikedArtworks}
      /> */}
      <Switch>
        <Route exact path = "/artworks">
          <Home
            art = {homeArtworks}
            currentUser = {user}
            updateUserLikedArtworks = {updateUserLikedArtworks}
          />
        </Route>

        <Route exact path = "/tags/:name">
         <TagPage
          currentUser = {user}
          updateUserLikedArtworks = {updateUserLikedArtworks}
         />
        </Route>

        <Route exact path = "/users/:username">
          <UserPage
            selectedUser = {selectedUser}
            setSelectedUser = {setSelectedUser}
            currentUser = {user}
            updateUserLikedArtworks = {updateUserLikedArtworks}
          />
        </Route>

        <Route exact path = "/users/:username/artworks/:id">
          <ArtworkPage
            selectedUser = {selectedUser}
            setSelectedUser = {setSelectedUser}
            currentUser = {user}
            updateUserLikedArtworks = {updateUserLikedArtworks}
          />
        </Route>

        <Route exact path = "/login">
          <Login
            setUser = {setUser}
            setSelectedUser = {setSelectedUser}
          />
        </Route>

        <Route exact path = "/signup">
          <SignUp
            setUser = {setUser}
            setSelectedUser = {setSelectedUser}
          />
        </Route>

        <Route exact path = "/upload">
          <UploadForm />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
