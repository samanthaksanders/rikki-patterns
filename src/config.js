const path = require('path');
const pkg = require('../package.json');

const PROD = process.env.NODE_ENV === 'production';

const uiPath = path.join(process.cwd(), 'client', 'ui');

module.exports = {
    DEBUG: !PROD,
    paths: {
        generator: {
            template: path.join(__dirname, 'scripts', 'generator', '**', '*'),
        },
        site: {
            templates: path.join(__dirname, 'site', 'templates'),
            pages: path.join(__dirname, 'site', 'pages'),
            static: path.join(__dirname, 'site', 'static'),
            css: path.join(__dirname, 'site', 'static', 'css'),
            scss: path.join(__dirname, 'site', 'scss'),
        },
        ui: {
            root: uiPath,
            components: path.join(uiPath, 'components'),
            swatches: path.join(uiPath, 'swatches'),
            tokens: path.join(uiPath, 'tokens'),
            aliases: path.join(uiPath, 'tokens', 'aliases.json'),
            css: path.join(uiPath, 'css'),
            scss: path.join(uiPath, 'scss'),
            tokensScss: '_tokens.scss',
        },
        staticSite: {
            root: path.join(uiPath, 'www'),
            static: path.join(uiPath, 'www', 'static'),
        },
    },
    swatches: {
        sketch: 'swatches-sketch.sketchpalette',
        adobe: 'swatches-adobe.ase',
    },
    app: {
        title: 'Rikki Design System',
        seo: {
            title: 'Rikki Patterns',
        },
    },
    pkg: pkg,
};
