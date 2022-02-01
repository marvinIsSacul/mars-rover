# mars-rover

### How To Use
```cmd
node index.js
```

The commands are placed in the file `commands.txt`

### Code's Correctness

I tested using the example input:
```
8 8
1 2 E
MMLMRMMRRMML
```
and made sure to get the expected output:
```
3 3 S
```

### Design Decisions

I decided to use an integer to store the current rovers orientation/direction because it would make it easier changing the value, by just incrementing by the value of `90`.