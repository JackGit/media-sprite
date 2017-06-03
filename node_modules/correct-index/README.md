A lib to let you always get correct index of an array.

### install

```bash
npm i correct-index --save
```

For example:

```js
const correctIndex = require('correct-index')
const array = [0, 1, 2, 3]

correctIndex(0, array.length)   // return index as 0
correctIndex(-1, array.length)  // return index as 3
correctIndex(-4, array.length)  // return index as 0
correctIndex(5, array.length)   // return index as 1
```
