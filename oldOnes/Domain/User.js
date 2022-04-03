const DataBaseManager = require('../../DataAccess/EmployeeDataAccess')
const bcrypt = require("bcryptjs");

class UserDomain {
    constructor(email) {
        this.email = email;
    }



    async login(password) {
        await this.load();
        if (bcrypt.compare(password, this.encryptedPassword)) {
            if (DataBaseManager.getStatus(this.email) !== "enable")
                throw "Your account was disabled! You don't have the permission to log in!"
        } else
            throw "Invalid Credentials!"
    }

    setUser(user) {
        this.name = user.name;
        this.encryptedPassword = user.password;
    }

    async load() {
        const userDetail = await DataBaseManager.getUserByEmail(this.email)
        if (userDetail) {
            this.setUser(userDetail);
        }
    }

    async createAdmin(user, name, familyName, email, password, phoneNumber, department, organizationLevel, office, workingHour) {
        if (user)
            throw "Admin has already been created";

        if (!checkPassword(password))
            throw "Your password should be at least 10 characters including alphabetic and numeric.";

        let encryptedPassword = bcrypt.hash(password, 10);
        await DataBaseManager.addAdmin(email, encryptedPassword, phoneNumber, name, familyName, department, organizationLevel, office, workingHour)

    }

    async registerEmployee(name, familyName, email, password, phoneNumber, department, organizationLevel, office, workingHour, role, status) {
        const repetitiveUser = DataBaseManager.getUserByEmail(email)

        if (repetitiveUser)
            throw "کارمندی با ایمیل وارد شده وجود دارد!"

        if (!checkPassword(password))
            throw "Your password should be at least 10 characters including alphabetic and numeric.";

        let encryptedPassword = bcrypt.hash(password, 10);
        await DataBaseManager.addEmployee(role, email, encryptedPassword, phoneNumber, familyName, department, organizationLevel, office, workingHour, status)

    }

}

function checkPassword(givenPassword){
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{10,}$/;
    return passwordRegex.test(givenPassword);
}

module.exports = UserDomain


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
