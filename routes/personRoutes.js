const router = require("express").Router();
const Person = require("../models/Person");

router.post("/", async (req, res) => {
  const { name, salary, approved } = req.body;

  if (!name) {
    res.status(422).json({ error: "O nome é obrigatório!" });
  }

  if (!salary) {
    res.status(422).json({ error: "O salário é obrigatório!" });
  }

  if (!approved) {
    res.status(422).json({ error: "O campo approved é obrigatório!" });
  }

  const person = {
    name,
    salary,
    approved,
  };

  try {
    await Person.create(person);
    res.status(201).json({ messagem: "Pessoa cadastrada com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/", async (req, res) => {
  try {
    const people = await Person.find();
    res.status(200).json(people);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const person = await Person.findOne({ _id: id });

    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
