const jwt = require("jsonwebtoken");
const EmployeeRequestHandler = require("../Handler/EmployeeRequestHandler");


class GRPCRequests {
    async getUser(userIdentifier) {
        return await EmployeeRequestHandler.getUserByID(userIdentifier);
    }

     isWantedRole(token, role){
        let decodedToken;
        try {
            jwt.verify(token, process.env.TOKEN_KEY, {}, function (err, decoded) {
                decodedToken = decoded //token info is returned in 'decoded'
                if (decodedToken.role === role)
                    return true;
            })
        } catch (error) {
            return false;
        }
    }

    async getWorkingHour(userIdentifier) {
        let user = await this.getUser(userIdentifier);
        return user.workingHour;
    }

    canCancel(token) {
        let decoded_token;
        try {
            jwt.verify(token, process.env.TOKEN_KEY, {}, function (err, decoded) {
                decoded_token = decoded //token info is returned in 'decoded'
                if (decoded_token.role === "admin" || decoded_token.role === "employee")
                    return true;
            })
        } catch (error) {
            return false;
        }
    }

}


const RequestHandlerInstance = (function () {
    let instance;

    function createInstance() {
        return new GRPCRequests();
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