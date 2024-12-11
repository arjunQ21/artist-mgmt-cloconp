import { Router } from "express";
import authRouter from "./auth.js";


const indexRouter = Router();

indexRouter.get('/', (req, res) => {
    res.send('Artist Managment System Backend')
})

indexRouter.use("/auth", authRouter)

export { indexRouter }