import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import {
  getUsers,
  createUser
} from '../controllers/userController'
const app = express()
app.use(bodyParser.json())
app.use(cors())
app.get('/usuarios', (req, res) => {
  getUsers(req, res)
})

app.post('/usuario', (req, res) => {
  createUser(req.body.login, req.body.password, req.body.nome, res)
})
export default app
