const bcrypt = require("bcryptjs");
const DataBaseManager = require("../DataAccess/DataBaseManager")
// const Admin = require("../db/models/Admin");
class CreateAdmin {
    static async createAdmin(user, name, familyName, email, password, phoneNumber, department, organizationLevel, office, workingHour) {
        if (user)
            throw "Admin has already been created";

        if (!checkPassword(password))
            throw "Your password should be at least 10 characters including alphabetic and numeric.";

        let encryptedPassword = bcrypt.hash(password, 10);
        await DataBaseManager.addAdmin(email, encryptedPassword, phoneNumber, name, familyName, department, organizationLevel, office, workingHour)
    }
}

function checkPassword(givenPassword) {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{10,}$/;
    return passwordRegex.test(givenPassword);
}


module.exports = CreateAdmin;