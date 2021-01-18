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
                type: "input",
                name: "appName",
                message: "Nombre del proyecto Java",
            }, 
            {
                type: "input",
                name: "packageName",
                message: "Package name"
            }
        ]);

    }

    default() {
        this.log("nombre aplicacion", this.answers.appName);
    }

};