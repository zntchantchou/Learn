# Big O notation

### Linear Loops

It allows us to compare the efficiency of two algorithms used to solve one same problem.
Big O'notation gives the upper bound (least efficient scenario) of the complexity of an algorithm.

    for(i=0;i<100;i++)
      statement block;

Loop factor is 100.  
Number of iterations: 100.
Big O notation: O(n)

    for(i=0;i<100;i+=2)
      statement block;

Loop factor: 100  
Number of iterations: 100 / 2  
Big O notation: O(n/2) = 0(n)

### Logarithmic Loops


When expressing complexity using the Big O notation, constant multipliers are ignored.

    O(n) = O(2n) 
    0 log(n) = 0log2(n) = 0log10(n)

Here, two is the constant multiplier.
Two does not appear in the final notation, we only know the complexity will be logarithmic.

The counter is multiplied by n at each iteration

    for(i=0;i<100;i*=2)
      statement block;

Loop factor: 100
Number of iterations: log2(100)
Big O notation: 0(log n)
