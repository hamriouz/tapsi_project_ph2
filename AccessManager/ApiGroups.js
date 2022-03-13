const AdminAccesses = {
    routes: [
        '/RoomManagement/SignUpAdmin/Admin',
        '/RoomManagement/SignUpEmployee/Admin',
        '/RoomManagement/Login/Admin',
        '/RoomManagement/ViewListOfEmployees/Admin',
        '/RoomManagement/EnableDisableEmployee/Admin',
        '/RoomManagement/ViewEmployee/Admin',
        '/RoomManagement/EditEmployee/Admin'],
}

const EmployeeAccesses = {
    routes: [
        '/RoomManagement/Login/Employee',
        '/RoomManagement/EditEmployee/Employee',
        '/RoomManagement/SeeAllEmployeeDepartment/Employee',
        '/RoomManagement/SeeWorkingHour/Employee'],
}

module.exports = {
    admin: AdminAccesses,
    employee: EmployeeAccesses,
}
