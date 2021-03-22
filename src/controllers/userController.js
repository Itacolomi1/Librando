import { getAll, create } from '../services/userService'

export const getUsers = async (req, res) => {
  getAll()
    .then((response) => {
      res.status(200).send(response)
    })
    .catch((error) => {
      res.status(400).send(error.writeErrors[0].errmsg)
    })
}

export const createUser = async (login, password, nome, res) => {
  create(login, password, nome)
    .then((response) => {
      res.status(201).send(response)
    })
    .catch((error) => {
      res.status(400).send(error._message)
    })
}
