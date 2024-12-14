import { Router } from "express";
import validate from "../middlewares/validate.js";
import Joi from "joi";
import { getUser, readUsers, updateUser } from "../services/db/user.js";
import needLogin from "../middlewares/needLogin.js"
import Jsend from "../helpers/jsend.js";
import { createAuthTokenFor } from "../helpers/functions.js"
import { roles, genders } from "../helpers/constants.js"
import moment from "moment";
const userRouter = Router();

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

const singleUserRouter = Router();
// Router for single user by id
userRouter.use("/:userId", needLogin("super_admin"), validate({
    params: Joi.object().keys({
        userId: Joi.number().required()
    })
}), async function (req, res, next) {
    try {
        req.currentUser = await getUser(parseInt(req.params.userId));
        if (!req.currentUser) throw new Error("User not found.");
        return next();
    } catch (e) {
        console.log(e);
        return res.send(Jsend.fail({}, e.message))
    }
}  , singleUserRouter)

// get single user
singleUserRouter.get("/", function (req, res) {
    return res.status(200).send(Jsend.success(req.currentUser))
})

// edit single user
singleUserRouter.put("/", validate({
    body: Joi.object().keys({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        email: Joi.string().email().required(),
        role: Joi.string().valid(...roles).required(),
        phone: Joi.string().regex(/^[0-9]{10}$/).messages({ 'string.pattern.base': `Phone number must have 10 digits.` }).required(),
        dob: Joi.date().required(),
        gender: Joi.string().valid(...genders).required(),
        address: Joi.string().required(),
    }),
}), async function (req, res) {
    try {
        req.currentUser = await updateUser(req.currentUser.id, { ...req.body, ...{dob: moment(req.body.dob).toDate()} })
        return res.status(200).send(Jsend.success(req.currentUser))
    } catch (e) {
        return res.status(500).send(Jsend.error(e))
    }
})



// Check if AUTH TOKEN is valid
userRouter.get("/me", needLogin(), function (req, res) {
    return res.status(200).send(Jsend.success({ ...req.user, token: createAuthTokenFor(req.user.id) }))
})


export default userRouter 