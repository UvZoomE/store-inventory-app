import { Button, Link, TextField } from "@mui/material"
import { useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"

const LoginPage = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    const response = await axios.post('http://localhost:3001/api/login', {username, password})
    window.localStorage.setItem(
      "loggedAppUser",
      JSON.stringify(response.data) // Setting localStorage allows user to make posts on account later and the posts requests will be sent to different route and that route will contain a verify function to verify that the user is authenticated to make posts. This implementation will occur whenever I get the home page up and running and I can grab the token via a localstore.getItem()
    );
    if (response) {
      navigate("/home");
    }
  }

  return (
    <>
    <div>
      <form onSubmit={handleLogin}>
        <TextField style={{display: "block", textAlign: "center", marginTop: "20px"}} onChange={(e) => setUsername(e.target.value)} value={username} placeholder="Enter your username"/>
        <TextField style={{display: "block", textAlign: "center", marginTop: "20px"}} onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Enter password"/>
        <Button style={{display: "block", left: "45.5%", marginTop: "20px"}} variant="outlined" type="submit">Login</Button>
      </form>
    </div>
    <div>
      <Link href="/signup" style={{display: "block", textAlign: "center", marginTop: "20px"}}>Don't have an account? Sign up!</Link>
    </div>
    </>
  )
}

export default LoginPage;