const express = require('express')
const { where } = require('sequelize')
const productsRouter = require('express').Router()
const Product  = require('../models/productModel')
productsRouter.use(express.json())

productsRouter.post('/', async (req, res) => {
  const { productName, productDescription, productQuantity, userId } = req.body
  const body = {
    productName,
    productDescription,
    productQuantity,
    userId
  }
  const product = await Product.create(body)
  res.json(product)
})

productsRouter.get('/', async (req, res) => {
  const products = await Product.findAll()

  res.json(products)
})

productsRouter.delete('/:id', async (req, res) => {
  const deletedProduct = await Product.destroy({
    where: {
      id: req.params.id
    }
  })

  res.json(deletedProduct)
})

productsRouter.put('/:id', async (req, res) => {
  const updatedProduct = await Product.update({
    productName: req.body.newProductName,
    productDescription: req.body.newProductDescription,
    productQuantity: req.body.newProductQuantity
  },
  { where: { id: req.params.id}}
  )
  res.json(updatedProduct)
})

module.exports = productsRouter