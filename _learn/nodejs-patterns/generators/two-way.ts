function* twoWayGenerator(): Generator {
	const what = yield null;
	console.log("Hello " + what);
}

const generatorA = twoWayGenerator();

console.log("first yield ", generatorA.next()); // generator is paused after this, until next is called
console.log(generatorA.next("World!")); // logs 'Hello World!'
console.log(generatorA.next("Guys"));   // does not log 'Hello Guys!'


const generatorB = twoWayGenerator();
generatorB.next();
generatorB.next(new Error("Something really terrible happened just now")); // throws an error

// false , false 
console.log('The two generators are distinct: ', generatorA == generatorB, generatorA === generatorB);
