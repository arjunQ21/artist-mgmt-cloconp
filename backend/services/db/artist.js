import connection from "./connection.js";

async function getArtist (id) {
    try {
        const [artistData] = await connection.query("SELECT * from artist WHERE id = ?", [id])
        if (artistData[0]) {
            return { ...artistData[0], password: undefined };
        } else throw new Error("Artist not found by id: " + id)
    } catch (err) {
        console.log("Error getting artist: ", err);
        throw err;
    }
}

async function readArtists (page = 1, limit = 10) {
    const offset = (page - 1) * limit;

    try {
        const [rows] = await connection.query(
            'SELECT * FROM artist ORDER BY id DESC LIMIT ? OFFSET ?',
            [limit, offset]
        );
        return rows.map(r => ({ ...r, password: undefined }));
    } catch (err) {
        console.error('Error reading artists:', err.message);
        throw err;
    }
}

async function insertArtist (artist) {
    const {
        name,
        dob,
        gender,
        address,
        first_release_year,
        no_of_albums_released,
    } = artist;

    try {
        const [result] = await connection.query(
            `INSERT INTO artist (name ,dob ,gender ,address ,first_release_year ,no_of_albums_released) 
        VALUES (?, ?, ?, ?, ?, ?)`,
            [name, dob, gender, address, first_release_year, no_of_albums_released,]
        );
        const insertedId = result.insertId;
        if (!insertedId) {
            throw new Error("Artist not inserted.");

        } else return await getArtist(insertedId)
    } catch (err) {
        console.error('Error inserting artist:', err.message);
        throw err;
    }
}

async function updateArtist (id, updatedFields) {
    const keys = Object.keys(updatedFields);
    const values = Object.values(updatedFields);

    const setThis = keys.map(key => `${key} = ?`).join(', ');

    try {
        await connection.query(
            `UPDATE artist SET ${setThis} WHERE id = ?`,
            [...values, id]
        );
        return await getArtist(id);
    } catch (err) {
        console.error('Error updating artist:', err.message);
        throw err;
    }
}

async function deleteArtist (id) {
    try {
        const [artistData] = await connection.query("DELETE from artist WHERE id = ?", [id])
        // console.log({ artistData })
        if (artistData.affectedRows) {
            return true;
        } else throw new Error("Artist not found by id: " + id)
    } catch (err) {
        console.log("Error deleting artist: ", err);
        throw err;
    }
}

export { readArtists, insertArtist, updateArtist, getArtist, deleteArtist }