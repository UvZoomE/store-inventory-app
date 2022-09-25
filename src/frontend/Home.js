import { TextField, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function BasicTable() {
  const [productName, setProductName] = useState("")
  const [productDescription, setProductDescription] = useState("")
  const [productQuantity, setProductQuantity] = useState("")
  const [savedUser, setSavedUser] = useState()
  const [savedData, setSavedData] = useState([])
  const [editPost, setEditPost] = useState({
    specificPost: [],
  });
  const [newProductName, setNewProductName] = useState("")
  const [newProductDescription, setNewProductDescription] = useState("")
  const [newProductQuantity, setNewProductQuantity] = useState()
  const [editToggle, setEditToggle] = useState(false)
  const [fullView, setFullView] = useState({
    specificPost: []
  })
  const baseUrl = process.env.NODE_ENV === "production" ? "/api/products" : "http://localhost:3001/api/products"

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedAppUser"))
    console.log(user)
    if (user.user) {
      setSavedUser(user.user)
    } else {
      setSavedUser(user)
    }
    const getAllProducts = async () => {
      const allProducts = await axios.get(baseUrl)
      setSavedData(allProducts.data)
      const specificPost = savedData.map(() => false);
      setEditPost({ specificPost });
      setFullView({ specificPost })
    }
    getAllProducts()
  }, [editToggle])

  const handleNewProductInformation = async (e) => {
    e.preventDefault()
    const userId = savedUser.id
    const object = {
      productName,
      productDescription,
      productQuantity,
      userId
    }
    await axios.post(baseUrl, object)
    setEditToggle(!editToggle)
  }

  const handleDeleteOfProduct = async (e, productId) => {
    e.preventDefault()
    await axios.delete(`${baseUrl}/${productId}`)
    setEditToggle(!editToggle)
  }

  const handleUpdatedInformation = async (e, productId) => {
    e.preventDefault()
    const object = {
      newProductName,
      newProductDescription,
      newProductQuantity
    }
    await axios.put(`${baseUrl}/${productId}`, object)
    setEditToggle(!editToggle)
  }

  return (
    <>
    Enter a new product:
    <form onSubmit={handleNewProductInformation}>
        <TextField style={{display: "block", textAlign: "center", marginTop: "20px"}} onChange={(e) => setProductName(e.target.value)} value={productName} placeholder="Enter product name"/>
        <TextField style={{display: "block", textAlign: "center", marginTop: "20px"}} onChange={(e) => setProductDescription(e.target.value)} value={productDescription} placeholder="Enter product description"/>
        <TextField style={{display: "block", textAlign: "center", marginTop: "20px"}} onChange={(e) => setProductQuantity(e.target.value)} value={productQuantity} placeholder="Enter product quantity"/>
        <Button style={{display: "block", left: "45.5%", marginTop: "20px"}} variant="outlined" type="submit">Submit Product</Button>
      </form>
    <div>
      {savedData.length > 0 ? 
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align='right'>Product</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Quantity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {editPost.specificPost && savedData.map((row, i) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {row.userId === savedUser.id ? 
              <>
              <IconButton onClick={(e) => handleDeleteOfProduct(e, row.id)}>
                <DeleteIcon />
              </IconButton>
              <IconButton onClick={() => {
                const newItems = [...editPost.specificPost];
                newItems[i] = true;
                setEditPost({ specificPost:newItems });
              }}>
                <EditIcon />
              </IconButton>
              {row.productDescription.length > 100 ?
              <IconButton onClick={() => {
                const newItems = [...fullView.specificPost];
                newItems[i] = !fullView.specificPost[i];
                setFullView({ specificPost:newItems });
              }}>
                <VisibilityIcon />
              </IconButton> : "" }
              {editPost.specificPost[i] ?
              <>
              <IconButton onClick={(e) => handleUpdatedInformation(e, row.id)}>
                <CheckCircleOutlineIcon />
              </IconButton>
              <IconButton onClick={() => {
                const newItems = [...editPost.specificPost];
                newItems[i] = false;
                setEditPost({ specificPost:newItems });
              }}>
                <CancelIcon />
              </IconButton>
              <TableCell><TextField defaultValue="" placeholder='Enter new product name here' onChange={(e) => {
                setNewProductName(e.target.value)
              }}/></TableCell>
              <TableCell><TextField defaultValue="" placeholder='Enter new product description here' onChange={(e) => {
                setNewProductDescription(e.target.value)
              }} /></TableCell>
              <TableCell><TextField defaultValue="" placeholder='Enter new product quantity here' onChange={(e) => {
                setNewProductQuantity(e.target.value)
              }}/></TableCell>
              </>
              :
              <>
              <TableCell>{row.productName}</TableCell>
              {row.productDescription.length > 100 && !fullView.specificPost[i] ? <TableCell>{row.productDescription.substring(0,99)}...</TableCell> : 
              <TableCell>{row.productDescription}</TableCell>}
              <TableCell>{row.productQuantity}</TableCell> </>}
              </> : ''}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer> : "" }
    </div>
    <Link to="/" style={{display: "block", textAlign: "center", marginTop: "20px"}}>Logout</Link>
    </>
  );
}