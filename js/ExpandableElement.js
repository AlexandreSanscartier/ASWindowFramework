function ExpandableElement(triggerElement, expandableHtmlElement, minWidth, minHeight, maxWidth, maxHeight) {
  var instance = this;
  this.expandableHtmlElement = expandableHtmlElement;
  this.triggerElement = triggerElement;
  this.expandableHtmlElementPreviousZIndex = expandableHtmlElement.style.zIndex;

  this.minWidth = minWidth;
  this.maxWidth = maxWidth;

  this.minHeight = minHeight;
  this.maxHeight = maxHeight;

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

    const elementWidth = extractNumberFromStyle(element.style.width);
    const elementHeight = extractNumberFromStyle(element.style.height);

    let newWidth = elementWidth - instance.pos[0];
    let newHeight = elementHeight - instance.pos[1];

    if (newWidth > instance.maxWidth) {
      newWidth = instance.maxWidth;
    } else if (newWidth < instance.minWidth) {
      newWidth = instance.minWidth;
    }

    if (newHeight > instance.maxHeight) {
      newHeight = instance.maxHeight;
    } else if (newHeight < instance.minHeight) {
      newHeight = instance.minHeight;
    }

    element.style.width = newWidth + 'px';
    element.style.height = newHeight + 'px'
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
