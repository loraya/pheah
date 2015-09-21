// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
(function () {

    /* ---------------------------------- Local Variables ---------------------------------- */
	OpenView.prototype.template = Handlebars.compile($("#openSc").html());
	HomeView.prototype.template = Handlebars.compile($("#home").html());
	
	var service = new MainService();
	var slider = new PageSlider($('body'));
    service.initialize().done(function () {
		router.addRoute('', function() {
			var h = new OpenView(service);
			slider.slidePage(h.render().$el);
			setTimeout(function() {
				//window.location.href='index2.html'
				slider.slidePage(new HomeView().render().$el);
			}, 5000);
		});

		/*router.addRoute('employees/:id', function(id) {
			service.findById(parseInt(id)).done(function(employee) {
				slider.slidePage(new EmployeeView(employee).render().$el);
			});
		});*/

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