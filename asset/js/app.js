var _DATA = {
    objLang: {},
    objUserInfo: {
        loggedIn: false,
        messages: []
    }
};
var _MAIN, _ROUTER, _APP, _MIXIN, _MIXIN_COMS, _DATA_SHARED = '', _PROPS = [];
for (var key in _DATA) { _PROPS.push(key); }
_PROPS.forEach(function (v) { _DATA_SHARED += ' :' + v + '="' + v + '" '; });
var _COMS = { props: _PROPS };
/////////////////////////////////////////////////////////////////////////////////
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
        screenOpen: function (options) {
            var parentId = '';
            if (this.$el == null) {
                parentId = _SCREENS_ID.HOME;
                options._screenParentIsHomeUI = true;
            }
            else {
                parentId = this.$el.id;
            }

            //console.log('screenOpen: parentId = ', parentId);

            options._screenParentElemID = parentId;
            f_hui_screenOpen(options);
        },
        screenBlankOpen: function () {
            var _self = this;
            _self.screenOpen({
                Id: _SCREENS_ID.BLANK,
                Components: 'blank-screen',
                className: 'blank-screen',
                overlayShow: false,
                Footer: { buttonOk: false, buttonCancel: false }
            });
        },
        screenAlertOpen: function (screenId, message, optionsFooter, components) {
            var _self = this;
            if (optionsFooter == null) optionsFooter = { buttonOk: true, buttonCancel: false };
            _self.screenOpen({
                Id: screenId,
                className: 'screen-alert',
                Header: {
                    headerIcon: 'icon-b_warning_large',
                    Message: message
                },
                Footer: optionsFooter
            });
        },
        screenWarningOpen: function (screenId, message, optionsFooter, components) {
            var _self = this;
            if (optionsFooter == null) optionsFooter = { buttonOk: true, buttonCancel: false };
            _self.screenOpen({
                Id: screenId,
                className: 'screen-alert',
                Header: {
                    headerIcon: 'icon-b_warning_large',
                    Message: message
                },
                Footer: optionsFooter
            });
        },
        screenConfirmOpen: function (screenId, message, optionsFooter, components) {
            var _self = this;
            _self.screenOpen({
                Id: screenId,
                className: 'screen-confirm',
                Header: {
                    headerIcon: 'icon-b_warning_large',
                    classNameMessage: 'f-size18',
                    Message: message
                },
                Footer: optionsFooter
            });
        },
        screenToastOpen: function (screenId, message, optionsFooter, components) {
            var _self = this;
            if (optionsFooter == null) optionsFooter = { buttonOk: false, buttonCancel: false };
            _self.screenOpen({
                Id: screenId,
                Components: 'toast-message-remove-widget',
                timeoutDisplay: 5000,
                className: 'screen-toast toast-top screen-toast-widget-remove',
                overlayShow: false,
                Header: {
                    headerIcon: 'icon-b_warning_large',
                    Message: message
                },
                Footer: optionsFooter
            });
        }
    }
};
/////////////////////////////////////////////////////////////////////////////////

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
            _MAIN.vueInit();

            //////Load component login
            _MAIN.viewLoad('login', function () {
                _MAIN.viewLoad('dashboard', function () {
                    _MAIN.viewLoad('about', function () {
                        _MAIN.viewLoad('toolbar', function () {
                            _ROUTER.push('/dashboard');
                        }, true);
                    });
                });
            });

            //if (_DATA.objUserInfo.loggedIn == true) {
            //    _MAIN.viewLoad('dashboard', function () {
            //        //console.log('LOAD_VIEW: dashboard -> done');
            //    });
            //} else {
            //    _MAIN.viewLoad('login', function () {
            //        //console.log('LOAD_VIEW: login -> done');
            //        _ROUTER.push('/login');
            //    });
            //}
        });
    },
    layoutInit: function (callback) {
        var layout_page = {
            name: 'layout_main',
            padding: 0,
            panels: [
                {
                    type: 'top', size: 30, resizable: false, hidden: true,
                    content: '<div id="lay-toolbar"></div>', overflow: 'hidden', style: 'background-color: #fafafa;border:none;',
                    //toolbar: {
                    //    name: 'toolbar_top',
                    //    style: 'padding:0px;border:none;',
                    //    items: [
                    //        {
                    //            type: 'html', id: 'nav_item_logo',
                    //            html: '<div class="nav_item_logo"><img src="/w2ui/user.jpg"/></div><div class="nav_item_logo_space"></div>'
                    //        },
                    //        {
                    //            type: 'menu', id: 'item2', caption: '<b>IFC</b>', count: 17, items: [
                    //                { text: 'Thông tin tài khoản', icon: 'mdi mdi-account', },
                    //                { text: 'Đổi mật khẩu', icon: 'mdi mdi-lock' },
                    //                { text: 'Cấu hình', icon: 'mdi mdi-settings' }
                    //            ]
                    //        },
                    //        { type: 'spacer' },
                    //        { type: 'radio', id: 'item3', group: '1', caption: 'task 1', icon: 'mdi mdi-file-outline', checked: true },
                    //        { type: 'radio', id: 'item4', group: '1', caption: 'task 2', icon: 'mdi mdi-file-outline' },
                    //        { type: 'break', id: 'break1' },
                    //        {
                    //            type: 'html', id: 'nav_item_notification',
                    //            html: '<div class="nav_item_notification">' +
                    //                ' <ul>' +
                    //                '     <li class="mdi mdi-bell"><span>5</span></li>' +
                    //                '     <li class="mdi mdi-email"><span>5</span></li>' +
                    //                '     <li class="mdi mdi-history"><span>5</span></li>' +
                    //                ' </ul>' +
                    //                '</div>'
                    //        }
                    //    ]
                    //}
                }
                , {
                    type: 'left', size: 225, resizable: true, minSize: 0, hidden: true,
                    toolbar: {
                        name: 'toolbar_left',
                        style: 'padding:0px;border:none;border-bottom: 1px solid silver;',
                        items: [
                            {
                                type: 'menu', id: 'toolbar_leftitemff1', caption: '<span class="mdi16 mdi-menu"></span>', items: [
                                    { text: 'Chức năng (API)', icon: 'mdi mdi-codepen' },
                                    { text: 'Kết nối, truy cập', icon: 'mdi mdi-access-point-network' },
                                    { text: 'Cơ sở dữ liệu', icon: 'mdi mdi-database' },
                                    { text: 'Tài khoản', icon: 'mdi mdi-account-key' },
                                    { text: 'Hệ thống khách hàng', icon: 'mdi mdi-monitor' }
                                ]
                            },
                            { type: 'radio', id: 'toolbar_leftitemff2', group: '1', caption: 'Điện lực', checked: true },
                            { type: 'radio', id: 'toolbar_leftitemff3', group: '1', caption: 'Trạm' },
                            { type: 'radio', id: 'toolbar_leftitemff4', group: '1', caption: 'Nhóm' },
                            { type: 'spacer' },
                            {
                                type: 'html', id: 'panel_left_bar',
                                html: '<div id="panel_left_bar"><span class="ib_toggle mdi24 mdi-menu-left" onclick="f_panel_left_toggle()"></span></div>'
                            }
                        ]
                    }
                }
                , {
                    type: 'main', overflow: 'hidden',
                    style: 'background-color: white; border: 1px solid silver; border-top: 0px; padding: 0px;',
                    tabs: {
                        active: 'tab0',
                        tabs: [
                            { id: 'tab0', caption: 'tab0', hidden: true },
                            { id: 'tab1', caption: 'tab1', hidden: true }
                        ],
                        onClick: function (event) {
                            //w2ui.layout.html('main', 'Active tab: ' + event.target);
                        },
                        onClose: function (event) {
                            this.click('tab0');
                        }
                    },
                    content: '<div id="lay-view"><router-view ' + _DATA_SHARED + ' ></router-view></div>'
                    //content: '<div id="lay-view"><p><router-link to="/about">About</router-link> | <router-link to="/dashboard">Dashboard</router-link></p><router-view></router-view></div>'
                }
                , { type: 'preview', size: '10%', resizable: true, hidden: true, content: 'preview' }
                , {
                    type: 'bottom', size: 20, resizable: false, hidden: true,
                    content: '<span class=fs12>©<span> <span class=fs11>IFC company<span>', overflow: 'hidden',
                    style: 'background-color: #EEEEEE;text-align: center;display: block;top: 0px; padding-top: 1px;font-family: arial;color: #666;'
                }
            ]
            , onShow: function (event) {
                //console.log('onShow(): object ' + event.panel + ' is shown');
                //event.onComplete = function () {
                //};
            }
            , onRender: function (event) {
                //console.log('object ' + this.name + ' is rendered. 1 lần duy nhất khi trang vừa tải về');
                if (callback && typeof callback == 'function') setTimeout(callback, 10);
            }
        };

        $('#lay-app').w2layout(layout_page);
    },
    onLogout: function () { },
    onLoginSuccess: function () {
        w2ui['layout_main'].toggle('top', true);
        w2ui['layout_main'].toggle('left', true);
        w2ui['layout_main'].toggle('right', true);
        w2ui['layout_main'].toggle('preview', true);
        w2ui['layout_main'].toggle('bottom', true);

        w2ui['layout_main'].get('main').tabs.show('tab0');
        w2ui['layout_main'].get('main').tabs.show('tab1');

        _MAIN.vueRenderById('lay-toolbar', '<toolbar ' + _DATA_SHARED + ' ></toolbar>');
    },
    vueInit: function () {
        _ROUTER = new VueRouter();
        _ROUTER.beforeEach((to, from, next) => {
            if (to.matched.some(record => record.meta.requiresAuth) && !_DATA.objUserInfo.loggedIn) {
                next({ path: '/login', query: { redirect: to.fullPath } });
            } else {
                next();
            }
        });
        //_ROUTER.beforeResolve((to, from, next) => {
        //    /* must call `next` */
        //    if (to && to.matched.length > 0) {
        //        var view = to.matched[0].path.substr(1);
        //        console.log('beforeResolve = ', to);
        //        console.log('ROUTER: call view = ', view);
        //    }
        //    next();
        //});
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
        _APP = new Vue({
            mixins: [_MIXIN],
            data: function () { return _DATA; },
            el: '#lay-view',
            router: _ROUTER,
            mounted: function () {
                console.log('SCREEN_MAIN: mounted ...');
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

    },
    vueRenderById: function (id, temp) {
        var el = document.getElementById(id);
        if (el) {
            var div = document.createElement('div');
            el.appendChild(div);

            var objVue = new Vue({
                mixins: [_MIXIN],
                data: function () { return _DATA; },
                template: '<div><toolbar ' + _DATA_SHARED + '></toolbar></div>',
                el: '#' + id,
                created: function () {
                    console.log('=============== dialog.created:: DATA = ', this.$data);
                    //console.log('created:: screenInfo = ', this.screenInfo);
                },
                mounted: function () {
                    console.log('=============== dialog.mounted:: DATA = ', this.$data);
                    //console.log('created:: screenInfo = ', this.screenInfo);
                }
            });
            //objVue.$mount(div);

            return objVue;
        }
        return null;
    },
    viewLoad: function (viewName, callback, noRouter) {
        //console.log('VIEW_LOAD ...');

        var file = 'view/' + viewName + '/css.css';
        var head = document.getElementsByTagName("head")[0];

        var notExist = document.querySelectorAll('#view_js_' + viewName + ', #view_css_' + viewName).length == 0;
        if (notExist == false) {
            console.error('VIEW [' + viewName + '] RESOURCE EXIST ...');
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
                config = window[key.toLocaleUpperCase() + '_CONFIG'],
                com = window[key.toLocaleUpperCase() + '_COM'];

            if (config) {
                console.log('VIEW_LOAD: ', key, ' -> config = ', config);
                //console.log('VIEW_LOAD: ', key, ' -> com = ', com);

                if (noRouter != true) {
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

                callback();
            } else {
                console.error('VIEW_LOAD: cannot find component is ', key);
            }
            //}, 10);
        };

        ////////Internet explorer
        //////script.onreadystatechange = function () {
        //////    if (this.readyState == 'complete') {
        //////        callback();
        //////    }
        //////};
        head.appendChild(script);
    }
};
_MAIN.init();