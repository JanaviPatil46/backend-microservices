const express = require('express')
const router = express.Router()
const { getTaskTemplates, getTaskTemplate, createTaskTemplate, deleteTaskTemplate, updateTaskTemplate, getTaskTemplateList } = require('../controller/taskTemplateController')

router.get('/tasktemplate', getTaskTemplates)
router.get('/tasktemplate/:id', getTaskTemplate)
router.post('/tasktemplate', createTaskTemplate)
router.delete('/tasktemplate/:id', deleteTaskTemplate)
router.patch('/tasktemplate/:id', updateTaskTemplate)
router.get('/tasktemplate/tasktemplatebyid/:id', getTaskTemplateList)

module.exports = router