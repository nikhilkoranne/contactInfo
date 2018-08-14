angular.module('contactInfo')
  .controller('ContactEditorController', ['$scope', 'ContactService', '$location',
    function ($scope, ContactService, $location) {
      var vm = this;
      vm.phoneNumberPattern = /^[0-9]*$/;
      vm.emailPattern = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

      vm.contact = ContactService.getContact() || {};

      vm.sync = sync;

      function sync(contact, contactForm) {
        vm.submitted = true;
        if (contactForm.$valid) {
          ContactService.syncContact(contact).then(function (response) {
            $location.path('contacts');
            vm.submitted = false;
          });
        }
      }

    }]);