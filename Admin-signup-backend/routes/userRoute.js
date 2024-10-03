
const express = require('express')
const router = express.Router()

const { createUser, getUsers, getUser, deleteUser, updateUser, adminSignup, getUserByEmail, updateUserPassword, updateLoginStatus, getUserListbyId , getUsersByRoles, getVerifyUserbyPassword} = require("../controller/userController");
const { validateToken, logout, cleanupBlacklist } = require("../middleware/authJwt");
const { generatetoken } = require("../controller/loginController");
const { adminLogin } = require("../controller/loginController");

//*******************USER START********************* */
router.post("/login/generatetoken", generatetoken);
router.get('/login/verifytoken', validateToken, (req, res) => {
    res.json({ message: 'Access granted', user: req.user });
});
router.post('/login/logout', validateToken, logout)
router.post("/login", adminLogin);
router.post("/login/signup", adminSignup);     //It is also for create user
router.get("/user", getUsers);
router.get("/user/:id", getUser);
router.post("/user", createUser);
router.delete("/user/:id", deleteUser);
router.patch("/user/:id", updateUser);
router.get("/user/email/getuserbyemail/:email", getUserByEmail);
router.post("/updateUserLoginStatus", updateLoginStatus);
router.get('/resetpassword/verifytoken', validateToken, (req, res) => {
    res.json({ message: 'Access granted', user: req.user });
});
router.patch("/user/password/updateuserpassword/", updateUserPassword);
router.get("/user/userlist/list/:id", getUserListbyId);
router.get('/users/roles', getUsersByRoles);
// router.post("/user/verifyuser/verifybyemail/verifybypassword", getVerifyUserbyPassword)
router.post("/user/verifyuserandpassword/", getVerifyUserbyPassword);

//*******************USER END********************* */
module.exports = router