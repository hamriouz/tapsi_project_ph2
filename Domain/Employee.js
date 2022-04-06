const UserDataBase = require('../DataAccess/UserDataAccess');
const bcrypt = require("bcryptjs");
const e = require("express");

let userDataAccess = new UserDataBase();

class Employee {
    constructor(userData, encryptedPassword) {
        const {name, familyName, email, phoneNumber, department, organizationLevel, office, workingHour} = userData
        this.name = name;
        this.familyName = familyName;
        this.email = email;
        this.password = encryptedPassword;
        this.phoneNumber = phoneNumber;
        this.department = department;
        this.organizationLevel = organizationLevel;
        this.office = office;
        this.workingHour = workingHour;
    }

    static async getEmployeeByEmail(email) {
        const employee = await userDataAccess.getUserByEmail(email);
        if (!employee)
            throw "Only a logged in employee can do this action!"
        return new Employee(employee[0], userDataAccess.getPassword(email));
    }

    static async getEmployeeByIdentifier(identifier){
        const employee = await userDataAccess.getUserByIdentifier(identifier);
        if (employee)
            return new Employee(employee[0], employee[0].password)
        else return null;
    }

    static login(email, password) {
        const employee = this.getEmployeeByEmail(email);
        if (bcrypt.compare(password, employee.password)) {
            if (employee.status !== "enable")
                throw "Your account was disabled! You don't have the permission to log in!"
        } else
            throw "Invalid Credentials!"
    }

    async editEmployee(name, familyName, workingHour) {
        if (name) {
            await userDataAccess.changeName(name, this.email);
            this.name = name;
        }
        if (familyName) {
            await userDataAccess.changeFamilyName(familyName, this.email);
            this.familyName = familyName;
        }
        if (workingHour) {
            await userDataAccess.changeWorkingHour(workingHour, this.email);
            this.workingHour = workingHour;
        }
    }

    async getAllEmployeesOfDepartment(department) {
        const allInDepartment = await userDataAccess.allEmployeeDepartment(department);
        return allInDepartment;
    }

    async getAllEmployeesOfOffice(office){
        const allInOffice = await userDataAccess.allEmployeeOffice(office);
        return allInOffice;
    }

    async seeWorkingHour(email) {
        const workingHour = await userDataAccess.workingHour(email);
        return workingHour;
    }
}

module.exports = Employee






// constructor(name, familyName, email, encryptedPassword, phoneNumber, department, organizationLevel, office, workingHour) {
