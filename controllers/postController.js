
const { body, validationResult } = require("express-validator");

exports.post_create_get = (req, res) => {
  res.render('post-create', {title: 'New Post'});
};