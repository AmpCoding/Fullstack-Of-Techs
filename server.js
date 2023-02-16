const express = require("express");
const app = express();
const portNumber = 3000;
const bodyParser = require("body-parser");
const Sequelize = require("sequelize");
const { User, Admin, Task, DM } = require("./models");
const bcrypt = require("bcrypt");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const multer = require("multer");
let thePhrase = "Hey there, Fullstack of Techs!";
app.use(bodyParser.urlencoded({ extended : true}));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(cookieParser());
app.use(
    session({
        secret: "secret",
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: false,
            maxAge: 259200000
        }
    })
)

// Created a function to check if there is user information in the session.
function checkAuth(req, res, next){
    // console.log("We have arrived at authentication" );
    //if there is user info in the session, continue
    if(req.session.user || req.session.admin){
        // console.log("auth1");
        next();
    //or if the user is accessing the login page, same
    } else if(req.path == "/") {
        // console.log("auth2");
        next();
    //otherwise, redirect to login page
    } else {
        // console.log("auth3");
        res.redirect("/");
    }
}

// Rendering the login page for users to login or signup
app.get("/", function(req, res){
    res.render("home");
})

// Rendering the signup page for a new user to sign up and create an account
app.get("/signup", async function(req, res){
    res.render("signup");
})

// Signup page information that gets stored to the database
// Hashing the password using bcrypt (redirected back to login page)
// Everytime a new user sign ups for an account, a new task is sent to the admin to verify the user works in tech
app.post("/signup", async function(req, res){
    const { theFirstName, theLastName, theEmail, theLinkedIn, theJobTitle, theUsername, thePassword, theCity, theState, theZip, theAboutMe, filename, theAge, radioOption, radioOption2 } = req.body;
    // console.log(req.body);
    let theHashedPassword = await bcrypt.hash(thePassword, 10);
    // const { id } = req.params;
    // console.log(theUsers);
    let newUser = await User.create({
        firstName: theFirstName,
        lastName: theLastName,
        email: theEmail,
        linkedIn: theLinkedIn,
        jobTitle: theJobTitle,
        username: theUsername,
        password: theHashedPassword,
        city: theCity,
        state: theState,
        zip: theZip,
        aboutMe: theAboutMe,
        image: filename,
        age: theAge,
        sex: radioOption,
        interests: radioOption2,
        createdAt: new Date(),
        updatedAt: new Date(),
        verified_users: false
    })
    // console.log(newUser);
    // console.log(newUser.dataValues.id);
    // let theUsers = await User.findByPk(id);
    let newTask = await Task.create({
        adminId: 2,
        taskName: "Verify User",
        userId: newUser.dataValues.id,
        complete: false,
        createdAt: new Date(),
        updatedAt: new Date()
    })
    res.redirect("/");
})


// run checkAuth function first, then route handler
app.get("/feed", checkAuth, async function(req, res){
    let theUsers = await User.findAll();
    // console.log(theUsers);
    res.render("feed", {theUser: req.session.user, theUsers});
})

// Once the user logs in with the right credentials, redirect to the userfeed
// If not the right credentials, sends them back to the login page
app.post("/verification", async function(req, res){
    const { theUsername, thePassword } = req.body;
    // console.log(req.body);
    let theUserInfo = await User.findOne({
        where: {
            username: theUsername
        }
    });
    let theResult = await bcrypt.compare(thePassword, theUserInfo.password);
    if(theResult){
        req.session.user = theUserInfo;
        res.redirect("/feed");
    }
    else{
        res.redirect("/");
    };
})

// Rendering the admin login page
app.get("/adminlogin", function(req, res){
    res.render("admin-login");
})

// Rendering the admin profile (dark mode)
app.get("/adminlogin/verification/dark", function(req, res){
    res.render("admin-dark");
})

// Rendering the admin profile (light mode)
app.get("/adminlogin/verification", function(req, res){
    res.render("admin-light", {theAdmin: req.session.admin});
})

// Once the admin logs in with the right credentials, redirect to the admin profile
// If not the right credentials, sends them back to the login page
app.post("/adminlogin/verification", async function(req, res){
    const { theUsername, thePassword } = req.body;
    // console.log(req.body);
    let theAdminInfo = await Admin.findOne({
        where: {
            username: theUsername
        }
    });
    if(thePassword == theAdminInfo.password){
        req.session.admin = theAdminInfo;
        // console.log(req.session.admin);
        res.redirect("/adminlogin/verification");
    }
    else{
        res.redirect("/adminlogin");
    };
})

// Rendering the tasks page for admin to view all tasks
app.get("/adminlogin/verification/tasks", async function(req, res){
    let theUser = await User.findAll();
    // console.log(theUser);
    let theTasks = await Task.findAll();
    // console.log(theTasks);
    res.render("tasks", {theTask: req.session.task, theTasks, theUser});
})

// This function allows the admin to verify users
app.get("/adminlogin/verified/:pkid", async function(req, res) {
    const { pkid } = req.params;
    let theVerifiedUser = await User.update({
        verified_users: true
    },
    {
        where: {
            id: pkid
        }
    });
    res.redirect("/adminlogin/verification/tasks");
})

// This function allows the admin to delete a task
app.get("/adminlogin/delete/:id", async function(req, res){
    const { id } = req.params;
    let theDeletedTask = await Task.destroy({
        where: {
            id
        }
    })
    res.redirect("/adminlogin/verification/tasks");
})

// Run checkAuth function and render the profile pages
app.get("/profile/:id", checkAuth, async function(req, res){
    const { id } = req.params;
    let role;
    let sessionId;
    // console.log(req.params);
    // console.log(req.session.user.id);
    if(req.session.user){
        sessionId = req.session.user.id;
        role = "user";
    }
    else if(req.session.admin){
        sessionId = req.session.admin.id;
        role = "admin";
    }
    let theUser = await User.findByPk(id);
    res.render("profile", {theUser, sessionId});
})

// This function allows the user to edit their profile page
app.get("/profile/edit/:id", async function(req, res){
    // console.log(req);
    const { id } = req.params;
    let theUser = await User.findByPk(id);
    res.render("edit", { theUser })
})

// The updated user's information that gets stored to the database and redirected back to the user's profile page
app.post("/profile/edit/:pkid", async function(req, res){
    // console.log("I have arrived at the post");
    const { pkid } = req.params;
    // console.log(pkid);
    // console.log(req.params);
    const { theFirstName, theLastName, theEmail, theLinkedIn, theJobTitle, theUsername, theCity, theState, theZip, theAboutMe, filename, theAge, radioOption, radioOption2} = req.body;
    let editUser = await User.update({
        firstName: theFirstName,
        lastName: theLastName,
        email: theEmail,
        linkedIn: theLinkedIn,
        jobTitle: theJobTitle,
        username: theUsername,
        city: theCity,
        state: theState,
        zip: theZip,
        aboutMe: theAboutMe,
        image: filename,
        age: theAge,
        sex: radioOption,
        interests: radioOption2,
        updatedAt: new Date()
    },
    {
        where: {
            id: pkid
        }
    });
    res.redirect("/profile/" + pkid);
})

// Rendering a form for a user to initaite a message to another user
app.get("/profile/message/:id", async function(req, res){
    const { id } = req.params;
    let theUser = await User.findByPk(id);
    // console.log(req.params);
    res.render("initiate", { theUser });
})

// The message information that gets stored in the database and sent to the user. Redirects them back to that user's profile page
app.post("/profile/message/:id", async function(req, res){
    const { id } = req.params;
    // console.log(req.params);
    const { theSubject, theContent } = req.body;
    let theFirstMessage = await DM.create({
        toId: id,
        fromId: req.session.user.id,
        subject: theSubject,
        content: theContent,
        createdAt: new Date()
    })
    res.redirect("/profile/" + id);
})

// Rendering all the messages sent to the logged in user
app.get("/messages", async function(req, res){
    let theMessages = await DM.findAll({
        where: {
            toId: req.session.user.id
        }
    });
    res.render("messages", { theMessages });
})

// Rendering the page that opens a specific message
app.get("/message/:id", async function(req, res){
    const { id } = req.params;
    let theUser = await User.findByPk(id);
    // console.log(req.params);
    let theMessage = await DM.findOne({
        where: {
            fromId: id
        }
    })
    res.render("message", { theMessage, theUser });
})

// This function allows a user to delete a message they have recieved and redirects them back to their messages page
app.get("/message/delete/:id", async function(req, res){
    const { id } = req.params;
    let theDeletedMessage = await DM.destroy({
        where: {
            fromId: id
        }
    })
    res.redirect("/messages");
})

// This function allows a user to reply to a message. The message information gets stored to the database and sent back to the user
app.post("/message/:pkid", async function(req, res){
    const { pkid } = req.params;
    // console.log(req.params);
    const { theSubject, theContent } = req.body;
    let sendMessage = await DM.create({
        toId: pkid,
        fromId: req.session.user.id,
        subject: theSubject,
        content: theContent,
        createdAt: new Date()
    })
    res.redirect("/messages");
})

// Listening on portNumber
app.listen(portNumber, function(){
    console.log(`Listening on port ${portNumber}`);
})

// Renders my error page
app.get("/error", async function(req, res){
    res.render("error");
})

// Renders my lost page
app.get("*", async function(req, res){
    res.render("lost");
})
