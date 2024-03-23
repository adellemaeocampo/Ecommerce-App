const router = require('express').Router();
const { Category, Product } = require('../../models');

// GET all categories with associated products
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [{ model: Product }],
    });
    
    if (!categories || categories.length === 0) {
      return res.status(404).json({ message: 'No Categories Found' });
    }
    
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a category by its ID with associated products
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!category) {
      return res.status(404).json({ message: 'Category Not Found' });
    }

    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST a new category
router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

// PUT (update) a category by its ID
router.put('/:id', async (req, res) => {
  try {
    const updatedCategory = await Category.findByPk(req.params.id);
    
    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category Not Found' });
    } 

    await updatedCategory.update(req.body);

    res.status(200).json(updatedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE a category by its ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedCategory = await Category.findByPk(req.params.id);
    
    if (!deletedCategory) {
      return res.status(404).json({ message: 'Category Not Found' });
    }

    await deletedCategory.destroy();

    res.status(204).end();
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
