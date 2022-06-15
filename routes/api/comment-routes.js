const router = require('express').Router();
const {
  addComment,
  removeComment,
} = require('../../controllers/comment-controller');

// /api/comments/<pizzaId>
router.route('/:pizzaId').post(addComment);

// /api/comments/<pizzaId>/<commentId>
// Note, when deleting comments, we need the Pizza ID and the comment ID
router.route('/:pizzaId/:commentId').delete(removeComment);

module.exports = router;
