const express = require('express');
const { isAdmin, isPro } = require('../middlewares/auth');
const { getProjects, getProjectById, createProject, deleteProject, downloadProject } = require('../controllers/project');
const router = express.Router();

router.get('/', (req, res) => {
    getProjects(req, res);
});

router.get('/:id', (req, res) => {
    getProjectById(req, res);
});

router.get('/:id/download', isPro, (req, res) => {
    downloadProject(req, res);
});

router.post('/', isAdmin, (req, res) => {
    createProject(req, res);
});

router.delete('/:id', isAdmin, (req, res) => {
    deleteProject(req, res);
});

module.exports = router;
