function DraggableElement(triggerElement, draggableHtmlElement) {
  var instance = this;
  this.draggableHtmlElement = draggableHtmlElement;
  this.triggerElement = triggerElement;
  this.draggableHtmlElementPreviousZIndex = draggableHtmlElement.style.zIndex;
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

    var element = instance.draggableHtmlElement;
    element.style.zIndex = 1000;

    instance.pos[0] = instance.pos[2] - e.clientX;
    instance.pos[1] = instance.pos[3] - e.clientY;
    instance.pos[2] = e.clientX;
    instance.pos[3] = e.clientY;

    element.style.top = (element.offsetTop - instance.pos[1]) + 'px';
    element.style.left = (element.offsetLeft - instance.pos[0]) + 'px';
  }

  this.closeDragElement = function() {
    instance.draggableHtmlElement.style.zIndex = instance.draggableHtmlElementPreviousZIndex;
    document.removeEventListener("mousemove", instance.elementDrag);
    document.removeEventListener("mouseup", instance.closeDragElement);
  }

  this.initialize = function() {
    this.triggerElement.addEventListener("mousedown", this.dragMouseDown, false);
  }

  this.initialize();
}
