import { Router } from "express";
import validate from "../middlewares/validate.js";
import Joi from "joi";
import { deleteMusic, getMusic, insertMusic, readMusics, updateMusic } from "../services/db/music.js";
import needLogin from "../middlewares/needLogin.js"
import Jsend from "../helpers/jsend.js";
import {genre } from "../helpers/constants.js"
const musicRouter = Router();


// add new music
musicRouter.post("/", needLogin("super_admin", 'artist'), validate({
    body: Joi.object().keys({
        artist_id: Joi.number().required() ,
        title: Joi.string().required(),
        album_name: Joi.string().required(),
        genre: Joi.string().valid(...genre).required(),
    }),
}), async function (req, res) {
    try {
        const music = await insertMusic(req.body);
        return res.status(201).send(Jsend.success(music))
    } catch (e) {
        return res.status(500).send(Jsend.error(e))
    }
})

// Get all musics
musicRouter.get("/", needLogin("super_admin", 'artist_manager', 'artist'), validate({
    query: Joi.object().keys({
        page: Joi.number(),
        limit: Joi.number(),
    }),
},), async function (req, res) {
    const { page, limit } = { ...{ page: 1, limit: 10 }, ...req.query };
    const musics = await readMusics(parseInt(page), parseInt(limit));
    return res.status(200).send(Jsend.success(musics))
})

const singleMusicRouter = Router();
// Router for single music by id
musicRouter.use("/:musicId", needLogin("super_admin", 'artist'), validate({
    params: Joi.object().keys({
        musicId: Joi.number().required()
    })
}), async function (req, res, next) {
    try {
        req.currentMusic = await getMusic(parseInt(req.params.musicId));
        if (!req.currentMusic) throw new Error("Music not found.");
        return next();
    } catch (e) {
        console.log(e);
        return res.send(Jsend.fail({}, e.message))
    }
}, singleMusicRouter)

// get single music
singleMusicRouter.get("/", function (req, res) {
    return res.status(200).send(Jsend.success(req.currentMusic))
})

// edit single music
singleMusicRouter.put("/", validate({
    body: Joi.object().keys({
        title: Joi.string().required(),
        album_name: Joi.string().required(),
        genre: Joi.string().valid(...genre).required(),
    }),
}), async function (req, res) {
    try {
        req.currentMusic = await updateMusic(req.currentMusic.id, req.body )
        return res.status(200).send(Jsend.success(req.currentMusic))
    } catch (e) {
        return res.status(500).send(Jsend.error(e))
    }
})

// delete single music
singleMusicRouter.delete("/", async function (req, res) {
    try {
        await deleteMusic(req.currentMusic.id);
        return res.status(200).send(Jsend.success({}, "Music with id '" + req.currentMusic.id + "' Deleted."))
    } catch (e) {
        return res.status(500).send(Jsend.error(e))
    }
})





export default musicRouter 