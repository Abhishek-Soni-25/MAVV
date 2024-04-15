const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/MAVV")
  .then(() => {
    console.log("mongodb connected");
  })
  .catch(() => {
    console.log("failed to connect");
  });

const Doctor_ke_Patients = new mongoose.Schema({
    name: {
      type: String,
      require: true,
    },
    id: {
      type: String,
      require: true,
    }
});

const Patient_ke_Doctors = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  id: {
    type: String,
    require: true,
  }
});

const SignUp_Login_Doctor = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  age: {
    type: Number,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  mobile: {
    type: Number,
    require: true,
  },
  userType: {
    type: String,
    require: true,
  },
  specialization: {
    type: String,
    require: true,
  },
  id: {
    type: Number,
  },
});

const SignUp_Login_User = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  age: {
    type: Number,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  mobile: {
    type: Number,
    require: true,
  },
  userType: {
    type: String,
    require: true,
  },
  id: {
    type: Number,
  },
});

const DoctorModel = new mongoose.model("SignUpLoginDoctor",SignUp_Login_Doctor);
const UserModel = new mongoose.model("SignUpLoginUser", SignUp_Login_User);
const Doctor_adds_Patient = new mongoose.model("Doctor_Patient", Doctor_ke_Patients);
const Patient_adds_Doctor = new mongoose.model("Patient_Doctor", Patient_ke_Doctors);

module.exports = {
  UserModel,
  DoctorModel,
  Doctor_adds_Patient,
  Patient_adds_Doctor
};
