function ASWindow(title) {
  var instance = this;

  this.asDomHelper = new ASDomHelper();
  this.guid = generateUUID();
  this.title = title;

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

  this.restoreWindowClick = function(e) {
    console.log("restoring window " + instance.guid);
    var asWindowMinimizedButton = document.querySelector("div[data-id='"+instance.guid+"'][class='"+ASWINDOW_MINIMIZED+"']");
    asWindowMinimizedButton.parentNode.removeChild(asWindowMinimizedButton);
    var asWindow = document.querySelector("div[data-id='"+instance.guid+"']");
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
    asWindow.style.width = browserDimensions.width - asWindow.offsetLeft + "px";
    asWindow.style.height = browserDimensions.height - asWindow.offsetTop + "px";

    this.originalWidth

    console.log(asWindow.style.width + " " + browserDimensions.width);
    console.log(asWindow.style.height + " " + browserDimensions.height);
  }

  this.closeButtonClick = function(e) {
    console.log("closing widnow " + instance.guid);
    var asWindow = document.querySelector("div[data-id='"+instance.guid+"']");
    asWindow.parentNode.removeChild(asWindow);
  }

  this.generateRandomTitle = function() {
    const jsonRandomList = '{"names": ["test","testy","tiesto"]}';
    const randomNameList = JSON.parse(jsonRandomList).names;
    const randomNumber = Math.floor(Math.random() * randomNameList.length);
    const name = randomNameList[randomNumber];
    return name;
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

  this.initialize = function() {
    //this.title = this.generateRandomTitle();
    const asWindow = this.asDomHelper.createDiv();
    asWindow.className = ASWINDOW_CLASSNAME;
    asWindow.setAttribute("data-id", this.guid);
    asWindow.style.height = "200px";
    asWindow.style.width = "200px";

    const asWindowTopBar = this.asDomHelper.createDiv();
    new DraggableElement(asWindowTopBar, asWindow);
    asWindowTopBar.className = ASWINDOW_TOP_BAR_CLASSNAME + " clearfix";

    const titleBar = this.asDomHelper.createDiv();
    titleBar.className = ASWINDOW_TITLE_CLASSNAME;
    titleBar.innerHTML = this.title;

    const iconBarHolder = this.asDomHelper.createDiv();
    iconBarHolder.className = ASWINDOW_TOP_BUTTONS_CLASSNAME;

    const asWindowBottomBar = this.asDomHelper.createDiv();
    asWindowBottomBar.className = ASWINDOW_BOTTOM_BAR_CLASSNAME + " clearfix";

    const minimizeButton = new ASButton("i", "fas fa-window-minimize", "Minimize", this.minimizeButtonClick);
    const maximizeButton = new ASButton("i", "fas fa-window-maximize", "Maximize", this.maximizeButtonClick);
    const closeButton = new ASButton("i", "fas fa-window-close", "Close", this.closeButtonClick);

    iconBarHolder.appendChild(minimizeButton.getHtmlElement());
    iconBarHolder.appendChild(maximizeButton.getHtmlElement());
    iconBarHolder.appendChild(closeButton.getHtmlElement())

    asWindowTopBar.appendChild(iconBarHolder);
    asWindowTopBar.appendChild(titleBar);

    const asWindowContent = this.asDomHelper.createDiv();
    asWindowContent.className = ASWINDOW_CONTENT_CLASSNAME;
    asWindowContent.innerHTML = "Example content";

    const asWindowStatusBar = this.asDomHelper.createDiv();
    asWindowStatusBar.className = ASWINDOW_STATUS_CLASSNAME;
    asWindowStatusBar.innerHTML = "bottom status bar";

    const asWindowExpand = this.asDomHelper.createDiv();
    new ExpandableElement(asWindowExpand, asWindow);
    asWindowExpand.className = ASWINDOW_EXPAND;

    asWindowBottomBar.appendChild(asWindowStatusBar);
    asWindowBottomBar.appendChild(asWindowExpand);

    asWindow.appendChild(asWindowTopBar);
    asWindow.appendChild(asWindowContent);
    asWindow.appendChild(asWindowBottomBar)

    document.getElementsByTagName("body")[0].appendChild(asWindow);
  }

  this.initialize();
}