const express = require('express');
const HeroController = require('../controllers/heroController');

const {
  createHero,
  findAllHeroes,
  findOneHero,
  updateHero,
  destroy,
} = HeroController;

const router = express.Router();

router.get('/', findAllHeroes);
router.post('/', createHero);
router.get('/:id', findOneHero);
router.put('/:id', updateHero);
router.delete('/:id', destroy);

module.exports = router;
