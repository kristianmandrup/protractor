var util = require('util');

describe('Qdsl library: urls', function() {
  var ptor = protractor.getInstance();
  var qdsl = protractor.dsl(ptor);

  it('navigateTo - should navigate to index', function() {
    qdsl.navigateTo('app/index.html');
    expect(ptor.getTitle()).toEqual('My AngularJS App');
  });

  it('url - get the current url',
    function() {
      qdsl.navigateTo('app/index.html');
      expect(qdsl.url()).
          toEqual('http://localhost:8000/app/index.html#/http')
    });

});

describe('Qdsl #form', function() {
  var ptor = protractor.getInstance();
  var qdsl = protractor.dsl(ptor);

  beforeEach(function() {
    qdsl.navigateTo('app/index.html#/form');
  });  

  it('binding - should find an element by binding', function() {
    var greeting = qdsl.binding('{{greeting}}');

    expect(greeting.getText()).toEqual('Hiya');
  });

  it('byBinding - should find an element by binding', function() {
    var greeting = qdsl.byBinding('{{greeting}}');

    expect(greeting.getText()).toEqual('Hiya');
  });

  it('bindingValue - find model binding', function() {
    var nickname = qdsl.bindingValue('nickname');

    expect(nickname).toEqual('Abe');
  });

  it('inputValue - find input model bound value', function() {
    var nickname = qdsl.inputValue('nickname');

    expect(nickname).toEqual('Abe');
  });

  it('enterNewValue - should find input element and fill in value', function() {
    qdsl.enterNewValue('username', 'Jane Doe');
    var username = qdsl.bindingValue('username');

    expect(username).toEqual('Jane Doe');
  });

  it('enterNewValues (2 arrays) - should find input elements and fill in values', function() {
    qdsl.enterNewValues(['username', 'nickname'], ['Jane Doe', 'Mike']);
    
    var new_nickname = qdsl.inputValue('nickname');
    var new_username = qdsl.bindingValue('username');

    expect(new_nickname).toEqual('Mike');
    expect(new_username).toEqual('Jane Doe');    
  });

  it('enterNewValues (hash) - should find input elements and fill in values', function() {
    // console.log('pending!')

    // qdsl.enterNewValues({'username': 'Jane Doe', 'password': 'pass'});
    // var name = qdsl.byBinding('username');

    // expect(name.getText()).toEqual('Jane Doe');
  });

  it('check - should find inputs with alternate attribute forms', function() {
    var letterList = qdsl.byId('letterlist');
    expect(letterList.getText()).toBe('');

    qdsl.check('check.w');
    expect(letterList.getText()).toBe('w');

    qdsl.check('check.x');
    expect(letterList.getText()).toBe('wx');

    qdsl.check('check.y');
    expect(letterList.getText()).toBe('wxy');

    qdsl.check('check.z');
    expect(letterList.getText()).toBe('wxyz');
  });

  it('repeater - should find a repeater using data-ng-repeat', function() {
    var byRow = qdsl.repeater('day in days', 3);    
    expect(byRow.getText()).toEqual('Wed');

    var byCol = qdsl.repeater('day in days', 3, 'day');    
    expect(byCol.getText()).toEqual('Wed');
  });

  it('repeaterValue - should find a repeater using data-ng-repeat', function() {
    var byRow = qdsl.repeaterValue('day in days', 3);    
    expect(byRow).toEqual('Wed');

    var byCol = qdsl.repeaterValue('day in days', 3, 'day');    
    expect(byCol).toEqual('Wed');
  });

});

describe('Qdsl #bindings', function() {
  var ptor = protractor.getInstance();
  var qdsl = protractor.dsl(ptor);

  beforeEach(function() {
    qdsl.navigateTo('app/index.html#/bindings');
  });

  // Should add text 'expanded' when clicked
  it('selectById - select element by Id', function() {
    expect(qdsl.byId('expander').getText()).toEqual('');
    qdsl.selectById('expander');
    expect(qdsl.byId('expander').getText()).toEqual('expanded');
  });
  
  it('selectByName - select element by name', function() {
    expect(qdsl.byName('namedInput').getAttribute('value')).toEqual('');
    qdsl.selectByName('namedInput');
    expect(qdsl.byName('namedInput').getAttribute('value')).toEqual('clicked');
  });

  it('bySelectedOption - should find elements using a select', function() {
    expect(qdsl.bySelectedOption('planet').getText()).toEqual('Mercury');
  });

  it('selectOne - select option on selector', function() {
    // There must be a better way to do this.
    qdsl.selectOne('planet', 4);
    expect(qdsl.selectedOptionLabel('planet')).toEqual('Jupiter');

    // TODO: (value should be changed to lowercase)
    expect(qdsl.selectedOptionValue('planet')).toEqual('4');    
  });
});

describe('Qdsl #multi_bindings', function() {
  var ptor = protractor.getInstance();
  var qdsl = protractor.dsl(ptor);

  beforeEach(function() {
    qdsl.navigateTo('app/index.html#/multi_bindings');
  });


  // TODO: Research multi select
  // See fx: http://stackoverflow.com/questions/16933324/angularjs-ng-repeat-in-bootstrap-multiselect-dropdown
  it('selectMany - select options on selector', function() {
    // There must be a better way to do this.
    // qdsl.selectMany('planet', [3, 4]);
    // expect(qdsl.selectedOptionLabel('planet')).toEqual('MarsJupiter');

    // TODO: (value should be changed to lowercase)
    // expect(qdsl.selectedOptionValue('planet')).toEqual('34');    
  });
});
