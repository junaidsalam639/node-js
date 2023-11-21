const express = require('express');
const userModel = require('../Schema/userSchema');
const route = express.Router();

route.get('/', async (req, res) => {
    try {
        const user = await userModel.find();
        res.send({
            status: 200,
            user, user
        });
    } catch (err) {
        console.log(err.message);
    }
})

route.get('/:id', async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id);
        res.send({
            status: 200,
            user, user
        });
    } catch (err) {
        console.log(err.message);
    }
})

route.post('/', async (req, res) => {
    try {
        const user = await userModel.create({ ...req.body });
        console.log(user);
        res.send({
            status: 200,
            user: user,
        })
    } catch (err) {
        console.log(err.message)
    }
});

route.put('/:id', async (req, res) => {
    try {
        const user = await userModel.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true });
        console.log(user);
        res.send({
            status: 200,
            user: user,
        })
    } catch (err) {
        console.log(err.message)
    }
});


route.delete('/:id', async (req, res) => {
    try {
        const user = await userModel.findByIdAndDelete(req.params.id);
        console.log(user);
        res.send({
            status: 200,
            user: user,
        })
    } catch (err) {
        console.log(err.message)
    }
});





module.exports = route







