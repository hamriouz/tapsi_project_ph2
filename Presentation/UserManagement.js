const {app} = require('../app');
const Exception = require("../Util/Exception");
const Token = require("./AccessManager/Token");
const AccessManager = require("./AccessManager/AccessManager");
const EmployeeRequestHandler = require('../Handler/EmployeeRequestHandler');
const AdminRequestHandler = require('../Handler/AdminRequestHandler');
const UndefinedException = require('../Util/UndefinedException');
const employeeDTO = require('../DTO/EmployeeDTO');
const adminDTO = require('../DTO/AdminDTO');


const accessManager = new AccessManager();


app.post('/room-management/admin/create-admin', async (req, res) => {
    let adminData = req.body;
    try {
        UndefinedException.allUserInfoException(adminData);
        await AdminRequestHandler.createAdmin(adminData);
        res.status(201).send("Admin was successfully created!");
    } catch (err) {
        res.status(Exception.getStatusByExceptionMessage(err)).send(err);
    }
})

app.post('/room-management/admin/sign-up-employee', Token.authenticateActor, accessManager.validateAccess, accessManager.isEnable, async (req, res) => {
    let employeeData = req.body;
    try {
        UndefinedException.allUserInfoException(employeeData);
        await AdminRequestHandler.registerEmployee(req.email, employeeData);
        res.status(201).send("Username with email address \"" + employeeData.email + "\" was successfully created!");
    } catch (err) {
        res.status(Exception.getStatusByExceptionMessage(err)).send(err);
    }
})

app.post('/room-management/admin/login', async (req, res) => {
    const {email, password} = req.body;
    try {
        UndefinedException.emailPasswordException(email, password);
        await AdminRequestHandler.login(email, password);
        res.header('Authorization', Token.createToken(email, "admin"));
        res.status(200).send("The admin successfully logged in!");
    } catch (err) {
        res.status(Exception.getStatusByExceptionMessage(err)).send(err);
    }
})

app.post('/room-management/employee/login', async (req, res) => {
    const {email, password} = req.body;
    try {
        UndefinedException.emailPasswordException(email, password);
        await EmployeeRequestHandler.login(email, password);
        res.header('Authorization', Token.createToken(email, "admin"));
        res.status(200).send("The admin successfully logged in!");
    } catch (err) {
        res.status(Exception.getStatusByExceptionMessage(err)).send(err);
    }
})

app.get('/room-management/admin/list-of-employees', Token.authenticateActor, accessManager.validateAccess, accessManager.isEnable, async (req, res) => {
    try {
        let allEmployees = await AdminRequestHandler.getAllEmployees(req.email);
        res.status(201).send(adminDTO.getEmployeesDetail(allEmployees));
    } catch (err) {
        res.status(Exception.getStatusByExceptionMessage(err)).send(err);
    }
})

app.put('/room-management/admin/change-status', Token.authenticateActor, accessManager.validateAccess, accessManager.isEnable, async (req, res) => {
    const {email} = req.body;
    try {
        UndefinedException.emailException(email);
        let enOrDis = await AdminRequestHandler.changeEmployeeStatus(email);
        res.status(200).send("employee with the email address " + email + " was successfully " + enOrDis);
    } catch (err) {
        res.status(Exception.getStatusByExceptionMessage(err)).send(err);
    }
})

app.get('/room-management/admin/view-employee', Token.authenticateActor, accessManager.validateAccess, accessManager.isEnable, async (req, res) => {
    const {email} = req.body;
    try {
        UndefinedException.emailException(email);
        let wantedEmployee = await AdminRequestHandler.getEmployeeByEmail(email);
        res.status(200).send(adminDTO.getEmployeeDetail(wantedEmployee));
    } catch (err) {
        res.status(Exception.getStatusByExceptionMessage(err)).send(err);
    }
})

app.put('/room-management/admin/edit-employee', Token.authenticateActor, accessManager.validateAccess, accessManager.isEnable, async (req, res) => {
    let employeeNewDetail = req.body;
    try {
        await AdminRequestHandler.editEmployee(req.email, employeeNewDetail);
        res.status(200).send("The user's detail(s) was successfully edited")
    } catch (err) {
        res.status(Exception.getStatusByExceptionMessage(err)).send(err);
    }
})

app.put('/room-management/employee/edit-employee', Token.authenticateActor, accessManager.validateAccess, accessManager.isEnable, async (req, res) => {
    const {name, familyName, workingHour} = req.body;
    try {
        await EmployeeRequestHandler.editEmployee(name, familyName, workingHour);
        res.status(200).send("The employee's detail(s) was changed successfully!")
    } catch (err) {
        res.status(Exception.getStatusByExceptionMessage(err)).send(err);
    }
})

app.post('/room-management/employee/all-employee-in-department', Token.authenticateActor, accessManager.validateAccess, accessManager.isEnable, async (req, res) => {
    const {department} = req.body;
    try {
        UndefinedException.departmentException(department);
        let employeesInDepartment = await EmployeeRequestHandler.getAllEmployeesInADepartment(req.email, department);
        res.status(200).send(employeeDTO.getAllEmployeesInDepartment(employeesInDepartment));
    } catch (err) {
        res.status(Exception.getStatusByExceptionMessage(err)).send(err);
    }
})

app.post('/room-management/employee/all-employee-in-office', Token.authenticateActor, accessManager.validateAccess, accessManager.isEnable, async (req, res) => {
    const {office} = req.body;
    try {
        UndefinedException.officeException(office);
        let employeesInOffice = await EmployeeRequestHandler.getAllEmployeesInAnOffice(req.email, office)
        // let allEmployees = await EmployeeRequestHandler.getAllEmployees(req.email);
        // let employeesInOffice = employeeDTO.getAllEmployeesInOffice(allEmployees, office)
        res.status(200).send(employeeDTO.getAllEmployeesInOffice(employeesInOffice));
    } catch (err) {
        res.status(Exception.getStatusByExceptionMessage(err)).send(err);
    }
})

app.post('/room-management/employee/employee-working-hour', Token.authenticateActor, accessManager.validateAccess, accessManager.isEnable, async (req, res) => {
    const {email} = req.body;
    try {
        UndefinedException.emailException(email);
        let workingHour = await EmployeeRequestHandler.getEmployeeWorkingHour(req.email, email)
        res.status(200).send(workingHour);
    } catch (err) {
        res.status(Exception.getStatusByExceptionMessage(err)).send(err);
    }
})




/* const token = req.header('Authorization')
 accessManager.validateEmployee(Token.authenticateActor(token), Token.getLoggedInUserRole(token));*/

// await RequestHandler.createAdmin(name, familyName, email, password, phoneNumber, department, organizationLevel, office, workingHour);
// await RequestHandler.registerEmployee(name, familyName, email, password, phoneNumber, department, organizationLevel, office, workingHour, role, status)
// await RequestHandler.editEmployeeByAdmin(name, familyName, email, department, organizationLevel, office, workingHour, role, status);
