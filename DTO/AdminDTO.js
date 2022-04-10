class AdminDTO {
    static getEmployeeDetail(wantedEmployee) {
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

    static getEmployeesDetail(allEmployees) {
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


module.exports = AdminDTO;