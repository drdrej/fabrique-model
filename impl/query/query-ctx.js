/**
 * prepare passed context to use it in query.
 *
 * @param ctx context-object, never NULL.
 * @param found is a found function and will be called if one object will be found. never NULL.
 */
module.exports = function create( ctx, queries, found ) {
    ctx.queries = queries;

    ctx.stack = {
       depth : -1,
       params : {}
    };

    ctx.found = found;

    ctx.append = function( element ) {
        this.stack.depth++;
        var def = this.queries[ this.stack.depth ];
        this.stack.params[ def.name ] = element;
    };

    ctx.backward = function() {
        if( this.stack.depth < 0 )
            return;

        var name = this.queries[ this.stack.depth ].name;
        this.stack.params[ name ] = undefined;
        this.stack.depth--;
    };

    ctx.emit = function( element ) {
       this.append( element );

       if( this.stack.depth === (this.queries.length - 1) ) {
           // this.callback;
           // fnc( this.stack.params );
           var use = this.use();
           this.found( use );
       }
    };

    /**
     *
     * @param ctx
     * @param selected
     */
    ctx.emitAll = function( selected ) {
        for( var idx in selected ) {
            var name = idx + "";
            if( !selected.hasOwnProperty( name ) )
                continue;

            var element = selected[ idx ];
            if( element == null || element == undefined )
                continue;

            this.emit( element );
        }
    };


    ctx.combine = function( selected ) {
        if( selected == undefined )
            return;

        if( !selected.length )
            return;

        if( selected.length < 1 )
            return;

        // TODO: hier reduce-funktion zur Reduzierung der Werte aufrufen.
        // beispiel wenn nicht alle werte weiter gegeben werden
        this.emitAll(selected);
    };

    ctx.use = function() {
       var rval = this.stack.params;
       return rval;
    };

    /**
     * is a main method to use a context.
     */
    ctx.consume = function( ) {

    };

};