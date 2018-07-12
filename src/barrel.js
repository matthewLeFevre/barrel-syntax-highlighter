/*
* Barrel Syntax Highlighter
*
* -- may not be as preformant as more mature syntax highlighting tools --
*
* Plug and Play - more detailed instructions on: 
*  https://github.com/matthewLeFevre/barrel-syntax-highlighter
*
*  1. download file
*  2. Make your own theme by altering the config.css file
*/

class SyntaxHighlight {

  // Two parameters are optional
  constructor(source = null, dest = null) {

    // Handle source/destination 
    //
    // By default only source is declared
    // Destination is optional
    if (dest === null) {
      this.source = source;
      this.dest   = source;
    } else if (source === true && dest === true) {
      this.source = source;
      this.dest   = dest;
    } else {
      console.log("Please provide a source location.");
    }

    // retrieve type of syntax highlighting
    //
    // can be 'html' or 'css' add this to your
    // source element as a name attribute
    this.type   = source.attributes.name.nodeValue;

    // process type and formate accordingly
    if (this.type === "html") {
      this.format_html();
    } else if (this.type === "css") {
      this.format_css();
    }else if (this.type == 'js'){    
      this.format_js();
    } else if (this.type == 'php'){
      this.format__php();
    } else {
      console.log("Please Formate HTML or CSS");
    }
  }

  format_html() {

    // retrive code to be parsed
    let code = this.source.innerHTML;

    // Replace crucial symboles with html entities
        code = code.replace(/\"\>/g, '\" >')
                   .replace(/</g, ' &lt;')
                   .replace(/>/g, '&gt; ')
                   .replace(/\=\"/g, '\= \"');

    // compile into an array for processing
    let codeParts = code.split(" "),
        finished  = "";
    
    // cycles through code and applies syntax
    for (let part of codeParts) {
      
      // finds opening comment
      if (part.startsWith('&lt;!--')) {
        finished += "<em><span class='c'>" + part;

        // finds closing comment
      } else if (part.endsWith('--&gt;')) {
        finished += part + "</span></em>";

      // finds opening and closing brackets for tags
      }else if (part.startsWith('&lt;') || part.endsWith('&gt;')) {
        finished += "<span class='t'>" + part + "</span> ";

        // finds attributes in tags
      } else if(part.endsWith("=")) {
        finished += "<span class='a'>" + part + "</span>";

        // finds values to attributes or strings
      } else if (part.startsWith('"')) {
        finished += "<span class='s'>" + part + " ";

      } else if(part.endsWith('"')) {
        finished += part + "</span>"

        // Adds all other parts of the code seperated by spaces
      }else {
        finished += part + " ";
      }
    }

    // injects formatted code into dom for syntax highlighting
    this.dest.innerHTML = finished;
  }

  format_css () {
    let code = this.source.innerHTML,
        finished = "";

    // remedies line breaks & space bug
        code = code.replace(/\n/g, " \n ");
    let codeParts = code.split(" ");

    for (let part of codeParts) {
      // class
      if (part.startsWith(".")) {
          finished += "<span class='l'>"+ part + "</span> ";

      // id
      }else if (part.startsWith("#") 
                && !part.endsWith(";")) {

        finished += "<span class='t'>" + part + "</span> ";

      // property
      }else if (part.endsWith(":")) {
        finished += "<span class='a'>" + part + "</span> ";

      // value
      }else if (part.endsWith(";")) {
        finished += "<span class='s'>" + part + "</span>";

      // @ decorator 
      }else if (part.startsWith("@")) {
        finished += "<span class='t'>" + part + "</span> ";

      // comments
      } else if (part.startsWith("/*")) {
        finished += "<span class='c'>" + part + " ";
      } else if (part.endsWith("/*")) {
        finished += " " + part + "</span>";
      } else {
        finished += part + " ";
      }
      this.dest.innerHTML = finished;
    }

  }

  format_js () {
    let code = this.source.innerHTML,
        finished = "";

        // remedies line breaks & space bug
        code = code.replace(/\n/g, " \n ");
    let codeParts = code.split(" ");

    for(let part of codeParts) {
      // keywords
      let keywords = ['function', 'class', 'let', 'var', 'const', 'if', 'for', 'while', 'new'];
      for(let word of keywords){
        if(this.part == word) {
          finished += "<span class='l'>" + part + "</span> ";
        }
      }
    }
  }

  format_php () {
    let code = this.source.innerHTML,
        finished = "";

        // remedies line breaks & space bug
        code = code.replace(/\n/g, " \n ");
    let codeParts = code.split(" ");

    for(let part of codeParts) {
      // keywords
      let keywords = ['function', 'class', 'const', 'if', 'for', 'while', 'new'];
      for(let word of keywords){
        if(this.part == word) {
          finished += "<span class='l'>" + part + "</span> ";
        }
      }
    }
  }
}

window.onload = () => {
  let html_blocks = document.getElementsByName("html");
  let css_blocks  = document.getElementsByName("css");
  for( let block of html_blocks) {
    new SyntaxHighlight(block);
  }

  for( let block of css_blocks) {
    new SyntaxHighlight(block);
  }
}



