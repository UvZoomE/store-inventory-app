import { Button, Link, TextField } from "@mui/material"
import { useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"

const CreateAccount = () => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleUserInformation = async (e) => {
    e.preventDefault()
    const response = await axios.post('http://localhost:3001/api/users', {firstName,
  lastName, username, password})
  window.localStorage.setItem(
    "loggedAppUser",
    JSON.stringify(response.data) // Setting localStorage allows user to make posts on account later and the posts requests will be sent to different route and that route will contain a verify function to verify that the user is authenticated to make posts. This implementation will occur whenever I get the home page up and running and I can grab the token via a localstore.getItem()
  );
  if (response) {
    navigate("/home");
  }

  }

  return (
    <div>
      <form onSubmit={handleUserInformation}>
        <TextField style={{display: "block", textAlign: "center", marginTop: "20px"}} onChange={(e) => setFirstName(e.target.value)} value={firstName} placeholder="Enter your first name"/>
        <TextField style={{display: "block", textAlign: "center", marginTop: "20px"}} onChange={(e) => setLastName(e.target.value)} value={lastName} placeholder="Enter your last name"/>
        <TextField style={{display: "block", textAlign: "center", marginTop: "20px"}} onChange={(e) => setUsername(e.target.value)} value={username} placeholder="Enter your username"/>
        <TextField style={{display: "block", textAlign: "center", marginTop: "20px"}} onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Set a password"/>
        <Button style={{display: "block", left: "45.5%", marginTop: "20px"}} variant="outlined" type="submit">Create Account</Button>
      </form>
      <Link href="/login" style={{display: "block", textAlign: "center", marginTop: "20px"}}>Already Have An Account? Click Here</Link>
    </div>
  )
}

export default CreateAccount;