const Admin = require("../models/Admin");
const User = require("../models/User")

class DataBaseManager{
    static async getAdmin(){
        return Admin.query().select('*').where('role', '=', "admin");
    }

    static async getUserByEmail(email){
        return User.query().select("*").where('email', '=', email)
    }

    static getRole(email){
        return this.getUserByEmail(email)[0].role

    }

    static getPassword(email){
        return this.getUserByEmail(email)[0].password
    }

    static getStatus(email){
        return this.getUserByEmail(email)[0].status
    }

    static async addAdmin(email, encryptedPassword, phoneNumber, name, familyName, department, organizationLevel, office, workingHour){
        await Admin.query().insert({
            role: "admin",
            email: email,
            password: encryptedPassword,
            phone_number: phoneNumber,
            name: name,
            family_name: familyName,
            department: department,
            organization_level: organizationLevel,
            office: office,
            working_hour: workingHour,
            status: "enable",
        })

    }

    static async addEmployee(role, email, encryptedPassword, phoneNumber, familyName, department, organizationLevel, office, workingHour, status){
        await User.query().insert({
            role: role,
            email: email,
            password: encryptedPassword,
            phone_number: phoneNumber,
            name: name,
            family_name: familyName,
            department: department,
            organization_level: organizationLevel,
            office: office,
            working_hour: workingHour,
            status: status,
        })
    }


}

module.exports = DataBaseManager