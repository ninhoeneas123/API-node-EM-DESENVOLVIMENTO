import express from 'express'
import mongoose from 'mongoose'
import userRouter from './users/user-routes'
import UserController from './users/user-controller'
import courseController from './cousers/courses-routes'
import authController from './auth/auth-routes'
import swaggerUI from 'swagger-ui-express'
import swaggerDocument from '../swagger.json'

require('dotenv/config');


const app = express();

app.use(express.json(), userRouter, courseController, authController)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

mongoose.connect(process.env.DB_URL).then(() => {
    UserController.createSuperAdmin()
    console.log('Connect to database')
}).catch(err => {
    console.log(err)
})
app.listen(3000, () => {
    console.log('Server running')
});