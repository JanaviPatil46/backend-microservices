const mongoose = require('mongoose');

const emailTemplateSchema = new mongoose.Schema({
    templatename: {
        type: String,
        required: [true, 'Template name is required'],
        trim: true
    },
    from: {
        type: mongoose.Schema.Types.ObjectId,
    },

    emailsubject: {
        type: String,
    },

    

    emailbody: {
        type: String,
    },

    active: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

const EmailTemplate = mongoose.model('EmailTemplate', emailTemplateSchema);
module.exports = EmailTemplate;