function capitalize(n){
	if(65 <= n.charCodeAt(0) && n.charCodeAt(0) <= 90){		// 已經是大寫
		return n
	}
	else if(97 <= n.charCodeAt(0) && n.charCodeAt(0) <= 122){	// 首字為小寫
		let result = ''							// 設定最後回傳字串
		let num = n.charCodeAt(0)-32			// 小寫轉大寫的編碼
		result += String.fromCharCode(num)		// 傳入轉大寫的首字
		for(let i = 1 ; i < n.length ; i++){
			result += n[i]
		}
		return result
	}
	else{			//不是字母，忽略
		return n
	}
}
console.log(capitalize('hello'));
