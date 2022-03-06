const bcrypt = require("bcryptjs");
const Token = require("../Token");
const User = require("./User")



class Admin extends User {

    static async login(email, password) {
        const user = await User.query().select('*').where('email', '=', email);
        // TODO TEST!
        const encryptedPassword = await User.query().select("password").where("email", '=',email)

        if (user && bcrypt.compare(password, encryptedPassword)) {
            Token.createToken(user, email)
        } else
            throw "Invalid Credentials!"
    }
}

module.exports = Admin;
