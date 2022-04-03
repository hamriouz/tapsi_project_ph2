const UserDomain = require("../Domain/User")

class User {
    static async login(email, password) {
        let userDomain = new UserDomain(email);
        await userDomain.login(password);
    }
}

module.exports = User;


/*valid input:
#sign up employee ->
{
	"name": "hg",
	"family_name": "sds",
	"email": "huuuj@s.com",
	"password": "jjj111iiiiii11",
	"phone_number": 987665,
	"department": "jjjj",
	"organization_level": "as",
	"office": "jjjjjjjj",
	"working_hours": "9-10",
	"role": "employee",
	"status": "bhjbhjb"
}
 */

