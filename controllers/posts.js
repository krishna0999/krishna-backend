//All the logic for the routes will be written in this js file

import PostMessage from "../Models/postModel.js";

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: "An error occured please try again." });
  }
};

export const createPost = (req, res) => {
  const body = req.body;

  const newPost = new PostMessage(body);

  try {
    newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
