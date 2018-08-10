angular.module('contactInfo', ['ngRoute', 'firebase'])
  .config(function ($routeProvider) {
    $routeProvider.when('/contacts', {
      templateUrl: 'src/contact/contact-list.html',
      controller: 'ContactListController',
      controllerAs: 'vm'
    })
      .when('/contactEditor', {
        templateUrl: 'src/contact/contact-editor.html',
        controller: 'ContactEditorController',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/contacts'
      });
  });

var config = {
  apiKey: 'AIzaSyAty--8PiG7PJm1AiUvZ33TzB8RG8CYDcU',
  authDomain: 'contactinfo-eddbc.firebaseapp.com',
  databaseURL: 'https://contactinfo-eddbc.firebaseio.com/',
  storageBucket: 'gs://contactinfo-eddbc.appspot.com'
};
firebase.initializeApp(config);