var TOOLBAR_CONFIG = {
    requiresAuth: false
};

Vue.component('toolbar', {
    mixins: [_MIXIN, _COMS],
    data: function () {
        var data = {
            keyUiRuntime: '_' + new Date().getTime(),
            _name: 'toolbar',
            key1: 1
        };
        return data;
    },
    template: '<div :id="keyUiRuntime"></div>',
    //template: _apiGet('view/toolbar/index.html'),
    mounted: function () {
        var _self = this;
        console.log('toolbar: mounted ...', this.objUserInfo);

        var toolbarConfig = {
            name: 'toolbar_top',
            style: 'padding:0px;border:none;',
            items: [
                {
                    type: 'html', id: 'nav_item_logo',
                    html: '<div class="nav_item_logo"><img src="/w2ui/user.jpg"/></div><div class="nav_item_logo_space"></div>'
                },
                {
                    type: 'menu', id: 'item2', caption: '<b>IFC</b>', count: 17, items: [
                        { text: 'Thông tin tài khoản', icon: 'mdi mdi-account', },
                        { text: 'Đổi mật khẩu', icon: 'mdi mdi-lock' },
                        { text: 'Cấu hình', icon: 'mdi mdi-settings' }
                    ]
                },
                { type: 'spacer' },
                { type: 'radio', id: 'item3', group: '1', caption: 'task 1', icon: 'mdi mdi-file-outline', checked: true },
                { type: 'radio', id: 'item4', group: '1', caption: 'task 2', icon: 'mdi mdi-file-outline' },
                { type: 'break', id: 'break1' },
                {
                    type: 'html', id: 'nav_item_notification',
                    html: '<div class="nav_item_notification">' +
                        ' <ul>' +
                        '     <li class="mdi mdi-bell"><span>5</span></li>' +
                        '     <li class="mdi mdi-email"><span>5</span></li>' +
                        '     <li class="mdi mdi-history"><span>5</span></li>' +
                        ' </ul>' +
                        '</div>'
                }
            ]
        };

        $('#' + _self.keyUiRuntime).w2toolbar(toolbarConfig);

         
    },
    methods: {
        btnLoginClick: function () {
            var _self = this;
        }
    }
});