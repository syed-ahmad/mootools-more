/*
---
name: Hash Tests
requires: [More/Hash]
provides: [Hash.Tests]
...
*/

(function(){

function isNumber(num){ return typeof num == 'number'; }
function isArray(arr){ return typeOf(arr) == 'array'; }
function $defined(obj){ return obj != null; }

var hash2 = new Hash({ a: 'string', b: 233, c: {} });


describe('Hash Methods', function(){

	// Hash.constructor

	it('should return a new hash', function(){
		expect(typeOf(new Hash()) == 'hash').toBeTruthy();
	});

	it('should return a copy of a hash', function(){
		var hash = new Hash({a: 1, b: 2, c: 3});
		var copy = new Hash(hash);
		expect(copy !== hash).toBeTruthy();
		expect(copy).toEqual(hash);
	});

	// Hash.erase

	it('should remove a key and its value from the hash', function(){
		var hash = new Hash({a: 1, b: 2, c: 3});
		expect(hash.erase('a')).toEqual(new Hash({b:2,c:3}));
		expect(hash.erase('d')).toEqual(new Hash({b:2,c:3}));

		hash = new Hash({a: 1, b: 2, c: 3});
		expect(hash.erase('a')).toEqual(new Hash({b:2,c:3}));
		expect(hash.erase('d')).toEqual(new Hash({b:2,c:3}));
	});

	// Hash.get

	it('should return the value corresponding to the specified key otherwise null', function(){
		var hash = new Hash({a: 1, b: 2, c: 3});
		expect(hash.get('c')).toEqual(3);
		expect(hash.get('d')).toBeNull();
	});

	// Hash.set

	it('should set the key with the corresponding value', function(){
		var myHash = new Hash({a: 1, b: 2, c: 3}).set('c', 7).set('d', 8);
		expect(myHash).toEqual(new Hash({a:1,b:2,c:7,d:8}));
	});

	// Hash.empty

	it('should empty the hash', function(){
		var hash = new Hash({a: 1, b: 2, c: 3});
		expect(hash.empty()).toEqual(new Hash());
	});

	// Hash.include

	it('should include a key value if the hash does not have the key otherwise ignore', function(){
		var hash = new Hash({a: 1, b: 2, c: 3});
		expect(hash.include('e', 7)).toEqual(new Hash({a:1,b:2,c:3,e:7}));
		expect(hash.include('a', 7)).toEqual(new Hash({a:1,b:2,c:3,e:7}));
	});

	// Hash.keyOf | Hash.indexOf

	it('should return the key of the value or null if not found', function(){
		var hash = new Hash({a: 1, b: 2, c: 3, d: 1});
		expect(hash.keyOf(1)).toEqual('a');
		expect(hash.keyOf('not found')).toBeNull();

		expect(hash.indexOf(1)).toEqual('a');
		expect(hash.indexOf('not found')).toBeNull();
	});

	// Hash.has

	it('should return true if the hash has the key otherwise false', function(){
		var hash = new Hash({a: 1, b: 2, c: 3});
		expect(hash.has('a')).toBeTruthy();
		expect(hash.has('d')).toBeFalsy();
	});

	// Hash.hasValue | Hash.contains

	it('should return true if the hash hasValue otherwise false', function(){
		var hash = new Hash({a: 1, b: 2, c: 3});
		expect(hash.hasValue(1)).toBeTruthy();
		expect(hash.hasValue('not found')).toBeFalsy();

		expect(hash.contains(1)).toBeTruthy();
		expect(hash.contains('not found')).toBeFalsy();
	});

	// Hash.getClean

	it('should getClean JavaScript object', function(){
		var hash = new Hash({a: 1, b: 2, c: 3});
		expect(hash.getClean()).toEqual({a:1,b:2,c:3});
	});

	// Hash.extend

	it('should extend a Hash with an object', function(){
		var hash = new Hash({a: 1, b: 2, c: 3});
		expect(hash.extend({a:4,d:7,e:8})).toEqual(new Hash({a:4,b:2,c:3,d:7,e:8}));
	});

	it('should extend a Hash with another Hash', function(){
		var hash = new Hash({a: 1, b: 2, c: 3});
		expect(hash.extend(new Hash({a:4,d:7,e:8}))).toEqual(new Hash({a:4,b:2,c:3,d:7,e:8}));
	});

	// Hash.combine

	it('should merge a Hash with an object', function(){
		var hash = new Hash({a: 1, b: 2, c: 3});
		expect(hash.combine({a:4,d:7,e:8})).toEqual(new Hash({a:1,b:2,c:3,d:7,e:8}));
	});

	it('should merge a Hash with another Hash', function(){
		var hash = new Hash({a: 1, b: 2, c: 3});
		expect(hash.combine(new Hash({a:4,d:7,e:8}))).toEqual(new Hash({a:1,b:2,c:3,d:7,e:8}));
	});

	// Hash.each

	it('should iterate through each property', function(){
		var newHash = new Hash();
		var hash = new Hash({a: 1, b: 2, c: 3});
		hash.each(function(value, key){
			newHash.set(key, value);
		});
		expect(newHash).toEqual(hash);
	});

	// Hash.map

	it('should map a new Hash according to the comparator', function(){
		expect(hash2.map(isNumber)).toEqual(new Hash({a:false,b:true,c:false}));
	});

	// Hash.filter

	it('should filter the Hash according to the comparator', function(){
		expect(hash2.filter(isNumber)).toEqual(new Hash({b:233}));
	});

	// Hash.every

	it('should return true if every value matches the comparator, otherwise false', function(){
		expect(hash2.every($defined)).toBeTruthy();
		expect(hash2.every(isNumber)).toBeFalsy();
	});

	// Hash.some

	it('should return true if some of the values match the comparator, otherwise false', function(){
		expect(hash2.some(isNumber)).toBeTruthy();
		expect(hash2.some(isArray)).toBeFalsy();
	});

	// Hash.getKeys

	it('getKeys should return an empty array', function(){
		expect(new Hash().getKeys()).toEqual([]);
	});

	it('should return an array containing the keys of the hash', function(){
		expect(hash2.getKeys()).toEqual(['a', 'b', 'c']);
	});

	// Hash.getValues

	it('getValues should return an empty array', function(){
		expect(new Hash().getValues()).toEqual([]);
	});

	it('should return an array with the values of the hash', function(){
		expect(hash2.getValues()).toEqual(['string', 233, {}]);
	});

	// Hash.toQueryString

	it('should return a query string', function(){
		var myHash = new Hash({apple: 'red', lemon: 'yellow'});
		expect(myHash.toQueryString()).toEqual('apple=red&lemon=yellow');

		var myHash2 = new Hash({apple: ['red', 'yellow'], lemon: ['green', 'yellow']});
		expect(myHash2.toQueryString()).toEqual('apple[0]=red&apple[1]=yellow&lemon[0]=green&lemon[1]=yellow');

		var myHash3 = new Hash({fruits: {apple: ['red', 'yellow'], lemon: ['green', 'yellow']}});
		expect(myHash3.toQueryString()).toEqual('fruits[apple][0]=red&fruits[apple][1]=yellow&fruits[lemon][0]=green&fruits[lemon][1]=yellow');
	});

});

})();
