'use strict';

function MyArray(...args) {
    this.length = args.length;
    for (let i = 0; i < args.length; i++) {
        this[i] = args[i];
    }
}

MyArray.prototype.flat = function (depth = 1) {
    const flatResult = new MyArray();

    function flatten(source, currentDepth) {
        for (let i = 0; i < source.length; i++) {
            if (source[i] instanceof MyArray && currentDepth > 0) {
                flatten(source[i], currentDepth - 1);
            } else {
                flatResult[flatResult.length] = source[i];
                flatResult.length++;
            }
        }
    }

    flatten(this, depth);
    return flatResult;
};

const newMyArray = new MyArray(
    1,
    new MyArray(10, new MyArray(100, new MyArray(1000, new MyArray(10000)))),
    new MyArray()
);

console.log(newMyArray.flat(2));
console.log(newMyArray.flat(3));
console.log(newMyArray.flat(4));
console.log(newMyArray.flat(Infinity));
console.log(newMyArray.flat(0));
