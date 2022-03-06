// const User = require("../model/User");
const User = require('../db/models/User')

class SeeDetail {
    static viewListEmployeeByAdmin() {
        return User.query().select(
            'name',
            'family_name',
            'department',
            'office');
    }

    static viewDetailOneEmployeeByAdmin(email) {
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

    static getAllEmployeeDepartmentByEmployee(department) {
        return User.query().select(
            'email',
            'name',
            'family_name')
            .where("department", '=', department)
    }

    static workingHourByEmployee(email) {
        return User.query().select("working_hour").where('email', '=', email);
    }
}

module.exports = SeeDetail;
