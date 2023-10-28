import mongoose from 'mongoose'

export interface User extends mongoose.Document {
    id: string
    email: string
}

const UserSchema = new mongoose.Schema<User>({
    id: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
})

export default mongoose.models.User || mongoose.model<User>('User', UserSchema)
