(function () {
    packages = {

        // Lazily construct the package hierarchy from class names.
        root: function (classes) {
            var map = {};

            function find(name, data) {
                var node = map[name], i;
                if (!node) {
                    node = map[name] = data || {name: name, children: []};
                    if (name.length) {
                        node.parent = find(name.substring(0, i = name.lastIndexOf(".")));
                        node.parent.children.push(node);
                        node.key = name.substring(i + 1);
                    }
                }
                return node;
            }

            classes.forEach(function (d) {
                find(d.name, d);
            });

            return map[""];
        },

        // Return a list of imports for the given array of nodes.
        imports: function (nodes) {
            var map = {},
                    imports = [];

            // Compute a map from name to node.
            nodes.forEach(function (d) {
                map[d.name] = d;
            });

            // For each import, construct a link from the source to target node.
            nodes.forEach(function (d) {
                if (d.imports)
                    d.imports.forEach(function (i) {
                        imports.push({source: map[d.name], target: map[i]});
                    });
            });

            return imports;
        },

        // Return a list of imports for the given array of nodes.
        sizes: function (nodes) {


            var map = {},
                    sizes = [];

            // Compute a map from name to node.
            nodes.forEach(function (d) {
                map[d.name] = d;
            });

            // For each import, construct a link from the source to target node.
            nodes.forEach(function (d) {
                if (d.size)
                    sizes.push(d.size);

            });

            return sizes;
        },

        colors: function (nodes) {
             var map = {},
                    colors = [];

            // Compute a map from name to node.
            nodes.forEach(function (d) {
                map[d.name] = d;
            });

            // For each import, construct a link from the source to target node.
            nodes.forEach(function (d) {
                if (d.color)
                    colors.push(d.color);

            });

            return colors;
        },
        names: function (classes) {
            var names = [];
            // For each import, construct a link from the source to target node.
            /* nodes.forEach(function (d) {
             if (d.color)
             colors.push(d.name.substring(d.name.indexOf(".")+1, d.name.lastIndexOf(".")));
             });*/
            // Compute a map from name to node.
            classes.forEach(function (d) {
                if (d.color) {
                    names.push(d.name);
                }
            });

            return names;
        },
        origvalues: function (classes) {
            var origvalues = [];
            // For each import, construct a link from the source to target node.
            /* nodes.forEach(function (d) {
             if (d.color)
             colors.push(d.name.substring(d.name.indexOf(".")+1, d.name.lastIndexOf(".")));
             });*/
            // Compute a map from name to node.
            classes.forEach(function (d) {
                if (d.color) {
                    origvalues.push(d.origvalue);
                }
            });

            return origvalues;
        }
    };
})();