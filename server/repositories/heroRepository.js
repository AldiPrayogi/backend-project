const db = require('../models');
const Hero = db.heroes;

exports.create = async(payload) => {
  return Hero.create(payload);
};

exports.findOneByID = async(heroID) => {
  return Hero.findByPk(heroID);
};

exports.update = async(heroID, payload) => {
  console.log('masuk repo');
  return Hero.update(payload, {
    where: {heroID: heroID},
  });
};

exports.findAll = async() => {
  return Hero.findAll({
    order: [
      ['createdAt', 'DESC'],
    ],
  });
};

exports.destroyHero = async(heroID) => {
  return Hero.destroy({
    where: {heroID: heroID},
  });
};


