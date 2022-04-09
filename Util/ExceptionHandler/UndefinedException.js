class UndefinedException {
    static allUserInfoException(adminDetail) {
        let {
            name,
            familyName,
            email,
            password,
            phoneNumber,
            department,
            organizationLevel,
            office,
            workingHour
        } = adminDetail;
        if (!(name && familyName && email && password && phoneNumber && department && organizationLevel && office && workingHour))
            throw ("please fill all the information");
    }

    static emailPasswordException(email, password) {
        if (!(email && password))
            throw ("please fill all the information");
    }

    static emailException(email) {
        if (!email)
            throw ("please fill all the information");
    }

    static departmentException(department) {
        if (!department)
            throw ("please fill all the information");
    }

    static officeException(office) {
        if (!office)
            throw ("please fill all the information");
    }

}

module.exports = UndefinedException;