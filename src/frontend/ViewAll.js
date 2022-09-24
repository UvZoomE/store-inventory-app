import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function ViewAll() {
  const [savedData, setSavedData] = useState([])
  const [fullView, setFullView] = useState({
    specificPost: []
  })
  const baseUrl = process.env.NODE_ENV === "production" ? "/api/products" : "http://localhost:3001/api/products"

  useEffect(() => {
    const getAllProducts = async () => {
      const allProducts = await axios.get(baseUrl)
      console.log(allProducts)
      setSavedData(allProducts.data)
      const specificPost = savedData.map(() => false);
      setFullView({ specificPost });
    }
    getAllProducts()
  }, [])

  return (
    <div>
      {savedData.length > 0 ? 
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>User Id</TableCell>
            <TableCell>Product</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Quantity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {savedData.map((row, i) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {row.productDescription.length > 100 ?
              <IconButton onClick={() => {
                const newItems = [...fullView.specificPost];
                newItems[i] = !fullView.specificPost[i];
                setFullView({ specificPost:newItems });
              }}>
                <VisibilityIcon />
              </IconButton> : "" }
              <TableCell>{row.userId}</TableCell>
              <TableCell>{row.productName}</TableCell>
              {row.productDescription.length > 100 && !fullView.specificPost[i] ? <TableCell>{row.productDescription.substring(0, 99)}...</TableCell> : 
              <TableCell>{row.productDescription}</TableCell>}
              <TableCell>{row.productQuantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer> : "" }
    <Link to="/login" style={{display: "block", textAlign: "center", marginTop: "20px"}}>Have An Account? Click Here</Link>
    </div>
  );
}