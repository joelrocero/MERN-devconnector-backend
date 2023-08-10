// const express = require('express')
// const connectDB = require('./config/db')
// const path = require('path')
// const cors = require('cors')

import express from 'express'
import path from 'path'
import cors from 'cors'
import connectDB from './config/db.js'

import usersRoutes from './routes/api/users.js'
import authRoutes from './routes/api/auth.js'
import profileRoutes from './routes/api/profile.js'
import postRoutes from './routes/api/posts.js'

const app = express()

// Connect Database
connectDB()

// Init Middleware
app.use(cors())
app.use(express.json())

// Define Routes
app.use('/api/users', usersRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/profile', profileRoutes)
app.use('/api/posts', postRoutes)

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 8080

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

