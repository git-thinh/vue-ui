var TOOLBAR_CONFIG = {
    requiresAuth: false
};

Vue.component('toolbar', {
    mixins: [_MIXIN],
    props: _PROPS,
    data: function () {
        var data = {
            _name: 'toolbar',
            key1: 1
        };
        return data;
    },
    template: '<h1>toolbar</h1>',
    //template: _apiGet('view/toolbar/index.html'),
    mounted: function () {
        //console.log('toolbar: mounted ...', this.$root.$data);
        console.log('toolbar: mounted ...', this.$data);
        console.log('toolbar: mounted ...', this.objUserInfo);
        //console.log('toolbar: mounted ...', this.$data.objTest);
    },
    methods: {
        btnLoginClick: function () {
            var _self = this;
        }
    }
});