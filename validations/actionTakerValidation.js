const DataBaseManager = require('../db/db-manager/DataBaseManager')

class ActionTakerValidation {
    // TODO change the functions where they were used
    static validateAdmin(email, tokenRole) {
        const user = DataBaseManager.getUserByEmail(email)
        const userRole = DataBaseManager.getRole(email)
        const userStatus = DataBaseManager.getStatus(email)

        if (user) {
            if (userRole !== tokenRole)
                throw "Your role was changed! Logout and login again"
            if (userRole !== "admin")
                throw "Only a logged in admin can do this action!"
            if (userStatus === "disable")
                throw "Your account was disabled! You don't have the permission to take this action!";
        } else throw "Only a logged in admin can do this action!"
    }

    static validateEmployee(email, tokenRole) {
        const user = DataBaseManager.getUserByEmail(email)
        const userRole = DataBaseManager.getRole(email)
        const userStatus = DataBaseManager.getStatus(email)

        if (user) {
            if (userRole !== tokenRole)
                throw "Your role was changed! Logout and login again"
            if (userRole !== "employee")
                throw "Only a logged in employee can do this action!"
            if (userStatus === "disable")
                throw "Your account was disabled! You don't have the permission to take this action!";
        } else throw "Only a logged in employee can do this action!"
    }
}

module.exports = ActionTakerValidation;