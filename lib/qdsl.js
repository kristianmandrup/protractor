var Qdsl = function(protractor) {
  this.protractor = protractor;
}

Qdsl.prototype.navigateTo = function(url) {
  this.get(url);
}

Qdsl.prototype.url = function() {
  return this.getCurrentUrl();
}

Qdsl.prototype.bindingText = function(expr) {
  return this.byBinding(expr).getText();
}

Qdsl.prototype.enterValue = function(name, value) {
  return this.input(name).sendKeys(value);
}

Qdsl.prototype.enterValues = function(names, values) {
  for (var i = 0; i < names.length; i++) {
    this.enterValue(names[i], values[i]);  
  }  
}

Qdsl.prototype.enterNewValue = function(name, value) {
  var elem = this.input(name);
  elem.clear();
  elem.sendKeys(value);
}

Qdsl.prototype.enterNewValues = function(names, values) {
  for (var i = 0; i < names.length; i++) {
    this.enterNewValue(names[i], values[i]);  
  }  
}

Qdsl.prototype.check = function(name) {
  return this.input(name).click();
}

Qdsl.prototype.selectById = function(id) {
  return this.byId(id).click();
}
Qdsl.prototype.selectId = Qdsl.prototype.selectById

Qdsl.prototype.selectByName = function(name) {
  return this.byName(name).click();  
}
Qdsl.prototype.selectName = Qdsl.prototype.selectByName

Qdsl.prototype.optionByValue = function(value) {
  return this.protractor.By.css('option[value="' + value + '"]');
}

Qdsl.prototype.selectedOptionLabel = function(option) {
  return this.bySelectedOption(option).getText();
}

Qdsl.prototype.selectedOptionValue = function(option) {
  return this.bySelectedOption(option).getAttribute('value');
}

Qdsl.prototype.selector = function(id) {
  console.log('selector:' + id);
  return this.findElement(this.protractor.By.select(id));
}

Qdsl.prototype.selectOne = function(id, value) {
  var selector = this.selector(id);
  var optionValue = this.optionByValue(value);
  selector.findElement(optionValue).click();
}

Qdsl.prototype.selectMany = function(id, values) {
  var selector = this.selector(id);

  console.log('select:', values)
  for (var i = 0; i < values.length; i++) {
    console.log('iteration:', values[i]);
    var optionValue = this.optionByValue(values[i]);
    console.log('option value:' + optionValue);
    selector.findElement(optionValue).click();
  }
}

Qdsl.prototype.clickIfDisplayed = function(elem) {
  var found = this.getIfDisplayed(elem);
  if (found) {
    found.click();
  }    
  return found;
}

Qdsl.prototype.getIfDisplayed = function(elem) {
  var found = false;
  elem.then(function(foundElem) {
    if (foundElem.isDisplayed()) {
      found = foundElem;
    }
  })
  return found;
}

Qdsl.prototype.inputValue = function(name) {
  return this.byInput(name).getAttribute('value');
}

Qdsl.prototype.bindingValue = function(name) {
  return this.byBinding(name).getText();
}
Qdsl.prototype.valueOf = Qdsl.prototype.bindingValue;

Qdsl.prototype.repeaterValue = function(expr, rowNumber, colNumber) {
  var elem;
  switch (arguments.length) {
    case 2:
      elem = this.byRepeater(expr, rowNumber);
      break;
    case 3:
      elem = this.byRepeater(expr, rowNumber, colNumber);
      break;
    case 1:
      elem = this.byRepeater(expr);
      break;
    default:
      Error('repeaterValue - Invalid # arguments: ' + arguments.length);
  }
  return elem.getText();  
}

Qdsl.prototype.byRepeater = function(expr, rowNumber, colNumber) {
  var repeater = this.protractor.By.repeater(expr);

  switch (arguments.length) {
    case 2:
      return this.findElement(repeater.row(rowNumber));
    case 3:
      return this.findElement(repeater.row(rowNumber).column(colNumber));
    case 1:
      return this.findElement(repeater);
    default:
      Error('byRepeater - Invalid # arguments: ' + arguments.length);
  }
  
}
Qdsl.prototype.repeater = Qdsl.prototype.byRepeater

Qdsl.prototype.byName = function(name) {
  return this.findElement(this.protractor.By.name(name));
}
Qdsl.prototype.named = Qdsl.prototype.byName

Qdsl.prototype.byId = function(id) {
  return this.findElement(this.protractor.By.id(id));
}

Qdsl.prototype.byBinding = function(expr) {
  return this.findElement(this.protractor.By.binding(expr));
}
Qdsl.prototype.binding = Qdsl.prototype.byBinding

Qdsl.prototype.byXpath = function(expr) {
  return this.findElements(this.protractor.By.xpath(expr));
}
Qdsl.prototype.xpath = Qdsl.prototype.byXpath

Qdsl.prototype.byCss = function(expr) {
  return this.findElements(this.protractor.By.css(expr));
}
Qdsl.prototype.css = Qdsl.prototype.byCss

Qdsl.prototype.byTagName = function(name) {
  return this.findElements(this.protractor.By.tagName(name));
}
Qdsl.prototype.tag = Qdsl.prototype.byTagName

Qdsl.prototype.byLinkText = function(txt) {
  return this.findElement(this.protractor.By.partialLinkText(txt));
}
Qdsl.prototype.linkText = Qdsl.prototype.byLinkText

Qdsl.prototype.bySelectedOption = function(option) {
  return this.findElement(this.protractor.By.selectedOption(option));
}
Qdsl.prototype.selectedOption = Qdsl.prototype.bySelectedOption

Qdsl.prototype.byInput = function(name) {
  return this.findElement(this.protractor.By.input(name));
}
Qdsl.prototype.input = Qdsl.prototype.byInput

module.exports = Qdsl;