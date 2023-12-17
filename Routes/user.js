const express = require('express');
const routes = express.Router();
const userSchema = require('../Schema/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendResponse = require('../helpers/sendResponse');

routes.get('/' , async (req, res) => {
    try {
        const user = await userSchema.find();
        sendResponse(res, 200, user, 'User_Get_All', false);
    } catch (err) {
        sendResponse(res, 400, null, 'User_Not_Found', true);
    }
});

routes.post('/', async (req, res) => {
    try {
        const salt = await bcrypt.genSaltSync(10);
        const hash = await bcrypt.hashSync(req.body.password, salt);
        req.body.password = hash
        console.log('hash password-----> ', hash);
        const user = await userSchema.create({ ...req.body });
        sendResponse(res, 200, user, 'User_Signup successfully', false);
    } catch (err) {
        sendResponse(res, 400, null, 'User_Not_Found', true);
    }
});


routes.post('/login' , async (req , res) => {
    try {
        const { email, password } = req.body;
        const user = await userSchema.findOne({ email: email });
        if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.password);
            console.log(isPasswordValid);
            if (isPasswordValid) {
                const token = await jwt.sign({
                    data: user
                }, 'JFKJEKLJREKLNHRKLEJTHRJKLTHEJL')
                sendResponse(res, 200, { user , token }, 'User_Login', false);
            } 
            else {
                sendResponse(res, 400, null, 'Password Does Not Exist', true);
            }
        } 
        else {
            sendResponse(res, 400, null, 'Email Does Not Exist', true);
        }
    } catch (err) {
        sendResponse(res, 400, null, 'User_Not_Found', true);
    }
}) 



routes.get('/:id', async (req, res) => {
    try {
        const user = await userSchema.findById(req.params.id);
        sendResponse(res, 200, user, 'User_Get_One', false);
    } catch (err) {
        sendResponse(res, 400, null, 'User_Not_Found', true);
    }
})

routes.put('/:id', async (req, res) => {
    try {
        const salt = await bcrypt.genSaltSync(10);
        const hash = await bcrypt.hashSync(req.body.password, salt);
        req.body.password = hash
        const user = await userSchema.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true });
        sendResponse(res, 200, user, 'User_Updated', false);
    } catch (err) {
        sendResponse(res, 400, null, 'User_Not_Found', true);
    }
})


routes.delete('/:id', async (req, res) => {
    try {
        const user = await userSchema.findByIdAndDelete(req.params.id)
        sendResponse(res, 200, user, 'User_Delete', false);
    } catch (err) {
        sendResponse(res, 400, null, 'User_Not_Found', true);
    }
})







module.exports = routes











