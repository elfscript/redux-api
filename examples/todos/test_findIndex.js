var hello = {
	    hello: 'world',
	    foo: 'bar'
};
var qaz = {
	    hello: 'stevie',
	    foo: 'baz'
}

var myArray = [];
myArray.push(hello,qaz);

var x=myArray.findIndex(i=> i.hello=='stev');
console.log(x);


