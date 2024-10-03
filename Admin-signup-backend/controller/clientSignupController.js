const Client = require('../models/clientSignUpModel')
const mongoose = require('mongoose')
const bcrypt = require("bcryptjs")

// GET all Client
const getClients = async (req, res) => {
    try {
      const clients = await Client.find({}).sort({ createdAt: -1 });
      res.status(200).json({ message: "Clients retrieved successfully", clients });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // GET a single Client
  const getClient = async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Invalid Client ID" });
    }
    try {
      const client = await Client.findById(id);
      if (!client) {
        return res.status(404).json({ error: "No such Client" });
      }
      res.status(200).json({ message: "Client retrieved successfully", client });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // POST create a new Client
  const createClient = async (req, res) => {
    const { firstName, middleName, lastName, accountName, phoneNumber, email, password, cpassword } = req.body;
  
    try {
      //check the email already exists
      const existingClient = await Client.findOne({ email });
      if (existingClient) {
        return res.status(400).json({ message: "Client with this Email already exists" });
      }
  
      const client = await Client.create({
        firstName, middleName, lastName, accountName, phoneNumber, email, password, cpassword});
      res.status(200).json({ message: "Client created successfully", client });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  // DELETE a Client
  const deleteClient = async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Invalid Client ID" });
    }
  
    try {
      const client = await Client.findOneAndDelete({ _id: id });
  
      if (!client) {
        return res.status(404).json({ error: "No such Client" });
      }
  
      res.status(200).json({ message: "Client deleted successfully", client });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // UPDATE a Client
  const updateClient = async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Invalid Client ID" });
    }
  
    try {
      const updatedClient = await Client.findOneAndUpdate(
        { _id: id },
        { ...req.body },
        { new: true } // This option ensures that the updated document is returned
      );
  
      if (!updatedClient) {
        return res.status(404).json({ error: "No such Client" });
      }
  
      res.status(200).json({ message: "Client updated successfully", admin: updatedClient});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

// UPDATE a password 
const updateclientPassword = async (req, res) => {
    const { email, password, cpassword } = req.body;

    try {
        // Check if password and confirm password match
        if (password !== cpassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }
       // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);
        const hashedcPassword = await bcrypt.hash(cpassword, 10);

        // Find the admin by email and update their password
        const updatedClient = await Client.findOneAndUpdate(
            { email: email },
            { password: hashedPassword, cpassword: hashedcPassword },
            { new: true } // This option ensures that the updated document is returned
        );

        if (!updatedClient) {
            return res.status(404).json({ error: "No such Client" });
        }
        res.status(200).json({ message: "Client password updated successfully", client: updatedClient });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getClientByEmail = async (req, res) => {
    const { email } = req.body;

    try {
        // Find the Client by email
        const client = await Client.find({ email });

        if (!client) {
            return res.status(404).json({ error: "No such Client" });
        }

        res.status(200).json({ message: "Client retrieved successfully", client });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createClient,
    getClients,
    getClient,
    deleteClient,
    updateClient,
    updateclientPassword,
    getClientByEmail
}