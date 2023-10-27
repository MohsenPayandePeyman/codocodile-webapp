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


var upload = multer({ storage: storage })
app.use('/uploads', express.static('uploads'));

// Require controller modules.
const post_controller = require("../controllers/postController");
const user_controller = require("../controllers/userController");

// const isAdmin = function (req, res, next) {
//   if (!req.session.user_id) {
//       return res.redirect('/login')
//   }else{
//       async.parallel({
//           user: function(callback) {
//               User.findById(req.session.user_id).exec(callback)
//           },
//       }, function(err, results) {
//           if (results.user.admin == true) {
//               next()
//           } else {
//               res.redirect('/');
//           }
//       });
//   }
  
// }

// //Register
// router.get('/register-user', user_controller.register_user_get);

/* GET home page. */
router.get('/', function(req, res, next) {
  async function postJSON(data) {
    try {
      const response = await fetch("https://codocodile.darkube.app/user/signup/", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
      if (result.message == 'OK') {
        req.session.user_id = req.body.username;
      } else {
        
      }
      console.log("Success:", result)
      const posts = result.context;
      //id,caption,media link, username, email, avg_rate, user_rate
    } catch (error) {
      console.error("Error:", error);
    }
  }
  
  const data = { post: [1,10], };
  postJSON(data);  
  res.render('index', {title: 'Home'})
});

/* GET home page. */
router.get('/profile', function(req, res, next) {
  async function postJSON(data) {
    try {
      const response = await fetch("https://codocodile.darkube.app/post/user", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
      if (result.message == 'OK') {
        req.session.user_id = req.body.username;
      } else {
        
      }
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

router.get('/post/create', post_controller.post_create_get);

router.post('/post/create',  upload.array('files'), function (req, res) {

      console.log(req)

      req.files[0]
      

      async function postJSON(data) {
        try {
          const response = await fetch("https://codocodile.darkube.app/post/user", {
            method: "POST", // or 'PUT'
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
      
          const result = await response.json();
          if (result.message == 'OK') {
            req.session.user_id = req.body.username;
          } else {
            
          }
          console.log("Success:", result)
          const posts = result.context_list;
          //id,caption,media link, username, email, avg_rate, user_rate
        } catch (error) {
          console.error("Error:", error);
        }
      }
      
      const data = { caption: req.body.caption,  };
      postJSON(data); 
      // Successful, so render
          
      //req.files
      
});


module.exports = router;