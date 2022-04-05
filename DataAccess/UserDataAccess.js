const User = require("./db/models/User")

class UserDataAccess {
    static async getAdmin() {
        return User.query().select('*').where('role', '=', "admin");
    }

    static async getUserByEmail(email) {
        return User.query().select("*").where('email', '=', email)
    }

    static async getUserByIdentifier(identifier){
        return User.query().select("*").findById(identifier);
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

    static async addAdmin(adminDetail, encryptedPassword) {
        const {email, phoneNumber, name, familyName, department, organizationLevel, office, workingHour} = adminDetail;
        await User.query().insert({
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

    static async addEmployee(employeeDetail ,encryptedPassword) {
        const {role, email, phoneNumber, familyName, department, organizationLevel, office, workingHour, status} = employeeDetail;
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

    static async allEmployeeOffice (office) {
        return User.query().select(
            'email',
            'name',
            'family_name')
            .where("office", '=', office)
    }

    static async workingHour(email) {
        return this.getUserByEmail(email)[0].working_hour;

    }

    static async changeName(name, email) {
        await User.query()
            .where("email", '=', email)
            .update({
                name: name
            });
    }

    static async changeFamilyName(familyName, email) {
        await User.query()
            .where("email", '=', email)
            .update({
                family_name: familyName
            });
    }

    static async changeDepartment(department, email) {
        await User.query()
            .where("email", '=', email)
            .update({
                department: department
            });
    }

    static async changeOrganizationLevel(organizationLevel, email) {
        await User.query()
            .where("email", '=', email)
            .update({
                organization_level: organizationLevel
            });
    }

    static async changeOffice(office, email) {
        await User.query()
            .where("email", '=', email)
            .update({
                office: office
            });
    }

    static async changeWorkingHour(workingHour, email) {
        await User.query()
            .where("email", '=', email)
            .update({
                working_hour: workingHour
            });
    }

    static async changeRole(role, email) {
        await User.query()
            .where("email", '=', email)
            .update({
                role: role
            });
    }

    static async changeStatus(status, email) {
        await User.query()
            .where("email", '=', email)
            .update({
                status: status
            });
    }

    static async enable(email) {
        await User.query()
            .where("email", '=', email)
            .update({
                status: 'enable'
            });
    }

    static async disable(email) {
        await User.query()
            .where("email", '=', email)
            .update({
                status: 'disable'
            });
    }
}

module.exports = UserDataAccess