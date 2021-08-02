const HeroService = require('../services/heroService');

const {
  fetchAllHeroes,
  makeHero,
  fetchOneHero,
  updateHero,
  deleteHero,
} = HeroService;

exports.findAllHeroes = async(req, res) => {
  try {
    const allHeroes = await fetchAllHeroes();
    res.status(200).send(allHeroes);
  } catch (error) {
    res.status(404).send({
      message: error.message,
    });
  }
};

exports.findOneHero = async(req, res) => {
  const { heroID } = req.params;
  try {
    const hero = await fetchOneHero(heroID);
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
  };
  const { heroID } = req.params;

  try {
    await updateHero(heroID, payload);
    res.send({
      status: 201,
      message: `Hero with HeroID=${heroID} Updated`,
    });

  } catch (error){
    res.status(500).send({
      message: error.message,
    });
  }
};

exports.destroy = async(req, res) => {
  const { heroID } = req.params;

  try {
    await deleteHero(heroID);
    res.send({
      status: 200,
      message: `Hero with ID ${heroID} is Successfully Deleted`,
    });
  } catch (error) {
    res.send({
      status: 500,
      message: error.message,
    });
  }
};
