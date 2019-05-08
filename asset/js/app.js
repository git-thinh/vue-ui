/*!
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */
(function (window) {
    function classReg(className) {
        return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
    }
    var classie, hasClass, addClass, removeClass;
    if ('classList' in document.documentElement) {
        hasClass = function (elem, c) {
            return elem.classList.contains(c);
        };
        addClass = function (elem, c) {
            elem.classList.add(c);
            return classie;
        };
        removeClass = function (elem, c) {
            elem.classList.remove(c);
            return classie;
        };
    }
    else {
        hasClass = function (elem, c) {
            return classReg(c).test(elem.className);
        };
        addClass = function (elem, c) {
            if (!hasClass(elem, c)) {
                elem.className = elem.className + ' ' + c;
            }
            return classie;
        };
        removeClass = function (elem, c) {
            elem.className = elem.className.replace(classReg(c), ' ');
            return classie;
        };
    }
    function toggleClass(elem, c) {
        var fn = hasClass(elem, c) ? removeClass : addClass;
        fn(elem, c);
        return classie;
    }
    classie = {
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass,
        toggleClass: toggleClass,
        has: hasClass,
        add: addClass,
        remove: removeClass,
        toggle: toggleClass
    };
    if (typeof define === 'function' && define.amd) {
        define(classie);
    } else if (typeof exports === 'object') {
        module.exports = classie;
    } else {
        window.classie = classie;
    }
})(window);
function _apiGet(url) {
    var request = new XMLHttpRequest();
    request.open('GET', url, false);  // `false` makes the request synchronous
    request.send(null);
    if (request.status === 200) return request.responseText;
    return '';
}
/////////////////////////////////////////////////////////////////////////////////
/* _DATA */
var _PATH_LOGIN = '/user/login', _PATH_MAIN = '/dashboard/dashboard';
var _DATA = {
    isMobi: false,
    isTablet: false,
    objApp: {
        device: 'pc',
        theme: 'default',
        layout: 'base',
        size: {
            width: window.innerWidth || document.body.clientWidth,
            height: window.innerHeight || document.body.clientHeight
        },
        orientation: 'portrait',
        view: {}
    },
    objLang: {},
    objAlert: [{ text: '<strong>Success!</strong> Indicates a successful or positive action.', css: 'alert alert-success alert-dismissible' }],
    objUserInfo: {
        loggedIn: false,
        messages: []
    },
    objComponent: {}
};
_DATA.objApp.orientation = _DATA.objApp.size.width > _DATA.objApp.size.height ? 'landscape' : 'portrait';
classie.add(document.body, 'lay-' + _DATA.objApp.orientation);
var size = Math.max(_DATA.objApp.size.width, _DATA.objApp.size.height);
if (size <= 1024 && size >= 800) { _DATA.objApp.device = 'tablet'; _DATA.isTablet = true; } else if (size < 800) { _DATA.objApp.device = 'mobi'; _DATA.isMobi = true; };
classie.add(document.body, 'lay-' + _DATA.objApp.device);
_DATA.objApp.view = JSON.parse(_apiGet('data/view-default.json'));
_DATA.objComponent = JSON.parse(_apiGet('data/view-list.json'));
if (_DATA.objApp.view[location.port] != null && _DATA.objApp.view[location.port].login != null) _PATH_LOGIN = _DATA.objApp.view[location.port].login;
if (_DATA.objApp.view[location.port] != null && _DATA.objApp.view[location.port].main != null) _PATH_MAIN = _DATA.objApp.view[location.port].main;
// STUB CROSS VIA LOGIN
_DATA.objUserInfo.loggedIn = false;
/////////////////////////////////////////////////////////////////////////////////
/* WINDOW EVENT */
window.onorientationchange = function () {
    console.log("WINDOW.orientation: " + screen.orientation.angle);
    //if (Math.abs(window.orientation) === 90)
    if (Math.abs(screen.orientation.angle) === 90) {
        // Landscape
        _DATA.objApp.orientation = 'landscape';
        classie.add(document.body, 'lay-landscape').remove(document.body, 'lay-portrait');
    } else {
        // Portrait
        _DATA.objApp.orientation = 'portrait';
        classie.add(document.body, 'lay-portrait').remove(document.body, 'lay-landscape');
    }
};
/////////////////////////////////////////////////////////////////////////////////
/* VUE */
var _MAIN, _ROUTER, _APP, _COMS, _MIXIN, _MIXIN_COMS, _DATA_SHARED = '', _PROPS = [], _ALLVUE = [],
    _VIEW_CURRENT, _VIEW_TIME_OUT = 500;
for (var key in _DATA) { _PROPS.push(key); }
_PROPS.forEach(function (v) { _DATA_SHARED += ' :' + v + '="' + v + '" '; });
/////////////////////////////////////////////////////////////////////////////////
/* _COMS, _MIXIN */
$(function () {
    _COMS = {
        props: _PROPS,
        computed: {
            ViewConfig: function () {
                if (this._name) {
                    var key = this._name.toLocaleUpperCase().split('-').join('_') + '_CONFIG',
                        config = window[key];
                    console.log(key, config);
                    return config;
                }
                return null;
            }
        },
        created: function () {
            //console.log('CREATED .............');
            //document.getElementById('lay-view').style.display = 'inline-block';
        },
        mounted: function () {
            var _self = this;

            _self.$el.className = 'component ' + _self._data._name;

            var _id = _self.$el.id;
            if (_id == null || _id.length == 0) {
                _id = '___vue-com-' + _self._uid;
                if (_self.$el && _self.$el.setAttribute) {
                    _self.$el.setAttribute('id', _id);
                }
            }
            _self._eleID = _id;

            //if (_self._onOtherViewLoadCompleted && typeof _self._onOtherViewLoadCompleted == 'function')
            //    _self.$on('_onOtherViewLoadCompleted', _self._onOtherViewLoadCompleted);

            if (_VIEW_CURRENT) {
                setTimeout(function () {
                    console.error('HIDE WAITING LOADING VIEW ...');
                    console.log('SHOW VIEW ...');
                    _self.viewMainOpacity(1);
                }, _VIEW_TIME_OUT);

                _ALLVUE.forEach(function (v) {
                    if (v && v.$children) {
                        v.$children.forEach(function (cm) {
                            setTimeout(function () {
                                if (cm && cm._onOtherViewLoadCompleted && typeof cm._onOtherViewLoadCompleted == 'function')
                                    cm._onOtherViewLoadCompleted(_self.getViewConfig(_VIEW_CURRENT));
                            }, 1);
                        });
                    }
                });
            }

            console.log('MIXIN_COMS: ' + _self._data._name + ' mounted ...', _id);
        }
    };
    _MIXIN = {
        computed: {
            screenCurrentId: function () {
                var _self = this;
                if (_self.screenInfoCurrent && _self.screenInfoCurrent.Id) {
                    return _self.screenInfoCurrent.Id;
                }
                return null;
            }
        },
        methods: {
            viewMainOpacity: function (opacity) {
                //if (opacity == 0) document.getElementById('lay-view').style.display = 'none';
                document.getElementById('lay-view').style.opacity = opacity;
            },
            getViewConfig: function (viewName) {
                if (viewName) {
                    var key = viewName.toLocaleUpperCase().split('-').join('_') + '_CONFIG',
                        config = window[key];
                    //console.log(key, config);
                    return config;
                }
                return null;
            },
            screenAlertOpen: function () {
            },
            screenWarningOpen: function () {
            },
            screenConfirmOpen: function () {
            },
            screenToastOpen: function () {
            }
        }
    };
    _ROUTER = new VueRouter();
    _ROUTER.beforeEach((to, from, next) => {
        if (to.matched.some(record => record.meta.requiresAuth) && !_DATA.objUserInfo.loggedIn) {
            next({ path: _PATH_LOGIN, query: { redirect: to.fullPath } });
        } else {
            next();
        }
    });
    _ROUTER.afterEach((to, from) => {
        if (to && to.matched.length > 0) {
            if (_APP) {
                console.log('HIDE VIEW ...');
                _APP.viewMainOpacity(0);
                console.error('SHOW WAITING LOADING VIEW ...');
            }

            var view = to.matched[0].path.substr(1);
            //console.log('ROUTER.afterEach: to = ', to);
            console.log('ROUTER: call = ', view);
        }
    });
    _ROUTER.onReady(function () {
        console.log('ROUTER: ready ...');
    });
});
/////////////////////////////////////////////////////////////////////////////////

// Rest of your worker code goes here.

// In the past...: blob builder existed ...but now we use Blob...:
//var blob = new Blob(["onmessage = function(e) { postMessage('msg from worker'); }"]);
var jsWorker = ' var _date; onmessage = function (oEvent) { _date = oEvent.data; console.log("|||->WORKER: " + _date); setInterval(function () {  postMessage(_date + ": " + new Date().toString()); }, 1000); }; ';
var blob = new Blob([jsWorker], { type: 'application/javascript' });

// Creating a new document.worker property containing all our "text/js-worker" scripts.
document.worker = new Worker(window.URL.createObjectURL(blob));

document.worker.onmessage = function (oEvent) {
    //console.log('->UI: ' + oEvent.data);
};
document.worker.onerror = function (oEvent) {
    //console.log('->UI: ' + oEvent.data);
    throw oEvent.data;
};

// Start the worker.
window.onload = function () {
    console.log('UI init worker ...');
    document.worker.postMessage(new Date);
};

function fn2workerURL(fn) {
    var blob = new Blob(['(' + fn.toString() + ')()'], { type: 'application/javascript' });
    return URL.createObjectURL(blob);
}

/////////////////////////////////////////////////////////////////////////////////

function _svg(className, addClass) {
    var id = className.replace(/ /g, "-"),
      cn = addClass ? " " + addClass : "",
      html = '<svg class="svg-inline--fa fa-w-20' + cn + '"><use xlink:href="#' + id + '"></use></svg>';
    return { html: html };
}

function _apiGo(path) { _MAIN.go(path); }


_MAIN = {
    init: function () {
        console.log('MAIN_INIT ...');
        $(document).ready(function () {
            _MAIN.setup();
        });
    },
    setup: function () {
        console.log('MAIN_SETUP ...');

        _MAIN.layoutInit(function () {

            _MAIN.viewLoad(_PATH_LOGIN, function () {
                _MAIN.viewLoad(_PATH_MAIN, function () {
                    _MAIN.vueCreateNewInstaceOnMain(function () {
                        if (_DATA.objUserInfo.loggedIn) {
                            _MAIN.onLoginSuccess();
                            _apiGo(_PATH_MAIN);
                        } else
                            _apiGo(_PATH_MAIN);
                    });
                });
            });
        });
    },
    layoutInit: function (callback) {
        var layName = _DATA.objApp.layout, html = _apiGet('layout/' + layName + '.html');
        html = html.split('_DATA_SHARED').join(_DATA_SHARED);

        var el = document.getElementById('lay-app');
        if (el) {
            el.innerHTML = html;
            if (callback && typeof callback == 'function') setTimeout(callback, 10);
        }
    },
    onLogout: function () { },
    onLoginSuccess: function () {
        console.log('SCREEN_MAIN: LOGIN_OK ...');
        switch (_DATA.objApp.device) {
            case 'mobi':
                //_MAIN.vueCreateNewInstaceOnArea('lay-top', 'toolbar');
                _MAIN.vueCreateNewInstaceOnArea('lay-breadcrumb', 'breadcrumb');
                break;
            case 'tablet':
                _MAIN.vueCreateNewInstaceOnArea('lay-top', 'toolbar');
                _MAIN.vueCreateNewInstaceOnArea('lay-breadcrumb', 'breadcrumb');
                break;
            default:
                _MAIN.vueCreateNewInstaceOnArea('lay-top', 'toolbar');
                _MAIN.vueCreateNewInstaceOnArea('lay-breadcrumb', 'breadcrumb');
                //_MAIN.vueCreateNewInstaceOnArea('lay-left-sidebar', 'left-sidebar-list-simple');
                _MAIN.vueCreateNewInstaceOnArea('lay-left-sidebar', 'left-sidebar-fancytree');
                break;
        }
    },
    vueCreateNewInstaceOnMain: function (callback) {
        _APP = new Vue({
            mixins: [_MIXIN],
            data: function () { return _DATA; },
            el: '#lay-app',
            router: _ROUTER,
            mounted: function () {
                console.log('SCREEN_MAIN: mounted ...');
                if (callback) callback();
            },
            methods: {
                userLoginCallback: function () {
                    var _self = this;
                    if (_self.objUserInfo.loggedIn)
                        _MAIN.onLoginSuccess();
                    else
                        _MAIN.onLogout();
                },
                userNotifacationMessagesCallback: function () {
                },
            },
            watch: {
                'objUserInfo.messages': {
                    handler: function (val) {
                        this.userNotifacationMessagesCallback();
                    },
                    deep: true
                },
                'objUserInfo.loggedIn': function (newVal, oldVal) {
                    this.userLoginCallback();
                }
            }
        });
        _ALLVUE.push(_APP);
    },
    vueCreateNewInstaceOnArea: function (idElemMount, componentName) {
        var el = document.getElementById(idElemMount);
        if (el) {

            var notExist = document.querySelectorAll('#view_js_' + componentName).length == 0;
            if (notExist == true) {
                _MAIN.viewLoad(componentName, function () {
                    _MAIN.vueCreateNewInstaceOnArea(idElemMount, componentName);
                });
                return;
            }

            var div = document.createElement('div');
            el.appendChild(div);

            var objVue = new Vue({
                mixins: [_MIXIN],
                data: function () { return _DATA; },
                template: '<' + componentName + ' ' + _DATA_SHARED + '></' + componentName + '>',
                //el: '#' + id,
            });
            objVue.$mount(div);

            _ALLVUE.push(objVue);

            return objVue;
        }
        return null;
    },
    viewLoad: function (viewName, callback) {
        var a = viewName.split('/');
        if (a.length > 2) {
            console.log('viewLoad() => viewName = ' + viewName + ' -> ' + a[a.length - 1]);
            viewName = a[a.length - 1];
        }

        //var arrComponents = _.reduce(_DATA.objComponent, function (result, value, key) {
        //    value.forEach(function (it) { result.push(it); });
        //    return result;
        //}, []);
        //var exist = arrComponents.some(function (it) { return it == viewName; }); 
        var group = _.findKey(_DATA.objComponent, function (o) { return o.some(function (it) { return it == viewName }); });
        if (group == null) {
            console.log('----> VIEW [' + viewName + '] RESOURCE NOT EXIST !!!!!!!!!!!');
            return;
        }

        var sub_path = group + '/' + viewName;
        var file = 'view/' + sub_path + '/css.css';
        var head = document.getElementsByTagName("head")[0];

        var notExist = document.querySelectorAll('#view_js_' + viewName).length == 0;
        console.log('VIEW_LOAD: ', notExist);

        if (notExist == false) {
            console.log('VIEW [' + viewName + '] RESOURCE EXIST ...');
            _VIEW_CURRENT = viewName;
            if (callback && typeof callback == 'function') callback();
            return;
        }

        var link = document.createElement('link');
        link.setAttribute('id', 'view_css_' + viewName);
        link.setAttribute('rel', 'stylesheet');
        link.href = file;
        head.appendChild(link);

        file = 'view/' + sub_path + '/js.js';
        var script = document.createElement('script');
        script.setAttribute('id', 'view_js_' + viewName);
        script.src = file;
        script.type = 'text/javascript';

        //real browsers
        script.onload = function () {
            //setTimeout(function () {
            var key = viewName.toLocaleLowerCase(),
                name = key.split('-').join('_'),
                config = window[name.toLocaleUpperCase() + '_CONFIG'],
                com = window[name.toLocaleUpperCase() + '_COM'];

            if (config) {
                config.name = key;
                var path = config.path;

                console.log('VIEW_LOAD: ', key, ' -> ', path);
                //console.log('VIEW_LOAD: ', key, ' -> com = ', com);


                if (config.noRouter != true) {
                    config.noRouter = false;
                    if (com) {
                        if (config.requiresAuth == true) {
                            _ROUTER.addRoutes([{ path: path, component: com, meta: { requiresAuth: true }, props: _DATA }]);
                        } else {
                            _ROUTER.addRoutes([{ path: path, component: com, props: _DATA }]);
                        }
                    }
                } else {
                    config.noRouter = true;
                }

                _VIEW_CURRENT = viewName;

                if (callback && typeof callback == 'function') callback();
            } else {
                console.error('VIEW_LOAD: cannot find component is ', key);
            }
            //}, 100);
        };

        ////////Internet explorer
        //////script.onreadystatechange = function () {
        //////    if (this.readyState == 'complete') {
        //////        callback();
        //////    }
        //////};
        head.appendChild(script);
    },
    viewGo: function (viewName) {
        _MAIN.viewLoad(viewName, function () {
            _ROUTER.push('/' + viewName);
        });
    },
    go: function (path) {
        var viewName;
        var a = path.split('/');
        if (a.length > 2) {
            console.log('go() => viewName = ' + path + ' -> ' + a[a.length - 1]);
            viewName = a[a.length - 1];
        }

        _MAIN.viewLoad(viewName, function () {
            //_MAIN.viewGo(viewName);
            _ROUTER.push(path);
        });
    }
};
_MAIN.init();