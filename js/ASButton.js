function ASButton(htmlElement, classNames, tooltip, callback) {
  var instance = this;

  const asDomHelper = new ASDomHelper();
  this.htmlElement = asDomHelper.createElement(htmlElement);
  this.htmlElement.className = classNames;
  this.htmlElement.title = tooltip;
  this.htmlElement.addEventListener("click", callback, false);

  this.getHtmlElement = function() {
    return this.htmlElement;
  }
}
