var chai = require('chai');
var assert = chai.assert;

suite('Unit Tests', function () {
	suite('Basic Assertions', function () {
		test('#isNull, #isNotNull', function () {
			assert.isNull(
				null,
				'this is an optional error description - e.g. null is null'
			);
			assert.isNotNull(1, '1 is not null');
		});

		test('#isDefined, #isUndefined', function () {
			assert.isDefined(null, 'null is not undefined');
			assert.isUndefined(undefined, 'undefined IS undefined');
			assert.isDefined('hello', 'a string is not undefined');
		});

		test('#isOk, #isNotOk', function () {
			assert.isNotOk(null, 'null is falsey');
			assert.isOk("I'm truthy", 'a string is truthy');
			assert.isOk(true, 'true is truthy');
		});

		test('#isTrue, #isNotTrue', function () {
			assert.isTrue(true, 'true is true');
			assert.isTrue(!!'double negation', 'double negation of a truthy is true');
			assert.isNotTrue(
				{ value: 'truthy' },
				'A truthy object is NOT TRUE (neither is false...)'
			);
		});
	});

	suite('Equality', function () {
		test('#equal, #notEqual', function () {
			assert.equal(12, '12', 'numbers are coerced into strings with == ');
			assert.notEqual(
				{ value: 1 },
				{ value: 1 },
				'== compares object references'
			);
			assert.equal(6 * '2', '12', 'no more hints...');
			assert.notEqual(6 + '2', '12', 'type your error message if you want');
		});

		test('#strictEqual, #notStrictEqual', function () {
			assert.notStrictEqual(6, '6');
			assert.strictEqual(6, 3 * 2);
			assert.strictEqual(6 * '2', 12);
			assert.notStrictEqual([1, 'a', {}], [1, 'a', {}]);
		});

		test('#deepEqual, #notDeepEqual', function () {
			assert.deepEqual(
				{ a: '1', b: 5 },
				{ b: 5, a: '1' },
				"keys order doesn't matter"
			);
			assert.notDeepEqual(
				{ a: [5, 6] },
				{ a: [6, 5] },
				'array elements position does matter !!'
			);
		});
	});

	function weirdNumbers(delta) {
		return 1 + delta - Math.random();
	}

	suite('Comparisons', function () {
		test('#isAbove, #isAtMost', function () {
			assert.isAtMost('hello'.length, 5);
			assert.isAbove(1, 0);
			assert.isAbove(Math.PI, 3);
			assert.isAtMost(1 - Math.random(), 1);
		});

		test('#isBelow, #isAtLeast', function () {
			assert.isAtLeast('world'.length, 5);
			assert.isAtLeast(2 * Math.random(), 0);
			assert.isBelow(5 % 2, 2);
			assert.isBelow(2 / 3, 1);
		});

		test('#approximately', function () {
			assert.approximately(weirdNumbers(0.5), 1, /*edit this*/ 0.5);
			assert.approximately(weirdNumbers(0.2), 1, /*edit this*/ 0.8);
		});
	});

	var winterMonths = ['dec,', 'jan', 'feb', 'mar'];
	var backendLanguages = ['php', 'python', 'javascript', 'ruby', 'asp'];
	suite('Arrays', function () {
		test('#isArray, #isNotArray', function () {
			assert.isArray(
				'isThisAnArray?'.split(''),
				'String.prototype.split() returns an Array'
			);
			assert.isNotArray([1, 2, 3].indexOf(2), 'indexOf returns a number.');
		});

		test('Array #include, #notInclude', function () {
			assert.notInclude(winterMonths, 'jul', "It's summer in july...");
			assert.include(
				backendLanguages,
				'javascript',
				'JS is a backend language !!'
			);
		});
	});

	var formatPeople = function (name, age) {
		return '# name: ' + name + ', age: ' + age + '\n';
	};

	suite('Strings', function () {
		test('#isString, #isNotString', function () {
			assert.isNotString(Math.sin(Math.PI / 4), 'a float is not a string');
			assert.isString(process.env.PATH, 'env vars are strings (or undefined)');
			assert.isString(JSON.stringify({ type: 'object' }), 'a JSON is a string');
		});

		test('String #include, #notInclude', function () {
			assert.include('Arrow', 'row', 'Arrow contains row...');
			assert.notInclude('dart', 'queue', "But a dart doesn't contain a queue");
		});

		test('#match, #notMatch', function () {
			var regex = /^#\sname\:\s[\w\s]+,\sage\:\s\d+\s?$/;
			assert.match(formatPeople('John Doe', 35), regex);
			assert.notMatch(formatPeople('Paul Smith III', 'twenty-four'), regex);
		});
	});

	var Car = function () {
		this.model = 'cedan';
		this.engines = 1;
		this.wheels = 4;
	};

	var Plane = function () {
		this.model = '737';
		this.engines = ['left', 'right'];
		this.wheels = 6;
		this.wings = 2;
	};

	var myCar = new Car();
	var airlinePlane = new Plane();

	suite('Objects', function () {
		test('#property, #notProperty', function () {
			assert.notProperty(myCar, 'wings', 'A car has not wings');
			assert.property(airlinePlane, 'engines', 'planes have engines');
			assert.property(myCar, 'wheels', 'Cars have wheels');
		});

		test('#typeOf, #notTypeOf', function () {
			assert.typeOf(myCar, 'object');
			assert.typeOf(myCar.model, 'string');
			assert.notTypeOf(airlinePlane.wings, 'string');
			assert.typeOf(airlinePlane.engines, 'array');
			assert.typeOf(myCar.wheels, 'number');
		});

		test('#instanceOf, #notInstanceOf', function () {
			assert.notInstanceOf(myCar, Plane);
			assert.instanceOf(airlinePlane, Plane);
			assert.instanceOf(airlinePlane, Object, 'everything is an Object');
			assert.notInstanceOf(myCar.wheels, String);
		});
	});
});
