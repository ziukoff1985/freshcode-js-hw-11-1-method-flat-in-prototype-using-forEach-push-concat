'use strict';

// function MyArray(...args) {
//     this.length = args.length;
//     for (let i = 0; i < args.length; i++) {
//         this[i] = args[i];
//     }
// }

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
            for (let i = 0; i < source.length; i++) {
                if (source[i] instanceof MyArray && currentDepth > 0) {
                    flatten(source[i], currentDepth - 1);
                } else {
                    flatArr.push(source[i]);
                }
            }
        }
        flatten(this, depth);
        return flatArr;
    };
}

MyArray.prototype = new MyArrayPrototype();

const newArr = new MyArray();

const newArr2 = new MyArray(1, 2, 3);
const newArr3 = new MyArray(undefined);

console.log(newArr.push(100));

console.log(newArr3);

newArr.forEach((item) => console.log(item + 99));

console.log(newArr.concat(100));

console.log(newArr.concat(newArr2));
console.log(newArr.concat(newArr3));

console.log(newArr === newArr.concat());

const newMyArray = new MyArray(
    1,
    new MyArray(10, new MyArray(100, new MyArray(1000, new MyArray(10000)))),
    new MyArray()
);

console.log(newMyArray);

console.log(newMyArray.flat(Infinity));
