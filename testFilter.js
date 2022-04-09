let allUsers = [];
allUsers.push({
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
});
allUsers.push({
    id: 2,
    role: "Employee",
    email: "employee@email.com",
    password: "password2",
    phoneNumber: "09129876543",
    name: "name2",
    familyName: "family2",
    department: "dep2",
    organizationLevel: "org2",
    office: "offi2",
    startWorkingHour: 11,
    endWorkingHour: 19,
    status: "enable",
})

console.log(allUsers);
let wantedEmployee = allUsers.filter(employee => employee.email === "employee@email.com")[0];
console.log(wantedEmployee);
let detail = {'name': wantedEmployee.name}
console.log('----------------------------------------')
console.log(detail);





/*
class TestFilter {
    /!*    let allUsers = [{
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
    ]*!/

}*/
