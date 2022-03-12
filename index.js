const setupDb = require('./db/db-setup');
const express = require('express');
const Exception = require("./Exception")
const UserController = require('./controller/User');
const AdminController = require('./controller/Admin');
const SeeDetail = require('./controller/SeeDetail')
const Token = require("./Token");
const ChangeDetail = require("./controller/Modification")
const {Registration} = require("./controller/EmployeeRegistration")
const CreateAdmin = require("./controller/AdminRegistration")
const accessManager = require("./validations/AccessManager");
const ActionException = require("./controller/UndefinedException");
const DataBaseManager = require("./db/db-manager/DataBaseManager")

setupDb();

const app = express();
app.use(express.json());


// TODO move undefined exception to domain layer
//  add the getUser in the modification class and set the new detail for it


app.post('/RoomManagement/SignUpAdmin/Admin', async (req, res) => {
    const {name, familyName, email, password, phoneNumber, department, organizationLevel, office, workingHour} = req.body;
    try {
        ActionException.signUpAdmin(name, familyName, email, password, phoneNumber, department, organizationLevel, office, workingHour)
        const user = DataBaseManager.getAdmin();
        await CreateAdmin.createAdmin(user, name, familyName, email, password, phoneNumber, department, organizationLevel, office, workingHour);
        res.status(201).send("Admin was successfully created!");
    }catch (err){
        res.status(Exception.getStatusByExceptionMessage(err)).send(err);
    }
})

app.post('/RoomManagement/SignUpEmployee/Admin',accessManager.validateAccess, Token.authenticateActor, accessManager.validateAdmin, async (req, res) =>{
    const {name, familyName, email, password, phoneNumber, department, organizationLevel, office, workingHour, role, status} = req.body;
    try {
        ActionException.signUpEmployee(name, familyName, email, password, phoneNumber, department, organizationLevel, office, workingHour, role, status);
       await Registration.createEmployeeByAdmin(name, familyName, email, password, phoneNumber, department, organizationLevel, office, workingHour, role, status);
        res.status(201).send("Username with email address \"" + email + "\" was successfully created!");
    }catch (err){
        res.status(Exception.getStatusByExceptionMessage(err)).send(err);
    }
})

app.post('/RoomManagement/Login/Admin', async (req, res) => {
    const {email, password} = req.body;
    try {
        ActionException.login(email, password);
        await AdminController.login(email, password);
        res.header('Authorization', Token.createToken(email, "admin"));
        res.status(200).send("The admin successfully logged in!");
    } catch (err) {
        res.status(Exception.getStatusByExceptionMessage(err)).send(err);
    }
})

app.post('/RoomManagement/Login/Employee', async (req, res) =>{
    const { email, password } = req.body;
    try {
        ActionException.login(email, password);
        await UserController.login(email, password);
        res.header('Authorization', Token.createToken(email, "employee"));
        res.status(200).send("The employee successfully logged in!");
    }catch (err){
        res.status(Exception.getStatusByExceptionMessage(err)).send(err);
    }
})

app.post('/RoomManagement/ViewListOfEmployees/Admin',accessManager.validateAccess, Token.authenticateActor, accessManager.validateAdmin,async (req, res) =>{
    try {
        res.status(201).send(SeeDetail.viewListEmployeeByAdmin());
    }catch (err){
        res.status(Exception.getStatusByExceptionMessage(err)).send(err);
    }
})

app.post('/RoomManagement/EnableDisableEmployee/Admin',accessManager.validateAccess, Token.authenticateActor, accessManager.validateAdmin,async (req, res) =>{
    const {email} = req.body;
    try {
        ActionException.emptyEmail(email);
        let EnOrDis = ChangeDetail.changeStateByAdmin(email);
        res.status(200).send("employee with the email address " + email + " was successfully " + EnOrDis);
    }catch (err){
        res.status(Exception.getStatusByExceptionMessage(err)).send(err);
    }
})

app.post('/RoomManagement/ViewEmployee/Admin', accessManager.validateAccess,Token.authenticateActor, accessManager.validateAdmin,async (req, res) =>{
    const { email } = req.body;
    try{
        ActionException.emptyEmail(email);
        res.status(200).send(SeeDetail.viewDetailOneEmployeeByAdmin(email));
    }catch (err){
        res.status(Exception.getStatusByExceptionMessage(err)).send(err);
    }
})

app.post('/RoomManagement/EditEmployee/Admin',accessManager.validateAccess, Token.authenticateActor, accessManager.validateAdmin,async (req, res) =>{
    const { name, familyName, email, department, organizationLevel, office, workingHour, role, status } = req.body;
    try {
        await ChangeDetail.changeDetailByAdmin(name, familyName,email, department, organizationLevel, office, workingHour, role, status);
        res.status(200).send("The user's detail(s) was successfully edited")
    }catch (err){
        res.status(Exception.getStatusByExceptionMessage(err)).send(err);
    }
})

app.post('/RoomManagement/EditEmployee/Employee', accessManager.validateAccess,Token.authenticateActor, accessManager.validateEmployee, async (req, res) =>{
    const { name, familyName, workingHour } = req.body;
    try {
        await ChangeDetail.changeDetailByEmployee(req.userEmail, name, familyName, workingHour);
        res.status(200).send("The employee's detail(s) was changed successfully!")
    }catch (err){
        res.status(Exception.getStatusByExceptionMessage(err)).send(err);
    }
})

app.post('/RoomManagement/SeeAllEmployeeDepartment/Employee',accessManager.validateAccess,Token.authenticateActor, accessManager.validateEmployee,  async (req, res) =>{
    const { department } = req.body;
    try {
        ActionException.emptyDepartment(department);
        res.status(200).send(SeeDetail.getAllEmployeeDepartmentByEmployee(department))
    }catch (err){
        res.status(Exception.getStatusByExceptionMessage(err)).send(err);
    }
})

app.post('/RoomManagement/SeeWorkingHour/Employee',accessManager.validateAccess,Token.authenticateActor, accessManager.validateEmployee,async (req, res) =>{
    const { email } = req.body;
    try {
        ActionException.emptyEmail(email);res.status(200).send(SeeDetail.workingHourByEmployee(email))
    }catch (err){
        res.status(Exception.getStatusByExceptionMessage(err)).send(err);
    }
})

app.listen(2000)


// todo check if the classes whose names were changes need to be renamed where they were called


/* const token = req.header('Authorization')
 accessManager.validateEmployee(Token.authenticateActor(token), Token.getLoggedInUserRole(token));*/
