function reverse(n){
	let result = ''
	for( let i=n.length-1 ; i>=0 ; i--){
		result += n[i]
	}
	console.log(result)
}
reverse('hello');
