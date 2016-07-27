"use strict";

const _ = require('lodash');
const fs = require('fs');
const Path = require('path');
const nconf = require('nconf');

const _ui = require('./utils/ui');
const getSchema = _ui.getSchema;
const pathTrimStart = _ui.pathTrimStart;
const findComponent = _ui.findComponent;
const getStateFromFlavour = _ui.getStateFromFlavour;
const getTokens = _ui.getTokens;

const nav = require('./navigation').nav;


// console.log(nav);

const getComponentData = (data) => {
    let id = data.id;
    let path = data.path;
    let componentData = findComponent(id);
    componentData.template = pathTrimStart(Path.join(path, id + '.html'));
    return componentData;
}

const getComponentFromNav = (nav, name) => {
    let components = _.find(nav.children, {'id': 'components'});
    return _.find(components.children, {'id': name});
}


exports.getComponentData = getComponentData;
exports.getComponentFromNav = getComponentFromNav;


exports.componentOverviewView = (req, res, next) => {
    let name = req.params.name;
    let flavour = req.params.flavour;
    let variant = req.params.variant;

    let navData = getComponentFromNav(nav, name);
    let data = getComponentData(navData);

    res.render('component.html', {
        component: data,
        navigation: nav,
        config: nconf.get('app'),
        tokens: getTokens()
    });
}

exports.componentRawView = (req, res, next) => {
    let name = req.params.name;
    let flavour = req.params.flavour;
    let variant = req.params.variant;

    let navData = getComponentFromNav(nav, name);
    let component = getComponentData(navData);
    let state = getStateFromFlavour(component, flavour, variant);

    res.render('component-raw.html', {
        component: component,
        navigation: nav,
        state: state,
        config: nconf.get('app'),
        tokens: getTokens()
    });
}

const autoIndexify = (page) => {
    return page === '' ? 'index' : page;
}

exports.autoIndexify = autoIndexify;


exports.generic = (req, res, next) => {
    let page = req.params[0] || 'index';
    page = pathTrimStart(page);
    page = autoIndexify(page);

    let tokens = getTokens();
    let colours = _.find(tokens, {name: 'aliases'});

    res.render(`${page}.html`, {
        navigation: nav,
        config: nconf.get('app'),
        tokens: getTokens(),
        colours: colours ? colours.items : [],
    });
}
