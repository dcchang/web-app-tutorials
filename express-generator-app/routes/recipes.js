var express = require('express');
var router = express.Router();
var data = require('../data.json');
const fs = require('fs');

// Get all recipe names
router.get('/', function (req, res, next) {
  const recipeNames = data.recipes.map((recipe) => recipe.name);
  res.status(200).json({ recipeNames: recipeNames });
});

// Get details for specific recipe
router.get('/details/:recipe', function (req, res, next) {
  try {
    const { recipe } = req.params;
    const desiredRecipe = data.recipes.filter((item) => item.name == recipe)[0];
    if (typeof desiredRecipe === 'undefined') throw 'Recipe does not exist';
    const ingredients = desiredRecipe.ingredients;
    const numSteps = desiredRecipe.instructions.length;
    res.status(200).json({
      details: { ingredients, numSteps },
    });
  } catch (error) {
    console.log(error);
    res.status(200).json({});
  }
});

// update data, and write it back to json file
router.post('/', function (req, res, next) {
  try {
    if (data.recipes.some((ele) => ele.name == req.body.name)) {
      throw 'Recipe already exists';
    }
    data.recipes.push(req.body);
    fs.writeFileSync(
      require('path').resolve(__dirname, '../data.json'),
      JSON.stringify(data, null, 2)
    );
    res.status(201).end();
  } catch (error) {
    console.log('error', error);
    res.status(400).json({ error });
  }
});

// update data, and write it back to json file
router.put('/', function (req, res, next) {
  try {
    const idx = data.recipes.findIndex((ele) => ele.name == req.body.name);
    data.recipes[idx] = req.body;
    if (!data.recipes.some((ele) => ele.name == req.body.name)) {
      throw 'Recipe does not exist';
    }
    fs.writeFileSync(
      require('path').resolve(__dirname, '../data.json'),
      JSON.stringify(data, null, 2)
    );
    res.status(204).end();
  } catch (error) {
    console.log('error', error);
    res.status(404).json({ error });
  }
});

module.exports = router;
