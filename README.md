# String Store!

Storage in a string - or something like that. I needed a way to pass around a light way set of key values without using JSON. The values will never be a complex object, so serializing them like a URL seemed like a half decent way to go

## What?

It turns ``active=true&tacos=good`` in to ``{ active: true, tacos: 'good' }`` and vice versa.

## Installation

```
npm install string-store --save
```

## Testing

```
npm run test
```

## Example
```
let StringStore = require('string-store');
let config = new StringStore('name=brandon&active=true');
console.log(config.get('active'));
```

### Add/Set Item

```
config.set('age',40);
config.set('family',4);
```

### Remove Item

```
config.remove('age');
```

### Get Item

```
config.get('family'); // output 4
```

### Get as String

```
config.toString(); // name=brandon&active=true&family=4
```

### Get as Object

```
config.toObject();  // outpus

{
  name : 'brandon',
  active : true,
  family: 4
}

```
