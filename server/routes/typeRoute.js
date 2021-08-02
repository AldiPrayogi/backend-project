const express = require('express');
const TypeController = require('../controllers/typeController');

const {
  createType,
  findAllTypes,
  findOneType,
} = TypeController;

const router = express.Router();

router.get('/', findAllTypes);
router.post('/', createType);
router.get('/:typeID', findOneType);

module.exports = router;
