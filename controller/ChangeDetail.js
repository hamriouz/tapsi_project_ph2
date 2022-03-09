const DataBaseManager = require("../db/db-manager/DataBaseManager")

class ChangeDetail {

    static async changeDetailByEmployee(email, name, familyName, workingHour) {
        if (name)
            await DataBaseManager.changeName(name, email)
        if (familyName)
            await DataBaseManager.changeFamilyName(familyName, email)
        if (workingHour)
            await DataBaseManager.changeWorkingHour(workingHour, email)
    }

    static async changeDetailByAdmin(name, familyName, email, department, organizationLevel, office, workingHour, role, status) {
        if (name)
            await DataBaseManager.changeName(name, email)
        if (familyName)
            await DataBaseManager.changeFamilyName(familyName, email)
        if (department)
            await DataBaseManager.changeDepartment(department, email)
        if (organizationLevel)
            await DataBaseManager.changeOrganizationLevel(organizationLevel, email)
        if (office)
            await DataBaseManager.changeOffice(office, email)
        if (workingHour)
            await DataBaseManager.changeWorkingHour(workingHour, email)
        if (role)
            await DataBaseManager.changeRole(role, email)
        if (status)
            await DataBaseManager.changeStatus(status, email)
    }

    static async changeStateByAdmin(emailAddress) {
        let enOrDis;
        let employeeStatus = DataBaseManager.getStatus(emailAddress)
        if (employeeStatus === "enable") {
            await DataBaseManager.disable(emailAddress)
            enOrDis = "disabled";
        } else {
            await DataBaseManager.enable(emailAddress)
            enOrDis = "enabled";
        }
        return enOrDis;
    }

}

module.exports = ChangeDetail;
