const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')

//Route Createuser

router.post('/createuser', [
    body('email', 'enter proper email format').isEmail(),
    body('name', 'minimum length of the name must be 3').isLength({ min: 3 }),
    body('password', 'minimum length of the password must be 6').isLength({ min: 6 })
], async (req, res) => {
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }
    //checks if email already exists

    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({success, error: "User with that email is already registered." });
        }
        //creates new user
        const salt = await bcrypt.genSaltSync(10);
        const secpassword = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secpassword,
        })
        const data = {
            user: {
                id: user.id
            }
        }
        success = true
        const JWT_SIGN = 'maverickgoosetopgun7'
        const authtoken = jwt.sign(data, JWT_SIGN);
        res.json({success, authtoken: authtoken });
    }
    //catches error
    catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }
})
// Route Login
router.post('/login', [
    body('email', 'enter proper email format').isEmail(),
    body('password', 'Passwors cannot be blank').exists()
], async (req, res) => {
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({success, error: "Please enter correct login credentials." })
        }

        const passwordcompare = await bcrypt.compare(password, user.password);
        if (!passwordcompare) {
            return res.status(400).json({success, error: "Please enter correct login credentials." })
        }

        const data = {
            user: {
                id: user.id
            }
        }
        success = true;
        const JWT_SIGN = 'maverickgoosetopgun7'
        const authtoken = jwt.sign(data, JWT_SIGN);
        res.json({success, authtoken: authtoken });
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }
})
// Route Get User
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userid = req.user.id
        const user = await User.findOne({ userid }).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }
})

module.exports = router