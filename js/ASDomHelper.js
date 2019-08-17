function ASDomHelper() {

  this.createElement = function(htmlElement) {
    return document.createElement(htmlElement);
  }

  this.createDiv = function() {
    return this.createElement("div");
  }

  this.createI = function() {
    return this.createElement("i");
  }

  /**
   * Adds a new classname to the htmlElement if it doesn't already exist
   *
   * @param  {htmlElement} element    the htmlElement to add the className to
   * @param  {String} classNameToAdd  the className to add to the element
   * @return {bool}                   returns whether the className was added successfully or not
   */
  this.addClassName = function(element, classNameToAdd) {
    var newClassNames;
    let isFound = false;
    const classNames = element.className.split(" ");
    for(let i = 0; i <= classNames.length && !isFound; i += 1) {
      if(classNames[i] === classNameToAdd) {
        isFound = true;
      }
    }
    if(!isFound) {
      element.className += " " + classNameToAdd;
      element.className.trim();
      return true;
    }
    return false;
  }

  /**
   * Removes the classname from the provided element
   *
   * @param  {htmlElement} element      the htmlElement to remove the classname for
   * @param  {String} classNameToRemove the className to remove from the element
   * @return {bool}                     returns whether the className was removed successfully or not
   */
  this.removeClassName = function(element, classNameToRemove) {
    var newClassNames;
    let isRemoved = false;
    const classNames = element.className.split(" ");
    for(let i = 0; i <= classNames.length; i += 1) {
      if(classNames[i] === classNameToRemove) {
        isRemoved = true;
        continue;
      }
      newClassNames += " " + classNames[i];
    }
    element.className = newClassNames.trim();
    return isRemoved;
  }
}
