function ASContentGenerator() {
  var instance = this;

  this.generateWindowContent = function() {
    var content = "<h1>Heading 1</h1><h2>Heading 2</h2><h3>Heading 3</h3><h4>Heading 4</h4><h5>Heading 5</h5><p>paragraph</p><a>link</a>";
    content += "<br /><br /><br /><br /><br /><br /><br /><hr /><p>Hidden paragraph</p><input type='text' />";
    return content;
  }
}
