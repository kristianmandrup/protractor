var util = require('util');

describe('Qdsl library', function() {
  var ptor = protractor.getInstance();
  var qdsl = protractor.dsl(ptor);

  it('should wrap webdriver', function() {
    qdsl.navigateTo('app/index.html');
    expect(ptor.getTitle()).toEqual('My AngularJS App');
  });

  it('should allow a mix of using protractor and using the driver directly',
    function() {
      qdsl.navigateTo('app/index.html');
      expect(ptor.getCurrentUrl()).
          toEqual('http://localhost:8000/app/index.html#/http')
    });

  it('should export other webdriver classes onto the global protractor',
      function() {
        expect(protractor.ActionSequence).toBeDefined();
        expect(protractor.Key.RETURN).toEqual('\uE006');
    });
});

describe('Qdsl lib', function() {
  var ptor = protractor.getInstance();
  var qdsl = protractor.dsl(ptor);

  beforeEach(function() {
    ptor.get('app/index.html#/form');
  });  

  it('enterNewValue - should find an element by text input model', function() {
    qdsl.enterNewValue('username', 'Jane Doe');
    var name = qdsl.byBinding('username');

    expect(name.getText()).toEqual('Jane Doe');
  });

});
