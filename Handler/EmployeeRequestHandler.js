const Employee = require('../Domain/Employee');
const {Admin} = require("../Domain/Admin");

// const EmployeeDataTransfer = require('../DTO/EmployeeDataTransfer');

class EmployeeRequestHandler {
    static async login(email, password) {
        // if (!(email && password))
        //     throw "please fill all the information";
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

    static async getAllEmployees(requestEmail) {
        const employee = await Employee.getEmployeeByEmail(requestEmail);
        return employee.getAllEmployees();
    }

    static async getUserByID(userIdentifier) {
        try {
            return await Employee.getEmployeeByIdentifier(userIdentifier)
        } catch (err) {
            return null;
        }
    }

    static async getEmployeeWorkingHour(requestEmail, email) {
        try {
            const employee = await Employee.getEmployeeByEmail(requestEmail);
            return await employee.seeWorkingHour(email);
        } catch (err) {
            throw err
        }
    }

    static async getAllEmployeesInADepartment(requestEmail, department) {
        try {
            const employee = await Employee.getEmployeeByEmail(requestEmail);
            return await employee.getAllEmployeesOfDepartment(department)
        } catch (err) {
            throw err
        }
    }

    static async getAllEmployeesInAnOffice(requestEmail, office) {
        try {
            const employee = await Employee.getEmployeeByEmail(requestEmail);
            return await employee.getAllEmployeesOfOffice(office);
        } catch (err) {
            throw err;
        }
    }

    /*static async getAllEmployeesInADepartment(requestEmail, department) {
        // if (!(department))
        //     throw ("please fill all the information");
        try {
            //todo
            return await EmployeeDataTransfer.getAllEmployeesInDepartment();
            // const employee = await Employee.getEmployeeByEmail(requestEmail);
            // return await employee.getAllEmployeesOfDepartment(department)
        } catch (err) {
            throw err
        }
    }

    static async getAllEmployeesInAnOffice(requestEmail, office) {
        // if (!office)
        //     throw ("please fill all the information");
        try {
            //todo
            return await EmployeeDataTransfer.getAllEmployeesInOffice();
            // const employee = await Employee.getEmployeeByEmail(requestEmail);
            // return await employee.getAllEmployeesOfOffice(office);
        } catch (err) {
            throw err;
        }
    }

    static async getEmployeeWorkingHour(requestEmail, email) {
        // if (!(email))
        //     throw ("please fill all the information");
        try {
            //todo
            return await EmployeeDataTransfer.getWorkingHour();
            // const employee = await Employee.getEmployeeByEmail(requestEmail);
            // return await employee.seeWorkingHour(email);
        } catch (err) {
            throw err
        }
    }*/

}

module.exports = EmployeeRequestHandler;