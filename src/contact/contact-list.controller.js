angular.module('contactInfo')
  .controller('ContactListController', ['$scope', 'ContactService', '$location',
    function ($scope, ContactService, $location) {

      var vm = this;
      vm.getContactList = getContactList;
      vm.editContact = editContact;
      vm.addNew = addNew;
      vm.removeContact = removeContact;

      function getContactList() {
        ContactService.getContactList().then(function (data) {
          vm.contactList = data;
        });
      }

      function editContact(contact) {
        ContactService.setContact(contact);
        $location.path('contactEditor');
      }

      function addNew() {
        ContactService.setContact(null);
        $location.path('contactEditor');
      }

      function removeContact(e, contact) {
        e.stopPropagation();
        ContactService.removeContact(contact).then(function (data) {
          getContactList();
        });
      }

      vm.getContactList();
    }]);