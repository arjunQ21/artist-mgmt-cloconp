import { Router } from "express";
import validate from "../middlewares/validate.js";
import Joi from "joi";
import { genders } from "../helpers/constants.js"
import { insertUser } from "../services/db/user.js"
import moment from "moment";


const authRouter = Router();

authRouter.post("/register", validate({
    body: Joi.object().keys({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        email: Joi.string().email().required(),
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
        const user = await insertUser(rawUser);
        return res.status(201).send(user)
    } catch (e) {
        return res.status(500).send({ error: e })
    }
})

export default authRouter