const setupDb = require('./db/db-setup');
const express = require('express');
const bodyParser = require('body-parser');
const User = require("./db/models/User");
const Exception = require("./Exception")
const Admin = require("./db/models/Admin");
const UserController = require('./controller/User');
const AdminController = require('/controller/Admin');
const SeeDetail = require('./controller/SeeDetail')
const Token = require("./Token");
const ChangeDetail = require("./controller/ChangeDetail")
const {Registration} = require("./controller/Registration")
const CreateAdmin = require("./controller/CreateAdmin")
const actionTakerValidation = require("./validations/actionTakerValidation");
const ActionException = require("./controller/ActionException");


setupDb();

const app = express();
app.use(express.json());

// let haveAdmin = false;


app.post('/roomManagement/SignUpAdmin/Admin', async (req, res) => {
    const {name, familyName, email, password, phoneNumber, department, organizationLevel, office, workingHour} = req.body;
    try {
        ActionException.signUpAdmin(name, familyName, email, password, phoneNumber, department, organizationLevel, office, workingHour)
        // haveAdmin = true;
        const user = await User.query().select('*').where('role', '=', "admin");
        await CreateAdmin.createAdmin(user, name, familyName, email, password, phoneNumber, department, organizationLevel, office, workingHour);
        // User.createAdmin(name, familyName, email, password, phoneNumber, department, organizationLevel, office, workingHour);
        res.status(201).send("Admin was successfully created!");
    }catch (err){
        res.status(Exception.getStatusByExceptionMessage(err)).send(err);
    }
})

app.post('/roomManagement/SignUpEmployee/Admin', async (req, res) =>{
    const {name, familyName, email, password, phoneNumber, department, organizationLevel, office, workingHour, role, status} = req.body;
    try {
        ActionException.signUpEmployee(name, familyName, email, password, phoneNumber, department, organizationLevel, office, workingHour, role, status);
        // const userRequest = User.findObjectByKey("email", Token.authenticateActor(req.header('Authorization')));
        const role = await User.query().select("role").where('email', '=', Token.authenticateActor(req.header('Authorization')));
        actionTakerValidation.validateAdmin(role);
        await Registration.createEmployeeByAdmin(name, familyName, email, password, phoneNumber, department, organizationLevel, office, workingHour, role, status);
        res.status(201).send("Username with email address \"" + email + "\" was successfully created!");
    }catch (err){
        res.status(Exception.getStatusByExceptionMessage(err)).send(err);
    }
})

app.post('/roomManagement/Login/Admin', async (req, res) => {
    const {email, password} = req.body;
    try {
        ActionException.login(email, password);
        await AdminController.login(email, password);
        res.header('Authorization', Token.createToken(User.query().select("*").where("email",'=',email)));
        res.status(200).send("The admin successfully logged in!");
    } catch (err) {
        res.status(Exception.getStatusByExceptionMessage(err)).send(err);
    }
})

app.post('/roomManagement/Login/Employee', async (req, res) =>{
    const { email, password } = req.body;
    try {
        ActionException.login(email, password);
        await UserController.login(email, password);
        res.header('Authorization', Token.createToken(User.query().select("*").where("email",'=',email)));
        res.status(200).send("The admin successfully logged in!");
    }catch (err){
        res.status(Exception.getStatusByExceptionMessage(err)).send(err);
    }
})

app.post('/roomManagement/ViewListOfEmployees/Admin', async (req, res) =>{
    try {
        const role = User.query().select("role").where("email", "=",Token.authenticateActor(req.header('Authorization')));
        // const userRequest = User.findObjectByKey("email", Token.authenticateActor(req.header('Authorization')));
        actionTakerValidation.validateAdmin(role);
        res.status(201).send(SeeDetail.viewListEmployeeByAdmin());
    }catch (err){
        res.status(Exception.getStatusByExceptionMessage(err)).send(err);
    }
})

app.post('/roomManagement/EnableDisableEmployee/Admin', async (req, res) =>{
    const {email} = req.body;
    try {
        ActionException.emptyEmail(email);
        // const userRequest = User.findObjectByKey("email", Token.authenticateActor(req.header('Authorization')));
        const userRequest = User.query().select("*").where("email",'=',Token.authenticateActor(req.header('Authorization')))
        actionTakerValidation.validateAdmin(userRequest);
        let EnOrDis = ChangeDetail.changeStateByAdmin(email);
        // let EnOrDis = userRequest.enable_disable(email);
        res.status(200).send("employee with the email address " + email + " was successfully " + EnOrDis);
    }catch (err){
        res.status(Exception.getStatusByExceptionMessage(err)).send(err);
    }
})

app.post('/roomManagement/ViewEmployee/Admin', async (req, res) =>{
    const { email } = req.body;
    try{
        ActionException.emptyEmail(email);
        const userRequest = User.query().select("*").where("email",'=',Token.authenticateActor(req.header('Authorization')))
        // const userRequest = User.findObjectByKey("email", Token.authenticateActor(req.header('Authorization')));
        actionTakerValidation.validateAdmin(userRequest);
        // let detail = userRequest.view_detail_one_employee(email)
        res.status(200).send(SeeDetail.viewDetailOneEmployeeByAdmin(email));
    }catch (err){
        res.status(Exception.getStatusByExceptionMessage(err)).send(err);
    }
})

app.post('/roomManagement/EditEmployee/Admin', async (req, res) =>{
    const { name, familyName, email, department, organizationLevel, office, workingHour, role, status } = req.body;
    try {
        const userRequest = User.query().select("*").where('email','=',Token.authenticateActor(req.header('Authorization')))
        // const userRequest = User.findObjectByKey("email", Token.authenticateActor(req.header('Authorization')));
        actionTakerValidation.validateAdmin(userRequest);
        await ChangeDetail.changeDetailByAdmin(name, familyName,email, department, organizationLevel, office, workingHour, role, status);
        res.status(200).send("The user's detail(s) was successfully edited")
    }catch (err){
        res.status(Exception.getStatusByExceptionMessage(err)).send(err);
    }
})

app.post('/roomManagement/EditEmployee/Employee', async (req, res) =>{
    const { name, familyName, workingHour } = req.body;
    try {
        const employee = await User.query().select('*').where("email",'=',Token.authenticateActor(req.header('Authorization')));
        // const employee = User.findObjectByKey("email", Token.authenticateActor(req.header('Authorization')));
        actionTakerValidation.validateEmployee(employee);
        ChangeDetail.changeDetailByEmployee(employee, name, familyName, workingHour);
        res.status(200).send("The employee's detail(s) was changed successfully!")
    }catch (err){
        res.status(Exception.getStatusByExceptionMessage(err)).send(err);
    }
})

app.post('/roomManagement/SeeAllEmployeeDepartment/Employee', async (req, res) =>{
    const { department } = req.body;
    try {
        ActionException.emptyDepartment(department);
        const employee = User.query().select('*').where('email','=',Token.authenticateActor(req.header('Authorization')));
        // const employee = User.findObjectByKey("email", Token.authenticateActor(req.header('Authorization')));
        actionTakerValidation.validateEmployee(employee);
        res.status(200).send(SeeDetail.getAllEmployeeDepartmentByEmployee(department))
    }catch (err){
        res.status(Exception.getStatusByExceptionMessage(err)).send(err);
    }
})

app.post('/roomManagement/SeeWorkingHour/Employee',async (req, res) =>{
    const { email } = req.body;
    try {
        ActionException.emptyEmail(email);
        const employee = User.query().select('*').where('email','=',Token.authenticateActor(req.header('Authorization')));
        // const employee = User.findObjectByKey("email", Token.authenticateActor(req.header('Authorization')));
        actionTakerValidation.validateEmployee(employee)
        res.status(200).send(SeeDetail.workingHourByEmployee(email))
    }catch (err){
        res.status(Exception.getStatusByExceptionMessage(err)).send(err);
    }
})

app.listen(2000)