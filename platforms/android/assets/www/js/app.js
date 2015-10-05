// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
var service, slider;
(function () {

    /* ---------------------------------- Local Variables ---------------------------------- */
	//OpenView.prototype.template = Handlebars.compile($("#openSc").html());
	HomeView.prototype.template = Handlebars.compile($("#home").html());
	LoginView.prototype.template = Handlebars.compile($("#loginSc").html());
	MapView.prototype.template = Handlebars.compile($("#mapSc").html());
	
	service = new MainService();
	slider = new PageSlider($('body'));
    service.initialize().done(function () {
		router.addRoute('', function() {
			var h = new HomeView();
			slider.slidePage(h.render().$el);
		});
		
		router.addRoute('login', function() {
			slider.slidePage(new LoginView().render().$el);
			
			/*window.plugins.googleplus.isAvailable(
				function (available) {
					if (available) {
						// show the Google+ sign-in button
						var a = document.createElement("img");
						a.id = "glogin";
						a.className = "gloginbtn";
						a.onclick = glog;
						document.getElementById("logindiv").appendChild(a);
					} else {
						
					}
				}
			);*/
		});
		
		router.addRoute('map', function() {
			slider.slidePage(new MapView().render().$el);
		});

		router.start();
	});

    /* --------------------------------- Event Registration -------------------------------- */
	document.addEventListener('deviceready', function () {
		if (navigator.notification) { // Override default HTML alert with native dialog
			window.alert = function (message) {
				navigator.notification.alert(
					message,    // message
					null,       // callback
					"Pheah", // title
					'OK'        // buttonName
				);
			};
		}
		FastClick.attach(document.body);
	}, false);

    /* ---------------------------------- Local Functions ---------------------------------- */
	/*function findByName() {
        service.findByName($('.search-key').val()).done(function (employees) {
            $('.content').html(employeeListTpl(employees));
        });
    }
	function renderHomeView() {
        $('body').html(homeTpl());
        $('.search-key').on('keyup', findByName);
    }*/

}());
function glog() {
	window.plugins.googleplus.login(
		{
			//'scopes': '... ', // optional space-separated list of scopes, the default is sufficient for login and basic profile info
			'offline': true, // optional and required for Android only - if set to true the plugin will also return the OAuth access token, that can be used to sign in to some third party services that don't accept a Cross-client identity token (ex. Firebase)
			//'webApiKey': 'api of web app', // optional API key of your Web application from Credentials settings of your project - if you set it the returned idToken will allow sign in to services like Azure Mobile Services
			// there is no API key for Android; you app is wired to the Google+ API by listing your package name in the google dev console and signing your apk (which you have done in chapter 4)
		}, function (obj) {
			alert(JSON.stringify(obj)); // do something useful instead of alerting
		}, function (msg) {
			alert('error: ' + msg);
		});
}

/*var fbLoginSuccess = function (userData) {
	alert("UserInfo: " + JSON.stringify(userData));
	facebookConnectPlugin.getAccessToken(function(token) {
		alert("Token: " + token);
	}, function(err) {
		alert("Could not get access token: " + err);
	});
}*/
var fbLoginSuccess = function (userData) {
	alert("UserInfo: " + JSON.stringify(userData));
	var userId = userData.authResponse.userID;
	var tok;
	
	facebookConnectPlugin.getAccessToken(function(token) {
        tok = token;
    }, function(err) {
        alert("Could not get access token: " + err);
    });
	
	facebookConnectPlugin.getLoginStatus(
		function (status) {
			var uid = status.authResponse.userID;
			alert("current status: " + JSON.stringify(status));
			// Store sample data in Local Storage
			window.localStorage.setItem("logst", JSON.stringify(
				{
					logged: true,
					which: "fb",
					id: uid
				}
			));
		}
	);
};
function fblog() {
	var logst = JSON.parse(window.localStorage.getItem("logst"));
	if (logst != null && logst.logged === true) {
		facebookConnectPlugin.api(logst.id + "/?fields=id,name,gender,first_name,last_name,email,work,education,location", 
			["public_profile", "user_birthday"], //"user_friends" if req.
			function (result) {
				alert("Result: " + JSON.stringify(result));
				/* alerts:
					{
						"id": "000000123456789",
						"email": "myemail@example.com"
					}
				*/
				window.localStorage.setItem("fbst", JSON.stringify(result));
			},
			function (error) {
				alert("Failed: " + error);
		});
		alert("U r logged");
		return;
	}
	facebookConnectPlugin.login(["public_profile"],
		fbLoginSuccess,
		function (error) { alert("" + error) }
	);
}
