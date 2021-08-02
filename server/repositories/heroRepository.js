const db = require('../models');
const Hero = db.heroes;
const Type = db.types;

exports.create = async(payload) => {
  return Hero.create(payload);
};

exports.findOneByID = async(heroID) => {
  return Hero.findOne({
    where: {id: heroID},
    include: [{model: Type, required: true}],
  });
};

exports.update = async(heroID, payload) => {
  return Hero.update(payload, {
    where: {heroID: heroID},
  });
};

exports.findAll = async() => {
  return Hero.findAll({
    order: [
      ['createdAt', 'ASC'],
    ],
    include: [{model: Type, required: true}],
  });
};

exports.destroyHero = async(heroID) => {
  return Hero.destroy({
    where: {id: heroID},
  });
};


