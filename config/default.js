'use strict';

const Path = require('path');

module.exports = {
  'NODE_ENV': 'development',
  "NODEMON_BOOT_WAIT_TIME": 500,
  "BROWSERSYNC_RELOAD_INTERVAL": 1000,
  "PORT": 4000,
  "proxy": 5000,
  'root': Path.join(__dirname, '..'),
  "paths": {
    "components": "./ui/components",
    "generator": {
      "template": "./scripts/generator/**/*"
    },
    "staticSite": {
      "root": "./www",
      "static": "./www/static"
    },
    "site": {
      "pages": "./site/pages",
      "static": "./site/static"
    },
    "ui": {
      "swatches": "./ui/swatches",
      "tokens": "./ui/tokens/",
      "aliases": "./ui/tokens/aliases.json",
      "scss": "./ui/scss",
      "tokensScss": "_tokens.scss",
      "components": "./ui/components",
      "config": "config.yaml",
      "root": "./ui"
    }
  },
  "swatches": {
    "sketch": "swatches-sketch.sketchpalette",
    "sketchCompatibleVersion": "1.0",
    "sketchPluginVersion": "1.1",
    "adobe": "swatches-adobe.ase",
    "adobeVersionNumber": '1.0.0'
  },
  "tokens": {
    "templateString": "// Design System Tokens \n// Generated at <%= time %> \n\n<%= data %>"
  },
  "app": {
    "title": "Pattern Library",
    "seo": {
      "title": "Pattern Library"
    }
  },
  "taskPrefix": "pl",
  "templates": {
    "component": "component.html",
    "raw": "component-raw.html",
    "ext": ".html",
    "indexName": "index"
  }
}
