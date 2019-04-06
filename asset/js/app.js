var _DATA = {
    objLang: {},
    objAlert: [{ text: '<strong>Success!</strong> Indicates a successful or positive action.', css: 'alert alert-success alert-dismissible' }],
    objUserInfo: {
        loggedIn: false,
        messages: []
    }
};
var _MAIN, _ROUTER, _APP, _MIXIN, _MIXIN_COMS, _DATA_SHARED = '', _PROPS = [], _COMS, _ALLVUE = [], _VIEW_CURRENT;
for (var key in _DATA) { _PROPS.push(key); }
_PROPS.forEach(function (v) { _DATA_SHARED += ' :' + v + '="' + v + '" '; });
/////////////////////////////////////////////////////////////////////////////////
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

            console.log('MIXIN_COMS: ' + _self._data._name + ' mounted ...', _id, _self._data);
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
            getViewConfig: function (viewName) {
                if (viewName) {
                    var key = viewName.toLocaleUpperCase().split('-').join('_') + '_CONFIG',
                        config = window[key];
                    console.log(key, config);
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
            next({ path: '/login', query: { redirect: to.fullPath } });
        } else {
            next();
        }
    });
    _ROUTER.afterEach((to, from) => {
        if (to && to.matched.length > 0) {
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

function _svg(className, addClass) {
    var id = className.replace(/ /g, "-"),
      cn = addClass ? " " + addClass : "",
      html = '<svg class="svg-inline--fa fa-w-20' + cn + '"><use xlink:href="#' + id + '"></use></svg>';
    return { html: html };
}

function _apiGo(path) { _MAIN.go(path); }
function _apiGet(url) {
    var request = new XMLHttpRequest();
    request.open('GET', url, false);  // `false` makes the request synchronous
    request.send(null);
    if (request.status === 200) return request.responseText;
    return '';
}

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

            _MAIN.viewLoad('login', function () {
                _MAIN.viewLoad('dashboard', function () {
                    _MAIN.vueInit(function () {
                        _ROUTER.push('/dashboard');
                    });
                });
            });
        });
    },
    layoutInit: function (callback) {
        var layName = 'base', html = _apiGet('layout/' + layName + '.html');
        html = html.split('_DATA_SHARED').join(_DATA_SHARED);

        var el = document.getElementById('lay-app');
        if (el) {
            el.innerHTML = html;
            if (callback && typeof callback == 'function') setTimeout(callback, 10);
        }
    },
    onOtherViewLoadCompleted: function (viewName) {

    },
    onLogout: function () { },
    onLoginSuccess: function () {
        console.log('SCREEN_MAIN: LOGIN_OK ...');
        _MAIN.vueCreateNewInstaceOnArea('lay-top', 'toolbar');
        _MAIN.vueCreateNewInstaceOnArea('lay-left-sidebar', 'left-sidebar-fancytree');
        _MAIN.vueCreateNewInstaceOnArea('lay-breadcrumb', 'breadcrumb');
    },
    vueInit: function (callback) {
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
                //el: '#' + id
            });
            objVue.$mount(div);

            _ALLVUE.push(objVue);

            return objVue;
        }
        return null;
    },
    viewLoad: function (viewName, callback) {
        //console.log('VIEW_LOAD ...');

        var file = 'view/' + viewName + '/css.css';
        var head = document.getElementsByTagName("head")[0];

        var notExist = document.querySelectorAll('#view_js_' + viewName).length == 0;
        if (notExist == false) {
            console.error('VIEW [' + viewName + '] RESOURCE EXIST ...');
            _VIEW_CURRENT = viewName;
            if (callback && typeof callback == 'function') callback();
            return;
        }

        var link = document.createElement('link');
        link.setAttribute('id', 'view_css_' + viewName);
        link.setAttribute('rel', 'stylesheet');
        link.href = file;
        head.appendChild(link);

        file = 'view/' + viewName + '/js.js';
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

                console.log('VIEW_LOAD: ', key, ' -> config = ', config);
                //console.log('VIEW_LOAD: ', key, ' -> com = ', com);

                if (config.noRouter != true) {
                    config.noRouter = false;
                    if (com) {
                        if (config.requiresAuth == true) {
                            _ROUTER.addRoutes([{ path: '/' + key, component: com, meta: { requiresAuth: true }, props: _DATA }]);
                        } else {
                            _ROUTER.addRoutes([{ path: '/' + key, component: com, props: _DATA }]);
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
        var a = path.split('/');
        var viewName = a[0].length == 0 ? a[1] : a[0];
        _MAIN.viewLoad(viewName, function () {
            //_MAIN.viewGo(viewName);
            _ROUTER.push(path);
        });
    }
};
_MAIN.init();