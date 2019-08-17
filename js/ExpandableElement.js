function ExpandableElement(triggerElement, expandableHtmlElement) {
  var instance = this;
  this.expandableHtmlElement = expandableHtmlElement;
  this.triggerElement = triggerElement;
  this.expandableHtmlElementPreviousZIndex = expandableHtmlElement.style.zIndex;

  this.pos = new Array(4);

  this.dragMouseDown = function(e) {
    dragEvent = e || window.event;

    instance.pos[2] = e.clientX;
    instance.pos[3] = e.clientY;

    document.addEventListener("mouseup", instance.closeDragElement, false);
    document.addEventListener("mousemove", instance.elementDrag, false);
  }

  this.elementDrag = function(e) {
    dragEvent = e || window.event;

    var element = instance.expandableHtmlElement;
    element.style.zIndex = 1000;

    instance.pos[0] = instance.pos[2] - e.clientX;
    instance.pos[1] = instance.pos[3] - e.clientY;
    instance.pos[2] = e.clientX;
    instance.pos[3] = e.clientY;

    // TODO: Clean up this code
    const elementWidth = element.style.width.substring(0, element.style.width.length - 2);
    const elementHeight = element.style.height.substring(0, element.style.height.length - 2);

    element.style.width = (elementWidth - instance.pos[0]) + 'px';
    element.style.height = (elementHeight - instance.pos[1]) + 'px'
  }

  this.closeDragElement = function() {
    instance.expandableHtmlElement.style.zIndex = instance.expandableHtmlElementPreviousZIndex;
    document.removeEventListener("mousemove", instance.elementDrag);
    document.removeEventListener("mouseup", instance.closeDragElement);
  }

  this.initialize = function() {
    this.triggerElement.addEventListener("mousedown", this.dragMouseDown, false);
  }

  this.initialize();
}
