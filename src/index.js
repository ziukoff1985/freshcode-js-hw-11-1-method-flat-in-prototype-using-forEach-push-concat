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
    new MyArray(10, new MyArray(100, new MyArray(1000, new MyArray(10000)))),
    new MyArray()
);

const newArr2 = new MyArray();
const newArr3 = new MyArray(1, new MyArray(2));

console.log(newArr2.concat(newArr3));
// console.log(newArr2.push(1));
// console.log(newArr2);

console.log(newArr);
console.log(newArr.flat());
console.log(newArr.flat(3));

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

const arr3 = [1, undefined, 3, 4];
const arr4 = [5, 6, undefined, 8];
console.log(arr3.concat(arr4));

const arr5 = [1, [undefined, [3, undefined]]];

console.log(arr5.flat());

const arr6 = new MyArray(1, [undefined, [3, undefined]]);

const arr7 = new MyArray(1, [undefined, [3, undefined]]);

console.log(arr6.concat(arr7));
