const TeamMember = require('../models/teamMemberModel')
const mongoose = require('mongoose')
const bcrypt = require("bcryptjs")

// GET all TeamMembers
const getTeamMembers = async (req, res) => {
    try {
      const teamMembers = await TeamMember.find({}).sort({ createdAt: -1 });
      res.status(200).json({ message: "Team Member retrieved successfully", teamMembers });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // GET a single TeamMember
  const getTeamMember = async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Invalid Team Member ID" });
    }
    try {
      const teamMember = await TeamMember.findById(id);
      if (!teamMember) {
        return res.status(404).json({ error: "No such Team Member" });
      }
      res.status(200).json({ message: "Team Member retrieved successfully", teamMember });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // POST create a new TeamMember
  const createTeamMember = async (req, res) => {
    const { firstName, middleName, lastName, phoneNumber, role, email, managePayments, manageInvoices, managePipelines,
         manageJobRecurrence, manageTimeEntries, manageRatesinTimeEntries, manageAccounts, viewallAccounts, 
         manageTags, manageCustomFields, manageOrganizers, assignTeamMates, chargeFirmBalance, viewAllContacts, 
         manageContacts, manageProposals, manageSites, manageEmails, manageServices, editOrganizersAnswers, 
         managePublicFilterTemplates, manageDocuments, manageTemplates, manageIRSTranscripts, manageMarketPlace, 
         viewReporting } = req.body;
  
    try {
      //check the email already exists
      const existingAdmin = await TeamMember.findOne({ email });
      if (existingAdmin) {
        return res.status(400).json({ message: "Team Member with this Email already exists" });
      }
  
      const teamMember = await TeamMember.create({
        firstName, middleName, lastName, phoneNumber, role, email, managePayments, manageInvoices, managePipelines,
         manageJobRecurrence, manageTimeEntries, manageRatesinTimeEntries, manageAccounts, viewallAccounts, 
         manageTags, manageCustomFields, manageOrganizers, assignTeamMates, chargeFirmBalance, viewAllContacts, 
         manageContacts, manageProposals, manageSites, manageEmails, manageServices, editOrganizersAnswers, 
         managePublicFilterTemplates, manageDocuments, manageTemplates, manageIRSTranscripts, manageMarketPlace, 
         viewReporting
      });
      res.status(200).json({ message: "Team Member created successfully", teamMember });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  // DELETE a Team Member
  const deleteTeamMember = async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Invalid Team Member ID" });
    }
  
    try {
      const teamMember = await TeamMember.findOneAndDelete({ _id: id });
  
      if (!teamMember) {
        return res.status(404).json({ error: "No such Team Member" });
      }
  
      res.status(200).json({ message: "Team Member deleted successfully", teamMember });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // UPDATE a Team Member
  const updateTeamMember = async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Invalid Team Member ID" });
    }
  
    try {
      const updatedTeamMember = await TeamMember.findOneAndUpdate(
        { _id: id },
        { ...req.body },
        { new: true } // This option ensures that the updated document is returned
      );
  
      if (!updatedTeamMember) {
        return res.status(404).json({ error: "No such Team Member" });
      }
  
      res.status(200).json({ message: "Team Member updated successfully", TeamMember: updatedTeamMember });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

//get all TeamMember List
const getTeamMemberList = async (req, res) => {
  try {
      const teamMembers = await TeamMember.find({})
                const teamMemberslist = teamMembers.map(teammember => {
          return {
              id: teammember._id,
              FirstName: teammember.firstName,
              MiddleName : teammember.middleName,
              LastName :teammember.lastName,
              Email: teammember.email,
              Role: teammember.role,
              Created: teammember.createdAt,
              
          };
      });


      //sort({ createdAt: -1 });
      res.status(200).json({ message: "TeamMembers retrieved successfully", teamMemberslist })
  } catch (error) {
      res.status(500).json({ error: error.message })
  }
};




// UPDATE a password 
const updateTeamMemberPassword = async (req, res) => {
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
        const updatedTeamMember = await TeamMember.findOneAndUpdate(
            { email: email },
            { password: hashedPassword, cpassword: hashedcPassword },
            { new: true } // This option ensures that the updated document is returned
        );

        if (!updatedTeamMember) {
            return res.status(404).json({ error: "No such TeamMember" });
        }
        res.status(200).json({ message: "TeamMember password updated successfully", teamMember: updatedTeamMember });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    createTeamMember,
    getTeamMembers,
    getTeamMember,
    deleteTeamMember,
    updateTeamMember,
    getTeamMemberList,
    updateTeamMemberPassword,
}