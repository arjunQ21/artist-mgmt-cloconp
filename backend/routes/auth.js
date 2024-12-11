import { Router } from "express";
import validate from "../middlewares/validate.js";
import Joi from "joi";
import { genders, roles } from "../helpers/constants.js"
import { insertUser, loginUser } from "../services/db/user.js"
import moment from "moment";
import { createAuthTokenFor, hashPassword } from "../helpers/functions.js";


const authRouter = Router();

authRouter.post("/register", validate({
    body: Joi.object().keys({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        email: Joi.string().email().required(),
        role: Joi.string().valid(...roles).required(),
        phone: Joi.string().regex(/^[0-9]{10}$/).messages({ 'string.pattern.base': `Phone number must have 10 digits.` }).required(),
        dob: Joi.date().required(),
        gender: Joi.string().valid(...genders).required(),
        address: Joi.string().required(),
        password: Joi.string().min(8).required(),
    }),
}), async function (req, res) {
    try {
        let rawUser = req.body;
        rawUser['dob'] = moment(rawUser['dob']).toDate()
        rawUser['password'] = await hashPassword(rawUser['password'])
        const user = await insertUser(rawUser);
        return res.status(201).send(user)
    } catch (e) {
        return res.status(500).send({ error: e })
    }
})

authRouter.post("/login", validate({
    body: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    })
}), async function (req, res) {
    try {
        try {
            const loggedInUser = await loginUser(req.body);
            return res.status(200).send({ ...loggedInUser, token: createAuthTokenFor(loggedInUser.id) })
        } catch (e) {
            return res.status(400).send({ message: e.message })
        }
    } catch (e) {
        return res.status(500).send({ error: e })
    }
})

export default authRouter