const express = require('express')
const app = express()
//Activated Json-Parser
app.use(express.json())
app.use(express.static('build'))
//JSON
let messageUsers = [
   
]

//Routes 
app.get('/' , (request,response) => {
     response.send('<h1>App node js</h1>')
})

app.get('/api/message-users', (request,response) => {
    response.json(messageUsers)
})

app.get('/api/message-users/:id', (request,response) => {
    const messageId = Number(request.params.id)
    const messageFind = messageUsers.find(mess => mess.id == messageId)
    response.json(messageFind)
})

app.delete('/api/message-users/:id', (request,response) => {
    const messageId = Number(request.params.id)
    const messageDel = messageUsers.filter(mess => mess.id !== messageId)
    response.json(messageDel)
})

const generateId = () => {
    const maxId = messageUsers.length > 0 ?
          Math.random(...messageUsers.map(mess => mess.id)) : 0
          return maxId + 1
        }

app.post('/api/message-users', (request,response) => {
    const body = request.body
    if(!body.message) {
        return response.status(400).json({
            error: "Le champ est vide"
        })
    } 
    
    const boxMessage = {
        name: body.name,
        message: body.message,
        id: generateId()
    }

    messageUsers = messageUsers.concat(boxMessage)
    response.json(boxMessage)

})

const PORT=3002
app.listen(PORT)
console.log(` Server running on PORT ${PORT} `)