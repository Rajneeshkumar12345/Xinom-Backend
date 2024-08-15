const FormData = require("../models/formData");

exports.submitForm = async (req, res) => {
    try {
        const formData = new FormData(req.body);

        if (req.files && req.files.documents) {
            formData.documents = req.files.documents.map(file => ({
                fileName: file.originalname,
                fileType: file.mimetype,
                file: file.path
            }));
        }

        await formData.save();
     return res.status(200).json({
         success: true ,
         message: 'Form submitted successfully!'
        });
    } catch (err) {
     return  res.status(500).json({ error: err.message, success: false });
    }
};

