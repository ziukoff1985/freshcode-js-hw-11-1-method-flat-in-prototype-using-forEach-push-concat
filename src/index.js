'use strict';

function MyArray(...args) {
    this.length = args.length;
    for (let i = 0; i < args.length; i++) {
        this[i] = args[i];
    }
}

function MyArrayPrototype() {
    this.push = function (...args) {
        if (args.length > 0) {
            for (let i = 0; i < args.length; i++) {
                this[this.length] = args[i];
                this.length++;
            }
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

        for (let i = 0; i < this.length; i++) {
            concatArr.push(this[i]);
        }

        for (let i = 0; i < args.length; i++) {
            const currentElement = args[i];

            if (currentElement instanceof MyArray) {
                for (let j = 0; j < currentElement.length; j++) {
                    if (currentElement[j] === undefined) continue;
                    concatArr.push(currentElement[j]);
                }
            } else {
                concatArr.push(currentElement);
            }
        }
        return concatArr;
    };
    this.flat = function (depth = 1) {
        const flatArr = new MyArray();

        function flatten(source, currentDepth) {
            let tempArr = new MyArray();
            source.forEach((item) => {
                if (item instanceof MyArray && currentDepth > 0) {
                    const child = flatten(item, currentDepth - 1);
                    tempArr = tempArr.concat(child);
                } else {
                    tempArr.push(item);
                }
            });
            return tempArr;
        }

        return flatArr.concat(flatten(this, depth));
    };
}

MyArray.prototype = new MyArrayPrototype();

const newArr = new MyArray(
    undefined,
    new MyArray(10, new MyArray(100, new MyArray(1000, new MyArray(10000)))),
    new MyArray()
);

console.log(newArr);
console.log(newArr.flat(2));
console.log(newArr.flat(3));
console.log(newArr.flat(4));
console.log(newArr.flat(Infinity));
console.log(newArr.flat(0));

function MyArray(...args) {
    this.length = args.length;
    for (let i = 0; i < args.length; i++) {
        this[i] = args[i];
    }
}

// MyArray.prototype.flat = function (depth = 1) {
//     const flatResult = new MyArray();

//     function flatten(source, currentDepth) {
//         for (let i = 0; i < source.length; i++) {
//             if (source[i] instanceof MyArray && currentDepth > 0) {
//                 flatten(source[i], currentDepth - 1);
//             } else {
//                 flatResult[flatResult.length] = source[i];
//                 flatResult.length++;
//             }
//         }
//     }

//     flatten(this, depth);
//     return flatResult;
// };

// const newMyArray = new MyArray(
//     1,
//     new MyArray(10, new MyArray(100, new MyArray(1000, new MyArray(10000)))),
//     new MyArray()
// );

// console.log(newMyArray.flat(2));
// console.log(newMyArray.flat(3));
// console.log(newMyArray.flat(4));
// console.log(newMyArray.flat(Infinity));
// console.log(newMyArray.flat(0));
