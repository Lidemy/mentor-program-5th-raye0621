// join
function join(ary,concatStr){
	let result = ''
	result += ary[0]
	for( i =1 ; i < ary.length ; i++){
		result += concatStr + ary[i]
	}
	return result
}

// repeat
function repeat(str, times){
	let result = ''
	for( i = 0 ; i < times ; i++){
		result += str
	}
	return result
}


console.log(join(['a'], '!'));
console.log(repeat('a', 5));
