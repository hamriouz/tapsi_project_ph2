const User = require("./User")
const UserDomain = require("../Domain/User");


class Admin extends User {

    static async login(email, password) {
        let userDomain = new UserDomain(email);
        await userDomain.login(password);
    }}

module.exports = Admin;

/*    static async login(email, password) {
        const user = DataBaseManager.getUserByEmail(email)
        if (user) {
            const encryptedPassword = DataBaseManager.getPassword(email)
            if (!(bcrypt.compare(password, encryptedPassword)))
                throw "Invalid Credentials!"
        }
        else throw "Invalid Credentials!"

    }*/