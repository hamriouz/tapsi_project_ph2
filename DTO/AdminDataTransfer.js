const {employee} = require("../Presentation/AccessManager/ApiGroups");

class AdminDataTransfer {
    static async getEmployeeDetail(allEmployees, email) {
        let wantedEmployee = allEmployees.filter(employee => employee.email === email)[0];
        return {
            'name': wantedEmployee.name,
            'family name': wantedEmployee.familyName,
            'email': wantedEmployee.email,
            'phone number': wantedEmployee.phoneNumber,
            'department': wantedEmployee.department,
            'organization level': wantedEmployee.organizationLevel,
            'office': wantedEmployee.office,
            'working hour': wantedEmployee.workingHour,
            'role': wantedEmployee.role,
            'status': wantedEmployee.status
        };
    }

    static async getEmployeesDetail(allEmployees) {
        let filteredDetail = [];
        allEmployees.forEach(employee =>
            filteredDetail.push(
                {
                    'name': employee.name,
                    'family name': employee.familyName,
                    'department': employee.department,
                    'office': employee.office
                }
            )
        )
        return filteredDetail;
    }

}


module.exports = AdminDataTransfer;