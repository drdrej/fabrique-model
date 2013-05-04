/**
 * prepare passed context to use it in query.
 *
 * @param ctx context-object, never NULL.
 * @param callback is a callback function and will be called if one object will be found. never NULL.
 */
module.exports = function create( ctx, queries, callback ) {
    ctx.queries = queries;

    ctx.stack = {
       depth : 0,
       params : {}
    };

    ctx.callback = callback;

    ctx.append = function( element ) {
        var name = this.queries[ this.stack.depth ];
        this.stack.params[ name ] = element;
    };

    ctx.emit = function( element ) {
       this.append( element );

       if( this.stack.depth === this.queries.length )
           var fnc = this.callback;
           fnc( this.stack.params );
    };

    /**
     *
     * @param ctx
     * @param selected
     */
    function useAll( selected ) {
        for( idx in selected ) {
            var name = idx + "";
            if( !selected.hasOwnProperty( name ) )
                continue;

            var element = selected[ idx ];
            if( element == null || element == undefined )
                continue;

            this.emit( element );
        }
    };

};