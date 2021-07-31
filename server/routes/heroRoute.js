const express = require('express');
const HeroController = require('../controllers/heroController');

const {
  createHero,
  findAllHeroes,
  findOneHero,
  updateHero,
} = HeroController;

const router = express.Router();

router.get('/', findAllHeroes);
router.post('/', createHero);
router.get('/:heroID', findOneHero);
router.put('/:heroID', updateHero);

module.exports = router;
