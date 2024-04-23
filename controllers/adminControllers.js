const Admin = require("../models/adminModel");
const bcryptService = require('../services/bcryptService');
const comparePassword = require('../services/comparePassword')
const jwtService = require("../services/jwtservice")
const response = require('../services/responseService');


module.exports.loginAdmin = async (req, res) => {
    try {
      const { email, password } = req.body;
      const admin = await Admin.findOne({ email: email });
      if (admin) {
        const passwordMatch = await comparePassword.comparePasswords(
          password,
          admin.password
        );
        console.log(passwordMatch);
        if (passwordMatch) {
          const adminToken = await jwtService.createJwt(admin);
          (response.success = true),
            (response.message = "Admin Login Successfully"),
            (response.data = { admin, aceesToken: adminToken }),
            res.status(201).send(response);
        } else {
          (response.success = false), (response.message = "Invalid password");
          response.data = null;
          res.status(401).send(response);
        }
      } else {
        (response.success = false), (response.message = "Admin Not Found");
        response.data = null;
        res.status(404).send(response);
      }
    } catch (error) {
      console.error(error);
      (response.success = false), (response.message = "Internal Server Error");
      response.data = null;
      res.status(500).send(response);
    }
  };



module.exports.adminSignUp = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            phoneNo,
            role
        } = req.body;

        if (role === "admin") {
            const existingAdmin = await Admin.findOne({ role: { $in: ["admin"] } });
            if (existingAdmin) {
                response.success = false;
                response.message = `${role} already exists. Only one ${role} allowed.`;
                response.data = null;
                return res.status(409).send(response);
            }
        }

        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            response.success = false;
            response.message = "Email already exists";
            response.data = null;
            return res.status(409).send(response);
        }

        const hashedPassword = await bcryptService.hashPassword(password);

        const addAdmin = await Admin.create({
            name,
            email,
            password: hashedPassword,
            phoneNo,
            role
        });

        await addAdmin.save();

        response.success = true;
        response.message = "Admin signUp successfully";
        response.data = addAdmin;
        return res.status(201).send(response);
    } catch (error) {
        console.error(error);
        response.success = false;
        response.message = "Internal Server Error";
        response.data = null;
        return res.status(500).send(response);
    }
};

module.exports.getAdminById = async (req, res) => {
  const _id = req.params._id;

  try {
    const getAdmin = await Admin.findById({_id : _id});

    if (!getAdmin) {
      return res.status(404).json({
        success: false,
        message: "Admin Not Found",
        data: null
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Get Admin Successfully',
      data: getAdmin
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      data: null
    });
  }
};
