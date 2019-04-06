var LEFT_SIDEBAR_FANCYTREE_CONFIG = {
    requiresAuth: false,
    noRouter: true
};

Vue.component('left-sidebar-fancytree', {
    mixins: [_MIXIN, _COMS],
    data: function () {
        var data = {
            treeCategoryId: '_' + new Date().getTime(),
            _name: 'left-sidebar-fancytree',
            key1: 1
        };
        return data;
    },
    template: _apiGet('view/left-sidebar-fancytree/index.html'),
    computed: {
        treeItem: function () {
            var _self = this;
            return $('#' + _self.treeCategoryId);
        },
        treeOption: function () {
            var _self = this;
            return $('#' + _self.treeCategoryId).getOption();
        },
    },
    mounted: function () {
        var _self = this;
        console.log('LEFT_SIDEBAR: mounted ...', this.objUserInfo);

        _self.treeItem.fancytree({
            activeVisible: true, // Make sure, active nodes are visible (expanded)
            aria: true, // Enable WAI-ARIA support
            autoActivate: true, // Automatically activate a node when it is focused using keyboard
            autoCollapse: true, // Automatically collapse all siblings, when a node is expanded
            autoScroll: false, // Automatically scroll nodes into visible area
            clickFolderMode: 3, // 1:activate, 2:expand, 3:activate and expand, 4:activate (dblclick expands)
            checkbox: false, // Show checkboxes
            debugLevel: 0, // 0:quiet, 1:errors, 2:warnings, 3:infos, 4:debug
            disabled: false, // Disable control
            focusOnSelect: false, // Set focus when node is checked by a mouse click
            escapeTitles: false, // Escape `node.title` content for display
            generateIds: false, // Generate id attributes like <span id='fancytree-id-KEY'>
            idPrefix: "ft_", // Used to generate node idÂ´s like <span id='fancytree-id-<key>'>
            keyboard: true, // Support keyboard navigation
            keyPathSeparator: "|", // Used by node.getKeyPath() and tree.loadKeyPath()
            minExpandLevel: 1, // 1: root node is not collapsible
            quicksearch: false, // Navigate to next node by typing the first letters
            rtl: false, // Enable RTL (right-to-left) mode
            selectMode: 1, // 1:single, 2:multi, 3:multi-hier
            tabindex: "0", // Whole tree behaves as one single control
            titlesTabbable: false, // Node titles can receive keyboard focus
            tooltip: false, // Use title as tooltip (also a callback could be specified)
            //icon: true, // Display node icons
            //icon: function (event, data) {
            //    return !data.node.isTopLevel();
            //},
            icon: function (event, data) {
                // For the sake of this example set specific icons in different ways.
                //
                switch (data.node.data.level) {
                    case 0:
                        return !data.node.isTopLevel();
                    default:
                        if (data.node.folder == true) {
                            return { html: '<svg><use xlink:href="#i-folder"></use></svg>' };
                        } else {
                            return { html: '<i class="fas fa-igloo"></i>' };
                        }
                        break;
                    ////case "Art of War":
                    ////    // Insert an SVG reference to an SVG symbol (defined below)
                    ////    return { html: '<svg><use xlink:href="#svg-android-black"></use></svg>' };
                    ////case "The Hobbit":
                    ////    // Insert an <i> tag that will be replaced with an inline SVG graphic
                    ////    // by Font Awesome's all.js library.
                    ////    // Note: We DON'T want this, since it will be slow for large trees!
                    ////    return { html: '<i class="fas fa-book"></i>' };
                    ////case "The Little Prince":
                    ////    // Here we use Font Awesome's auto conversion (as above), to create the
                    ////    // <i> tags that where created separately below.
                    ////    // The nodes nodes contain inline tags that reference those icons:
                    ////    return { html: '<svg class="fa-spin"><use xlink:href="#fas-fa-circle-notch"></use></svg>' };
                }
            },
            //source: { url: "/json/ajax-tree-products.json" },
            source: { url: "/data/category.json", cache: false },
            lazyLoad: function (event, data) {
                data.result = { url: "/json/ajax-sub2.json" };
            },
            activate: function (event, info) {
                var node = info.node, data = node.data;
                if (data && data.path) {
                    console.log('TREE.activate: ', node);

                    //var $allTrees = $(":ui-fancytree");
                    //$('#' + _self.treeCategoryId).getOption()
                    _self.treeItem.fancytree("disable");

                    _apiGo(data.path);
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