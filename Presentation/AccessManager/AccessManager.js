const UserDataAccess = require('../../DataAccess/UserDataAccess')
const ApiGroups = require('./ApiGroups');

let userDataAccess = new UserDataAccess();

class AccessManager {
    validateAccess(req, res, next) {
        const {role: tokenRole} = req;
        if (ApiGroups[tokenRole] && ApiGroups[tokenRole].routes.some(route => req.route === route)) {
            next();
        }
        res.status(403).send("Access denied! Please login!");
    }

    async  isEnable(req, res, next) {
        const email = req.userEmail;
        const tokenRole = req.userRole;
        const user = await userDataAccess.getUserByEmail(email)
        const userRole = await userDataAccess.getRole(email)
        const userStatus = await userDataAccess.getStatus(email)

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