const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

//CREATES an account, Insert
server.post('/accounts', async (req, res, next) => {
    try {
        const newAccount = await db
        .insert({
            name: req.body.name,
            budget: req.body.budget
        })
        .into("accounts")

        res.status(201).json(newAccount)

    } catch (err) {
        next(err)
    }

})

//RETRIEVES all accounts, Select
server.get('/accounts', async (req, res, next) => {
    try {
        const accounts = await db
            .select("*")
            .from("accounts")

        res.json(accounts)
    } catch (err) {
        next(err)
    }

})

//UPDATES an account by ID, Update
server.put('/accounts/:id', async (req, res, next) => {
    try {
        await db("accounts")
        .update({
            name: req.body.name,
            budget: req.body.budget
        })
        .where("id", req.params.id)

        res.status(200).json({
            message: "Account has been updated"
        })
    } catch (err) {
        next(err)
    }

})

//DELETES an account by ID, Delete
server.delete('/accounts/:id', async (req, res, next) => {
    try {
        await db("accounts")
        .where("id", req.params.id)
        .del()

        res.status(204).end()
    } catch (err) {
        next(err)
    }

})



module.exports = server;
