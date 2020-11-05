import express from 'express'
import {PORT, NODE_ENV} from './config'

const app = express()
//Line below obscures public users that express is being used in the backend
app.disable('x-powered-by')

app.use(express.urlencoded({extended: true}))
app.use(express.json)

const apiRouter = express.Router
app.use('/api', apiRouter)
apiRouter.use('/users', userRoutes)

app.listen(PORT, () => console.log(`Listing on port ${PORT}`))