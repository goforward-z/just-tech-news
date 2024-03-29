const router = require('express').Router();
const { Comment } = require('../../models');

router.get('/', (req,res) => {
    Comment.findAll()
    .then(dbcommentData => res.json(dbcommentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
router.post('/', (req,res) => {
    Comment.create({
        comment_text: req.body.comment_text,
        user_id: req.body.user_id,
        post_id: req.body.post_id
    })
    .then(dbcommentData => res.json(dbcommentData))
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
});
router.delete('/:id',(req,res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbcommentData => {
        if(!dbcommentData) {
            res.status(404).json({ message: 'no comments found with this id!' });
            return;
        }
        res.json(dbcommentData);
    })
    .catch(err=> {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;