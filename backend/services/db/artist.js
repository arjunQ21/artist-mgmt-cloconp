import connection from "./connection.js";

async function getArtist (id) {
    try {
        const [artistData] = await connection.query("SELECT * from artist WHERE id = ?", [id])
        if (  artistData[0]) {
            return { ...artistData[0], password: undefined };
        } else throw new Error("Artist not found by id: "+ id)
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
        return rows.map(r => ({...r, password: undefined}));
    } catch (err) {
        console.error('Error reading artists:', err.message);
        throw err;
    }
}

async function insertArtist (artist) {
    const {
        first_name,
        last_name,
        role,
        email,
        password,
        phone,
        dob,
        gender,
        address,
    } = artist;

    try {
        const [result] = await connection.query(
            `INSERT INTO artist 
        (first_name, last_name, role,  email, password, phone, dob, gender, address) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [first_name, last_name, role, email, password, phone, dob, gender, address]
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


async function loginArtist ({ email, password }) {
    const [results] = await connection.query("SELECT id, password FROM artist WHERE email = ?", [email]);
    if (results[0]) {
        if (!await bcrypt.compare(password, results[0].password)) {
            throw new Error("Incorrect Password.");
        } else return await getArtist(results[0].id);

    } else throw new Error("Artist not found by email: " + email);
}


export { readArtists, insertArtist, updateArtist, getArtist, loginArtist }