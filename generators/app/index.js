const Generator = require('yeoman-generator');
const path = require('path');
const _ = require('lodash');

module.exports = class extends Generator {

    // The name `constructor` is important here
    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);
    }


    async prompting() {
        this.answers = await this.prompt([
            {
                type: "input",
                name: "appName",
                message: "Nombre del proyecto",
            }, 
            {
                type: "input",
                name: "packageName",
                message: "Package name"
            }
        ]);

        this.log("nombre aplicacion", this.answers.appName);
        this.log("nombre paquete", this.answers.packageName);
    }

    configuring() {
        this.destinationRoot(path.join(this.destinationRoot(), '/'+this.answers.appName));
    }

    writing() {
        this.log("nombre aplicacion", this.answers.appName);

        this.answers.packageFolder = this.answers.packageName.replace(/\./g, '/');


        const templates = [
            'SeedApplication.kt'
        ];

        const mainJavaRootDir = 'src/main/kotlin/';
        this._generateCode(this.answers, templates, 'app/', mainJavaRootDir, this.answers.packageFolder);


    }

    _generateCode(configOptions, templates, srcRoot, baseFolder, packageFolder) {
        templates.forEach(tmpl => {
            if (_.isString(tmpl)) {
                this.fs.copyTpl(
                    this.templatePath(srcRoot + baseFolder + tmpl),
                    this.destinationPath(baseFolder + packageFolder + '/' + tmpl),
                    configOptions
                );
            } else {
                this.fs.copyTpl(
                    this.templatePath(srcRoot + baseFolder + tmpl.src),
                    this.destinationPath(baseFolder + packageFolder + '/' + tmpl.dest),
                    configOptions
                );
            }
        });
    }


};