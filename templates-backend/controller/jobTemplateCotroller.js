

const JobTemplate = require('../models/jobTemplateModel');
const mongoose = require("mongoose");
const User = require('../models/userModel')

//get all JobTemplate
const getJobTemplates = async (req, res) => {
    try {
        const JobTemplates = await JobTemplate.find({}).sort({ createdAt: -1 });
        res.status(200).json({ message: "JobTemplates retrieved successfully", JobTemplates });

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};

//Get a single JobTemplate
const getJobTemplate = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid JobTemplate ID" });
    }

    try {
        const jobTemplate = await JobTemplate.findById(id);

        if (!jobTemplate) {
            return res.status(404).json({ error: "No such JobTemplate" });
        }

        res.status(200).json({ message: "JobTemplate retrieved successfully", jobTemplate });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//POST a new JobTemplate 
const createJobTemplate = async (req, res) => {
    const { templatename, jobname, addshortcode, description, jobassignees, priority, absolutedates, startsin, startsinduration, duein, dueinduration, startdate, enddate, comments, active } = req.body;

    try {
        
        // Check if a task template with similar properties already exists
        const existingTemplate = await JobTemplate.findOne({
            templatename
        });

        if (existingTemplate) {
            return res.status(400).json({ error: "Job template already exists" });
        }
        // If no existing template is found, create a new one
        const newJobTemplate = await JobTemplate.create({ templatename, jobname, description, addshortcode, jobassignees, priority, absolutedates, startsin, startsinduration, duein, dueinduration, startdate, enddate, comments, active
        });
        return res.status(201).json({ message: "Job template created successfully", newJobTemplate });
    } catch (error) {
        console.error("Error creating JobTemplate:", error);
        return res.status(500).json({ error: "Error creating JobTemplate" });
    }
};


//delete a JobTemplate

const deleteJobTemplate = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid JobTemplate ID" });
    }

    try {
        const deletedJobTemplate = await JobTemplate.findByIdAndDelete({ _id: id });
        if (!deletedJobTemplate) {
            return res.status(404).json({ error: "No such JobTemplate" });
        }
        res.status(200).json({ message: "JobTemplate deleted successfully", deletedJobTemplate });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

//update a new tasktemplate 
const updateJobTemplate = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid JobTemplate ID" });
    }

    try {
        const updatedJobTemplate = await JobTemplate.findOneAndUpdate(
            { _id: id },
            { ...req.body },
            { new: true }
        );

        if (!updatedJobTemplate) {
            return res.status(404).json({ error: "No such JobTemplate" });
        }

        res.status(200).json({ message: "JobTemplate Updated successfully", updatedJobTemplate });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};



//Get a single JobTemplate List
const getJobTemplateList = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid JobTemplate ID" });
    }

    try {
        const jobTemplate = await JobTemplate.findById(id)
         .populate({ path: 'jobassignees', model: 'User' });
                  
        if (!jobTemplate) {
            return res.status(404).json({ error: "No such JobTemplate" });
        }

        res.status(200).json({ message: "JobTemplate retrieved successfully", jobTemplate });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    createJobTemplate,
    getJobTemplate,
    getJobTemplates,
    deleteJobTemplate,
    updateJobTemplate,
    getJobTemplateList
}