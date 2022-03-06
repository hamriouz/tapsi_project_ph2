const bcrypt = require("bcryptjs");
const User = require("../db/models/User");
const UserController = require("./User")
class Registration {

    //TODO INJA NABAYAD OBJECT PASS KONE
    static async createEmployeeByAdmin(name, familyName, email, password, phoneNumber, department, organizationLevel, office, workingHour, role, status) {
        const repetitiveUser = UserController.doesEmailExist(email);

        if (repetitiveUser)
            throw "کارمندی با ایمیل وارد شده وجود دارد!"

        if (!checkPassword(password))
            throw "Your password should be at least 10 characters including alphabetic and numeric.";

        let encryptedPassword = bcrypt.hash(password, 10);
      /*  const employee = new User(email, encryptedPassword);
        employee.setEmployeeDetail(phoneNumber, name, familyName, department, organizationLevel, office, workingHour, role, status)
    */
        await User.query().insert({
            role: role,
            email: email,
            password: encryptedPassword,
            phoneNumber: phoneNumber,
            name: name,
            familyName: familyName,
            department: department,
            organizationLevel: organizationLevel,
            office: office,
            workingHour: workingHour,
            status: status,
        })
    }
}

function checkPassword(givenPassword) {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{10,}$/;
    return passwordRegex.test(givenPassword);
}


module.exports = {Registration, checkPassword};