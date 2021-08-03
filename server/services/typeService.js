const TypeRepository = require('../repositories/typeRepository');
const { v4 } = require('uuid');

const {
  findAll, findOne, create, findOneByName,
} = TypeRepository;

exports.makeType = async(payload) => {
  const uuid = v4();
  const typeID = uuid.substr(0, uuid.indexOf('-'));
  let flag = true;
  while (flag){
    const searchedType = await findOne(typeID);
    if (!searchedType) flag = false;
  }

  const {
    name,
  } = payload;

  if (!name){
    throw new Error('Type\'s Name is Not Provided!');
  }

  const newPayload = {
    id: typeID, name,
  };

  const createdType = await create(newPayload);

  if (!createdType.dataValues) {
    throw new Error('Failed to Create Type!');
  }

  return createdType;
};

exports.fetchAllTypes = async() => {
  const fetchedTypes = await findAll();
  if (fetchedTypes.length === 0) {
    throw new Error('No Types Found!');
  }

  return fetchedTypes;
};

exports.fetchOneType = async(typeID) => {
  const fetchedType = await findOne(typeID);
  if (!fetchedType){
    throw new Error(`No Type With ID: ${typeID} is Found!`);
  }
  return fetchedType;
};

exports.fetchOneTypeByName = async(typeName) => {
  const fetchedType = await findOneByName(typeName);
  if (!fetchedType){
    throw new Error(`No Type With name: ${typeName} is Found!`);
  }
  return fetchedType;
};

