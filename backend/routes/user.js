import { Router } from "express";
import validate from "../middlewares/validate.js";
import Joi from "joi";
import { getUser, readUsers } from "../services/db/user.js";
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

// Get user by id
userRouter.get("/:userId", needLogin("super_admin"), validate({
    params: Joi.object().keys({
        userId: Joi.number().required()
    })
}), async function (req, res) {
    try {
        const user = await getUser(parseInt(req.params.userId));
        if (!user) throw new Error("User not found.");
        return res.status(200).send(Jsend.success(user));
    } catch (e) {
        console.log(e);
        return res.send(Jsend.fail({}, e.message))
    }
}  )

// Check if AUTH TOKEN is valid
userRouter.get("/me", needLogin(), function (req, res) {
    return res.status(200).send(Jsend.success({ ...req.user, token: createAuthTokenFor(req.user.id) }))
})


export default userRouter 