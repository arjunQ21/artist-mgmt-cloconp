import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


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
  return jwt.sign({data: {id: userId}}, process.env.JWT_SECRET, {expiresIn: '100d'})
}



export { hashPassword, createAuthTokenFor }