const UserDataAccess = require("../DataAccess/UserDataAccess");
const Employee = require('./Employee');
const bcrypt = require("bcryptjs");

const userDataAccess = new UserDataAccess();

class Admin extends Employee {
    constructor() {
        super();
    }

    static async getAdminByEmail(email) {
        const admin = await userDataAccess.getUserByEmail(email);
        if (!admin)
            throw "Only a logged in admin can do this action!"

        return new Admin(admin[0], userDataAccess.getPassword(email));
    }

    static async login(email, password) {
        const admin = await this.getAdminByEmail(email);
        if (bcrypt.compare(password, userDataAccess.getPassword(email))) {
            if (await userDataAccess.getStatus(email) !== "enable")
                throw "Your account was disabled! You don't have the permission to log in!"
        } else
            throw "Invalid Credentials!"
    }

    static async createAdmin(adminDetail) {
        let admin = await userDataAccess.getAdmin();
        if (admin)
            throw "Admin has already been created";

        let {password} = adminDetail;

        if (!isPasswordValid(password))
            throw "Your password should be at least 10 characters including alphabetic and numeric.";

        let encryptedPassword = bcrypt.hash(password, 10);

        new Admin(adminDetail, encryptedPassword);
        // new Admin(name, familyName, email, encryptedPassword, phoneNumber, department, organizationLevel, office, workingHour);
        await userDataAccess.addAdmin(adminDetail, encryptedPassword);
        // await userDataAccess.addAdmin(email, encryptedPassword, phoneNumber, name, familyName, department, organizationLevel, office, workingHour);
    }

    async registerEmployee(employeeDetail) {
        let employee = await Employee.getEmployeeByEmail(employeeDetail.email);
        if (!employee)
            throw "Repetitive email address!"

        if (!isPasswordValid(employeeDetail.password))
            throw "Your password should be at least 10 characters including alphabetic and numeric.";

        let encryptedPassword = bcrypt.hash(employeeDetail.password, 10);
        new Employee(employeeDetail, encryptedPassword);
        await userDataAccess.addEmployee(employeeDetail, encryptedPassword);
    }

    async enableDisableEmployee(email) {
        let enOrDis;
        let employeeStatus = await userDataAccess.getStatus(email);
        if (employeeStatus === "enable") {
            await userDataAccess.disable(email)
            enOrDis = "disabled";
        } else {
            await userDataAccess.enable(email)
            enOrDis = "enabled";
        }
        return enOrDis;
    }

    async editEmployee(employeeNewData) {
        let {name, familyName, email, department, organizationLevel, office, workingHour, role, status} = employeeNewData;
        let employee = Employee.getEmployeeByEmail(email);
        if (name) {
            await userDataAccess.changeName(name, email);
            employee.name = name;
        }
        if (familyName) {
            await userDataAccess.changeFamilyName(familyName, email);
            employee.familyName = familyName;
        }
        if (department) {
            await userDataAccess.changeDepartment(department, email);
            employee.department = department;
        }
        if (organizationLevel) {
            await userDataAccess.changeOrganizationLevel(organizationLevel, email);
            employee.organizationLevel = organizationLevel;
        }
        if (office) {
            await userDataAccess.changeOffice(office, email);
            employee.office = office;
        }
        if (workingHour) {
            await userDataAccess.workingHour(workingHour, email);
            employee.workingHour = workingHour;
        }
        if (role) {
            await userDataAccess.changeRole(role, email);
            employee.role = role;
        }
        if (status) {
            await userDataAccess.changeStatus(role, email);
            employee.role = role;
        }
    }

    /*
  async viewListOfEmployee() {
      const list = await userDataAccess.listEmployeeAdmin();
      return list;
  }

  async viewDetailOfOneEmployee(email) {
      const detailOfEmployee = await userDataAccess.detailEmployeeAdmin(email);
      return detailOfEmployee;
  }
*/
}

function isPasswordValid(givenPassword) {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{10,}$/;
    return passwordRegex.test(givenPassword);
}

module.exports = {Admin};

// static async createAdmin(name, familyName, email, password, phoneNumber, department, organizationLevel, office, workingHour) {
// async registerEmployee(name, familyName, email, password, phoneNumber, department, organizationLevel, office, workingHour, role, status) {
// async editEmployee(name, familyName, email, department, organizationLevel, office, workingHour, role, status) {
