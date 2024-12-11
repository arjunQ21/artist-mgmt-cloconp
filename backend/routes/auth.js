import { Router } from "express";
import validate from "../middlewares/validate.js";
import Joi from "joi";
import { genders } from "../helpers/constants.js"

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
        password: Joi.string().required(),
    }),
    query: Joi.object().keys({
        new: Joi.boolean()
    })
}), function (req, res) {
    return res.send(req.body)
})

export default authRouter