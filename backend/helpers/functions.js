import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getUser } from "../services/db/user.js";


async function hashPassword (plainPassword) {
  const saltRounds = 10;
  try {
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    return hashedPassword;
  } catch (err) {
    console.error("Error hashing password:", err);
    throw err;
  }
}

function createAuthTokenFor (userId) {
  return jwt.sign({ data: { id: userId } }, process.env.JWT_SECRET, { expiresIn: '100d' })
}

async function getUserFromJWT (token) {
  try {
    var decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded)
    const { id } = decoded.data;
    return await getUser(id);
  } catch (e) {
    console.log("Error getting user from JWT: ", e);
    return null;
  }
}

// getUserFromJWT("eyJhbGciOiUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxfSwiaWF0IjoxNzMzOTI1NzYzLCJleHAiOjE3NDI1NjU3NjN9.X_GugQhhI-T_hD0ggIjLEs9UO_8YlbvtjXvzCYq7IJM")
// .then(u => console.log(u))

export { hashPassword, createAuthTokenFor, getUserFromJWT }