function ASLabel(value, windowId, labelType, className) {
  var instance = this;

  this.value = value;
  this.windowId = windowId;
  this.className = className;

  const asDomHelper = new ASDomHelper();
  this.htmlElement = asDomHelper.createElement('div');
  this.htmlElement.className = className;
  this.htmlElement.setAttribute("data-value", value);
  this.htmlElement.setAttribute("window-id", windowId);
  this.htmlElement.setAttribute("data-type", labelType);

  this.getHtmlElement = function() {
    return this.htmlElement;
  }

  this.getValue = function() {
    return this.value;
  }
}
