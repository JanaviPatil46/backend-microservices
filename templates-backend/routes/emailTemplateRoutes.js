const express = require('express');
const router = express.Router();
const { getEmailTemplates,createEmailTemplate,getEmailTemplate,deleteEmailTemplate, updateEmailTemplate,getEmailTemplateList } = require('../controller/emailTemplateController')

router.get('/emailtemplate', getEmailTemplates)
router.get('/emailtemplate/:id', getEmailTemplate)
router.get('/emailtemplate/emailtemplateList/:id', getEmailTemplateList)
router.post('/emailtemplate', createEmailTemplate)
router.delete('/emailtemplate/:id', deleteEmailTemplate)
router.patch('/emailtemplate/:id', updateEmailTemplate)

module.exports = router;