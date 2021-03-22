import User from '../models/user'
import hash from 'object-hash'
export const getAll = async () => {
  const users = await User.find()
  return users
}

export const create = async (login, password, nome) => {
  const hashPassword = hash(password)
  const user = await User.insertMany([
    { login: login, password: hashPassword, nome: nome }
  ])
  return user
}
