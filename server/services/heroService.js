const HeroRepository = require('../repositories/heroRepository');
const { v4 } = require('uuid');

const {
  findAll, findOneByID, destroyHero, update, create,
} = HeroRepository;

exports.fetchAllHeroes = async() => {
  const fetchedHeroes = await findAll();
  console.log(fetchedHeroes);
  if (fetchedHeroes.length === 0) {
    throw new Error('No Heroes Found!');
  }

  return fetchedHeroes;
};

exports.fetchOneHero = async(heroID) => {
  const fetchedHero = await findOneByID(heroID);
  if (!fetchedHero){
    throw new Error(`No Heroes With ID: ${heroID} is Found!`);
  }
  return fetchedHero;
};

exports.makeHero = async(payload) => {
  const uuid = v4();
  const heroID = uuid.substr(0, uuid.indexOf('-'));
  let flag = true;
  while (flag){
    const searchedTweet = await findOneByID(heroID);
    if (!searchedTweet) flag = false;
  }

  const {
    name,
  } = payload;

  if (!name){
    throw new Error('Hero\'s Name is Not Provided!');
  }

  const newPayload = {
    heroID, name,
  };

  const createdHero = await create(newPayload);
  if (!createdHero.dataValues) {
    throw new Error('Failed to Create Hero!');
  }
  return createdHero;
};

exports.deleteHero = async(payload) => {
  const { HeroID } = payload;
  const heroToBeDeleted = await findOneByID(HeroID);

  if (!heroToBeDeleted) {
    throw new Error('Cannot Find The Hero!');
  }

  const deletedHero = await destroyHero(HeroID);
  if (deletedHero[0] === 0){
    throw new Error('Failed to Delete Hero!');
  }

  return 'Success';
};

exports.updateHero = async(heroID, payload) => {
  const heroToBeUpdated = await findOneByID(heroID);

  if (!heroToBeUpdated){
    throw new Error('Cannot Find The Hero!');
  }

  const updatedHero = await update(heroID, payload);

  if (updatedHero[0] === 0){
    throw new Error('Failed To Update Tweet!');
  }

  return 'Success';
};
