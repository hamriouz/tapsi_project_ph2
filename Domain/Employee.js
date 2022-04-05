const DataBaseManager = require('../DataAccess/UserDataAccess');
const bcrypt = require("bcryptjs");
const e = require("express");

class Employee {
    // constructor(name, familyName, email, encryptedPassword, phoneNumber, department, organizationLevel, office, workingHour) {
    constructor(userData) {
        const {name, familyName, email, encryptedPassword, phoneNumber, department, organizationLevel, office, workingHour} = userData
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
        const employee = await DataBaseManager.getUserByEmail(email);
        if (!employee)
            throw "Only a logged in employee can do this action!"
        return new Employee(employee[0]);
    }

    static async getEmployeeByIdentifier(identifier){
        const employee = await DataBaseManager.getUserByIdentifier(identifier);
        if (employee)
            return new Employee(employee[0])
        else return null;
    }

    static login(email, password) {
        const employee = this.getEmployeeByEmail(email);
        if (bcrypt.compare(password, employee[0].password)) {
            if (employee[0].status !== "enable")
                throw "Your account was disabled! You don't have the permission to log in!"
        } else
            throw "Invalid Credentials!"
    }

    async editEmployee(name, familyName, workingHour) {
        if (name) {
            await DataBaseManager.changeName(name, this.email);
            this.name = name;
        }
        if (familyName) {
            await DataBaseManager.changeFamilyName(familyName, this.email);
            this.familyName = familyName;
        }
        if (workingHour) {
            await DataBaseManager.changeWorkingHour(workingHour, this.email);
            this.workingHour = workingHour;
        }
    }

    async getAllEmployeesOfDepartment(department) {
        const allInDepartment = await DataBaseManager.allEmployeeDepartment(department);
        return allInDepartment;
    }

    async getAllEmployeesOfOffice(office){
        const allInOffice = await DataBaseManager.allEmployeeOffice(office);
        return allInOffice;
    }

    async seeWorkingHour(email) {
        const workingHour = await DataBaseManager.workingHour(email);
        return workingHour;
    }
}

module.exports = Employee