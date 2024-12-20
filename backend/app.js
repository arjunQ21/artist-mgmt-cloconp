import 'dotenv/config'
import express from 'express'
import { indexRouter } from './routes/index.js'
import connection from './services/db/connection.js';
import cors from 'cors'
import captureUserFromJWT from "./middlewares/captureUserFromJWT.js"
import routeDelay from "./middlewares/routeDelay.js"

connection.getConnection().then(c => {
  console.log("Connected to MYSQL Database.");
  c.release();
  const app = express()
  app.use(cors())
  app.use(express.json())
  // try to capture JWT Token and User
  app.use(captureUserFromJWT)
  // add delay to route so that loading states can be seen in frontend app
  app.use(routeDelay)
  // clamping the routes
  app.use(indexRouter)
  const port = process.env.PORT || 3000
  app.listen(port, () => {
    console.log(`Listening on port ${port}`)
  })
}).catch((e) => console.log("Error connecting to DB: ", e))
