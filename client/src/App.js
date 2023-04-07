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
import PreviewArtwork from "./PreviewArtwork";

function App() {
  const [user, setUser] = useState(null)
  const [homeArtworks, setHomeArtworks] = useState([])
  const [taggedArtworks, setTaggedArtworks] = useState(null)
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

  function onSearch(e, tagName) {
    e.preventDefault()
    console.log(tagName)
    fetch(`/tags/${tagName}`)
    .then((r) => {
      if (r.ok) {
        r.json().then((art) => setTaggedArtworks(art))
        history.push(`/tags/${tagName}`)
      }
    })
  }
  console.log(taggedArtworks)

  function onLogout() {
    fetch("/logout", {
      method: "DELETE"
    })
    .then((r) => {
      if (r.ok) {
        setUser(null)
      }
    })
  }

  return (
    <div className="App">
      <NavBar user = {user} handleLogout = {onLogout} handleSearch = {onSearch}/>
      
      <Switch>
        <Route exact path = "/artworks">
          <Home
          art = {homeArtworks}
          currentUser = {user}
          />
        </Route>

        <Route path = "/">
          <div>

            {
              taggedArtworks
              ?
              <div>
                {
                    taggedArtworks.artworks.map((a) => {
                      console.log(a)
                      return (
                        <PreviewArtwork
                          key = {a.id}
                          id = {a.id}
                          image_url = {a.image_url}
                          likes = {a.likes}
                          title = {a.title}
                          user = {a.user}
                        />
                      )
                    })
                }
              </div>
              : `Tag Does Not Exist`
            }
          </div>
        </Route>

        <Route exact path = "/users/:username">
          <UserPage
            selectedUser = {selectedUser}
            setSelectedUser = {setSelectedUser}
          />
        </Route>

        <Route exact path = "/users/:username/artworks/:id">
          <ArtworkPage />
        </Route>

        <Route exact path = "/login">
          <Login setUser = {setUser}/>
        </Route>

        <Route exact path = "/signup">
          <SignUp setUser = {setUser}/>
        </Route>

        <Route exact path = "/upload">
          <UploadForm />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
