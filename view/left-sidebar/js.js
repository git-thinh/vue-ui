var LEFT_SIDEBAR_CONFIG = {
    requiresAuth: false,
    noRouter: true
};

Vue.component('left-sidebar', {
    mixins: [_MIXIN, _COMS],
    data: function () {
        var data = {
            toolbarId: '_' + new Date().getTime(),
            _name: 'left-sidebar',
            key1: 1
        };
        return data;
    },
    template: _apiGet('view/left-sidebar/index.html'),
    mounted: function () {
        var _self = this;
        console.log('LEFT_SIDEBAR: mounted ...', this.objUserInfo);

        // Attach the fancytree widget to an existing <div id="tree"> element
        // and pass the tree options as an argument to the fancytree() function:
        $("#tree").fancytree({
            autoCollapse: true,
            clickFolderMode: 3,
            icon: function (event, data) {
                return !data.node.isTopLevel();
            },
            source: { url: "/json/ajax-tree-products.json" },
            lazyLoad: function (event, data) {
                data.result = { url: "/json/ajax-sub2.json" };
            },
            keydown: function (event, data) {
                switch ($.ui.fancytree.eventToString(data.originalEvent)) {
                    case "return":
                    case "space":
                        data.node.toggleExpanded();
                        break;
                }
            }
        });
        //// For our demo: toggle auto-collapse mode:
        //$("input[name=autoCollapse]").on("change", function (e) {
        //    $.ui.fancytree.getTree().options.autoCollapse = $(this).is(":checked");
        //});
    },
    methods: {
    }
});