const express = require("express");
const router = express.Router();
var async = require('async');

const multer  = require('multer')

var app = express();

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname )
  }
})

const requireLogin = (req, res, next) => {
  if (!req.session.username) {
      return res.redirect('/sign-in')
  }
  next();
}


var upload = multer({ storage: storage })
app.use('/uploads', express.static('uploads'));

// Require controller modules.
const post_controller = require("../controllers/postController");
const user_controller = require("../controllers/userController");

/* GET home page. */
router.get('/', requireLogin, function(req, res, next) {
  async function postJSON(data) {
    try {
      const response = await fetch("https://codocodile.darkube.app/post/info/", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
      
      console.log("Success:", JSON.parse(result.context))
      res.render('index', {title: 'Home', posts: JSON.parse(result.context),}) 
      //id,caption,media link, username, email, avg_rate, user_rate
    } catch (error) {
      console.error("Error:", error);
    }
  }
  
  const data = { post: [1,100], username: req.session.username};
  postJSON(data);  
  
});

/* GET home page. */
router.get('/profile', requireLogin, function(req, res, next) {
  async function postJSON(data) {
    try {
      const response = await fetch("https://codocodile.darkube.app/post/user/", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
      console.log("Success:", result)
      const posts = result.context_list;
      //id,caption,media link, username, email, avg_rate, user_rate
    } catch (error) {
      console.error("Error:", error);
    }
  }
  
  const data = { username: req.session.username, };
  postJSON(data);  
  res.render('index', {title: 'Home'})
});

router.get('/post/create', requireLogin, post_controller.post_create_get);

router.post('/post/create', requireLogin,  upload.single('file'), function (req, res) {
      
      

      async function postJSON(data) {
        try {
          const response = await fetch("https://codocodile.darkube.app/post/create/", {
            method: "POST", // or 'PUT'
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
      
          const result = await response.json();
          console.log("Success:", result);
          res.redirect('/main/profile')
        } catch (error) {
          console.error("Error:", error);
        }
      }
      const data = { caption: req.body.caption, media_link:  req.file.path, username: req.session.username,};
      postJSON(data); 
      // Successful, so render
          
      //req.files
      
});

router.get('/post/rate', requireLogin, function (req, res) {

  async function postJSON(data) {
    try {
      const response = await fetch("https://codocodile.darkube.app/post/rate/", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  const data = { id: req.body.id, username: req.session.username, rate: req.body.rate};
  postJSON(data); 
  
});


module.exports = router;