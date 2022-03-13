const setupDb = require('../db/db-setup');
const express = require('express');
const Exception = require("../DTO/Exception")
const UserController = require('../DTO/User');
const AdminController = require('../DTO/Admin');
const SeeDetail = require('../Domain/SeeDetail')
const Token = require("../Token");
const ChangeDetail = require("../Domain/Modification")
const Registration = require("../DTO/Registration")
const accessManager = require("../validations/AccessManager");
const undefinedException = require("../DTO/UndefinedException");
const DataBaseManager = require("../DataAccess/UserDataAccess")

setupDb();

const app = express();
app.use(express.json());


app.post('/RoomManagement/SignUpAdmin/Admin', async (req, res) => {
    const {name, familyName, email, password, phoneNumber, department, organizationLevel, office, workingHour} = req.body;
    try {
        undefinedException.signUpAdmin(name, familyName, email, password, phoneNumber, department, organizationLevel, office, workingHour)
        await Registration.createAdmin(name, familyName, email, password, phoneNumber, department, organizationLevel, office, workingHour);
        res.status(201).send("Admin was successfully created!");
    }catch (err){
        res.status(Exception.getStatusByExceptionMessage(err)).send(err);
    }
})

app.post('/RoomManagement/SignUpEmployee/Admin', Token.authenticateActor,accessManager.validateAccess, accessManager.validateChangedDetail, async (req, res) =>{
    const {name, familyName, email, password, phoneNumber, department, organizationLevel, office, workingHour, role, status} = req.body;
    try {
        undefinedException.signUpEmployee(name, familyName, email, password, phoneNumber, department, organizationLevel, office, workingHour, role, status);
       await Registration.createEmployeeByAdmin(name, familyName, email, password, phoneNumber, department, organizationLevel, office, workingHour, role, status);
        res.status(201).send("Username with email address \"" + email + "\" was successfully created!");
    }catch (err){
        res.status(Exception.getStatusByExceptionMessage(err)).send(err);
    }
})

app.post('/RoomManagement/Login/Admin', async (req, res) => {
    const {email, password} = req.body;
    try {
        undefinedException.login(email, password);
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
        undefinedException.login(email, password);
        await UserController.login(email, password);
        res.header('Authorization', Token.createToken(email, "employee"));
        res.status(200).send("The employee successfully logged in!");
    }catch (err){
        res.status(Exception.getStatusByExceptionMessage(err)).send(err);
    }
})

app.post('/RoomManagement/ViewListOfEmployees/Admin', Token.authenticateActor,accessManager.validateAccess, accessManager.validateChangedDetail,async (req, res) =>{
    try {
        res.status(201).send(SeeDetail.viewListEmployeeByAdmin());
    }catch (err){
        res.status(Exception.getStatusByExceptionMessage(err)).send(err);
    }
})

app.post('/RoomManagement/EnableDisableEmployee/Admin',Token.authenticateActor,accessManager.validateAccess, accessManager.validateChangedDetail,async (req, res) =>{
    const {email} = req.body;
    try {
        undefinedException.emptyEmail(email);
        let EnOrDis = ChangeDetail.changeStateByAdmin(email);
        res.status(200).send("employee with the email address " + email + " was successfully " + EnOrDis);
    }catch (err){
        res.status(Exception.getStatusByExceptionMessage(err)).send(err);
    }
})

app.post('/RoomManagement/ViewEmployee/Admin', Token.authenticateActor,accessManager.validateAccess, accessManager.validateChangedDetail,async (req, res) =>{
    const { email } = req.body;
    try{
        undefinedException.emptyEmail(email);
        res.status(200).send(SeeDetail.viewDetailOneEmployeeByAdmin(email));
    }catch (err){
        res.status(Exception.getStatusByExceptionMessage(err)).send(err);
    }
})

app.post('/RoomManagement/EditEmployee/Admin', Token.authenticateActor,accessManager.validateAccess, accessManager.validateChangedDetail,async (req, res) =>{
    const { name, familyName, email, department, organizationLevel, office, workingHour, role, status } = req.body;
    try {
        await ChangeDetail.changeDetailByAdmin(name, familyName,email, department, organizationLevel, office, workingHour, role, status);
        res.status(200).send("The user's detail(s) was successfully edited")
    }catch (err){
        res.status(Exception.getStatusByExceptionMessage(err)).send(err);
    }
})

app.post('/RoomManagement/EditEmployee/Employee', Token.authenticateActor, accessManager.validateAccess,accessManager.validateChangedDetail, async (req, res) =>{
    const { name, familyName, workingHour } = req.body;
    try {
        await ChangeDetail.changeDetailByEmployee(req.userEmail, name, familyName, workingHour);
        res.status(200).send("The employee's detail(s) was changed successfully!")
    }catch (err){
        res.status(Exception.getStatusByExceptionMessage(err)).send(err);
    }
})

app.post('/RoomManagement/SeeAllEmployeeDepartment/Employee',Token.authenticateActor,accessManager.validateAccess, accessManager.validateChangedDetail,  async (req, res) =>{
    const { department } = req.body;
    try {
        undefinedException.emptyDepartment(department);
        res.status(200).send(SeeDetail.getAllEmployeeDepartmentByEmployee(department))
    }catch (err){
        res.status(Exception.getStatusByExceptionMessage(err)).send(err);
    }
})

app.post('/RoomManagement/SeeWorkingHour/Employee',Token.authenticateActor, accessManager.validateAccess,accessManager.validateChangedDetail,async (req, res) =>{
    const { email } = req.body;
    try {
        undefinedException.emptyEmail(email);res.status(200).send(SeeDetail.workingHourByEmployee(email))
    }catch (err){
        res.status(Exception.getStatusByExceptionMessage(err)).send(err);
    }
})

app.listen(2000)

/* const token = req.header('Authorization')
 accessManager.validateEmployee(Token.authenticateActor(token), Token.getLoggedInUserRole(token));*/
