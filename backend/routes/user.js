import { Router } from "express";
import validate from "../middlewares/validate.js";
import Joi from "joi";
import { readUsers } from "../services/db/user.js";
import needLogin from "../middlewares/needLogin.js"
import Jsend from "../helpers/jsend.js";
const userRouter = Router();

userRouter.get("/", needLogin("super_admin"), validate({
    query: Joi.object().keys({
        page: Joi.number(),
        limit: Joi.number(),
    }),
},), async function (req, res) {
    const { page, limit } = { ...{ page: 1, limit: 10 }, ...req.query };
    const users = await readUsers(page, limit);
    return res.status(200).send(Jsend.success(users))
})

export default userRouter 