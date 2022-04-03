const DataBaseManager = require('../DataAccess/EmployeeDataAccess');
const bcrypt = require("bcryptjs");

class Employee{
    constructor(name, familyName, email, encryptedPassword, phoneNumber, department, organizationLevel, office, workingHour) {
    this.name = name;
    this.familyName = familyName;
    this.email = email;
    this.password = encryptedPassword;
    this.phoneNumber = phoneNumber;
    this.department = department;
    this.organizationLevel = organizationLevel;
    this.office = office;
    this.workingHour = workingHour;
    //todo add to db
    }

/*    async static createAdmin(name, familyName, email, password, phoneNumber, department, organizationLevel, office, workingHour){
        let admin = DataBaseManager.getAdmin();
        if (admin)
            throw "Admin has already been created";

        let encryptedPassword = bcrypt.hash(password, 10);

    }*/

     static async getEmployeeByEmail(email){
        const employee = await DataBaseManager.getUserByEmail(email);
        if (!employee)
            throw ""
        //todo
        return new Employee(employee[0].name, employee[0].familyName, email, employee[0].password, employee[0].department, employee[0].organizationLevel, employee[0].office, employee[0].workingHour);
    }

    static login(email, password){
        const employee = this.getEmployeeByEmail(email);
        if (bcrypt.compare(password, employee[0].password)){
            if (employee[0].status !== "enable")
                throw "Your account was disabled! You don't have the permission to log in!"
        } else
            throw "Invalid Credentials!"
    }

    async editEmployee(name, familyName, workingHour){
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

    getAllEmployeesOfDepartment(department){
        return DataBaseManager.allEmployeeDepartment(department);

    }

    seeWorkingHour(email){
        return DataBaseManager.workingHour(email);
    }
}


function checkPassword(givenPassword){
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{10,}$/;
    return passwordRegex.test(givenPassword);
}

module.exports = Employee