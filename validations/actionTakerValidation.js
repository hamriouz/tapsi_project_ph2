const DataBaseManager = require('../db/db-manager/DataBaseManager')
const ApiGroups = require('./ApiGroups');


class AccessManager {
    // TODO
    static validateAccess(req, res, next) {
        const {role} = req;
        if (ApiGroups[role] && ApiGroups[role].routes.some(route => req.route === route)) {
            next();
        }
        res.status(403).send({});
    }

    /*    static validateAdmin(email, tokenRole) {
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
        }*/


    static validateAdmin(req, res, next) {
        const email = req.userEmail;
        const tokenRole = req.userRole;
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
        //TODO NEXT!
    }

    /*    static validateEmployee(email, tokenRole) {
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
        }*/
    static validateEmployee(req, res, next) {
        const email = req.userEmail;
        const role = req.role
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

module.exports = AccessManager;