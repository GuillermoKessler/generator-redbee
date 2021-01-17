var Generator = require('yeoman-generator');

module.exports = class extends Generator {
    // The name `constructor` is important here
    constructor(args, opts) {
      // Calling the super constructor is important so our generator is correctly set up
      super(args, opts);

      // This makes `appname` a required argument.
    this.argument("appname", { type: String, required: true });

    // And you can then access it later; e.g.
    this.log(this.options.appname);
  
      // Next, add your custom code
      this.option('babel'); // This method adds support for a `--babel` flag
      
    }

    method1() {
        this.log('method 1 just ran');
      }
    
      method2() {
        this.log('method 2 just ran');
      }

      async prompting() {
        this.answers = await this.prompt([
          {
            type: "input",
            name: "name",
            message: "Your project name",
            default: this.appname // Default to current folder name
          },
          {
            type: "confirm",
            name: "cool",
            message: "Would you like to enable the Cool feature?"
          },
          {
            type: 'checkbox',
            name: 'features',
            message: 'What more would you like?',
            choices: [{
              name: 'Sass',
              value: 'includeSass',
              checked: true
            }, {
              name: 'Bootstrap',
              value: 'includeBootstrap',
              checked: true
            }, {
              name: 'Modernizr',
              value: 'includeModernizr',
              checked: true
            }]
          }
        ]);
    
        this.log("app name", this.answers.name);
        this.log("cool feature", this.answers.cool);
        this.log("check", this.answers.features);
      }

      writing() {
        this.log("cool feature", this.answers.cool); // user answer `cool` used
      }


  };