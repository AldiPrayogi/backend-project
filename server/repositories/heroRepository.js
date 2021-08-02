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
    where: {id: heroID},
  });
};

exports.findAll = async(offset) => {
  const heroes = await Hero.findAll({
    order: [
      ['createdAt', 'ASC'],
    ],
    include: [{model: Type, required: true}],
    limit: 10,
    offset: offset,
  });
  const count = await Hero.count();
  return { heroes, count };
};

exports.destroyHero = async(heroID) => {
  return Hero.destroy({
    where: {id: heroID},
  });
};


