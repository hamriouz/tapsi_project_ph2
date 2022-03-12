const UserDomain = require("../Domain/User");
class CreateAdmin {
    static async createAdmin(user, name, familyName, email, password, phoneNumber, department, organizationLevel, office, workingHour) {
        try {
            let userDomain = new UserDomain(email);
            await userDomain.createAdmin(user, name, familyName, email, password, phoneNumber, department, organizationLevel, office, workingHour);
        }catch (e){
            throw e;
        }
    }
}


module.exports = CreateAdmin;