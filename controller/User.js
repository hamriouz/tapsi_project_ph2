const bcrypt = require("bcryptjs");
const Token = require("../Token");
const ChangeDetail = require("../controller/ChangeDetail");
const SeeDetail = require("../controller/SeeDetail");
const UserModel = require('../db/models/User');
// TODO

let allEmails = [];
let allUsers = [];

class User {

    static removeAllUsers(){
        allUsers.length = 0;
        allEmails.length = 0;
    }

    static async login(email, password) {
        const user = await UserModel.query().select('*').where('email', '=', email);
        const encryptedPassword = await UserModel.query().select("password").where("email", '=',email);
        const userStatus = await UserModel.query().select("status").where("email", '=',email);
        if (user && bcrypt.compare(password, encryptedPassword)) {
            if (userStatus.toString() === "enable")
                throw "Your account was disabled! You don't have the permission to log in!"
            // user.token = Token.createToken(user, email)
            Token.createToken(user, email)
        } else
            throw "Invalid Credentials!"
    }

}

module.exports = User;


/*valid input:
#sign up employee->
{
	"name": "hg",
	"family_name": "sds",
	"email": "huuuj@s.com",
	"password": "jjj111iiiiii11",
	"phone_number": 987665,
	"department": "jjjj",
	"organization_level": "as",
	"office": "jjjjjjjj",
	"working_hours": "9-10",
	"role": "employee",
	"status": "bhjbhjb"
}
 */

