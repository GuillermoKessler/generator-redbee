'use strict';

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
                type: 'list',
                name: 'projectType',
                message: 'Seleccione tipo de proyecto',
                choices: [
                    {
                        value: 'scala',
                        name: 'Scala - Play'
                    },
                    {
                        value: 'java-spring',
                        name: 'Java - Spring Boot'
                    },
                    {
                        value: 'kotlin-spring',
                        name: 'Kotlin - Spring Boot'
                    }
                ],
                default: 'kotlin-spring'
            }
        ]);

    }

    default() {

        if(this.answers.projectType === 'scala') {
            this.composeWith(require.resolve('../scala'));
        }

        if(this.answers.projectType === 'java-spring') {
            this.composeWith(require.resolve('../java'));
        }

        if(this.answers.projectType === 'kotlin-spring') {
            this.composeWith(require.resolve('../kotlin'));
        }

    }

};