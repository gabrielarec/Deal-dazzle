const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  
  Tag.findAll({ include: Product })
    .then((tags) => {
      res.status(200).json(tags);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Product,
        through: ProductTag,
      },
    ],
  })
    .then((tag) => {
      if (!tag) {
        return res.status(404).json({ message: 'Tag not found' });
      }
      res.json(tag);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name,
  })
    .then((tag) => {
      res.json(tag);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    { tag_name: req.body.tag_name },
    { where: { id: req.params.id } }
  )
    .then((updatedRows) => {
      if (updatedRows[0] === 0) {
        res.status(404).json({ message: 'Tag not found' });
      } else {
        res.json({ message: 'Tag updated successfully' });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: { id: req.params.id }
  })
    .then((result) => {
      console.log(result);
      if (result === 0) {
        return res.status(404).json({ message: 'Tags not found' });
      }

      res.status(204).json("Successfully Deleted");
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    });
});

module.exports = router;
