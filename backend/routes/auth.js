import { Router } from "express";

const authRouter = Router();

authRouter.post("/register", function (req, res) {
    return res.send(req.body)
})

export default authRouter