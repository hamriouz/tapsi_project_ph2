const DataBaseManager = require("../DataAccess/UserDataAccess");
const Employee = require('./Employee');
const bcrypt = require("bcryptjs");

class Admin extends Employee {
    constructor() {
        super();
    }

    static async getAdminByEmail(email) {
        const admin = DataBaseManager.getUserByEmail(email);
        if (!admin)
            throw "Only a logged in admin can do this action!"

        await DataBaseManager.addAdmin(admin[0].email, admin[0].password, admin[0].phoneNumber, admin[0].name, admin[0].familyName, admin[0].department, admin[0].organizationLevel, admin[0].office, admin[0].workingHour);
        return new Admin(admin[0].name, admin[0].familyName, email, admin[0].password, admin[0].department, admin[0].organizationLevel, admin[0].office, admin[0].workingHour);
    }

    static login(email, password) {
        const admin = this.getAdminByEmail(email);
        if (bcrypt.compare(password, admin[0].password)) {
            if (admin[0].status !== "enable")
                throw "Your account was disabled! You don't have the permission to log in!"
        } else
            throw "Invalid Credentials!"
    }

    static async createAdmin(name, familyName, email, password, phoneNumber, department, organizationLevel, office, workingHour) {
        let admin = DataBaseManager.getAdmin();
        if (admin)
            throw "Admin has already been created";

        if (!isPasswordValid(password))
            throw "Your password should be at least 10 characters including alphabetic and numeric.";

        let encryptedPassword = bcrypt.hash(password, 10);
        new Admin(name, familyName, email, encryptedPassword, phoneNumber, department, organizationLevel, office, workingHour);
        await DataBaseManager.addAdmin(email, encryptedPassword, phoneNumber, name, familyName, department, organizationLevel, office, workingHour);
    }

    async registerEmployee(name, familyName, email, password, phoneNumber, department, organizationLevel, office, workingHour, role, status) {
        let employee = await Employee.getEmployeeByEmail(email);
        if (!employee)
            throw "کارمندی با ایمیل وارد شده وجود دارد!"

        if (!isPasswordValid(password))
            throw "Your password should be at least 10 characters including alphabetic and numeric.";

        let encryptedPassword = bcrypt.hash(password, 10);
        //todo change the variables given to the constructor into json
        new Employee(name, familyName, email, encryptedPassword, phoneNumber, department, organizationLevel, office, workingHour, role, status);
        await DataBaseManager.addEmployee(role, email, encryptedPassword, phoneNumber, familyName, department, organizationLevel, office, workingHour, status);
    }

    async viewListOfEmployee() {
        const list = await DataBaseManager.listEmployeeAdmin();
        return list;
    }

    async viewDetailOfOneEmployee(email) {
        const detailOfEmployee = await DataBaseManager.detailEmployeeAdmin(email);
        return detailOfEmployee;
    }

    async enableDisableEmployee(email) {
        let enOrDis;
        let employeeStatus = DataBaseManager.getStatus(email);
        if (employeeStatus === "enable") {
            await DataBaseManager.disable(email)
            enOrDis = "disabled";
        } else {
            await DataBaseManager.enable(email)
            enOrDis = "enabled";
        }
        return enOrDis;
    }

    async editEmployee(name, familyName, email, department, organizationLevel, office, workingHour, role, status) {
        let employee = Employee.getEmployeeByEmail(email);
        if (name) {
            await DataBaseManager.changeName(name, email);
            employee.name = name;
        }
        if (familyName) {
            await DataBaseManager.changeFamilyName(familyName, email);
            employee.familyName = familyName;
        }
        if (department) {
            await DataBaseManager.changeDepartment(department, email);
            employee.department = department;
        }
        if (organizationLevel) {
            await DataBaseManager.changeOrganizationLevel(organizationLevel, email);
            employee.organizationLevel = organizationLevel;
        }
        if (office) {
            await DataBaseManager.changeOffice(office, email);
            employee.office = office;
        }
        if (workingHour) {
            await DataBaseManager.workingHour(workingHour, email);
            employee.workingHour = workingHour;
        }
        if (role) {
            await DataBaseManager.changeRole(role, email);
            employee.role = role;
        }
        if (status) {
            await DataBaseManager.changeRole(role, email);
            employee.role = role;
        }
    }

}

function isPasswordValid(givenPassword) {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{10,}$/;
    return passwordRegex.test(givenPassword);
}

module.exports = Admin;