const express = require('express')
const { createServer } = require('http')
const { Server } = require('socket.io')
const cors = require('cors')

const app = express()
const httpServer = createServer(app)

app.use(cors())

const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})

let content = '' // shared content

io.on('connection', (socket) => {
  console.log('A user connected')

  // Send current content to the newly connected user
  socket.emit('update', content)

  socket.on('edit', ({ username, content }) => {
    // Broadcast content with username
    content = content
    socket.broadcast.emit('update', { username, content })
  })

  socket.on('disconnect', () => {
    console.log('User disconnected')
  })
})

httpServer.listen(4000, () => {
  console.log('WebSocket server running on http://localhost:4000')
})
