const express = require('express');
const router = express.Router();
const { createAccount, getAccount, getAccounts, updateAccount, deleteAccount, getAccountsList, getAccountsListById } = require('../controller/AccountController'); // Adjust the path to your actual controller

router.get('/accountdetails', getAccounts)

router.get('/accountdetails/:id', getAccount)

router.post('/accountdetails', createAccount)

router.delete('/accountdetails/:id', deleteAccount)

router.patch('/accountdetails/:id', updateAccount)

router.get('/account/accountdetailslist/', getAccountsList)

router.get('/accountdetails/accountdetailslist/listbyid/:id', getAccountsListById)

module.exports = router;
