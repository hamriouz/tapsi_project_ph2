const setupDb = require('../DataAccess/db/db-setup');
const express = require('express');
const Exception = require("../Util/Exception")
const Token = require("./AccessManager/Token");
const accessManager = require("./AccessManager/AccessManager");
const RequestHandler = require('../Handler/RequestHandler');


setupDb();

const requestHandler = RequestHandler.getInstance();

const app = express();
app.use(express.json());


app.post('/RoomManagement/CreateAdmin', async (req, res) => {
/*    const {
        name,
        familyName,
        email,
        password,
        phoneNumber,
        department,
        organizationLevel,
        office,
        workingHour
    } = req.body;*/
    let adminData = req.body;
    try {
        // await requestHandler.createAdmin(name, familyName, email, password, phoneNumber, department, organizationLevel, office, workingHour);
        await requestHandler.createAdmin(adminData);
        res.status(201).send("Admin was successfully created!");
    } catch (err) {
        res.status(Exception.getStatusByExceptionMessage(err)).send(err);
    }
})

app.post('/RoomManagement/SignUpEmployee', Token.authenticateActor, accessManager.validateAccess, accessManager.isEnable, async (req, res) => {
/*    const {
        name,
        familyName,
        email,
        password,
        phoneNumber,
        department,
        organizationLevel,
        office,
        workingHour,
        role,
        status
    } = req.body;*/
    let employeeData = req.body;
    try {
        // await requestHandler.registerEmployee(name, familyName, email, password, phoneNumber, department, organizationLevel, office, workingHour, role, status)
        await requestHandler.registerEmployee(req.email, employeeData);
        res.status(201).send("Username with email address \"" + employeeData.email + "\" was successfully created!");
    } catch (err) {
        res.status(Exception.getStatusByExceptionMessage(err)).send(err);
    }
})

app.post('/RoomManagement/Login', async (req, res) => {
    const {email, password} = req.body;
    try {
        await requestHandler.login(email, password);
        res.header('Authorization', Token.createToken(email, "admin"));
        res.status(200).send("The admin successfully logged in!");
    } catch (err) {
        res.status(Exception.getStatusByExceptionMessage(err)).send(err);
    }
})

app.post('/RoomManagement/ViewListOfEmployees', Token.authenticateActor, accessManager.validateAccess, accessManager.isEnable, async (req, res) => {
    try {
        const allEmployees = await requestHandler.getListOfEmployee();
        res.status(201).send(allEmployees);
    } catch (err) {
        res.status(Exception.getStatusByExceptionMessage(err)).send(err);
    }
})

app.post('/RoomManagement/EnableDisableEmployee', Token.authenticateActor, accessManager.validateAccess, accessManager.isEnable, async (req, res) => {
    const {email} = req.body;
    try {
        let enOrDis = requestHandler.enableDisableEmployee(email);
        res.status(200).send("employee with the email address " + email + " was successfully " + enOrDis);
    } catch (err) {
        res.status(Exception.getStatusByExceptionMessage(err)).send(err);
    }
})

app.post('/RoomManagement/ViewEmployee', Token.authenticateActor, accessManager.validateAccess, accessManager.isEnable, async (req, res) => {
    const {email} = req.body;
    try {
        let employee = requestHandler.getDetailOneEmployee(email);
        res.status(200).send(employee);
    } catch (err) {
        res.status(Exception.getStatusByExceptionMessage(err)).send(err);
    }
})

app.post('/RoomManagement/EditEmployeeByAdmin', Token.authenticateActor, accessManager.validateAccess, accessManager.isEnable, async (req, res) => {
    // const {name, familyName, email, department, organizationLevel, office, workingHour, role, status} = req.body;
    let employeeNewDetail = req.body;
    try {
        // await requestHandler.editEmployeeByAdmin(name, familyName, email, department, organizationLevel, office, workingHour, role, status);
        await requestHandler.editEmployeeByAdmin(req.email, employeeNewDetail);
        res.status(200).send("The user's detail(s) was successfully edited")
    } catch (err) {
        res.status(Exception.getStatusByExceptionMessage(err)).send(err);
    }
})

app.post('/RoomManagement/EditEmployeeByEmployee', Token.authenticateActor, accessManager.validateAccess, accessManager.isEnable, async (req, res) => {
    const {name, familyName, workingHour} = req.body;
    try {
        await requestHandler.editEmployeeByEmployee(name, familyName, workingHour);
        res.status(200).send("The employee's detail(s) was changed successfully!")
    } catch (err) {
        res.status(Exception.getStatusByExceptionMessage(err)).send(err);
    }
})

app.post('/RoomManagement/SeeAllEmployeeDepartment', Token.authenticateActor, accessManager.validateAccess, accessManager.isEnable, async (req, res) => {
    const {department} = req.body;
    try {
        const allEmployeeInDepartment = requestHandler.getAllEmployeesInADepartment(department);
        res.status(200).send(allEmployeeInDepartment);
    } catch (err) {
        res.status(Exception.getStatusByExceptionMessage(err)).send(err);
    }
})

app.post('/RoomManagement/SeeAllEmployeeOffice', Token.authenticateActor, accessManager.validateAccess, accessManager.isEnable, async (req, res) => {
    const {office} = req.body;
    try {
        const allEmployeeInOffice = requestHandler.getAllEmployeesInAnOffice(office);
        res.status(200).send(allEmployeeInOffice);
    } catch (err) {
        res.status(Exception.getStatusByExceptionMessage(err)).send(err);
    }
})

app.post('/RoomManagement/SeeWorkingHour', Token.authenticateActor, accessManager.validateAccess, accessManager.isEnable, async (req, res) => {
    const {email} = req.body;
    try {
        const workingHour = requestHandler.getWorkingHourOfEmployee(email);
        res.status(200).send(workingHour);
    } catch (err) {
        res.status(Exception.getStatusByExceptionMessage(err)).send(err);
    }
})

app.listen(2000)


/* const token = req.header('Authorization')
 accessManager.validateEmployee(Token.authenticateActor(token), Token.getLoggedInUserRole(token));*/