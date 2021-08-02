const TypeService = require('../services/typeService');

const {
  fetchAllTypes,
  fetchOneType,
  makeType,
} = TypeService;

exports.findAllTypes = async(req, res) => {
  try {
    const allTypes = await fetchAllTypes();
    res.status(200).send(allTypes);
  } catch (error) {
    res.status(404).send({
      message: error.message,
    });
  }
};

exports.findOneType = async(req, res) => {
  try {
    const type = await fetchOneType();
    res.status(200).send(type);
  } catch (error) {
    res.status(404).send({
      message: error.message,
    });
  }
};

exports.createType = async(req, res) => {
  const payload = req.body;
  try {
    const createdType = await makeType(payload);
    res.send({
      status: 201,
      createdType: createdType,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};
