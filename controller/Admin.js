const bcrypt = require("bcryptjs");
const Token = require("../Token");
const SeeDetail = require("../controller/SeeDetail");
const ChangeDetail = require("../controller/ChangeDetail");
const {Registration} = require("../controller/Registration");
const User = require("./User")
const e = require("express");



class Admin extends User {

/*
    constructor(email, password) {
        super(email, password);
    }
*/

    static async login(email, password) {
        // const user = User.findObjectByKey("email", email);
        const user = await User.query().select('*').where('email', '=', email);
        const encryptedPassword = await User.query().select("password").where("email", '=',email)

        if (user && bcrypt.compare(password, encryptedPassword)) {
            // user.token = Token.createToken(user, email)
            Token.createToken(user, email)
        } else
            throw "Invalid Credentials!"
    }

    async createEmployee(name, familyName, email, password, phoneNumber, department, organizationLevel, office, workingHour, role, status) {
        try {
            await Registration.createEmployeeByAdmin(name, familyName, email, password, phoneNumber, department, organizationLevel, office, workingHour, role, status);
        } catch (e) {
            throw e;
        }
    }

    view_list_employees() {
        return SeeDetail.viewListEmployeeByAdmin();
    }

    change_detail_employee(name, family_name, email, department, organization_level, office, working_hours, role, status) {
        try {

            ChangeDetail.changeDetailByAdmin(name, family_name, email, department, organization_level, office, working_hours, role, status);
        } catch (e) {
            throw e
        }
    }

    view_detail_one_employee(email) {
        try {
            return SeeDetail.viewDetailOneEmployeeByAdmin(email, User.findObjectByKey("email", email));
        } catch (e) {
            throw e
        }
    }

    enable_disable(email_address) {
        try {
            return ChangeDetail.changeStateByAdmin(email_address)
        } catch (error) {
            throw error;
        }
    }

}

module.exports = Admin;
