const User = require("./db/models/User");

class UserDataAccess {
    static async getAdmin() {
        return User.query().select('*').where('role', '=', "admin");
        // return User.query().select('*').where('role', '=', "admin");
    }

    static async getUserByEmail(email) {
        return User.query().select("*").where('email', '=', email)[0];
    }

    static async getUserByIdentifier(identifier) {
        return User.query().select("*").findById(identifier);
    }

    static async getRole(email) {
        return this.getUserByEmail(email).role;
    }

    static async getPassword(email) {
        return this.getUserByEmail(email).password;
    }

    static async getStatus(email) {
        return this.getUserByEmail(email).status;
    }

    static async addUser(employeeDetail, encryptedPassword, role) {
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

    static async getAllUsers() {
        return User.query().select('*');
    }

    static async workingHour(email) {
        return this.getUserByEmail(email).working_hour;
    }

    static async updateName(name, email) {
        await User.query()
            .where("email", '=', email)
            .update({
                name: name
            });
    }

    static async updateFamilyName(familyName, email) {
        await User.query()
            .where("email", '=', email)
            .update({
                family_name: familyName
            });
    }

    static async updateDepartment(department, email) {
        await User.query()
            .where("email", '=', email)
            .update({
                department: department
            });
    }

    static async updateOrganizationLevel(organizationLevel, email) {
        await User.query()
            .where("email", '=', email)
            .update({
                organization_level: organizationLevel
            });
    }

    static async updateOffice(office, email) {
        await User.query()
            .where("email", '=', email)
            .update({
                office: office
            });
    }

    static async updateWorkingHour(workingHour, email) {
        await User.query()
            .where("email", '=', email)
            .update({
                working_hour: workingHour
            });
    }

    static async updateRole(role, email) {
        await User.query()
            .where("email", '=', email)
            .update({
                role: role
            });
    }

    static async updateStatus(status, email) {
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

    static async allEmployeeDepartment(department) {
        return User.query().select(
            'email',
            'name',
            'family_name')
            .where("department", '=', department);
    }

    static async allEmployeeOffice(office) {
        return User.query().select(
            'email',
            'name',
            'family_name')
            .where("office", '=', office);
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

}

module.exports = UserDataAccess;