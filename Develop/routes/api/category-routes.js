const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try{
    const allCatergories = await Category.findAll({
      include:[{model: Product}],

    })
    res.status(200).json(allCatergories)
    console.log('route hit!')
  }catch(e){
    res.json(e)
  }
});

router.get('/:id', async (req, res) => {
  try{
    const oneCategory = await Category.findByPk(req.params.id, {
      include: [{model: Product}]
    })
    res.status(200).json(oneCategory)
    console.log('route hit!')
  }catch(e){
    res.json(e)
  }
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body)
      res.status(200).json(newCategory)

      if (!newCategory) {
      res.status(404).json({ message: 'Nothing found!' });
      return;
    }
  }catch(e) {
    res.json(e)
  }
});

router.put('/:id', async (req, res) => {
    Category.update(
      {
        category_name: req.body.category_name
      },
      {
        where: {
          id: req.params.id
        }
      })
      .then(categoryData => {
        if (!categoryData) {
          res.status(404).json({ message: 'No ID found!' });
          return;
        }
        res.json(categoryData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  // update a category by its `id` value
});

router.delete('/:id', async (req, res) => {
  try{
    const deleteCategory = await Category.destroy({
      where: {id: req.params.id}
    })
    res.status(200).json(deleteCategory)
  }catch(e) {
    res.status(500).json(err)
  }
  // delete a category by its `id` value
});

module.exports = router;