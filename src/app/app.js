import express from 'express'
import authRoute from '../routes/auth.routes.js'
import cookieParser from 'cookie-parser'
import productRoute from '../routes/product.route.js'
import cors from 'cors';
const app = express()


app.use(cors({
    origin: 'https://mern-frontend-beryl-theta.vercel.app',
    credentials: true
}));

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth',authRoute)
app.use('/api/product',productRoute)

export default app