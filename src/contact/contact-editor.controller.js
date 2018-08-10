angular.module('contactInfo')
  .controller('ContactEditorController', ['$scope', 'ContactService', '$location',
    function ($scope, ContactService, $location) {
      var vm = this;

      vm.contact = ContactService.getContact() || {};

      vm.sync = sync;

      function sync(contact) {
        ContactService.syncContact(contact).then(function (response) {
          $location.path('contacts');
        });
      }

    }]);