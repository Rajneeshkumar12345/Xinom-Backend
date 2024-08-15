const mongoose = require('mongoose');

const FormDataSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    dob: { type: Date, required: true },
    residentialAddress: {
        street1: { type: String, required: true },
        street2: { type: String },
    },
    permanentAddress: {
        street1: { type: String, required: true },
        street2: { type: String },
    },
    documents: [
        {
            fileName: { type: String, required: true },
            fileType: { type: String, required: true },
            file: { type: String, required: true },  
        }
    ]
});

module.exports = mongoose.model('FormData', FormDataSchema);
