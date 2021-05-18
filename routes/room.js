const router = require('express').Router();

const roomController = require('../controllers/room');

router.get('/', roomController.room_get_all);

router.post('/', roomController.room_add);

router.patch('/add-user/:id', roomController.room_add_user);

router.get('/:id', roomController.room_get_one);

router.delete('/:id', roomController.room_delete);

router.patch('/:id', roomController.room_update);

module.exports = {
    router,
};
