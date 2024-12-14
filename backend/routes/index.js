import { Router } from "express";
import authRouter from "./auth.js";
import userRouter from "./user.js";
import artistRouter from "./artists.js";



const indexRouter = Router();

indexRouter.get('/', (req, res) => {
    res.send('Artist Managment System Backend')
})

indexRouter.use("/auth", authRouter)
indexRouter.use("/users", userRouter)
indexRouter.use("/artists", artistRouter)

export { indexRouter }