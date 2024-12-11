import { loginUser } from "./user.js";

loginUser({ email: "assdf@gmail.com", 'password': "dddd" })
    .then(d => console.log(d))
    .catch(e => console.error(e))