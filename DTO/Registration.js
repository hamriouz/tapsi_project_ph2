const UserDomain = require("../Domain/User");

class Registration {

    static async createEmployeeByAdmin(name, familyName, email, password, phoneNumber, department, organizationLevel, office, workingHour, role, status) {
        try {
            let userDomain = new UserDomain(email);
            await userDomain.registerEmployee(name, familyName, email, password, phoneNumber, department, organizationLevel, office, workingHour, role, status)
        }catch (e) {
            throw e;
        }
    }

    static async createAdmin(user, name, familyName, email, password, phoneNumber, department, organizationLevel, office, workingHour) {
        try {
            let userDomain = new UserDomain(email);
            await userDomain.createAdmin(user, name, familyName, email, password, phoneNumber, department, organizationLevel, office, workingHour);
        }catch (e){
            throw e;
        }
    }
}



module.exports = Registration;