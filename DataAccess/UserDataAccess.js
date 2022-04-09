const User = require("./db/models/User")

class UserDataAccess {
    async getAdmin() {
        return User.query().select('*').where('role', '=', "admin");
    }

    async getUserByEmail(email) {
        return User.query().select("*").where('email', '=', email);
    }

    async getUserByIdentifier(identifier) {
        return User.query().select("*").findById(identifier);
    }

    async getRole(email) {
        return this.getUserByEmail(email)[0].role;
    }

    async getPassword(email) {
        return this.getUserByEmail(email)[0].password;
    }

    async getStatus(email) {
        return this.getUserByEmail(email)[0].status;
    }

    async addAdmin(adminDetail, encryptedPassword) {
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
        });

    }

    async addEmployee(employeeDetail, encryptedPassword) {
        const {
            role,
            email,
            phoneNumber,
            familyName,
            department,
            organizationLevel,
            office,
            workingHour,
            status
        } = employeeDetail;
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
        });
    }

    async getAllUsers(){
        return User.query().select('*');
    }

/*
    async listEmployeeAdmin() {
        return User.query().select(
            'name',
            'family_name',
            'department',
            'office');
    }

    async detailEmployeeAdmin(email) {
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
        ).where("email", '=', email);
    }

    async allEmployeeDepartment(department) {
        return User.query().select(
            'email',
            'name',
            'family_name')
            .where("department", '=', department);
    }

    async allEmployeeOffice(office) {
        return User.query().select(
            'email',
            'name',
            'family_name')
            .where("office", '=', office);
    }
*/

    async workingHour(email) {
        return this.getUserByEmail(email)[0].working_hour;
    }

    async changeName(name, email) {
        await User.query()
            .where("email", '=', email)
            .update({
                name: name
            });
    }

    async changeFamilyName(familyName, email) {
        await User.query()
            .where("email", '=', email)
            .update({
                family_name: familyName
            });
    }

    async changeDepartment(department, email) {
        await User.query()
            .where("email", '=', email)
            .update({
                department: department
            });
    }

    async changeOrganizationLevel(organizationLevel, email) {
        await User.query()
            .where("email", '=', email)
            .update({
                organization_level: organizationLevel
            });
    }

    async changeOffice(office, email) {
        await User.query()
            .where("email", '=', email)
            .update({
                office: office
            });
    }

    async changeWorkingHour(workingHour, email) {
        await User.query()
            .where("email", '=', email)
            .update({
                working_hour: workingHour
            });
    }

    async changeRole(role, email) {
        await User.query()
            .where("email", '=', email)
            .update({
                role: role
            });
    }

    async changeStatus(status, email) {
        await User.query()
            .where("email", '=', email)
            .update({
                status: status
            });
    }

    async enable(email) {
        await User.query()
            .where("email", '=', email)
            .update({
                status: 'enable'
            });
    }

    async disable(email) {
        await User.query()
            .where("email", '=', email)
            .update({
                status: 'disable'
            });
    }
}

module.exports = UserDataAccess