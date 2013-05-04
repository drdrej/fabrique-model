

module.exports = function combine( ctx, selected ) {
    var parent = ctx.last();
    ctx.useAll(selected);
};