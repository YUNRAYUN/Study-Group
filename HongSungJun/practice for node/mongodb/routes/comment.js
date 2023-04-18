const express = require('express')
const User = require('../schemas/user')
const Comment = require('../schemas/comment')

const router = express.Router()

router.post('/', async(req,res,next) => {
    try {
        const comment = await Comment.create({
            userId: req.body.id,
            comment: req.body.comment,
        })
        const result = await Comment.populate(comment,{path: 'userId'})

        res.json(result)
    } catch (error) {
        next(error)
    }
})

router.route('/:id')
  .patch(async (req, res, next) => {
    try {
      const result = await Comment.updateOne({
        _id: req.params.id,
      }, {
        comment: req.body.comment,
      });
      res.json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const result = await Comment.deleteOne({ _id: req.params.id });
      res.json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

module.exports = router;