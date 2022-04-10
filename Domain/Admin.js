const UserDataAccess = require("../DataAccess/UserDataAccess");
const Employee = require('./Employee');
const bcrypt = require("bcryptjs");

// const UserDataAccess = new UserDataAccess();

class Admin extends Employee {
    constructor() {
        super();
    }

    static async getAdminByEmail(email) {
        const admin = await UserDataAccess.getUserByEmail(email);
        if (!admin)
            throw "Only a logged in admin can do this action!";

        return new Admin(admin, UserDataAccess.getPassword(email));
    }

    static async login(email, password) {
        const admin = await this.getAdminByEmail(email);
        if (bcrypt.compare(password, admin.password)) {
            if (await UserDataAccess.getStatus(email) !== "enable")
                throw "Your account was disabled! You don't have the permission to log in!";
        } else
            throw "Invalid Credentials!";
    }

    static async createAdmin(adminDetail) {
        let admin = await UserDataAccess.getAdmin();
        if (admin)
            throw "Admin has already been created";

        let {password} = adminDetail;

        if (!isPasswordValid(password))
            throw "Your password should be at least 10 characters including alphabetic and numeric.";

        let encryptedPassword = bcrypt.hash(password, 10);

        new Admin(adminDetail, encryptedPassword);
        await UserDataAccess.addUser(adminDetail, encryptedPassword, 'admin')
    }

    async registerEmployee(employeeDetail) {
        let employee = await Employee.getEmployeeByEmail(employeeDetail.email);
        if (!employee)
            throw "Repetitive email address!";

        if (!isPasswordValid(employeeDetail.password))
            throw "Your password should be at least 10 characters including alphabetic and numeric.";

        let encryptedPassword = bcrypt.hash(employeeDetail.password, 10);
        new Employee(employeeDetail, encryptedPassword);
        await UserDataAccess.addUser(employeeDetail, encryptedPassword, employeeDetail.role);
    }

    async enableDisableEmployee(email) {
        let enOrDis;
        let employeeStatus = await UserDataAccess.getStatus(email);
        if (employeeStatus === "enable") {
            await UserDataAccess.disable(email)
            enOrDis = "disabled";
        } else {
            await UserDataAccess.enable(email)
            enOrDis = "enabled";
        }
        return enOrDis;
    }

    async editEmployee(employeeNewData) {
        let {
            name,
            familyName,
            email,
            department,
            organizationLevel,
            office,
            workingHour,
            role,
            status
        } = employeeNewData;
        let employee = Employee.getEmployeeByEmail(email);
        if (name) {
            await UserDataAccess.updateName(name, email);
            employee.name = name;
        }
        if (familyName) {
            await UserDataAccess.updateFamilyName(familyName, email);
            employee.familyName = familyName;
        }
        if (department) {
            await UserDataAccess.updateDepartment(department, email);
            employee.department = department;
        }
        if (organizationLevel) {
            await UserDataAccess.updateOrganizationLevel(organizationLevel, email);
            employee.organizationLevel = organizationLevel;
        }
        if (office) {
            await UserDataAccess.updateOffice(office, email);
            employee.office = office;
        }
        if (workingHour) {
            await UserDataAccess.workingHour(workingHour, email);
            employee.workingHour = workingHour;
        }
        if (role) {
            await UserDataAccess.updateRole(role, email);
            employee.role = role;
        }
        if (status) {
            await UserDataAccess.updateStatus(role, email);
            employee.role = role;
        }
    }

    async viewDetailOfOneEmployee(email) {
        const detailOfEmployee = await UserDataAccess.detailEmployeeAdmin(email);
        return detailOfEmployee;
    }
    /*
  async viewListOfEmployee() {
      const list = await UserDataAccess.listEmployeeAdmin();
      return list;
  }

  async viewDetailOfOneEmployee(email) {
      const detailOfEmployee = await UserDataAccess.detailEmployeeAdmin(email);
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
