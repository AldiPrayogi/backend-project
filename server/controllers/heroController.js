const HeroService = require('../services/heroService');

const {
  fetchAllHeroes,
  makeHero,
  fetchOneHero,
  updateHero,
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
    res.status(404).send({
      message: error.message,
    });
  }
};

exports.updateHero = async(req, res) => {
  console.log(req.params);
  console.log(req.body);
  const payload = {
    name: req.body.name,
  };
  console.log(payload);
  const { heroID } = req.params;

  try {
    await updateHero(heroID, payload);
    res.send({
      status: 201,
      message: 'Tweet Updated',
    });

  } catch (error){
    res.status(500).send({
      message: error.message,
    });
  }
};
