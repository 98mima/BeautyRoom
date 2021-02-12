const express = require('express');
const requestController = require('../controllers/request');
const router = express.Router();

router.get('/all', requestController.getRequests)

router.get('/getByUserId/:userId', requestController.getByUserId)

router.post('/add', requestController.addRequest);

router.put('/rejectRequest', requestController.rejectRequest);

router.put('/acceptRequest', requestController.acceptRequest);

router.delete('/delete', requestController.deleteRequest);

// router.delete('/delete', requestController.deleteResolvedRequests)

module.exports = router;