import { Router } from "express";
import validate from "../middlewares/validate.js";
import Joi from "joi";
import { deleteArtist, getArtist, insertArtist, readArtists, updateArtist } from "../services/db/artist.js";
import needLogin from "../middlewares/needLogin.js"
import Jsend from "../helpers/jsend.js";
import { genders } from "../helpers/constants.js"
import moment from "moment";
const artistRouter = Router();


// add new artist
artistRouter.post("/", validate({
    body: Joi.object().keys({
        name: Joi.string().required(),
        dob: Joi.date().required(),
        gender: Joi.string().valid(...genders).required(),
        address: Joi.string().required(),
        first_release_year: Joi.number().required().min(1500),
        no_of_albums_released: Joi.number().required().min(0),
    }),
}), needLogin("super_admin", 'artist_manager'), async function (req, res) {
    try {
        let rawArtist = req.body;
        rawArtist['dob'] = moment(rawArtist['dob']).toDate()
        const artist = await insertArtist(rawArtist);
        return res.status(201).send(Jsend.success(artist))
    } catch (e) {
        return res.status(500).send(Jsend.error(e))
    }
})

// import artists from array
artistRouter.post("/import", validate({
    body: Joi.object().keys({
        rawArtists: Joi.array().required().items(Joi.object().keys({
            name: Joi.string().required(),
            dob: Joi.date().required(),
            gender: Joi.string().valid(...genders).required(),
            address: Joi.string().required(),
            first_release_year: Joi.number().required().min(1500),
            no_of_albums_released: Joi.number().required().min(0),
        },),)
    }),
}), needLogin("super_admin", 'artist_manager'), async function (req, res) {
    try {
        const rawArtists = req.body.rawArtists;

        const responses = await Promise.all(rawArtists.map(e => insertArtist(e).then((a) => false).catch((e) => e.message)))

        return res.status(200).send(Jsend.success({}, `${responses.filter(e => !e).length} / ${responses.length} artists imported. Found Errors: [${responses.filter(e => e).join(", ")}]`))
    } catch (e) {
        return res.status(500).send(Jsend.error(e))
    }
})

// Get all artists
artistRouter.get("/", needLogin("super_admin", 'artist_manager', 'artist'), validate({
    query: Joi.object().keys({
        page: Joi.number(),
        limit: Joi.number(),
    }),
},), async function (req, res) {
    const { page, limit } = { ...{ page: 1, limit: 10 }, ...req.query };
    const artists = await readArtists(parseInt(page), parseInt(limit));
    return res.status(200).send(Jsend.success(artists))
})

const singleArtistRouter = Router();
// Router for single artist by id
artistRouter.use("/:artistId", needLogin("super_admin", 'artist_manager'), validate({
    params: Joi.object().keys({
        artistId: Joi.number().required()
    })
}), async function (req, res, next) {
    try {
        req.currentArtist = await getArtist(parseInt(req.params.artistId));
        if (!req.currentArtist) throw new Error("Artist not found.");
        return next();
    } catch (e) {
        console.log(e);
        return res.send(Jsend.fail({}, e.message))
    }
}, singleArtistRouter)

// get single artist
singleArtistRouter.get("/", function (req, res) {
    return res.status(200).send(Jsend.success(req.currentArtist))
})

// edit single artist
singleArtistRouter.put("/", validate({
    body: Joi.object().keys({
        name: Joi.string().required(),
        dob: Joi.date().required(),
        gender: Joi.string().valid(...genders).required(),
        address: Joi.string().required(),
        first_release_year: Joi.number().required().min(1500),
        no_of_albums_released: Joi.number().required().min(0),
    }),
}), async function (req, res) {
    try {
        req.currentArtist = await updateArtist(req.currentArtist.id, { ...req.body, ...{ dob: moment(req.body.dob).toDate() } })
        return res.status(200).send(Jsend.success(req.currentArtist))
    } catch (e) {
        return res.status(500).send(Jsend.error(e))
    }
})

// delete single artist
singleArtistRouter.delete("/", async function (req, res) {
    try {
        await deleteArtist(req.currentArtist.id);
        return res.status(200).send(Jsend.success({}, "Artist with id '" + req.currentArtist.id + "' Deleted."))
    } catch (e) {
        return res.status(500).send(Jsend.error(e))
    }
})





export default artistRouter 