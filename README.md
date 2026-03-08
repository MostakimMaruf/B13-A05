*** JavaScript Basic Concepts

***Qustion: 1. Difference between var, let, and const***

In JavaScript we use **var, let, and const** to declare variables.

**var** 

var is the old way to declare a variable in JavaScript.
It is function scoped and the value can be changed.
Also the same variable can be declared again.

Example
var name = "Maruf";
var name = "Hasan";

**let**

let was introduced in ES6.
It is block scoped. The value can be changed but the same variable cannot be declared again in the same block.

Example
let age = 20;
age = 21;

**const**
const is also block scoped like let.
But the difference is its value cannot be reassigned after declaration.

Example
const country = "Bangladesh";



**Qustion: 2. What is the spread operator (...)

The **spread operator (...)** is used to copy or expand elements of an array or object.
It makes working with arrays and objects easier.

Example with array

```js

const numbers = [1,2,3];
const newNumbers = [...numbers,4,5];
```

Example with object

```js

const user = {name:"Maruf", age:20};
const newUser = {...user, city:"Dhaka"};
```

---

***Qustion 3. Difference between map(), filter(), and forEach()***

These three methods are used to work with arrays.

**map()**

map() goes through every element of an array and creates a 
**new array** after applying some change.

Example

```js
const numbers = [1,2,3];
const doubled = numbers.map(n => n * 2);
```

**filter()**

filter() is used when we want to select elements based on a condition.
It also returns a **new array**.

Example

```js
const numbers = [1,2,3,4];
const even = numbers.filter(n => n % 2 === 0);
```

**forEach()**
forEach() runs a function for every element in the array but it **does not return a new array**.
It is usually used for printing or doing some action.

Example

```js
numbers.forEach(n => console.log(n));
```



***Qustion 4. What is an arrow function?***

An **arrow function** is a shorter way to write a function in JavaScript.
It was introduced in ES6 and makes the code shorter and easier to read.

Example

Normal function

```js
function add(a,b){
  return a + b;
}
```

Arrow function

```js
const add = (a,b) => a + b;
```


***Qustion 5. What are template literals?***

**Template literals** are used to create strings easily using variables.
Instead of quotes, we use **backticks (` `)**.

Example

```js
const name = "Maruf";
const message = `Hello ${name}, welcome to JavaScript`;
```

Template literals also allow writing **multi-line strings**.
