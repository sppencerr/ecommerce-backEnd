const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try{
    const allTags = await Tag.findAll({
      include:[{model: Product}],

    })
    res.status(200).json(allTags)
    console.log('route hit!')
  }catch(e){
    res.json(e)
  }
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  try{
    const oneTag = await Tag.findByPk(req.params.id, {
      include: [{model: Product}]
    })
    res.status(200).json(oneTag)
    console.log('route hit!')
  }catch(e){
    res.json(e)
  }
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create(req.body)
      res.status(200).json(newTag)

      if (!newTag) {
      res.status(404).json({ message: 'Nothing found!' });
      return;
    }
  }catch(e) {
    res.json(e)
  }
  // create a new tag
});

router.put('/:id', async (req, res) => {
  Tag.update(
    {
      tag_name: req.body.tag_name
    },
    {
      where: {
        id: req.params.id
      }
    })
    .then(tagData => {
      if (!tagData) {
        res.status(404).json({ message: 'No ID found!' });
        return;
      }
      res.json(tagData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  // update a tag's name by its `id` value
});

router.delete('/:id', async (req, res) => {
  try{
    const deleteTag = await Tag.destroy({
      where: {id: req.params.id}
    })
    res.status(200).json(deleteTag)
  }catch(e) {
    res.status(500).json(err)
  }
  // delete on tag by its `id` value
});

module.exports = router;