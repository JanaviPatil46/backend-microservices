const Invoice = require('../models/invoiceModel');
const mongoose = require("mongoose");

//get all Invoice
const getInvoices = async (req, res) => {
    try {
        const invoice = await Invoice.find({}).sort({ createdAt: -1 });
        res.status(200).json({ message: "Invoices retrieved successfully", invoice });

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};

//Get a single Invoice
const getInvoice = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid Invoice ID" });
    }

    try {
        const invoice = await Invoice.findById(id);

        if (!invoice) {
            return res.status(404).json({ error: "No such Invoice" });
        }

        res.status(200).json({ message: "Invoice retrieved successfully", invoice });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error.message)
    }
};



//POST a new Invoice 
const createInvoice = async (req, res) => {
    const { account, invoicenumber, invoicedate, description, invoicetemplate, paymentMethod, teammember, emailinvoicetoclient,
        reminders, daysuntilnextreminder, numberOfreminder, scheduleinvoice, scheduleinvoicedate, scheduleinvoicetime,
        payInvoicewithcredits, lineItems, summary, active } = req.body;

    try {
        const existingInvoice = await Invoice.findOne({
            invoicenumber
        });

        if (existingInvoice) {
            return res.status(201).json({ message: "Invoice already exists" });
        }
        const newInvoice = await Invoice.create({
            account, invoicenumber, invoicedate, description, invoicetemplate, paymentMethod, teammember, emailinvoicetoclient,
            reminders, daysuntilnextreminder, numberOfreminder, scheduleinvoice, scheduleinvoicedate, scheduleinvoicetime,
            payInvoicewithcredits, lineItems, summary, active
        });

        return res.status(201).json({ message: "Invoice created successfully", newInvoice });

    } catch (error) {
        console.error("Error creating Invoice:", error);
        return res.status(500).json({ error: "Error creating Invoice", error });
    }
};


//delete a Invoice
const deleteInvoice = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid Invoice ID" });
    }

    try {
        const deletedInvoice = await Invoice.findByIdAndDelete({ _id: id });
        if (!deletedInvoice) {
            return res.status(404).json({ error: "No such Invoice" });
        }
        res.status(200).json({ message: "Invoice deleted successfully", deletedInvoice });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

//update a new Invoice 
const updateInvoice = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid Invoice ID" });
    }

    try {
        const updatedInvoice = await Invoice.findOneAndUpdate(
            { _id: id },
            { ...req.body },
            { new: true }
        );

        if (!updatedInvoice) {
            return res.status(404).json({ error: "No such Invoice" });
        }

        res.status(200).json({ message: "Invoice Updated successfully", updatedInvoice });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


//Get a single InvoiceList List
const getInvoiceList = async (req, res) => {
    const invoiceList = [];
    try {
        const invoice = await Invoice.find()
            .populate({ path: 'account', model: 'account' })
            .populate({ path: 'teammember', model: 'User' });

        const account = invoice.account.map(accountname);
        const Assignee = invoice.teammember.map(teammember);

        invoiceList.push({
            clientname: account.accountname,
            clientid: account._id,
            invoice: invoice.invoicenumber,
            status: "",
            assigneename: Assignee.username,
            assigneeid: Assignee._id,
            posted: "",
            amount: invoice.amount,
            paid: "",
            description: invoice.description
        })

        res.status(200).json({ message: "Invoice retrieved successfully", invoiceList });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



//Get a single InvoiceList List
const getInvoiceListbyid = async (req, res) => {
    const { id } = req.params;
   
    try {
        const invoice = await Invoice.findById(id)
            .populate({ path: 'account', model: 'account' })
            .populate({ path: 'invoicetemplate', model: 'InvoiceTemplate' })
            .populate({ path: 'teammember', model: 'User' });

        res.status(200).json({ message: "Invoice retrieved successfully", invoice });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    createInvoice,
    getInvoices,
    getInvoice,
    deleteInvoice,
    updateInvoice,
    getInvoiceList,
    getInvoiceListbyid,
}