'use strict';
const express = require('express');
const router = express.Router();
const ProfileController = require('../controllers/profiles');

// router.route('/')
//   .get(ProfileController.getAll);
//   // .post(ProfileController.create)
//
//
// router.route('/:id')
//   .get(ProfileController.getOne)
//   .put(ProfileController.update);
//   // .delete(ProfileController.deleteOne)
router.get('/', ProfileController.getOne);

module.exports = router;
