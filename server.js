const express = require("express")
const app = express()
const path = require("path")
const ejs = require("ejs")
const {UserModel, DoctorModel, Doctor_adds_Patient, Patient_adds_Doctor} = require("./mongodb")



app.use(express.json())
app.set("view engine", "ejs")


app.use(express.static('public'));


app.use(express.urlencoded({extended:false}))



app.get("/", (req, res)=>{
    res.render("index")
})
app.get("/signup", (req, res)=>{
    res.render("signup")
})
app.get("/login", (req, res)=>{
    res.render("login")
})
app.get("/dashboard_doctor", (req, res)=>{
    res.render("dashboard_doctor")
})
app.get("/dashboard_patient", (req, res)=>{
    res.render("dashboard_patient")
})
app.get("/Adding_patients", (req, res)=>{
    res.render("Adding_patients")
})
app.get("/Adding_doctors", (req, res)=>{
    res.render("Adding_doctors")
})
app.get("/Adding_Form", (req, res)=>{
    res.render("Adding_Form")
})



app.post("/signup", async (req, res) => {
    const userType = req.body.userType;

    function generateRandomId() {
        let id = '';
        for (let i = 0; i < 10; i++) {
            id += Math.floor(Math.random() * 10);
        }
        return id;
    }
    const randomId = generateRandomId();

    const data = {
        name: req.body.name,
        age: req.body.age,
        mobile: req.body.mobile,
        password: req.body.password,
        id: randomId
    };
  
    if (userType === 'Doctor') {
        data.specialization = req.body.specialization;
        await DoctorModel.create(data);
        res.render("dashboard_doctor");
    } 
    else {
        await UserModel.create(data);
    }
});






app.post("/login",async (req, res)=>{
    try {
        const checkUser = await UserModel.findOne({name: req.body.name});
        const checkDoctor = await DoctorModel.findOne({name: req.body.name});
        if (checkDoctor && checkDoctor.password === req.body.password) {

                res.render("dashboard_doctor", {doctorName: req.body.name});
            
        } else if(checkUser && checkUser.password === req.body.password){
            res.render("dashboard_patient", {userName: req.body.name});
        } else{
            res.render("wrong password");
        }
    }
    catch{
        console.log("error");
    }
})


app.post("/Adding_Form",async (req, res)=>{
    try {
        const checkUser = await UserModel.findOne({name: req.body.newname});
        const checkDoctor = await DoctorModel.findOne({name: req.body.newname});
        if (checkUser.name === req.body.newname && checkUser.id == req.body.newid) {
            const data={
                name:req.body.newname,
                id:req.body.newtid
            };
            await Doctor_adds_Patient.create(data);
            res.render("Adding_patients")
        } else if(checkDoctor.name === req.body.newname && checkDoctor.id == req.body.newid){
            const data={
                name:req.body.newname,
                id:req.body.newtid
            };
            await Patient_adds_Doctor.create(data);
            res.render("Adding_doctors")
        }
        else {
            res.render("No user Found");
        }
    } 
    catch {
        console.log("error");
    }
})



app.get("/Adding_patients", async (req, res) => {
    try {
        const data = await Doctor_adds_Patient.find().exec();
        console.log(data)
        res.render("Adding_patients", {
            PatientList: data
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


app.listen(4000, ()=>{
    console.log("port connected");
})