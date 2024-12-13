import { Router } from "express";
import validate from "../middlewares/validate.js";
import Joi from "joi";
import { readUsers } from "../services/db/user.js";
import needLogin from "../middlewares/needLogin.js"
import Jsend from "../helpers/jsend.js";
const userRouter = Router();
import {createAuthTokenFor} from "../helpers/functions.js"

// Get all users
userRouter.get("/", needLogin("super_admin"), validate({
    query: Joi.object().keys({
        page: Joi.number(),
        limit: Joi.number(),
    }),
},), async function (req, res) {
    const { page, limit } = { ...{ page: 1, limit: 10 }, ...req.query };
    const users = await readUsers(parseInt(page), parseInt(limit));
    return res.status(200).send(Jsend.success(users))
})

// Check if AUTH TOKEN is valid
userRouter.get("/me", needLogin(), function (req, res) {
    return res.status(200).send(Jsend.success({ ...req.user, token: createAuthTokenFor(req.user.id) }))
})


export default userRouter 