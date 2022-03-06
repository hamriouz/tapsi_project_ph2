const User = require("../db/models/User");
const UserController = require("./User");

class ChangeDetail {
    static changeDetailByEmployee(employee, name, familyName, workingHour) {
        if (name)
            employee.name = name;
        if (familyName)
            employee.familyName = familyName;
        if (workingHour)
            employee.workingHour = workingHour;
        // User.query().select("working_hour").from("user").where("email"=name)
    }

    static changeDetailByAdmin(name, familyName, email, department, organizationLevel, office, workingHour, role, status) {
        let employee = UserController.findObjectByKey("email", email);
        if (employee !== null) {
            if (name)
                employee.name = name;
            if (familyName)
                employee.familyName = familyName;
            if (department)
                employee.department = department;
            if (organizationLevel)
                employee.organizationLevel = organizationLevel;
            if (office)
                employee.office = office;
            if (workingHour)
                employee.workingHour = workingHour;
            if (role)
                employee.role = role;
            if (status)
                employee.status = status;
        } else throw "Employee with the given Email Address doesn't exist!";
    }

    static changeStateByAdmin(emailAddress) {
        let enOrDis;
        // TODO
        let employee = UserController.findObjectByKey("email", emailAddress);
        if (employee !== null) {
            if (employee.status === "enable") {
                enOrDis = "disabled";
                employee.status = "disable"
            } else {
                enOrDis = "enabled";
                employee.status = "enable";
            }
            return enOrDis;
        } else throw "employee with the given email address doesn't exist!"
    }
}

module.exports = ChangeDetail;