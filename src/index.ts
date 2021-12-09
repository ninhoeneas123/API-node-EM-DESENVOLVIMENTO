import express from 'express'
import mongoose from 'mongoose'
import userRouter from './users/user-routes'
import courseController from './cousers/course-routes'
import authController from './auth/auth-routes'
import bodyParser from 'body-parser'
import multer from 'multer'

const app = express();

app.use(express.json() ,userRouter, courseController, authController)


mongoose.connect('mongodb+srv://admin:eneas123@cluster0.ygk4b.mongodb.net/test').then(() => {
    console.log('Connect to database')
}).catch(err => {
    console.log(err)
})
app.listen(3000, () => {
    console.log('Server running')
});