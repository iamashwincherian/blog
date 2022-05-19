const router = require("express").Router();

const Post = require("../models/post.model");
const validateJWT = require("../middlewares/validateJWT");

router.get("/", validateJWT, async (req, res, next) => {
    const posts = await Post.find({});
    res.send({ posts });
});

router.post("/", validateJWT, async (req, res, next) => {
    const { content } = req.body;

    const newPost = await Post.create({
        author: req.user,
        content,
    });

    res.send({ post: newPost });
});

router.delete("/:id", validateJWT, async (req, res, next) => {
    const { id } = req.params;

    const postDeletion = await Post.deleteOne({ id: id });
    if (!postDeletion.deletedCount) {
        return res.status(404).send({
            message: `Post doesn't exist`,
        });
    }

    res.send({
        message: `Post with id:${id} created by ${req.user.username} has been deleted!`,
    });
});

module.exports = router;
