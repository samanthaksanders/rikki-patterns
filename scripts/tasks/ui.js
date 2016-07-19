var _ = require('lodash');
var path = require('path');
var fs = require('fs');
var gulp = require('gulp');
var gutil = require('gulp-util');
var glob = require('glob');

var schema = require('../../app/utils/schema');
var tokens = require('../../app/utils/tokens');
var Schema = schema.default;
var TokenSchema = tokens.default;


var _cachedSchema;

var UI_PATH = path.join(__dirname, '..', '..', 'ui');
var COMPONENTS_PATH = path.join(UI_PATH, 'components');


function getUI(category) {
    var scheme = Schema({ path: UI_PATH }).generate();
    _cachedSchema = scheme;

    if (scheme.length) {
      return _.find(scheme, {'id': category }).components;
    }

    return [];
}

function getSchema(category) {
    var schema = Schema({ path: UI_PATH }).generate();
    return _.find(schema, {'id': category});
}


function findComponent(id) {
    var components = getSchema('components');
    return _.find(components.components, {'id': id})
}


function getStateFromFlavour(component, flavour, variant) {
    var flavourData = _.find(component.flavours, {'id': flavour});
    var state;

    if (flavourData.states && Array.isArray(flavourData.states)) {
        state = _.find(flavourData.states, {'id': variant });
    }

    if (flavourData.state) {
        state = flavourData.state;
    }

    return state;
}







function getTokens() {
    var tokens = TokenSchema({ path: path.join('./ui/tokens', '*.json') }).generate();
    return tokens;
}




module.exports = {
    getUI: getUI,
    getSchema: getSchema,
    getTokens: getTokens,
    findComponent: findComponent,
    pathTrimStart: schema.pathTrimStart,
    createTitle: schema.createTitle,
    getStateFromFlavour: getStateFromFlavour
};


gulp.task('schema', function(done) {
    getTokens();
    done();
})
