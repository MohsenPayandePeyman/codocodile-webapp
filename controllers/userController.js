const { body, validationResult } = require("express-validator");


//Sign In
exports.sign_in_get = (req, res) => {
    res.render('authentication/sign-in', {title: 'Sign In'});
  };

exports.sign_in_post = (req, res) => {

  async function postJSON(data) {
    try {
      const response = await fetch("https://codocodile.darkube.app/user/signin/", {
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
  
  const data = { username: req.body.username, password: req.body.password };
  postJSON(data);

  // fetch('https://codocodile.darkube.app/user/signin/', {
  //   method: 'POST', 
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(data),
  //   })
  //   .then(response => response.json())
  //   .then(data => {
  //     console.log(data);
  //   })
  //   .catch((error) => {
  //     console.error('Error:', error);
  //   });
};

//Sign Up
exports.sign_up_get = (req, res) => {
    res.render('authentication/sign-up', {title: 'Sign Up'});
  };

exports.sign_up_post = (req, res) => {
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
        req.session.username = req.body.username;
      } else {
        res.render('authentication/sign-up', {title: 'Sign Up', error: 'the entered username or password is incorrect'});
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  
  const data = { username: req.body.username, password:  req.body.password, email: req.body.email };
  postJSON(data);
};

exports.sign_out_get = (req, res) => {
  req.session.username = null;
  res.redirect('/sign-in')
};

//Forgot Password
exports.forgot_password_get = (req, res) => {
    res.render('authentication/forgot-password', {title: 'Forgot Password'});
  };

exports.forgot_password_post = (req, res) => {
  console.log(req);
};

//Account Activation
exports.activation_get = (req, res) => {
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
      if (result) {
        
      } else {
        
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  
  const data = { username: req.body.username, email:  req.body.email, };
  postJSON(data);    
};