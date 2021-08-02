const db = require('../models');
const Type = db.types;

exports.create = async(payload) => {
  return Type.create(payload);
};

exports.findAll = async() => {
  return Type.findAll({
    order: [
      ['createdAt', 'ASC'],
    ],
  });
};

exports.findOne = async(typeID) => {
  return Type.findByPk(typeID);
};
