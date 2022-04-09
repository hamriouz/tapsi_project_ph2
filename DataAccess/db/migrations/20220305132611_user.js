exports.up = function(knex) {
    return knex.schema
        .createTable("user", (table) => {
            table.increments('id');
            table.string("role");
            table.string("email").notNullable().unique();
            table.string("password").notNullable();
            table.string("phone_number");
            table.string("name");
            table.string("family_name");
            table.string("department");
            table.string("organization_level");
            table.string("office");
            table.string("working_hour");
            table.string("status");

            table.timestamps(true, true);
        })
};


exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists("user")
};
