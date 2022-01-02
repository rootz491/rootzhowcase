const Project = require('../models/project');

// get all projects without zip
exports.getAllProjects = async () => {
    try {
        const projects = await Project.find().select('-__v -zip -description -live'); // don't include __v, zip and description
        if (!projects)
            throw "SERVICE: projects not found";
        return projects;
    } catch (error) {
        console.log(error);
        return false;
    }
}

//  get project by id for normal users
exports.getProjectById = async (id) => {
    try {
        const project = await Project.findById(id).select('-__v -zip'); // don't include __v and zip
        if (!project)
            throw "SERVICE: project not found";
        return project;
    } catch (error) {
        console.log(error);
        return false;
    }
}

//  update project by id for pro users
exports.getProjectByIdWithZip = async (id) => {
    try {
        const project = await Project.findById(id).select('zip');
        if (!project)
            throw "SERVICE: project not found";
        return project;
    } catch (error) {
        console.log(error);
        return false;
    }
}

//  create project for admin user
exports.createProject = async (project) => {
    try {
        const newProject = new Project(project);
        newProject.save();
        if (!newProject)
            throw "SERVICE: project not created";
        return newProject;
    } catch (error) {
        console.log(error);
        return false;
    }
}

//  delete project for admin user
exports.deleteProject = async (id) => {
    try {
        const project = await Project.findByIdAndDelete(id);
        if (!project)
            throw "SERVICE: project not deleted";
        return project;
    } catch (error) {
        console.log(error);
        return false;
    }
}