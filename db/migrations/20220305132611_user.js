exports.up = function(knex) {
    return knex.schema
        .createTable("user", (table) => {
            table.increments('id');
            table.string("role");
            table.string("email").notNullable().unique();
            table.string("password").notNullable();
            table.string("phoneNumber");
            table.string("name");
            table.string("familyName");
            table.string("department");
            table.string("organizationLevel");
            table.string("office");
            table.string("workingHour");
            table.string("status");

            table.timestamps(true, true);
        })
};


exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists("user")
};
