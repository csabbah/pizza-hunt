const router = require('express').Router();
const {
  addComment,
  removeComment,
  addReply,
  removeReply,
} = require('../../controllers/comment-controller');
// /api/comments/<pizzaId>
router.route('/:pizzaId').post(addComment);

// /api/comments/<pizzaId>/<commentId>
// Note, when deleting comments, we need the Pizza ID and the comment ID
router.route('/:pizzaId/:commentId').delete(removeComment);

router.route('/:pizzaId/:commentId').put(addReply).delete(removeComment);

router.route('/:pizzaId/:commentId/:replyId').delete(removeReply);

module.exports = router;
