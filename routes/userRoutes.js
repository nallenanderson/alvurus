const passport = require('passport');
const userController = require('../controllers/userController');
const companyController = require('../controllers/companyController');

module.exports = (app) => {

  app.get('/', (req, res) => {
    res.send(`
      <html>
        <head>
          <script></script>
        </head>
        <body>
          <script>
            window.fbAsyncInit = function() {
              FB.init({
                appId      : '101244567339658',
                cookie     : true,
                xfbml      : true,
                version    : 'v2.6'
              });

              FB.AppEvents.logPageView();
              FB.login(function(res) {

                /*

                var data = {
                  "access_token": res.authResponse.accessToken,
                  "expires_in": res.authResponse.expiresIn,
                  "signed_request": res.authResponse.signedRequest,
                  "user_id": res.authResponse.userID
                };

                $.get({url:"http://localhost:5000/api/user/login/facebook", data: data}).success(function(resfb) {
                  alert(resfb);
                });

                */

                /*
                var data = [
                  "access_token=" + res.authResponse.accessToken,
                  "expires_in=" + res.authResponse.expiresIn,
                  "signed_request=" + res.authResponse.signedRequest,
                  "user_id=" + res.authResponse.userID
                ].join("&")
                */

                var data = {
                  "access_token": res.authResponse.accessToken,
                  "expires_in": res.authResponse.expiresIn,
                  "signed_request": res.authResponse.signedRequest,
                  "user_id": res.authResponse.userID
                };

                var r = new XMLHttpRequest();
                r.open("POST", "/api/user/login/facebook", true);
                r.setRequestHeader("Content-Type", "application/json");
                r.onreadystatechange = function () {
                  if (r.readyState != 4 || r.status != 200) return;
                    alert(resfb);
                };
                r.send(JSON.stringify(data));

              });

            };

            (function(d, s, id){
               var js, fjs = d.getElementsByTagName(s)[0];
               if (d.getElementById(id)) {return;}
               js = d.createElement(s); js.id = id;
               js.src = "https://connect.facebook.net/en_US/sdk.js";
               fjs.parentNode.insertBefore(js, fjs);
             }(document, 'script', 'facebook-jssdk'));
          </script>
        </body>
      </html>
      `)
  })

  app.post('/api/user/regular/signup/password',
    userController.validateUser,
    userController.signupRegularPassword
  );

  app.post('/api/user/owner/signup/password',
    userController.validateUser,
    companyController.validateCompany,
    userController.signupOwnerPassword
  );

  app.post('/api/user/login/password',
    passport.authenticate('local', {session: false}),
    userController.loginWithPassword
  );

  app.get('/api/user/login/facebook',
    passport.authenticate('facebook', { session: false }),
    userController.loginWithFacebook
  );

  app.post('/api/user/login/facebook',
    passport.authenticate('facebook', { session: false, scope: ['id', 'username', 'displayName', 'name', 'gender', 'profileUrl', 'emails', 'photos'] }),
    userController.loginWithFacebook
  );

  app.get('/api/user/login/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/api/user/login/facebook', session: false } ),
    userController.loginWithFacebook
  );

  app.get('/api/user/me',
    passport.authenticate('bearer', {session: false}),
    userController.getMe
  );

  app.get('/api/logout', userController.logout);
}
