import express from "express";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likedPost,
} from "../controllers/posts.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/createPost", createPost);
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);
router.patch("/:id/likePost", likedPost);

export default router;
