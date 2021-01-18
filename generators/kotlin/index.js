const Generator = require('yeoman-generator');
const path = require('path');
const _ = require('lodash');

module.exports = class extends Generator {

    constructor(args, opts) {
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
            },
            {
                type: 'list',
                name: 'databaseType',
                message: 'Seleccione tipo de base de datos',
                choices: [
                    {
                        value: 'mysql',
                        name: 'mysql'
                    },
                    {
                        value: 'postgres',
                        name: 'postgres'
                    },
                    {
                        value: 'ninguna',
                        name: 'ninguna'
                    }
                ],
                default: 'ninguna'
            },
            {
                type: 'checkbox',
                name: 'features',
                message: 'Otras tecnologias',
                choices: [{
                  name: 'Redis',
                  value: 'includeRedis',
                  checked: false
                }, {
                  name: 'Mongo',
                  value: 'includeMongo',
                  checked: false
                }, {
                  name: 'Kafka',
                  value: 'includeKafka',
                  checked: false
                }]
              }
        ]);

    }

    configuring() {
        this.destinationRoot(path.join(this.destinationRoot(), '/'+this.answers.appName));
    }

    writing() {

        this.answers.packageFolder = this.answers.packageName.replace(/\./g, '/');

        const templates = [
            'SeedApplication.kt'
        ];


        const mainJavaRootDir = 'src/main/kotlin/';
        this._generateCode(this.answers, templates, 'app/', mainJavaRootDir, this.answers.packageFolder);

        if(this.answers.databaseType === 'postgres') {
            const templates = [
                'repositories/GymRepository.kt'
            ];

            this._generateCode(this.answers, templates, 'app/', mainJavaRootDir, this.answers.packageFolder);
        }

        this._generateGradleBuildScript(this.answers)


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

    _generateGradleBuildScript(configOptions) {
        const gradleConfigDir = 'app/';

        ['build.gradle.kts', 'settings.gradle.kts'].forEach(tmpl => {
            this.fs.copyTpl(
                this.templatePath(gradleConfigDir + tmpl),
                this.destinationPath(tmpl),
                configOptions
            );
        });

    }


};