const bcrypt = require("bcryptjs");
const Token = require("../Token");
const ChangeDetail = require("../controller/ChangeDetail");
const SeeDetail = require("../controller/SeeDetail");

// TODO

let allEmails = [];
let allUsers = [];

class User {

    static removeAllUsers(){
        allUsers.length = 0;
        allEmails.length = 0;
    }

    static doesEmailExist(email) {
        let isRepetitive = false;

        allEmails.forEach(checkFunction);

        function checkFunction(given_mail) {
            if (email === given_mail) {
                isRepetitive = true;
            }
        }

        return isRepetitive;
    }

    static findObjectByKey(key, value) {
        for (let i = 0; i < allUsers.length; i++) {
            if (allUsers[i][key] === value) {
                return allUsers[i];
            }
        }
        return null;
    }

    static async login(email, password) {
        // const user = User.findObjectByKey("email", email);
        const user = await User.query().select('*').where('email', '=', email);
        const encryptedPassword = await User.query().select("password").where("email", '=',email);
        const userStatus = await User.query().select("status").where("email", '=',email);
        if (user && bcrypt.compare(password, encryptedPassword)) {
            if (userStatus.toString() === "enable")
                throw "Your account was disabled! You don't have the permission to log in!"
            // user.token = Token.createToken(user, email)
            Token.createToken(user, email)
        } else
            throw "Invalid Credentials!"
    }

    change_detail(employee, name, familyName, workingHour) {
        ChangeDetail.changeDetailByEmployee(employee, name, familyName, workingHour);
    }

    get_all_employee(department) {
        return SeeDetail.getAllEmployeeDepartmentByEmployee(department, allUsers);
    }

    see_working_hour(email_address) {
        let user = User.findObjectByKey("email", email_address)
        if (!user)
            throw "Employee with the given Email Address doesn't exist!"
        return SeeDetail.workingHourByEmployee(user);
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

