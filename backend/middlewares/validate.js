import Joi from "joi";

const validate = (requestPartsWithValidationSchema) => {

    const validRequestParts = ['body', 'params', 'query', 'files']

    const invalidParts = Object.keys(requestPartsWithValidationSchema).filter((e) => !validRequestParts.includes(e));

    if (invalidParts.length > 0) throw new Error(invalidParts.join(", ") + " cannot be validated.");

    return (req, res, next) => {

        let errors = []

        for (const part in requestPartsWithValidationSchema) {
            const { error } = requestPartsWithValidationSchema[part].validate(req[part], { abortEarly: false })
            if (error) {
                errors.push(error)
            }
        }

        const valid = !errors.some(e => e.details)

        if (valid) {
            next();
        } else {
            let allErrors = {}
            errors.forEach(function (error) {
                error.details.forEach(function (errorDetail) {
                    allErrors[errorDetail['context']['label']] = errorDetail['message']
                })
            })
            res.status(422).json({ error: allErrors })
        }
    }
}

export default validate