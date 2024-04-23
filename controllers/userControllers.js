const User = require("../models/userModel");
const bcryptService = require('../services/bcryptService');
const comparePassword = require('../services/comparePassword')
const jwtService = require("../services/jwtservice")
const response = require('../services/responseService');


module.exports.loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });
      if (user) {
        const passwordMatch = await comparePassword.comparePasswords(
          password,
          user.password
        );
        console.log(passwordMatch);
        if (passwordMatch) {
          const userToken = await jwtService.createJwt(user);
          (response.success = true),
            (response.message = "User Login Successfully"),
            (response.data = { user, aceesToken: userToken }),
            res.status(201).send(response);
        } else {
          (response.success = false), (response.message = "Invalid password");
          response.data = null;
          res.status(401).send(response);
        }
      } else {
        (response.success = false), (response.message = "User Not Found");
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



module.exports.userSignUp = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            role
        } = req.body;

        if (role === "user") {
            const existingUser = await User.findOne({ role: { $in: ["user"] } });
            if (existingUser) {
                response.success = false;
                response.message = `${role} already exists. Only one ${role} allowed.`;
                response.data = null;
                return res.status(409).send(response);
            }
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            response.success = false;
            response.message = "Email already exists";
            response.data = null;
            return res.status(409).send(response);
        }

        const hashedPassword = await bcryptService.hashPassword(password);

        const addUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });

        await addUser.save();

        response.success = true;
        response.message = "User signIUp successfully";
        response.data = addUser;
        return res.status(201).send(response);
    } catch (error) {
        console.error(error);
        response.success = false;
        response.message = "Internal Server Error";
        response.data = null;
        return res.status(500).send(response);
    }
};

module.exports.getUserById = async (req, res) => {
  const _id = req.params._id; 

  try {
    const getUser = await User.findById({_id : _id});

    if (!getUser) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
        data: null
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Get User Successfully',
      data: getUser
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
