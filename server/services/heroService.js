const HeroRepository = require('../repositories/heroRepository');
const TypeService = require('./typeService');
const { v4 } = require('uuid');

const {
  findAll, findOneByID, destroyHero, update, create,
} = HeroRepository;

const {
  fetchOneType,
  fetchOneTypeByName,
} = TypeService;

exports.fetchAllHeroes = async(offset) => {
  const { heroes: fetchedHeroes, count } = await findAll(offset);
  if (fetchedHeroes.length === 0) {
    throw new Error('No Heroes Found!');
  }

  const returnedHeroes = fetchedHeroes.map((hero) => {
    const heroValue = hero.dataValues;
    return {
      id: heroValue.id,
      name: heroValue.name,
      description: heroValue.description,
      level: heroValue.level,
      createdAt: heroValue.createdAt,
      updatedAt: heroValue.updatedAt,
      type: {
        id: heroValue.Type.dataValues.id,
        name: heroValue.Type.dataValues.name,
      },
    };
  });

  return { returnedHeroes, count };
};

exports.fetchOneHero = async(heroID) => {
  const fetchedHero = await findOneByID(heroID);
  if (!fetchedHero){
    throw new Error(`No Heroes With ID: ${heroID} is Found!`);
  }
  const fetchedHeroValue = fetchedHero.dataValues;
  return {
    id: fetchedHeroValue.id,
    name: fetchedHeroValue.name,
    description: fetchedHeroValue.description,
    level: fetchedHeroValue.level,
    createdAt: fetchedHeroValue.createdAt,
    updatedAt: fetchedHeroValue.updatedAt,
    type: {
      id: fetchedHeroValue.Type.dataValues.id,
      name: fetchedHeroValue.Type.dataValues.name,
    },
  };
};

exports.makeHero = async(payload) => {
  const {
    name,
    description,
    level,
    type: typeName,
  } = payload;

  if (!name){
    throw new Error('Hero\'s Name is Not Provided!');
  }

  const uuid = v4();
  const heroID = uuid.substr(0, uuid.indexOf('-'));
  let flag = true;
  while (flag){
    const searchedHero = await findOneByID(heroID);
    if (!searchedHero) flag = false;
  }

  let {
    typeID,
  } = payload;

  if (typeID){
    await fetchOneType(typeID);
  }
  if (typeName && !typeID){
    const returnedType = await fetchOneTypeByName(typeName);
    typeID = returnedType.id;
  }

  const newPayload = {
    id: heroID,
    name,
    description,
    level,
    typeID,
  };

  const createdHero = await create(newPayload);
  if (!createdHero.dataValues) {
    throw new Error('Failed to Create Hero!');
  }
  return createdHero;
};

exports.deleteHero = async(heroID) => {
  const heroToBeDeleted = await findOneByID(heroID);

  if (!heroToBeDeleted) {
    throw new Error('Cannot Find The Hero!');
  }

  const deletedHero = await destroyHero(heroID);
  if (deletedHero === 0){
    throw new Error('Failed to Delete Hero!');
  }

  return 'Success';
};

exports.updateHero = async(heroID, payload) => {
  const heroToBeUpdated = await findOneByID(heroID);

  if (!heroToBeUpdated){
    throw new Error('Cannot Find The Hero!');
  }

  if (!payload.type.id){
    const newType = await fetchOneTypeByName(payload.type.name);
    payload.type.id = newType.dataValues.id;
  }

  payload.typeID = payload.type.id;
  delete payload.type;

  const updatedHero = await update(heroID, payload);

  if (updatedHero[0] === 0){
    throw new Error('Failed To Update Tweet!');
  }

  return 'Success';
};
