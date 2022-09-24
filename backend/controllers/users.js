const bcrypt = require('bcrypt')
const express = require('express')
const usersRouter = require('express').Router()
const User  = require('../models/userModel')
usersRouter.use(express.json())

usersRouter.post('/', async (req, res) => {
  const { firstName, lastName, username } = req.body
  let password = req.body.password
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  password = passwordHash
  const body = {
    firstName,
    lastName,
    username,
    password,
  }
  const user = await User.create(body)
  res.json(user)
})

module.exports = usersRouter