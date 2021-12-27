const path = require('path');
const { getAllProjects, getProjectById, getProjectByIdWithZip, deleteProject, createProject } = require('../services/project');


// @route   GET api/projects/
// @desc    Get all projects
// @access  Public
exports.getProjects = async (req, res) => {
    try {
        const projects = await getAllProjects();
        if (!projects) {
            throw {
                status: 404,
                msg: "projects not found"
            };
        }
        res.status(200).json(projects);
    } catch (error) {
        console.log(error);
        res.status(error.status).json({message: error.msg});
    }
}

// @route   GET api/projects/:id
// @desc    Get project by id
// @access  Public
exports.getProjectById = async (req, res) => {
    try {
        const project = await getProjectById(req.params.id);
        if (!project) {
            throw {
                status: 404,
                msg: "project not found"
            };
        }
        res.status(200).json(project);
    } catch (error) {
        res.status(error.status).json({message: error.msg});
    }
}

// @route   POST api/projects/
// @desc    Create project
// @access  Private
exports.createProject = async (req, res) => {
    try {
        // verify input fields
        if (!req.body.name || !req.body.description || !req.body.previewImg || !req.body.technologies || !req.body.zip || !req.body.live) {
            throw {
                status: 400,
                msg: "missing fields"
            };
        }
        const project = await createProject(req.body);
        if (!project) {
            throw {
                status: 400,
                msg: "project not created"
            };
        }
        res.status(200).json(project);
    } catch (error) {
        res.status(error.status).json({message: error.msg});
    }
}

// @route   DELETE api/projects/:id
// @desc    Delete project
// @access  Private
exports.deleteProject = async (req, res) => {
    try {
        const project = await deleteProject(req.params.id);
        if (!project) {
            throw {
                status: 404,
                msg: "project not found"
            };
        }
        res.status(200).json(project);
    } catch (error) {
        res.status(error.status).json({message: error.msg});
    }
}

// @route  POST api/projects/:id/download
// @desc   Download project zip
// @access Protected
exports.downloadProject = async (req, res) => {
    try {
        const id = req.params.id;
        const project = await getProjectByIdWithZip(id);
        if (!project) {
            throw {
                status: 404,
                msg: "project not found"
            };
        }
        res.status(200).sendFile(path.join( __dirname, '/../../zip/', project.zip ));
    } catch (error) {
        console.log(error);
        res.status(error.status).json({message: error.msg});
    }
}