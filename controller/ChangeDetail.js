const User = require("../db/models/User");

class ChangeDetail {

    static async changeDetailByEmployee(email, name, familyName, workingHour) {
        if (name) {
            await User.query()
                .where("email", '=', email)
                .patch({
                    name: name
                });
        }
        if (familyName) {
            await User.query()
                .where("email", '=', email)
                .patch({
                    family_name: familyName
                });
        }
        if (workingHour) {
            await User.query()
                .where("email", '=', email)
                .patch({
                    working_hour: workingHour
                });
        }
    }

    static async changeDetailByAdmin(name, familyName, email, department, organizationLevel, office, workingHour, role, status) {
        // let employee = UserController.findObjectByKey("email", email);
        // if (employee !== null) {
        if (name)
            await User.query()
                .where("email", '=', email)
                .patch({
                    name: name
                });
        if (familyName)
            await User.query()
                .where("email", '=', email)
                .patch({
                    family_name: familyName
                });
        if (department)
            await User.query()
                .where("email", '=', email)
                .patch({
                    department: department
                });
        if (organizationLevel)
            await User.query()
                .where("email", '=', email)
                .patch({
                    organization_level: organizationLevel
                });
        if (office)
            await User.query()
                .where("email", '=', email)
                .patch({
                    office: office
                });
        if (workingHour) {
            await User.query()
                .where("email", '=', email)
                .patch({
                    working_hour: workingHour
                });
        }
        if (role)
            await User.query()
                .where("email", '=', email)
                .patch({
                    role: role
                });
        if (status)
            await User.query()
                .where("email", '=', email)
                .patch({
                    status: status
                });
        // } else throw "Employee with the given Email Address doesn't exist!";
    }

    static async changeStateByAdmin(emailAddress) {
        let enOrDis;
        let employeeStatus = await User.query().select('status').where('email','=',emailAddress)
        // TODO test status
        if (employeeStatus['status'] === "enable") {
            await User.query()
                .where("email", '=', emailAddress)
                .patch({
                    status: 'disable'
                });
            enOrDis = "disabled";
        } else {
            enOrDis = "enabled";
            await User.query()
                .where("email", '=', emailAddress)
                .patch({
                    status: 'enable'
                });
        }
        return enOrDis;
    }
}

module.exports = ChangeDetail;


/*async function tester(){
   await ChangeDetail.changeDetailByEmployee("admin@email.com",undefined,"salam",undefined);
   return SeeDetail.viewDetailOneEmployeeByAdmin("admin@email.com");

}

tester().then(r => {
    console.log(r);
})*/
