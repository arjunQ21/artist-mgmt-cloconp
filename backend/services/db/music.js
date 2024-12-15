import connection from "./connection.js";

async function getMusic (id) {
    try {
        const [musicData] = await connection.query("SELECT * from music WHERE id = ?", [id])
        if (musicData[0]) {
            return { ...musicData[0], password: undefined };
        } else throw new Error("Music not found by id: " + id)
    } catch (err) {
        console.log("Error getting music: ", err);
        throw err;
    }
}

async function readMusics (page = 1, limit = 10) {
    const offset = (page - 1) * limit;

    try {
        const [rows] = await connection.query(
            'SELECT * FROM music ORDER BY id DESC LIMIT ? OFFSET ?',
            [limit, offset]
        );
        return rows.map(r => ({ ...r, password: undefined }));
    } catch (err) {
        console.error('Error reading musics:', err.message);
        throw err;
    }
}

async function insertMusic (music) {
    const {
        artist_id,
        title,
        album_name,
        genre,
    } = music;

    try {
        const [result] = await connection.query(
            `INSERT INTO music (artist_id ,title ,album_name,genre) 
        VALUES (?, ?, ?, ?)`,
            [artist_id, title, album_name, genre,]
        );
        const insertedId = result.insertId;
        if (!insertedId) {
            throw new Error("Music not inserted.");

        } else return await getMusic(insertedId)
    } catch (err) {
        console.error('Error inserting music:', err.message);
        throw err;
    }
}

async function updateMusic (id, updatedFields) {
    const keys = Object.keys(updatedFields);
    const values = Object.values(updatedFields);

    const setThis = keys.map(key => `${key} = ?`).join(', ');

    try {
        await connection.query(
            `UPDATE music SET ${setThis} WHERE id = ?`,
            [...values, id]
        );
        return await getMusic(id);
    } catch (err) {
        console.error('Error updating music:', err.message);
        throw err;
    }
}

async function deleteMusic (id) {
    try {
        const [musicData] = await connection.query("DELETE from music WHERE id = ?", [id])
        if (musicData.affectedRows) {
            return true;
        } else throw new Error("Music not found by id: " + id)
    } catch (err) {
        console.log("Error deleting music: ", err);
        throw err;
    }
}

export { readMusics, insertMusic, updateMusic, getMusic, deleteMusic }