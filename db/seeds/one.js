exports.seed = async function (knex) {
    await knex('user').insert([
        {
            id: 1,
            role: "Admin",
            email: "admin@email.com",
            password: "password",
            phoneNumber: "09123456789",
            name: "name",
            familyName: "family",
            department: "dep",
            organizationLevel: "org",
            office: "offi",
            startWorkingHour: 12,
            endWorkingHour: 18,
            status: "enable",
        },
    ]);
};
