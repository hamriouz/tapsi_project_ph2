const bcrypt = require("bcryptjs");
const User = require("./User")
const DataBaseManager = require("../db/db-manager/DataBaseManager")


class Admin extends User {

    static async login(email, password) {
        const user = DataBaseManager.getUserByEmail(email)
        if (user) {
            const encryptedPassword = DataBaseManager.getPassword(email)
            if (!(bcrypt.compare(password, encryptedPassword)))
                throw "Invalid Credentials!"
        }
        else throw "Invalid Credentials!"

    }
}

module.exports = Admin;
