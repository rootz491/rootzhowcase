const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 100
    },
    description: {
        type: String,
        required: true,
        maxlength: 1000
    },
    previewImg: {
        type: String,
        required: true,
        maxlength: 1000
    },
    technologies: { /// array of tech names
        type: [String],
        default: []
    },
    zip: {  // location of projects' source code zip file on server (from root of project)
        type: String,
        required: true,
        maxlength: 100
    },
    live: { // link to live project
        type: String,
        required: true,
        maxlength: 100
    },
});

module.exports = mongoose.model('Project', projectSchema);
