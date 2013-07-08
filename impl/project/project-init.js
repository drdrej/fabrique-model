
/**
 * creates a project-object.
 *
 * @param json
 * @returns {{dirs: {tasks: string, temp: string, output: string, models: string}}}
 */
module.exports = function init ( json, rootPath ) {
    var rval;

    if( json ) {
        rval = json;
    } else {
        rval = {
            dirs : {
                tasks  : "./tasks",

                temp   : "./work",
                output : "./out",
                models : "./model"
            }
        }
    };

    /**
     * this method will be used to resolve path in project.
     *
     * @param type never NULL
     * @param path never NULL
     *
     * @returns {null}
     */
    rval.resolve = function( type, path ) {
        var typePath = this.dirs[ type ];

        if( typePath == undefined || typePath == null || typePath.length < 1 )
            return null;

        var full = typePath + "/" + path;




    };

    return rval;
}