import { Builder } from '@pyro/webpack';
import { resolve } from 'path';


export function configure(builder: Builder) {
    return;
    const { wp, addons, env } = builder;
    let addon                 = addons.get('@pyro/admin-theme');
    wp.resolve.alias.set(resolve(process.cwd(), 'node_modules/element-ui/packages/icon/src/icon.vue'), resolve(__dirname, 'lib/components/el-icon/icon.vue'));
    // wp.resolve.alias.set('packages/icon/src/icon.vue', resolve(__dirname, 'lib/components/el-icon/icon.vue'));
    wp.resolve.alias.set('packages/icon/src/icon.vue', addon.getRPath('lib/components/el-icon/icon.vue'));
    // wp.resolve.alias.set('packages/icon/src', resolve(__dirname, 'lib/components/el-icon'));
    wp.resolve.alias.set('packages/icon/src', addon.getRPath('lib/components/el-icon'));
    wp.resolve.alias.set('element-ui/packages/icon/src/icon.vue', resolve(__dirname, 'lib/components/el-icon/icon.vue'));
    wp.resolve.alias.set('src/icon.vue', resolve(__dirname, 'lib/components/el-icon/icon.vue'));
    // wp.resolve.alias.set('./packages/icon/src/icon.vue', resolve(__dirname, 'lib/components/el-icon/icon.vue'));
    wp.resolve.alias.set('./packages/icon/src/icon.vue', addon.getRPath('lib/components/el-icon/icon.vue'));
    // wp.resolve.alias.set('element-ui/packages/icon', resolve(__dirname, 'lib/components/el-icon/icon.vue'));
    wp.resolve.alias.set('element-ui/packages/icon', addon.getRPath( 'lib/components/el-icon/icon.vue'));
    // builder.hooks.initialized.tap('@pyro/admin-theme', builder => {
    // const  wp = builder.addWebpacker({
    //     contextPath:__dirname,
    //     path:__dirname,
    //     // workspace: '../../',
    //     outputPath: resolve(__dirname,'resources'),
    //     sourceMap: false,
    //     installMissingDependencies:false,
    //     mode: builder.mode
    // })
    //
    // wp.blocks.rules.scss(wp, {
    //     scss: {
    //         implementation: require('sass')
    //     }
    // });
    // wp.blocks.helpers.replaceStyleLoader(wp, 'scss');
    //
    // // wp.output.path(join(__dirname, 'resources'));
    //
    // wp.entry(join(__dirname, 'bootstrap')).add(resolve(__dirname, 'resources/scss/bootstrap/bootstrap.scss'))

    // wp.module.rule('babel').exclude.add(/el-menu/)
    // wp.module.rule('el-menu').test(/\.(js|mjs|jsx)$/).include.add(/el-menu/);
    // wp.blocks.rules.babel(wp, {
    //     'presets': [ [ '@babel/env', { 'loose': true, 'modules': false, 'targets': { 'browsers': [ '> 1%', 'last 2 versions', 'not ie <= 8' ] } } ] ],
    //     'plugins': [ 'transform-vue-jsx' ],
    //     'env'    : {
    //         'utils': {
    //             'presets': [ [ '@babel/env', { 'loose': true, 'modules': 'commonjs', 'targets': { 'browsers': [ '> 1%', 'last 2 versions', 'not ie <= 8' ] } } ] ],
    //             'plugins': [ [ 'module-resolver', { 'root': [ 'element-ui' ], 'alias': { 'element-ui/src': 'element-ui/lib' } } ] ]
    //         }
    //     }
    // }, 'el-menu')
    // })
}