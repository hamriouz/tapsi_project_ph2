const Employee = require('../Domain/Employee');
const Admin = require('../Domain/Admin');

class RequestHandler {
    async createAdmin(name, familyName, email, password, phoneNumber, department, organizationLevel, office, workingHour) {
        if (!(name && familyName && email && password && phoneNumber && department && organizationLevel && office && workingHour))
            throw ("please fill all the information");
        try {
            await Admin.createAdmin(name, familyName, email, password, phoneNumber, department, organizationLevel, office, workingHour);
        } catch (err) {
            throw err
        }
    }

    async registerEmployee(requestEmail, name, familyName, email, password, phoneNumber, department, organizationLevel, office, workingHour, role, status) {
        if (!(name && familyName && email && password && phoneNumber && department && organizationLevel && office && workingHour && role && status))
            throw "please fill all the information";
        try {
            const admin = await Admin.getAdminByEmail(requestEmail);
            await admin.registerEmployee(name, familyName, email, password, phoneNumber, department, organizationLevel, office, workingHour, role, status);
        } catch (err) {
            throw err
        }
    }

    async login(email, password) {
        if (!(email && password))
            throw "please fill all the information";
        try {
            const user = Employee.getEmployeeByEmail(email);
            if (user[0].status === "admin") {
                Admin.login(email, password)
            } else Employee.login(email, password);
        }
        catch (err){
            throw err;
        }
    }

    async getListOfEmployee(requestEmail) {
        try {
            const admin = await Admin.getAdminByEmail(requestEmail);
            return await admin.viewListOfEmployee();
        } catch (err) {
            throw err
        }
    }

    async enableDisableEmployee(requestEmail, email) {
        if (!(email))
            throw ("please fill all the information");
        try {
            const admin = await Admin.getAdminByEmail(requestEmail);
            return await admin.enableDisableEmployee(email)
        } catch (err) {
            throw err
        }
    }

    async getDetailOneEmployee(requestEmail, email) {
        if (!(email))
            throw ("please fill all the information");
        try {
            const admin = await Admin.getAdminByEmail(requestEmail);
            return await admin.viewDetailOfOneEmployee(email)
        } catch (err) {
            throw err
        }
    }

    async editEmployeeByAdmin(requestEmail, name, familyName, email, department, organizationLevel, office, workingHour, role, status) {
        try {
            const admin = await Admin.getAdminByEmail(requestEmail);
            await admin.editEmployee(name, familyName, email, department, organizationLevel, office, workingHour, role, status);
        } catch (err) {
            throw err
        }
    }

    async editEmployeeByEmployee(requestEmail, name, familyName, workingHour) {
        try {
            const employee = await Employee.getEmployeeByEmail(requestEmail);
            await employee.editEmployee(name, familyName, workingHour);
        } catch (err) {
            throw err
        }
    }

    async getAllEmployeesInADepartment(requestEmail, department) {
        if (!(department))
            throw ("please fill all the information");
        try {
            const employee = await Employee.getEmployeeByEmail(requestEmail);
            return await employee.getAllEmployeesOfDepartment(department)
        } catch (err) {
            throw err
        }
    }

    async getWorkingHourOfEmployee(requestEmail, email) {
        if (!(email))
            throw ("please fill all the information");
        try {
            const employee = await Employee.getEmployeeByEmail(requestEmail);
            return await employee.seeWorkingHour(email);
        } catch (err) {
            throw err
        }
    }

}


const RequestHandlerInstance = (function () {
    let instance;

    function createInstance() {
        return new RequestHandler();
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        },
    };
})();

module.exports = RequestHandlerInstance;