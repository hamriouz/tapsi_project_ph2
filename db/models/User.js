const {Model} = require('objection');

class User extends Model {
    static get tableName() {
        return 'user';
    }

    static get joinSchema() {
        return {
            type: 'object',
            properties: {
                id: {type: 'integer'},
                role: {type: 'string'},
                email: {type: 'string'},
                password: {type: 'string'},
                phoneNumber: {type: 'string'},
                name: {type: 'string'},
                familyName: {type: 'string'},
                department: {type: 'string'},
                organizationLevel: {type: 'string'},
                office: {type: 'string'},
                workingHour: {type: 'string'},
                status: {type: 'string'},
            }
        }
    }
}

module.exports = User;
