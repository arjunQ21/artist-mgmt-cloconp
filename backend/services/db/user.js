import connection from "./connection.js";

async function getUser (id) {
    try {
        const [userData] = await connection.query("SELECT * from user WHERE id = ?", [id])
        return userData;
    } catch (err) {
        console.log("Error getting user: ", err);
        throw err;
    }
}

async function readUsers (page = 1, limit = 10) {
    const offset = (page - 1) * limit;

    try {
        const [rows] = await connection.query(
            'SELECT * FROM user ORDER BY id LIMIT ? OFFSET ?',
            [limit, offset]
        );
        return rows;
    } catch (err) {
        console.error('Error reading users:', err.message);
        throw err;
    }
}

async function insertUser (user) {
    const {
        first_name,
        last_name,
        email,
        password,
        phone,
        dob,
        gender,
        address,
    } = user;

    try {
        const [result] = await connection.query(
            `INSERT INTO user 
        (first_name, last_name, email, password, phone, dob, gender, address) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [first_name, last_name, email, password, phone, dob, gender, address]
        );
        const insertedId = result.insertId;
        if (!insertedId) {
            throw new Error("User not inserted.");

        } else return await getUser(insertedId)
    } catch (err) {
        console.error('Error inserting user:', err.message);
        throw err;
    }
}

async function updateUser (id, updatedFields) {
    const keys = Object.keys(updatedFields);
    const values = Object.values(updatedFields);

    const setThis = keys.map(key => `${key} = ?`).join(', ');

    try {
        const [result] = await connection.query(
            `UPDATE user SET ${setThis} WHERE id = ?`,
            [...values, id]
        );
        return await getUser(id);
    } catch (err) {
        console.error('Error updating user:', err.message);
        throw err;
    }
}



export { readUsers, insertUser, updateUser, getUser }