var Qdsl = function(protractor) {
  this.protractor = protractor;
}

Qdsl.prototype.navigateTo = function(url) {
  this.get(url);
}

Qdsl.prototype.bindingText = function(expr) {
  return this.byBinding(expr).getText();
}

Qdsl.prototype.enterValue = function(name, value) {
  return this.input(name).sendKeys(value);
}

Qdsl.prototype.enterValues = function(names, values) {
  for (var i = 0; i < names.length; i++) {
    this.enterValue(values[i]);  
  }  
}

Qdsl.prototype.enterNewValue = function(name, value) {
  var elem = this.input(name);
  elem.clear();
  elem.sendKeys(value);
}

Qdsl.prototype.enterNewValues = function(names, values) {
  for (var i = 0; i < names.length; i++) {
    this.enterNewValue(values[i]);  
  }  
}

Qdsl.prototype.getValue = function(list) {
  return this.findInput(name).getText();
}

Qdsl.prototype.repeater = function(expr) {
  return this.findElements(this.protractor.By.repeater(name));
}

Qdsl.prototype.byRepeater = Qdsl.prototype.repeater

Qdsl.prototype.byName = function(name) {
  return this.findElement(this.protractor.By.name(name));
}

Qdsl.prototype.byId = function(id) {
  return this.findElement(this.protractor.By.id(id));
}

Qdsl.prototype.byBinding = function(expr) {
  return this.findElement(this.protractor.By.binding(expr));
}

Qdsl.prototype.byXpath = function(expr) {
  return this.findElements(this.protractor.By.xpath(expr));
}

Qdsl.prototype.byCss = function(expr) {
  return this.findElements(this.protractor.By.css(expr));
}

Qdsl.prototype.byTagName = function(name) {
  return this.findElements(this.protractor.By.tagName(name));
}

Qdsl.prototype.byLinkText = function(txt) {
  return this.findElement(this.protractor.By.partialLinkText(txt));
}

Qdsl.prototype.bySelectedOption = function(option) {
  return this.findElement(this.protractor.By.selectedOption('option'));
}

Qdsl.prototype.input = function(name) {
  return this.findElement(this.protractor.By.input(name));
}

Qdsl.prototype.byInput = Qdsl.prototype.input

module.exports = Qdsl;