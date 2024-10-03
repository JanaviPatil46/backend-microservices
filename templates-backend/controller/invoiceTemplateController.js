const InvoiceTemplate = require('../models/invoiceTemplateModel');
const mongoose = require("mongoose");

//get all InvoiceTemplate
const getInvoiceTemplates = async (req, res) => {
    try {
        const invoiceTemplate = await InvoiceTemplate.find({}).sort({ createdAt: -1 });
        res.status(200).json({ message: "InvoiceTemplates retrieved successfully", invoiceTemplate });

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};

//Get a single InvoiceTemplate
const getInvoiceTemplate = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid InvoiceTemplate ID" });
    }

    try {
        const invoiceTemplate = await InvoiceTemplate.findById(id);

        if (!invoiceTemplate) {
            return res.status(404).json({ error: "No such InvoiceTemplate" });
        }

        res.status(200).json({ message: "InvoiceTemplate retrieved successfully", invoiceTemplate });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error.message)
    }
};



//POST a new InvoiceTemplate 
const createInvoiceTemplate = async (req, res) => {
    const { templatename, description, paymentMethod, sendEmailWhenInvCreated, messageForClient, payInvoicewithcredits, sendReminderstoClients, daysuntilnextreminder, numberOfreminder, lineItems, summary, active } = req.body;

    try {
        const existingInvoiceTemplate = await InvoiceTemplate.findOne({
            templatename
        });

        if (existingInvoiceTemplate) {
            return res.status(201).json({ message: "InvoiceTemplate already exists" });
        }
        const newInvoiceTemplate = await InvoiceTemplate.create({ templatename, description, paymentMethod, sendEmailWhenInvCreated, messageForClient, payInvoicewithcredits, sendReminderstoClients, daysuntilnextreminder, numberOfreminder, lineItems, summary, active });

        return res.status(201).json({ message: "InvoiceTemplate created successfully", newInvoiceTemplate });

    } catch (error) {
        console.error("Error creating InvoiceTemplate:", error);
        return res.status(500).json({ error: "Error creating InvoiceTemplate", error });
    }
};


//delete a InvoiceTemplate
const deleteInvoiceTemplate = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid InvoiceTemplate ID" });
    }

    try {
        const deletedInvoiceTemplate = await InvoiceTemplate.findByIdAndDelete({ _id: id });
        if (!deletedInvoiceTemplate) {
            return res.status(404).json({ error: "No such InvoiceTemplate" });
        }
        res.status(200).json({ message: "InvoiceTemplate deleted successfully", deletedInvoiceTemplate });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

//update a new InvoiceTemplate 
const updateInvoiceTemplate = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid InvoiceTemplate ID" });
    }

    try {
        const updatedInvoiceTemplate = await InvoiceTemplate.findOneAndUpdate(
            { _id: id },
            { ...req.body },
            { new: true }
        );

        if (!updatedInvoiceTemplate) {
            return res.status(404).json({ error: "No such InvoiceTemplate" });
        }

        res.status(200).json({ message: "InvoiceTemplate Updated successfully", updatedInvoiceTemplate });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


module.exports = {
    createInvoiceTemplate,
    getInvoiceTemplates,
    getInvoiceTemplate,
    deleteInvoiceTemplate,
    updateInvoiceTemplate,
}