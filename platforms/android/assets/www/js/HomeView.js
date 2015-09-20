var HomeView = function (service) {

	var employeeListView;
	
	this.initialize = function () {
        // Define a div wrapper for the view (used to attach events)
        this.$el = $('<div/>');
        this.render();
    };

	this.render = function() {
		this.$el.html(this.template());
		return this;
	};
	/*
	this.findByName = function() {
		service.findByName($('.search-key').val()).done(function(employees) {
			employeeListView.setEmployees(employees);
		});
	};
	
	this.setAll = function() {
		service.findByName('').done(function(employees) {
			employeeListView.setEmployees(employees);
		});
	};*/
	
	this.initialize();
}