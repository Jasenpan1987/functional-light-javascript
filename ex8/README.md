# Instructions

1. Familiarize yourself with the provided utilities and helpers, like `listSum(..)`, `listProduct(..)`, `mapObj(..)`, etc.

2. Find the `// TODO` comments and implement both `filterObj(..)` and `reduceObj(..)`. The fixed exercise should now print `38886` to the console.

3. Recall/review the following topics:

   - argument manipulation (`binary(..)`)
   - point-free style
   - composition (`compose(..)`, `pipe(..)`)
   - currying
   - list operations (`reduce(..)`)

4. Using only the provided utilities in this exercise, refactor the three separate statements that invoke `mapObj(..)`, `filterObj(..)`, and `reduceObj(..)` into a single list operation that's completely point-free. Hint: `reduce(..)` and `pipe(..)`.

# 8. Async Programing

sync list

```js
var a = [1, 2, 3];
var b = a.map(x => x * 2);
```

But what if the elements in the array coming overtime?

## 8.1 Eager vs lazy

What if we have a function called `mapLazy` which does the following:

```js
var a = [];
var b = mapLazy(a, x => x * 2);

a.push(1);

a; // [1]
b; // [2]

a.push(2);

a; // [1, 2]
b; // [2, 4]
```

It magically prapergate the array. The lazy array looks like a stream of values.

Or what if we have a lazy array data source like this:

```js
var a = new LazyArray();

setInterval(() => a.push(Math.random()), 1000);

var b = a.map(x => x * 2);

b.forEach(console.log); // get back an array, each second added a random number
```

LazyArray is an `Observable`. And there are a lot of libraries such as rxjs, cover this kind of observable data structures. It looks like this:

```js
var a = new Rx.Subject();
setInterval(() => a.next(Math.random()), 1000);

var b = a.map(x => x * 2);

b.subscribe(console.log);
```
