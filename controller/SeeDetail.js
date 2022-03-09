const DataBaseManager = require("../db/db-manager/DataBaseManager")

class SeeDetail {
    static viewListEmployeeByAdmin() {
        return DataBaseManager.listEmployeeAdmin()
    }

    static viewDetailOneEmployeeByAdmin(email) {
        return DataBaseManager.detailEmployeeAdmin(email)
    }

    static getAllEmployeeDepartmentByEmployee(department) {
        return DataBaseManager.allEmployeeDepartment(department)
    }

    static workingHourByEmployee(email) {
        return DataBaseManager.workingHour(email)
    }
}

module.exports = SeeDetail;
