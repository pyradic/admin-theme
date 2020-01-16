(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[10],{

/***/ "./packages/pyro/platform/lib/utils/generateVueCodeCompletion.ts":
/*!***********************************************************************!*\
  !*** ./packages/pyro/platform/lib/utils/generateVueCodeCompletion.ts ***!
  \***********************************************************************/
/*! exports provided: generateVueCodeCompletion */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateVueCodeCompletion", function() { return generateVueCodeCompletion; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mergeChildPrototypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mergeChildPrototypes */ "./packages/pyro/platform/lib/utils/mergeChildPrototypes.ts");
/* harmony import */ var lodash_camelCase__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash/camelCase */ "./node_modules/lodash/camelCase.js");
/* harmony import */ var lodash_camelCase__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash_camelCase__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var lodash_capitalize__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash/capitalize */ "./node_modules/lodash/capitalize.js");
/* harmony import */ var lodash_capitalize__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash_capitalize__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var lodash_kebabCase__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lodash/kebabCase */ "./node_modules/lodash/kebabCase.js");
/* harmony import */ var lodash_kebabCase__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash_kebabCase__WEBPACK_IMPORTED_MODULE_5__);







var log = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js")('utils:generatevuecode');

function getPlugin() {
  var plugins = getPlugins();

  for (var _i = 0, plugins_1 = plugins; _i < plugins_1.length; _i++) {
    var plugin = plugins_1[_i];

    if (plugin.NAME && plugin.NAME === '@crvs/admin') {
      return plugin;
    }
  }

  console.dir({
    plugins: plugins
  });
  throw new Error('not found plugin');
}

function getPlugins() {
  return vue__WEBPACK_IMPORTED_MODULE_1___default.a['_installedPlugins'];
}

function getComponentsFromPlugin(plugin) {
  var components = [];
  Object.keys(plugin).forEach(function (key) {
    var val = plugin[key];

    if (val && val.name && val.name === 'VueComponent') {
      components.push(val);
    }
  });
  return components;
} // type Props = Record<string, PropOptions<any>>;
//
// interface Transformer {
//     id:string
//     transform(data: { name: string, props: Props, component: Component }): string
//
//     finalize(transformed: string[]): string
// }
//
// export class CompletionGenerator {
//     transformers: Transformer[]
//
//     register(transformer: Transformer) {
//         this.transformers.push(transformer)
//     }
//
//     generate() {
//         for ( const transformer of this.transformers ) {
//             for ( const component of this.getComponents() ) {
//                 transformer.transform(component)
//             }
//         }
//     }
//
//     getComponents(): Array<{ name: string, props: Props, component: Component }> {
//         let components     = mergeChildPrototypes(Vue.options.components)
//         let componentNames = Object.keys(components);
//
//         return componentNames.map(name => {
//             let component = components[ name ];
//             let props     = component?.options?.props ?? component.props
//             return { name, component, props }
//         });
//     }
// }
//
// export class VueCompletionTransformer implements Transformer {
//     id = 'vue'
//     public transform(data: { name: string; props: Props; component: Component }): string {
//
//     }
//
//     public finalize(transformed: string[]): string {
//
//     }
// }


function transformPropsData(props) {
  var propNames = Object.keys(props);

  for (var _i = 0, propNames_1 = propNames; _i < propNames_1.length; _i++) {
    var name = propNames_1[_i];
    var prop = props[name];
  }

  return propNames.map(function (name) {
    var prop = props[name]; // log('transformPropsData', name, { propNames, prop });

    var type = "";

    if (prop.type && prop.type['name']) {
      type = "type: " + prop.type['name'] + ",";
    }

    var def = "";

    if (prop.default) {
      def = "default: " + JSON.stringify(prop.default) + ",";
    }

    var out = "\n" + name + ": {\n    " + def + "\n    " + type + "\n}";
    return out;
  }); // props.asdf.type.name.string()
}

function transformPropsDataJsx(props) {
  var propNames = Object.keys(props);

  for (var _i = 0, propNames_2 = propNames; _i < propNames_2.length; _i++) {
    var name = propNames_2[_i];
    var prop = props[name];
  }

  return propNames.map(function (name) {
    var prop = props[name]; // log('transformPropsData', name, { propNames, prop });

    var type = "any";

    if (prop.type && prop.type['name']) {
      type = prop.type['name'].toLowerCase();
    }

    if (type === 'function') {
      type = 'Function';
    }

    if (type === 'array') {
      type = 'Array<any>';
    }

    name = lodash_camelCase__WEBPACK_IMPORTED_MODULE_3___default()(name);
    return "'" + name + "'?: " + type;
  }); // props.asdf.type.name.string()
}

function generate() {
  // let _plugin    = getPlugin()
  var components = Object(_mergeChildPrototypes__WEBPACK_IMPORTED_MODULE_2__["mergeChildPrototypes"])(vue__WEBPACK_IMPORTED_MODULE_1___default.a.options.components); // let plugins    = getPlugins().filter(plugin => plugin.NAME !== _plugin.NAME)
  // for ( let plugin of plugins ) {
  //     components.push(...getComponentsFromPlugin(plugin));
  // }

  log({
    components: components
  });
  var generated = [];
  var jsx = [];
  Object.keys(components).forEach(function (key) {
    var _a, _b, _c, _d, _e, _f;

    var c = components[key];
    var name = lodash_kebabCase__WEBPACK_IMPORTED_MODULE_5___default()(key);

    if (key.startsWith('El')) {
      name = key;
    } else if (key.startsWith('el-')) {
      name = lodash_capitalize__WEBPACK_IMPORTED_MODULE_4___default()(lodash_camelCase__WEBPACK_IMPORTED_MODULE_3___default()(key));
    } // if ( c[ 'options' ] && c[ 'options' ][ 'props' ] ) {
    //     generated.push({
    //         name,
    //         props: transformPropsData(c[ 'options' ][ 'props' ] as any)
    //     })
    // } else if ( c[ 'props' ] ) {
    //     generated.push({
    //         name,
    //         props: transformPropsData(c[ 'props' ] as any)
    //     })
    // }


    generated.push({
      name: name,
      props: transformPropsData((_c = (_b = (_a = c) === null || _a === void 0 ? void 0 : _a.options) === null || _b === void 0 ? void 0 : _b.props, _c !== null && _c !== void 0 ? _c : c.props || {}))
    });
    jsx.push({
      name: lodash_kebabCase__WEBPACK_IMPORTED_MODULE_5___default()(key),
      props: transformPropsDataJsx((_f = (_e = (_d = c) === null || _d === void 0 ? void 0 : _d.options) === null || _e === void 0 ? void 0 : _e.props, _f !== null && _f !== void 0 ? _f : c.props || {}))
    });
    log('generated', key, {
      name: name,
      c: c
    });
  }); // p.components[1].options.props.value.type.name.toString()

  var jsxLines = jsx.map(function (gen) {
    return "\"" + gen.name + "\"?: TsxComponentAttrs<{ \n" + gen.props.join('\n') + "\n }>";
  });
  var lines = generated.map(function (gen) {
    var prop = gen.props.join(',');
    return "Vue.component('" + gen.name + "', {\n    props: {\n        " + prop + "\n    }\n});\n";
  });
  lines.unshift('import Vue from "vue";');
  var result = lines.join('\n');

  var getResult = function getResult() {
    return result.replace('↵', '\n');
  };

  console.log(result);
  var jsxResult = jsxLines.join("\n");

  var getJsxResult = function getJsxResult() {
    return jsxResult.replace('↵', '\n');
  };

  return {
    components: components,
    lines: lines,
    result: result,
    getResult: getResult,
    jsxResult: jsxResult,
    getJsxResult: getJsxResult
  };
}

function generateVueCodeCompletion() {
  return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
    var ElementUI;
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [4
          /*yield*/
          , Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(1), __webpack_require__.e(2)]).then(__webpack_require__.t.bind(null, /*! element-ui */ "./node_modules/element-ui/lib/element-ui.common.js", 7))];

        case 1:
          ElementUI = _a.sent();
          vue__WEBPACK_IMPORTED_MODULE_1___default.a.use(ElementUI, {
            locale: 'nl'
          });
          return [2
          /*return*/
          , generate()];
      }
    });
  });
}

/***/ }),

/***/ "./packages/pyro/platform/lib/utils/mergeChildPrototypes.ts":
/*!******************************************************************!*\
  !*** ./packages/pyro/platform/lib/utils/mergeChildPrototypes.ts ***!
  \******************************************************************/
/*! exports provided: mergeChildPrototypes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mergeChildPrototypes", function() { return mergeChildPrototypes; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");

function mergeChildPrototypes(val) {
  var value = val;
  var result = value ? Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, value) : {};

  while (value !== null) {
    result = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, result), value);
    value = Object.getPrototypeOf(value);
  }

  return result;
}

/***/ })

}]);
//# sourceMappingURL=chunk.10.js.map