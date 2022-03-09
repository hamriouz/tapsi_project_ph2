const bcrypt = require("bcryptjs");
const User = require("../db/models/User");
const DataBaseManager = require("../db/db-manager/DataBaseManager")

class Registration {

    static async createEmployeeByAdmin(name, familyName, email, password, phoneNumber, department, organizationLevel, office, workingHour, role, status) {
        const repetitiveUser = User.query().select('*').where("email", '=', email)

        if (repetitiveUser)
            throw "کارمندی با ایمیل وارد شده وجود دارد!"

        if (!checkPassword(password))
            throw "Your password should be at least 10 characters including alphabetic and numeric.";

        let encryptedPassword = bcrypt.hash(password, 10);
        await DataBaseManager.addEmployee(role, email, encryptedPassword, phoneNumber, familyName, department, organizationLevel, office, workingHour, status)
    }
}

function checkPassword(givenPassword) {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{10,}$/;
    return passwordRegex.test(givenPassword);
}


module.exports = {Registration, checkPassword};