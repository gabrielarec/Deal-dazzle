const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products

  Category.findAll({include: Product})
  .then ((categories) => {
    res.status(200).json(categories);
  })
  .catch ((error) => {
    console.error(error);
    res.status(500).json ({message:'Server Error'});
  });

});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products

  Category.findByPk(req.params.id, {include: Product})
  .then((category) => {
    if (!category) {
      return res.status(400).json({ message: 'Category not found'});
    }

    res.status(200).json(category);
  })
  .catch((error) => {
  console.error(error);
  res.status(500).json({message: 'Server Error'});
  });

});

router.post('/', (req, res) => {
  // create a new category

  Category.create(req.body).then((category) => {
    res.status(201).json(category);
})
  .catch((error) => {
  console.error(error);
  res.status(500).json({ message: 'Server Error' });
  });

});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: { id: req.params.id }
  })
    .then((result) => {
      if (result[0] === 0) {
        return res.status(404).json({ message: 'Category not found' });
      }

      return Category.findByPk(req.params.id);
    })
    .then((category) => {
      res.status(200).json(category);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  
  Category.destroy({ 
    where: {id: req.params.id}
})
.then((result) => {
  console.log(result);
  if (result === 0) {
    return res.status(404).json({ message: 'Category not found' });
  }

  res.status(204).json("Successfully Deleted");
})
.catch((error) => {
  console.error(error);
  res.status(500).json({ message: 'Server Error' });
});

});

module.exports = router;
