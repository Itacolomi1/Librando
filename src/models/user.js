import mongoose from '../config/database'
import uniqueValidator from 'mongoose-unique-validator'

const UserSchema = mongoose.Schema({
  login: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  nome: { type: String, required: true }
})

const User = mongoose.model('User', UserSchema)
UserSchema.plugin(uniqueValidator)
export default User
