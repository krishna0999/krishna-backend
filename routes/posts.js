import express from "express";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likedPost,
} from "../controllers/posts.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/createPost", auth, createPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likedPost);

export default router;
