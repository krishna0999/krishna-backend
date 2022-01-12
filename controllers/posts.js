//All the logic for the routes will be written in this js file

import mongoose from "mongoose";
import PostMessage from "../Models/postModel.js";

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: "An error occured please try again." });
  }
};

export const createPost = async (req, res) => {
  const body = req.body;

  const newPost = new PostMessage(body);

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;

  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post found");

  const updatedPost = await PostMessage.findByIdAndUpdate(
    _id,
    { ...post, _id },
    {
      new: true,
    }
  );

  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post found");

  await PostMessage.findByIdAndRemove(id);

  res.json({ message: "Post deleted!" });
};

export const likedPost = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) return res.json({ message: "User unauthenticated" });

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post found");

  const post = await PostMessage.findById(id);

  const index = post.likesCount.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    post.likesCount.push(req.userId);
  } else {
    post.likesCount.filter((id) => id !== String(req.userId));
  }

  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });

  res.json(updatedPost);
};
