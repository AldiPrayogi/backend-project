const HeroService = require('../services/heroService');

const {
  fetchAllHeroes,
  makeHero,
  fetchOneHero,
  updateHero,
  deleteHero,
} = HeroService;

exports.findAllHeroes = async(req, res) => {
  const offset = req.query.offset ? req.query.offset : 0;
  try {
    const allHeroes = await fetchAllHeroes(offset);
    res.status(200).send(allHeroes);
  } catch (error) {
    res.status(404).send({
      message: error.message,
    });
  }
};

exports.findOneHero = async(req, res) => {
  const { id } = req.params;
  try {
    const hero = await fetchOneHero(id);
    res.status(200).send(hero);
  } catch (error) {
    res.status(404).send({
      message: error.message,
    });
  }
};

exports.createHero = async(req, res) => {
  const payload = req.body;
  try {
    const createdHero = await makeHero(payload);
    res.send({
      status: 201,
      createdHero: createdHero,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

exports.updateHero = async(req, res) => {
  const payload = {
    name: req.body.name,
    description: req.body.description,
    type: req.body.type,
    level: req.body.level,
  };
  const { id } = req.params;
  try {
    await updateHero(id, payload);
    res.send({
      status: 201,
      message: `Hero with HeroID=${id} Updated`,
    });

  } catch (error){
    res.status(500).send({
      message: error.message,
    });
  }
};

exports.destroy = async(req, res) => {
  const { id } = req.params;

  try {
    await deleteHero(id);
    res.send({
      status: 200,
      message: `Hero with ID ${id} is Successfully Deleted`,
    });
  } catch (error) {
    res.send({
      status: 500,
      message: error.message,
    });
  }
};
