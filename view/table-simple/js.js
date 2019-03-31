var TABLE_SIMPLE_CONFIG = {
    requiresAuth: true
};

var TABLE_SIMPLE_COM = {
    mixins: [_MIXIN, _COMS],
    data: function () {
        var data = {
            _name: 'table-simple',
            dashboard: 2
        };
        return data;
    },
    template: _apiGet('view/table-simple/index.html') 
};
