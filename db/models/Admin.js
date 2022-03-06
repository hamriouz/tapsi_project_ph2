const { Model } = require('objection');

class Admin extends Model {
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
                hashed_password: {type: 'string'},
                phone_number: {type: 'string'},
                name: {type: 'string'},
                family_name: {type: 'string'},
                department: {type: 'string'},
                organization_level: {type: 'string'},
                office: {type: 'string'},
                working_hour: {type: 'string'},
                status: {type: 'string'},
            }
        }
    }

}

module.exports = Admin;
