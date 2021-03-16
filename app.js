//load app server using express somehow...
const express = require('express')
const app = express()
const morgan = require("morgan") //to know what exactly is going wrong if there's an error
const mysql = require('mysql')

app.use(morgan("combined"))

app.get('/user/:id', (req, res) => {
    console.log("Fetching user with id: " + req.params.id)

    const connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        database: "lbta_mysql"
    })

    connection.query("SELECT * FROM users", (err, rows, fields) => {
        console.log("I think we fetched users successfully")
        res.json(rows)
    })

    res.end()
})

app.get("/", (req, res) =>{
    console.log("Responding to root route")
    res.send("Hello from ROOOOOT")
})

app.get("/users", (req, res) => {
    const user1 = {firstName: "Stephen", last: "Curry"}
    const user2 = {firstName: "Kevin", lastName: "Durant"}
    res.json([user1, user2])
    // res.send("Nodemon auto updates when I save this file")
})

// localhost:3000
app.listen(3000, () => {
    console.log("Server is up and listening on 3000...")
})