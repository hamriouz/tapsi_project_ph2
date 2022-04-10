class EmployeeDTO {
    static getAllEmployeesInDepartment(employeesInDepartment) {
        let departmentDetail = [];
        employeesInDepartment.forEach(employee => {
            departmentDetail.push(
                {
                    'email': employee.email,
                    'name': employee.name,
                    'family_name': employee.familyName
                }
            )
        })

        return departmentDetail;
    }

    static getAllEmployeesInOffice(employeesInOffice) {
        let officeDetail = [];
        employeesInOffice.forEach(employee => {
            officeDetail.push(
                {
                    'email': employee.email,
                    'name': employee.name,
                    'family_name': employee.familyName
                }
            )
        })

        return officeDetail;

    }
}

module.exports = EmployeeDTO;