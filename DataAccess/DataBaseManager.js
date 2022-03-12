const Admin = require("../db/models/Admin");
const User = require("../db/models/User")

class DataBaseManager {
    static async getAdmin() {
        return Admin.query().select('*').where('role', '=', "admin");
    }

    static async getUserByEmail(email) {
        return User.query().select("*").where('email', '=', email)
    }

    static getRole(email) {
        return this.getUserByEmail(email)[0].role

    }

    static getPassword(email) {
        return this.getUserByEmail(email)[0].password
    }

    static getStatus(email) {
        return this.getUserByEmail(email)[0].status
    }

    static async addAdmin(email, encryptedPassword, phoneNumber, name, familyName, department, organizationLevel, office, workingHour) {
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

    static async addEmployee(role, email, encryptedPassword, phoneNumber, familyName, department, organizationLevel, office, workingHour, status) {
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

    static async listEmployeeAdmin() {
        return User.query().select(
            'name',
            'family_name',
            'department',
            'office');
    }

    static async detailEmployeeAdmin(email) {
        return User.query().select(
            'name',
            'family_name',
            'email',
            'phone_number',
            'department',
            'organization_level',
            'office',
            'working_hour',
            'role',
            'status'
        ).where("email", '=', email)
    }

    static async allEmployeeDepartment(department) {
        return User.query().select(
            'email',
            'name',
            'family_name')
            .where("department", '=', department)
    }

    static async workingHour(email) {
        return User.query().select("working_hour").where('email', '=', email);

    }

    static async changeName(name, email) {
        await User.query()
            .where("email", '=', email)
            .patch({
                name: name
            });
    }

    static async changeFamilyName(familyName, email) {
        await User.query()
            .where("email", '=', email)
            .patch({
                family_name: familyName
            });
    }

    static async changeDepartment(department, email) {
        await User.query()
            .where("email", '=', email)
            .patch({
                department: department
            });
    }

    static async changeOrganizationLevel(organizationLevel, email) {
        await User.query()
            .where("email", '=', email)
            .patch({
                organization_level: organizationLevel
            });
    }

    static async changeOffice(office, email) {
        await User.query()
            .where("email", '=', email)
            .patch({
                office: office
            });
    }

    static async changeWorkingHour(workingHour, email) {
        await User.query()
            .where("email", '=', email)
            .patch({
                working_hour: workingHour
            });
    }

    static async changeRole(role, email) {
        await User.query()
            .where("email", '=', email)
            .patch({
                role: role
            });
    }

    static async changeStatus(status, email) {
        await User.query()
            .where("email", '=', email)
            .patch({
                status: status
            });
    }

    static async enable(email) {
        await User.query()
            .where("email", '=', email)
            .patch({
                status: 'enable'
            });
    }

    static async disable(email) {
        await User.query()
            .where("email", '=', email)
            .patch({
                status: 'disable'
            });
    }
}

module.exports = DataBaseManager