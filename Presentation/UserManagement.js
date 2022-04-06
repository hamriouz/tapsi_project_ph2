const {app} = require('../app');
const Exception = require("../Util/Exception");
const Token = require("./AccessManager/Token");
const AccessManager = require("./AccessManager/AccessManager");
const EmployeeRequestHandler = require('../Handler/EmployeeRequestHandler');
const AdminRequestHandler = require('../Handler/AdminRequestHandler');


const accessManager = new AccessManager();


app.post('/RoomManagement/Admin/CreateAdmin', async (req, res) => {
    let adminData = req.body;
    try {
        await AdminRequestHandler.createAdmin(adminData);
        res.status(201).send("Admin was successfully created!");
    } catch (err) {
        res.status(Exception.getStatusByExceptionMessage(err)).send(err);
    }
})

app.post('/RoomManagement/Admin/SignUpEmployee', Token.authenticateActor, accessManager.validateAccess, accessManager.isEnable, async (req, res) => {
    let employeeData = req.body;
    try {
        await AdminRequestHandler.registerEmployee(req.email, employeeData);
        res.status(201).send("Username with email address \"" + employeeData.email + "\" was successfully created!");
    } catch (err) {
        res.status(Exception.getStatusByExceptionMessage(err)).send(err);
    }
})

app.post('/RoomManagement/Admin/Login', async (req, res) => {
    const {email, password} = req.body;
    try {
        await AdminRequestHandler.login(email, password);
        res.header('Authorization', Token.createToken(email, "admin"));
        res.status(200).send("The admin successfully logged in!");
    } catch (err) {
        res.status(Exception.getStatusByExceptionMessage(err)).send(err);
    }
})

app.post('/RoomManagement/Employee/Login', async (req, res) => {
    const {email, password} = req.body;
    try {
        await EmployeeRequestHandler.login(email, password);
        res.header('Authorization', Token.createToken(email, "admin"));
        res.status(200).send("The admin successfully logged in!");
    } catch (err) {
        res.status(Exception.getStatusByExceptionMessage(err)).send(err);
    }
})

app.get('/RoomManagement/Admin/ListOfEmployees', Token.authenticateActor, accessManager.validateAccess, accessManager.isEnable, async (req, res) => {
    try {
        const allEmployees = await AdminRequestHandler.getListOfEmployee();
        res.status(201).send(allEmployees);
    } catch (err) {
        res.status(Exception.getStatusByExceptionMessage(err)).send(err);
    }
})

app.put('/RoomManagement/Admin/ChangeStatus', Token.authenticateActor, accessManager.validateAccess, accessManager.isEnable, async (req, res) => {
    const {email} = req.body;
    try {
        let enOrDis = await AdminRequestHandler.changeEmployeeStatus(email);
        res.status(200).send("employee with the email address " + email + " was successfully " + enOrDis);
    } catch (err) {
        res.status(Exception.getStatusByExceptionMessage(err)).send(err);
    }
})

app.get('/RoomManagement/Admin/ViewEmployee', Token.authenticateActor, accessManager.validateAccess, accessManager.isEnable, async (req, res) => {
    const {email} = req.body;
    try {
        let employee = await AdminRequestHandler.getDetailOneEmployee(email);
        res.status(200).send(employee);
    } catch (err) {
        res.status(Exception.getStatusByExceptionMessage(err)).send(err);
    }
})

app.put('/RoomManagement/Admin/EditEmployee', Token.authenticateActor, accessManager.validateAccess, accessManager.isEnable, async (req, res) => {
    let employeeNewDetail = req.body;
    try {
        await AdminRequestHandler.editEmployee(req.email, employeeNewDetail);
        res.status(200).send("The user's detail(s) was successfully edited")
    } catch (err) {
        res.status(Exception.getStatusByExceptionMessage(err)).send(err);
    }
})

app.put('/RoomManagement/Employee/EditEmployee', Token.authenticateActor, accessManager.validateAccess, accessManager.isEnable, async (req, res) => {
    const {name, familyName, workingHour} = req.body;
    try {
        await EmployeeRequestHandler.editEmployee(name, familyName, workingHour);
        res.status(200).send("The employee's detail(s) was changed successfully!")
    } catch (err) {
        res.status(Exception.getStatusByExceptionMessage(err)).send(err);
    }
})

app.post('/RoomManagement/Employee/AllEmployeeInDepartment', Token.authenticateActor, accessManager.validateAccess, accessManager.isEnable, async (req, res) => {
    const {department} = req.body;
    try {
        const allEmployeeInDepartment = await EmployeeRequestHandler.getAllEmployeesInADepartment(department);
        res.status(200).send(allEmployeeInDepartment);
    } catch (err) {
        res.status(Exception.getStatusByExceptionMessage(err)).send(err);
    }
})

app.post('/RoomManagement/Employee/AllEmployeeInOffice', Token.authenticateActor, accessManager.validateAccess, accessManager.isEnable, async (req, res) => {
    const {office} = req.body;
    try {
        const allEmployeeInOffice = await EmployeeRequestHandler.getAllEmployeesInAnOffice(office);
        res.status(200).send(allEmployeeInOffice);
    } catch (err) {
        res.status(Exception.getStatusByExceptionMessage(err)).send(err);
    }
})

app.post('/RoomManagement/Employee/EmployeeWorkingHour', Token.authenticateActor, accessManager.validateAccess, accessManager.isEnable, async (req, res) => {
    const {email} = req.body;
    try {
        const workingHour = await EmployeeRequestHandler.getWorkingHourOfEmployee(email);
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
