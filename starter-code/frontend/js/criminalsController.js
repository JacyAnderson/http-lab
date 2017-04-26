angular.module('CriminalsApp')
  .controller('CriminalsController', CriminalsController);

CriminalsController.$inject = ['$http'];

function CriminalsController($http) {
  var self = this;
  self.all = [];
  self.addCriminal = addCriminal;
  self.newCriminal = {};
  self.getCriminals = getCriminals;
  self.getCriminal = getCriminal;
  self.deleteCriminal = deleteCriminal;
  self.updateCriminal = {};
  self.patchCriminal = patchCriminal;

  getCriminals();
  function getCriminals() {
  	$http
  	  .get('http://localhost:3000/criminals')
  	  .then(function(response) {
  	  	console.log('in getCriminals');
  	  	console.log(response);
  	  	self.all = response.data;
  	  });
  }

  function getCriminal(criminal) {
  	console.log("In getCriminal");
  	console.log(criminal);
  	console.log(criminal.name);
  	this.updateCriminal = criminal;
  	// return criminal;

    // $http
    //   .get('http://localhost:3000/criminals/' + criminal._id)
    //   .then(function(response) {
    //   	self.data = response.data;
    //   });
  }

  function addCriminal() {
  	$http
  	  .post('http://localhost:3000/criminals', self.newCriminal)
  	  .then(function(response){
        getCriminals();
  	  });
  	self.newCriminal = {};
  }

  function deleteCriminal(criminal) {
  	$http
  	  .delete('http://localhost:3000/criminals/' + criminal._id)
  	  .then(function(response) {
  	  	var index = self.all.indexOf(criminal);
  	  	self.all.splice(index, 1);
  	  });
  }


  function patchCriminal(criminal) {
  	console.log('in patchCriminal');
    $http
      .patch('http://localhost:3000/criminals/' + criminal._id, self.updateCriminal)
      .then(function(response) {
        getCriminals();
      });
  }
}