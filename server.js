const express = require('express')
const connectDB = require('./config/db')
const app = express()

// MongoDB connection
connectDB()

app.get('/', (req, res) => {
  res.send('Hello world!')
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
