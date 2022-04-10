const {Admin} = require('../Domain/Admin');

class AdminRequestHandler {
    static async createAdmin(adminDetail) {
        try {
            await Admin.createAdmin(adminDetail);
        } catch (err) {
            throw err
        }
    }

    static async registerEmployee(requestEmail, employeeDetail) {
        try {
            const admin = await Admin.getAdminByEmail(requestEmail);
            await admin.registerEmployee(employeeDetail);
        } catch (err) {
            throw err
        }
    }

    static async login(email, password) {
        try {
            await Admin.login(email, password)
        } catch (err) {
            throw err;
        }
    }

    static async getAllEmployees(requestEmail) {
        const admin = await Admin.getAdminByEmail(requestEmail);
        return admin.getAllEmployees();
    }

    static async changeEmployeeStatus(requestEmail, email) {
        try {
            const admin = await Admin.getAdminByEmail(requestEmail);
            return await admin.enableDisableEmployee(email)
        } catch (err) {
            throw err
        }
    }

    static async editEmployee(requestEmail, employeeNewData) {
        try {
            const admin = await Admin.getAdminByEmail(requestEmail);
            await admin.editEmployee(employeeNewData);
        } catch (err) {
            throw err
        }
    }

    static async getUserByID(userIdentifier) {
        try {
            return await Admin.getEmployeeByIdentifier(userIdentifier)
        } catch (err) {
            return null;
        }
    }

    static async getEmployeeByEmail(email) {
        try {
            return await Admin.getAdminByEmail(email)
        } catch (err) {
            throw err
        }
    }


    /*static async getListOfEmployee(requestEmail) {
        try {
            return await AdminDataTransfer.getEmployeesDetail();
            // const admin = await Admin.getAdminByEmail(requestEmail);
            // return await admin.viewListOfEmployee();
        } catch (err) {
            throw err
        }
    }
*/


    /*  static async getEmployeeDetail(requestEmail, email) {
          // if (!(email))
          //     throw ("please fill all the information");
          try {
              return await AdminDataTransfer.getEmployeeDetail();
              // const admin = await Admin.getAdminByEmail(requestEmail);
              // return await admin.viewDetailOfOneEmployee(email)
          } catch (err) {
              throw err
          }
      }
      */
}


//handler calls domain ->
//domain returns data to presentation ->
//presentation calls the DTO and filters the data

module.exports = AdminRequestHandler;