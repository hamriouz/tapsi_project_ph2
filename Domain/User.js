const UserModel = require('../db/models/User');
const DataBaseManager = require('../db/db-manager/DataBaseManager')
const Token = require("../Token");

class UserDomain {
    constructor(email) {
        this.email = email;
    }
    async login(password) {

        await this.load();
        if (bcrypt.compare(password, this.encryptedPassword)) {
            if (DataBaseManager.getStatus(this.email) !== "enable")
                throw "Your account was disabled! You don't have the permission to log in!"
            // user.token = Token.createToken(user, email)
            // Token.createToken(this.email, DataBaseManager.getRole(this.email))
        } else
            throw "Invalid Credentials!"
    }
    setUser(user) {
        this.name = user.name;
        this.encryptedPassword = user.encryptedPassword;
    }
    async load() {
        const userDetail = await DataBaseManager.getUserByEmail(email)
        // const userDetail = await UserModel.query().select('*').where('email', '=', email);
        if (userDetail) {
            this.setUser(userDetail);
        }
    }
    /*    static async login(email, password) {
        const user = await DataBaseManager.getUserByEmail(email)
        if (user) {
            const encryptedPassword = await DataBaseManager.getPassword(email)
            const userStatus = await DataBaseManager.getStatus(email)
            if (user && bcrypt.compare(password, encryptedPassword)) {
                if (userStatus.toString() === "enable")
                    throw "Your account was disabled! You don't have the permission to log in!"
            } else
                throw "Invalid Credentials!"

        } else
            throw "Invalid Credentials!"
    }
    */



}

module.exports = UserDomain
