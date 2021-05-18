const router = require('express').Router();

const workspaceController = require('../controllers/workspace');

router.get('/', workspaceController.workspace_get_all);

router.post('/', workspaceController.workspace_add);

router.patch('/add-user/:id', workspaceController.workspace_add_user);

router.get('/:id', workspaceController.workspace_get_one);

router.delete('/:id', workspaceController.workspace_delete);

router.patch('/:id', workspaceController.workspace_update);

module.exports = {
    router,
};
