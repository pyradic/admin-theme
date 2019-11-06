import { plugins, Webpacker } from '@radic/webpacker';
import { resolve } from 'path';
import { Compiler } from 'webpack';
import { existsSync, unlinkSync } from 'fs';

const wp = new Webpacker({
    contextPath               : __dirname,
    path                      : __dirname,
    // workspace: '../../',
    outputPath                : resolve(__dirname, 'resources'),
    sourceMap                 : false,
    installMissingDependencies: false,
    mode                      : process.env.NODE_ENV as any
})

wp.blocks.rules.scss(wp, {
    css : {
        sourceMap: false
    },
    scss: {
        sourceMap     : false,
        implementation: require('sass')
    }
});
wp.blocks.helpers.replaceStyleLoader(wp, 'scss');
wp.output.path(__dirname);
wp.resolve.modules.add(resolve(__dirname, '../../../../node_modules'))
plugins.miniCssExtract(wp, {
    filename     : 'resources/css/[name].css',
    chunkFilename: 'resources/css/[name].chunk.[id].css'
})
wp.devtool(false); // disables production .map files
// wp.output.path(join(__dirname, 'resources'));

wp.entry('bootstrap').add(resolve(__dirname, 'resources/scss/bootstrap.scss'))
wp.entry('theme').add(resolve(__dirname, 'resources/scss/theme.scss'))


const config = wp.toConfig();

class AfterPlugin {
    apply(compiler: Compiler) {
        compiler.hooks.done.tap('AfterPlugin', async (stats) => {
            Array.from(stats.compilation.entrypoints.keys()).forEach(entryName => {
                let path = resolve(__dirname, entryName);
                if ( existsSync(path) ) {
                    process.stdout.write(`\n ${path} deleted \n`)
                    unlinkSync(path)
                }
            })
        })
    }
}

config.plugins.push(new AfterPlugin())

export { config, wp }
export default config