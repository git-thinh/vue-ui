
var COM_LOGIN = {
    template: '<input type="submit" value="Login" v-on:click="login">',
    methods: {
        login: function () {
            _MAIN_DATA.userInfo.loggedIn = true;
            router.push(this.$route.query.redirect);
        }
    }
};