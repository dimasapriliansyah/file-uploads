const getPosts = (req, res, next) => {
  res.status(200).json({ posts: [{ title: "First Post", content: "This is the first post." }] })
}

const createPosts = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  // Create a post in db.
  res.status(201).json({
    message: "Post created sucessfully!",
    post: { id: new Date().toISOString(), title, content }
  })
}

module.exports = {
  getPosts,
  createPosts
}