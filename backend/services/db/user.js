import connection from "./connection.js";
import bcrypt from 'bcrypt'

async function getUser (id) {
    try {
        const [userData] = await connection.query("SELECT * from user WHERE id = ?", [id])
        return { ...userData[0] , password: undefined};
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
        return rows.map(r => ({...r, password: undefined}));
    } catch (err) {
        console.error('Error reading users:', err.message);
        throw err;
    }
}

async function insertUser (user) {
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
    } = user;

    try {
        const [result] = await connection.query(
            `INSERT INTO user 
        (first_name, last_name, role,  email, password, phone, dob, gender, address) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [first_name, last_name, role, email, password, phone, dob, gender, address]
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
        await connection.query(
            `UPDATE user SET ${setThis} WHERE id = ?`,
            [...values, id]
        );
        return await getUser(id);
    } catch (err) {
        console.error('Error updating user:', err.message);
        throw err;
    }
}


async function loginUser ({ email, password }) {
    const [results] = await connection.query("SELECT id, password FROM user WHERE email = ?", [email]);
    if (results[0]) {
        if (!await bcrypt.compare(password, results[0].password)) {
            throw new Error("Incorrect Password.");
        } else return await getUser(results[0].id);

    } else throw new Error("User not found by email: " + email);
}


export { readUsers, insertUser, updateUser, getUser, loginUser }