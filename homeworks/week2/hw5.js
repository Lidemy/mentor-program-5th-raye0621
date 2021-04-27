// join
function join(ary,concatStr){
	let result = ''
	result += ary[0]
	for(let  i =1 ; i < ary.length ; i++){
		result += concatStr + ary[i]
	}
	return result
}

// repeat
function repeat(str, times){
	let result = ''
	for(let  i = 0 ; i < times ; i++){
		result += str
	}
	return result
}


console.log(join(['a'], '!'));
console.log(repeat('a', 5));
