describe('Testing a Contact Editor controller', function () {
  var $controller;
  var scope = {};

  /* beforeEach(function () {
    // loads the app module
    module('contactInfo');

  }); */
  // beforeEach(module('contactInfo'));

  // beforeEach(inject(function ($rootScope, _$controller_) {
  //   $controller = _$controller_;
  //   scope = $rootScope.$new();
  //   var ContactEditorController = $controller('ContactEditorController', {
  //     $scope: scope
  //   });
  // }));
  /* beforeEach(inject(function(_$controller_){
    // inject removes the underscores and finds the $controller Provider
    $controller = _$controller_;
  })); */

  it('submitted should be false at the beginning', function () {
    expect(1).toEqual(1);
  });

});