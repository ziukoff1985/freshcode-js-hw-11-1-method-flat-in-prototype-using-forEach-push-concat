'use strict';

function MyArray(...args) {
    this.length = args.length;
    for (let i = 0; i < args.length; i++) {
        this[i] = args[i];
    }
}

function MyArrayPrototype() {
    this.push = function (...args) {
        for (let i = 0; i < args.length; i++) {
            this[this.length] = args[i];
            this.length++;
        }
        return this.length;
    };
    this.forEach = function (callback, thisArg) {
        for (let i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
    this.concat = function (...args) {
        const concatArr = new MyArray();

        this.forEach((item) => {
            concatArr.push(item);
        });

        args.forEach((item) => {
            if (item instanceof MyArray) {
                item.forEach((element) => {
                    concatArr.push(element);
                });
            } else {
                concatArr.push(item);
            }
        });

        return concatArr;
    };
    this.flat = function (depth = 1) {
        const flatArr = new MyArray();

        function flatten(source, currentDepth) {
            source.forEach((item) => {
                if (item instanceof MyArray && currentDepth > 0) {
                    flatten(item, currentDepth - 1);
                } else if (item !== undefined) {
                    flatArr.push(item);
                }
            });
        }

        flatten(this, depth);
        return flatArr;
    };
}

MyArray.prototype = new MyArrayPrototype();

const newArr = new MyArray(
    1,
    new MyArray(
        2,
        undefined,
        new MyArray(undefined, 3, new MyArray(4, undefined))
    ),
    new MyArray()
);

console.log(newArr.flat());
console.log(newArr.flat(2));
console.log(newArr.flat(3));
console.log(newArr.flat(-1));
console.log(newArr.flat(Infinity));
