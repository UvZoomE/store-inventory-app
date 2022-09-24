const express = require('express')
const cors = require("cors")
const path = require("path");
const app = express()

const PORT = process.env.PORT || 3001 

if (process.env.NODE_ENV === "production") {
  app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./build/index.html"));
  });
}

const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const productsRouter = require('./controllers/products')

const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}

app.use(express.json())
app.use(cors(corsOptions))

app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/products', productsRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})