const bcrypt = require("bcryptjs");
const DataBaseManager = require('../db/db-manager/DataBaseManager');
const UserDomain = require("../Domain/User")

class User {

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

    static async login(email, password) {
        let userDomain = new UserDomain(email);
        await userDomain.login(password);
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

