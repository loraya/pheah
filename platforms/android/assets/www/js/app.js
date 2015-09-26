// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
var service, slider;
(function () {

    /* ---------------------------------- Local Variables ---------------------------------- */
	OpenView.prototype.template = Handlebars.compile($("#openSc").html());
	HomeView.prototype.template = Handlebars.compile($("#home").html());
	LoginView.prototype.template = Handlebars.compile($("#loginSc").html());
	
	service = new MainService();
	slider = new PageSlider($('body'));
    service.initialize().done(function () {
		router.addRoute('', function() {
			var h = new HomeView();//OpenView(service);
			slider.slidePage(h.render().$el);
			/*setTimeout(function() {
				//window.location.href='index2.html'
				slider.slidePage(new HomeView().render().$el);
			}, 50000);*/
		});
		
		router.addRoute('login', function() {
			slider.slidePage(new LoginView().render().$el);
			
			window.plugins.googleplus.isAvailable(
				function (available) {
					if (available) {
						// show the Google+ sign-in button
						/*var a = document.createElement("img");
						a.id = "glogin";
						a.className = "gloginbtn";
						a.onclick = glog;
						document.getElementById("logindiv").appendChild(a);*/
					} else {
						
					}
				}
			);
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

var fbLoginSuccess = function (userData) {
	alert("UserInfo: " + JSON.stringify(userData));
	facebookConnectPlugin.getAccessToken(function(token) {
		alert("Token: " + token);
	}, function(err) {
		alert("Could not get access token: " + err);
	});
}
function fblog() {
	facebookConnectPlugin.login(["public_profile"],
		fbLoginSuccess,
		function (error) { alert("" + error) }
	);
}
