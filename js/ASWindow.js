function ASWindow(title, minWdidth, minHeight, maxWidth, maxHeight) {
  var instance = this;

  this.asDomHelper = new ASDomHelper();
  this.guid = generateUUID();
  this.title = title;

  this.minWidth = minWdidth;
  this.maxWidth = maxWidth;

  this.minHeight = minHeight;
  this.maxHeight = maxHeight;

  /**
   *  Read only variables
   */
  const ASWINDOW_CLASSNAME = "aswindow";
  const ASWINDOW_TOP_BAR_CLASSNAME = "aswindow-top-bar";
  const ASWINDOW_TITLE_CLASSNAME = "aswindow-title";
  const ASWINDOW_TOP_BUTTONS_CLASSNAME = "aswindow-top-buttons";
  const ASWINDOW_CONTENT_CLASSNAME = "aswindow-content";
  const ASWINDOW_BOTTOM_BAR_CLASSNAME = "aswindow-bottom-bar";
  const ASWINDOW_STATUS_CLASSNAME = "aswindow-status";
  const ASWINDOW_EXPAND = "aswindow-expand";
  const ASWINDOW_MINIMIZED = "aswindow-minimized";
  const ASWINDOW_MINIMIZED_TITLE = "aswindow-minimized-title";

  this.windowClick = function(e) {
    console.log("clicked window: " + instance.guid);
    instance.focusWindow();
  }

  this.restoreWindowClick = function(e) {
    console.log("restoring window " + instance.guid);
    var asWindowMinimizedButton = document.querySelector("div[data-id='"+instance.guid+"'][class='"+ASWINDOW_MINIMIZED+"']");
    asWindowMinimizedButton.parentNode.removeChild(asWindowMinimizedButton);
    var asWindow = document.querySelector("div[data-id='"+instance.guid+"']");
    instance.focusWindow();
    instance.asDomHelper.removeClassName(asWindow, "hide");
  }

  this.minimizeButtonClick = function(e) {
    console.log("minimizing window " + instance.guid);
    var asWindow = document.querySelector("div[data-id='"+instance.guid+"']");
    instance.asDomHelper.addClassName(asWindow, "hide");
    instance.createMinimizedWindow();
  }

  this.maximizeButtonClick = function(e) {
    console.log("maximizing window " + instance.guid);
    var asWindow = document.querySelector("div[data-id='"+instance.guid+"']");
    var browserDimensions = getBrowserDimensions();
    // TODO: Add a nice animation
    asWindow.style.top = "0px";
    asWindow.style.left = "0px";
    asWindow.style.width = Math.min(browserDimensions.width - asWindow.offsetLeft, instance.maxWidth) + "px";
    asWindow.style.height = Math.min(browserDimensions.height - asWindow.offsetTop, instance.maxHeight) + "px";

    this.originalWidth

    console.log("window:" + asWindow.style.width + " browser:" + browserDimensions.width);
    console.log("window:" + asWindow.style.height + " browser:" + browserDimensions.height);
  }

  this.closeButtonClick = function(e) {
    console.log("closing widnow " + instance.guid);
    var asWindow = document.querySelector("div[data-id='"+instance.guid+"']");
    asWindow.parentNode.removeChild(asWindow);
  }

  this.createMinimizedWindow = function() {
    const asMinimizedWindow = new ASButton("div", ASWINDOW_MINIMIZED, "Restore Window", instance.restoreWindowClick).getHtmlElement();
    asMinimizedWindow.setAttribute("data-id", this.guid);

    const restoreWindowIcon = instance.asDomHelper.createI();
    restoreWindowIcon.className = "fas fa-window aswindow-minimized-icon";
    const minimiziedWindowTitle = instance.asDomHelper.createDiv();
    minimiziedWindowTitle.className = ASWINDOW_MINIMIZED_TITLE;
    minimiziedWindowTitle.innerHTML = instance.title;

    asMinimizedWindow.appendChild(restoreWindowIcon );
    asMinimizedWindow.appendChild(minimiziedWindowTitle);

    document.getElementsByClassName("asminimized-window-holder")[0].appendChild(asMinimizedWindow);
  }

  this.generateRandomTitle = function() {
    const jsonRandomList = '{"names": ["test","testy","tiesto"]}';
    const randomNameList = JSON.parse(jsonRandomList).names;
    const randomNumber = Math.floor(Math.random() * randomNameList.length);
    const name = randomNameList[randomNumber];
    return name;
  }

  this.focusWindow = function() {
    var asWindow = document.querySelector("div[data-id='"+instance.guid+"']");
    var asLabel = asWindow.querySelector("div[window-id='"+instance.guid+"']");
    var currentZIndex = asLabel.getAttribute('data-value');
    var maxZIndex = instance.getWindowCount() - 1;
    // This means we need to set the z-index to a higher amount
    if(currentZIndex !== maxZIndex) {
      var asLabels = document.querySelectorAll("div[data-type='window-z-index']");
      for(let i = 0; i < asLabels.length; i += 1) {
        let label = asLabels[i];
        let labelZIndex = label.getAttribute('data-value');
        if(labelZIndex > currentZIndex) {
          labelZIndex -= 1
          label.setAttribute('data-value', labelZIndex);
          let windowGuid = label.getAttribute('window-id');
          let windowToChange = document.querySelector("div[data-id='"+windowGuid+"']");
          windowToChange.style.zIndex = labelZIndex;
        }
      }
      asLabel.setAttribute('data-value', maxZIndex);
      asWindow.style.zIndex = maxZIndex;
    }
  }

  this.getWindowCount = function() {
    var asLabels = document.querySelectorAll("div[data-type='window-z-index']");
    if(asLabels === null) {
      return 1;
    }
    return asLabels.length + 1;
  }

  this.generateTopBar = function(asWindow) {
    const asWindowTopBar = this.asDomHelper.createDiv();
    new DraggableElement(asWindowTopBar, asWindow);
    asWindowTopBar.className = ASWINDOW_TOP_BAR_CLASSNAME + " clearfix";

    const titleBar = this.asDomHelper.createDiv();
    titleBar.className = ASWINDOW_TITLE_CLASSNAME;
    titleBar.innerHTML = this.title;

    const iconBarHolder = this.asDomHelper.createDiv();
    iconBarHolder.className = ASWINDOW_TOP_BUTTONS_CLASSNAME;

    const minimizeButton = new ASButton("i", "fas fa-window-minimize", "Minimize", this.minimizeButtonClick);
    const maximizeButton = new ASButton("i", "fas fa-window-maximize", "Maximize", this.maximizeButtonClick);
    const closeButton = new ASButton("i", "fas fa-window-close", "Close", this.closeButtonClick);

    iconBarHolder.appendChild(minimizeButton.getHtmlElement());
    iconBarHolder.appendChild(maximizeButton.getHtmlElement());
    iconBarHolder.appendChild(closeButton.getHtmlElement())

    asWindowTopBar.appendChild(iconBarHolder);
    asWindowTopBar.appendChild(titleBar);
    return asWindowTopBar;
  }

  this.generateContent = function(asWindow) {
    const asWindowContent = this.asDomHelper.createDiv();
    asWindowContent.className = ASWINDOW_CONTENT_CLASSNAME;
    asWindowContent.innerHTML = new ASContentGenerator().generateWindowContent();
    return asWindowContent;
  }

  this.generateBottomBar = function(asWindow) {
    const asWindowBottomBar = this.asDomHelper.createDiv();
    asWindowBottomBar.className = ASWINDOW_BOTTOM_BAR_CLASSNAME + " clearfix";

    const asWindowStatusBar = this.asDomHelper.createDiv();
    asWindowStatusBar.className = ASWINDOW_STATUS_CLASSNAME;
    asWindowStatusBar.innerHTML = "bottom status bar";

    const asWindowExpand = this.asDomHelper.createDiv();
    new ExpandableElement(asWindowExpand, asWindow, this.minWidth, this.minHeight, this.maxWidth, this.maxHeight);
    asWindowExpand.className = ASWINDOW_EXPAND;

    asWindowBottomBar.appendChild(asWindowStatusBar);
    asWindowBottomBar.appendChild(asWindowExpand);
    return asWindowBottomBar;
  }

  this.initialize = function() {
    //this.title = this.generateRandomTitle();
    const asWindow = this.asDomHelper.createDiv();
    asWindow.className = ASWINDOW_CLASSNAME;
    asWindow.setAttribute("data-id", this.guid);
    this.asDomHelper.setElementPosition(asWindow, 'top', 0);
    this.asDomHelper.setElementPosition(asWindow, 'left', 0);
    this.asDomHelper.setElementWidth(asWindow, this.minWidth);
    this.asDomHelper.setElementHeight(asWindow, this.minHeight);

    asWindow.addEventListener("click", this.windowClick, true);

    const asLabel = new ASLabel(this.getWindowCount(), this.guid, 'window-z-index','hide');
    asWindow.appendChild(asLabel.getHtmlElement());

    const asWindowTopBar = this.generateTopBar(asWindow);
    const asWindowContent = this.generateContent(asWindow);
    const asWindowBottomBar = this.generateBottomBar(asWindow);

    asWindow.appendChild(asWindowTopBar);
    asWindow.appendChild(asWindowContent);
    asWindow.appendChild(asWindowBottomBar)

    this.asDomHelper.addToBody(asWindow);
  }

  this.initialize();
}
