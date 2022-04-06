const Employee = require('../Domain/Employee');

class EmployeeRequestHandler{
    static async login(email, password) {
        if (!(email && password))
            throw "please fill all the information";
        try {
            Employee.login(email, password);
        } catch (err) {
            throw err;
        }
    }

    static async editEmployee(requestEmail, name, familyName, workingHour) {
        try {
            const employee = await Employee.getEmployeeByEmail(requestEmail);
            await employee.editEmployee(name, familyName, workingHour);
        } catch (err) {
            throw err
        }
    }

    static async getAllEmployeesInADepartment(requestEmail, department) {
        if (!(department))
            throw ("please fill all the information");
        try {
            const employee = await Employee.getEmployeeByEmail(requestEmail);
            return await employee.getAllEmployeesOfDepartment(department)
        } catch (err) {
            throw err
        }
    }

    static async getAllEmployeesInAnOffice(requestEmail, office) {
        if (!office)
            throw ("please fill all the information");
        try {
            const employee = await Employee.getEmployeeByEmail(requestEmail);
            return await employee.getAllEmployeesOfOffice(office);
        } catch (err) {
            throw err;
        }
    }

    static async getWorkingHourOfEmployee(requestEmail, email) {
        if (!(email))
            throw ("please fill all the information");
        try {
            const employee = await Employee.getEmployeeByEmail(requestEmail);
            return await employee.seeWorkingHour(email);
        } catch (err) {
            throw err
        }
    }

    static async getUserByID(userIdentifier) {
        try {
            return await Employee.getEmployeeByIdentifier(userIdentifier)
        } catch (err) {
            return null;
        }
    }
}

module.exports = EmployeeRequestHandler;