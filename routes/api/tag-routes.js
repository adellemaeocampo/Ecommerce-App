const router = require('express').Router();
const { Tag, Product } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    // find all tags
    const tags = await Tag.findAll({
      // be sure to include its associated Product data
      include: [{ model: Product }]
    });
  
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async(req, res) => {
  try {
    // find a single tag by its `id`
    const tag = await Tag.findByPk(req.params.id, {
      // be sure to include its associated Product data
      include: [{ model: Product }]
    });

    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }
    
    res.status(200).json(tag);
  } catch (err) { 
    res.status(500).json(err);
  }
});

router.post('/', async(req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(req.body);
    res.status(201).json(newTag);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

router.put('/:id', async(req, res) => {
  // update a tag's name by its `id` value
  try {
    const [updatedTagCount] = await Tag.update(req.body, {
      where: { id: req.params.id }
    });

    if (updatedTagCount === 0) {
      return res.status(404).json({ message: 'Tag not found' });
    }
    
    res.status(200).json({ message: 'Tag updated successfully' });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async(req, res) => {
  // delete on tag by its `id` value
  try {
    const deletedTagCount = await Tag.destroy({
      where: { id: req.params.id }
    });

    if (deletedTagCount === 0) {
      return res.status(404).json({ message: 'Tag not found' });
    }

    res.status(200).json({ message: 'Tag deleted successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
