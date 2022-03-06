// const User = require("../model/User");
const bcrypt = require("bcryptjs");
const Admin = require("../db/models/Admin");
const User = require("../db/models/User");
class CreateAdmin {
    static async createAdmin(user, name, familyName, email, password, phoneNumber, department, organizationLevel, office, workingHour) {
        // const user = await User.query().select('*').where('role', '=', "admin");
        if (user)
            throw "Admin has already been created";

        if (!checkPassword(password))
            throw "Your password should be at least 10 characters including alphabetic and numeric.";

        let encryptedPassword = bcrypt.hash(password, 10);

        await User.query().insert({
            role: "admin",
            email: email,
            password: encryptedPassword,
            phoneNumber: phoneNumber,
            name: name,
            family_name: familyName,
            department: department,
            organization_level: organizationLevel,
            office: office,
            working_hour: workingHour,
            status: "enable",
        })
    }
}

function checkPassword(givenPassword) {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{10,}$/;
    return passwordRegex.test(givenPassword);
}


module.exports = CreateAdmin;