/*

 Copyright (c) 2012-2013 Andreas Siebert, ask@touchableheroes.com

 Permission is hereby granted, free of charge, to any person obtaining
 a copy of this software and associated documentation files (the "Software"),
 to deal in the Software without restriction, including without limitation
 the rights to use, copy, modify, merge, publish, distribute, sublicense,
 and/or sell copies of the Software, and to permit persons to whom the
 Software is furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included
 in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 IN THE SOFTWARE.

 */

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
       return this.stack.params;
    };

    /**
     * is a main method to use a context.
     * @public
     */
    ctx.consume = function( ) {
        if( !(this.queries.length && this.queries.length > 0) )
            return;

        var first = this.queries[ 0 ];
        var selected = first.select();

        this.combine( selected );
    };

};