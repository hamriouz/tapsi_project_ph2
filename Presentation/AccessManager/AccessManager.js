const DataBaseManager = require('../../DataAccess/DataAccess')
const ApiGroups = require('./ApiGroups');


class AccessManager {
    static validateAccess(req, res, next) {
        const {role: tokenRole} = req;
        if (ApiGroups[tokenRole] && ApiGroups[tokenRole].routes.some(route => req.route === route)) {
            next();
        }
        res.status(403).send("Access denied! Please login!");
    }

    static validateChangedDetail(req, res, next) {
        const email = req.userEmail;
        const tokenRole = req.userRole;
        const user = DataBaseManager.getUserByEmail(email)
        const userRole = DataBaseManager.getRole(email)
        const userStatus = DataBaseManager.getStatus(email)

        if (user) {
            if (userRole !== tokenRole)
                throw "Your role was changed! Logout and login again"
            if (userStatus === "disable")
                throw "Your account was disabled! You don't have the permission to take this action!";
        }
        next();
    }
}

module.exports = AccessManager;