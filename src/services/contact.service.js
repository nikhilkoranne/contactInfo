angular.module('contactInfo')
  .factory('ContactService', ['$http', '$q', '$firebaseArray', '$firebaseObject',
    function ($http, $q, $firebaseArray, $firebaseObject) {

      var _contact = {};

      function getContactList() {
        var deferred = $q.defer();
        var ref = firebase.database().ref().child('contacts');
        var contactList = $firebaseArray(ref);
        deferred.resolve(contactList);
        return deferred.promise;
      }

      function setContact(val) {
        _contact = val;
      }

      function getContact() {
        return _contact;
      }

      function removeContact(contact) {
        var deferred = $q.defer();
        var ref = firebase.database().ref().child('contacts/' + contact.$id);
        var obj = $firebaseObject(ref);
        obj.$remove().then(function (ref) {
          deferred.resolve(ref);
        }, function (error) {
          deferred.reject(error);
        });
        return deferred.promise;
      }

      function syncContact(contact) {
        var deferred = $q.defer();
        var ref = firebase.database().ref().child('contacts');
        var contactList = $firebaseArray(ref);

        if (contact.$id) {
          ref = firebase.database().ref().child('contacts/' + contact.$id);
          var obj = $firebaseObject(ref);
          Object.assign(obj, contact);
          obj.$save().then(function (ref) {
            deferred.resolve(ref);
          }, function (error) {
            deferred.reject(error);
          });
        } else {
          contactList.$add({
            firstName: contact.firstName,
            lastName: contact.lastName,
            email: contact.email,
            phone: contact.phone,
            status: !!contact.status
          });
          deferred.resolve(contactList);
        }
        return deferred.promise;
      }

      return {
        getContactList: getContactList,
        setContact: setContact,
        getContact: getContact,
        syncContact: syncContact,
        removeContact: removeContact
      };

    }]);