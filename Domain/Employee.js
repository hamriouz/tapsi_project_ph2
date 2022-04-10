const UserDataAccess = require('../DataAccess/UserDataAccess');
const bcrypt = require("bcryptjs");

// let UserDataAccess = new UserDataBase();

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
        const employee = await UserDataAccess.getUserByEmail(email);
        if (!employee)
            throw "Only a logged in employee can do this action!";
        return new Employee(employee, UserDataAccess.getPassword(email));
    }

    static async getEmployeeByIdentifier(identifier){
        const employee = await UserDataAccess.getUserByIdentifier(identifier);
        if (employee)
            return new Employee(employee[0], employee[0].password);
        else return null;
    }

    static login(email, password) {
        const employee = this.getEmployeeByEmail(email);
        if (bcrypt.compare(password, employee.password)) {
            if (employee.status !== "enable")
                throw "Your account was disabled! You don't have the permission to log in!";
        } else
            throw "Invalid Credentials!";
    }

    async editEmployee(name, familyName, workingHour) {
        if (name) {
            await UserDataAccess.updateName(name, this.email);
            this.name = name;
        }
        if (familyName) {
            await UserDataAccess.updateFamilyName(familyName, this.email);
            this.familyName = familyName;
        }
        if (workingHour) {
            await UserDataAccess.updateWorkingHour(workingHour, this.email);
            this.workingHour = workingHour;
        }
    }

    async getAllEmployees(){
        return UserDataAccess.getAllUsers();
    }

    async seeWorkingHour(email) {
        return await UserDataAccess.workingHour(email);
    }

    async getAllEmployeesOfDepartment(department) {
        return await UserDataAccess.allEmployeeDepartment(department);
    }

    async getAllEmployeesOfOffice(office){
        return await UserDataAccess.allEmployeeOffice(office);
    }

    /*
    static async viewListOfEmployee() {
        const list = await UserDataAccess.listEmployeeAdmin();
        return list;
    }

    async getAllEmployeesOfDepartment(department) {
        const allInDepartment = await UserDataAccess.allEmployeeDepartment(department);
        return allInDepartment;
    }

    async getAllEmployeesOfOffice(office){
        const allInOffice = await UserDataAccess.allEmployeeOffice(office);
        return allInOffice;
    }

    async seeWorkingHour(email) {
        const workingHour = await UserDataAccess.workingHour(email);
        return workingHour;
    }
    */
}

module.exports = Employee;






// constructor(name, familyName, email, encryptedPassword, phoneNumber, department, organizationLevel, office, workingHour) {
