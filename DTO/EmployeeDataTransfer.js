class EmployeeDataTransfer {
    static async getAllEmployeesInDepartment(allEmployees, department) {
        let employeesInDepartment = allEmployees.filter(employee => employee.department === department)
        let filteredDetailOfEmployeeInDepartment = [];
        employeesInDepartment.forEach(employee =>
            filteredDetailOfEmployeeInDepartment.push(
                {
                    'email': employee.email,
                    'name': employee.name,
                    'family_name': employee.familyName
                }
            )
        )
        return filteredDetailOfEmployeeInDepartment;
    }

    static async getAllEmployeesInOffice(allEmployees, office) {
        let employeesInOffice = allEmployees.filter(employee => employee.office === office)
        let filteredDetailOfEmployeeInOffice = [];
        employeesInOffice.forEach(employee =>
            filteredDetailOfEmployeeInOffice.push(
                {
                    'email': employee.email,
                    'name': employee.name,
                    'family_name': employee.familyName
                }
            )
        )
        return filteredDetailOfEmployeeInOffice;
    }

    static async getWorkingHour(email, allEmployees) {
        let wantedEmployee = allEmployees.filter(employee => employee.email === email)[0];
        return wantedEmployee.workingHour;
    }
}

module.exports = EmployeeDataTransfer;