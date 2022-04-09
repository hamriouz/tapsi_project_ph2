const {Admin} = require('../Domain/Admin');

class AdminRequestHandler{
    static async createAdmin(adminDetail) {
/*        let {
            name,
            familyName,
            email,
            password,
            phoneNumber,
            department,
            organizationLevel,
            office,
            workingHour
        } = adminDetail;
        if (!(name && familyName && email && password && phoneNumber && department && organizationLevel && office && workingHour))
            throw ("please fill all the information");
            */
        try {
            await Admin.createAdmin(adminDetail);
        } catch (err) {
            throw err
        }
    }

    static async registerEmployee(requestEmail, employeeDetail) {
    /*    let {
            name,
            familyName,
            email,
            password,
            phoneNumber,
            department,
            organizationLevel,
            office,
            workingHour,
            role,
            status
        } = employeeDetail;
        if (!(name && familyName && email && password && phoneNumber && department && organizationLevel && office && workingHour && role && status))
             throw "please fill all the information";*/
        try {
            const admin = await Admin.getAdminByEmail(requestEmail);
            await admin.registerEmployee(employeeDetail);
        } catch (err) {
            throw err
        }
    }

    static async login(email, password) {
        // if (!(email && password))
        //     throw "please fill all the information";
        try {
            Admin.login(email, password)
        } catch (err) {
            throw err;
        }
    }

    static async getAllEmployees(requestEmail){
        const admin = await Admin.getAdminByEmail(requestEmail);
        return await admin.getAllEmployees();
    }

    static async changeEmployeeStatus(requestEmail, email) {
        // if (!(email))
        //     throw ("please fill all the information");
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

    /*static async getListOfEmployee(requestEmail) {
        try {
            //todo
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
              //todo
              return await AdminDataTransfer.getEmployeeDetail();
              // const admin = await Admin.getAdminByEmail(requestEmail);
              // return await admin.viewDetailOfOneEmployee(email)
          } catch (err) {
              throw err
          }
      }*/
}


//handler calls domain ->
//domain returns data to presentation ->
//presentation calls the DTO and filters the data

module.exports = AdminRequestHandler;