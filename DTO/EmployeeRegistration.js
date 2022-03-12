const UserDomain = require("../Domain/User");

class Registration {

    static async createEmployeeByAdmin(name, familyName, email, password, phoneNumber, department, organizationLevel, office, workingHour, role, status) {
        try {
            let userDomain = new UserDomain(email);
            await userDomain.registerEmployee(name, familyName, email, password, phoneNumber, department, organizationLevel, office, workingHour, role, status)
        }catch (e){
            throw e;
        }// await userDomain
        /*        const repetitiveUser = DataBaseManager.getUserByEmail(email)

        if (repetitiveUser)
            throw "کارمندی با ایمیل وارد شده وجود دارد!"

        if (!checkPassword(password))
            throw "Your password should be at least 10 characters including alphabetic and numeric.";

        let encryptedPassword = bcrypt.hash(password, 10);
        await DataBaseManager.addEmployee(role, email, encryptedPassword, phoneNumber, familyName, department, organizationLevel, office, workingHour, status)
    */
    }
}



module.exports = Registration;