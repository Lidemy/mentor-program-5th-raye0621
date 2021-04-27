function capitalize(n){
	if(n[0] >= 'a' && n[0] <= 'z'){
		let result = n.split('')		//轉成陣列
		result[0] = n[0].toUpperCase()	//陣列首元素改大寫
		return result.join('')			//輸出合併陣列
	}
	return 	n  	//其他兩條件
}

console.log(capitalize('hello'));

// 第一次作答

// 以下給一些優化的建議：

// 可以善用 early return 寫法，在最開始就過濾掉不需要的條件，就不用寫多個 if-else，ex: 第一個只要不是大寫字母就直接回傳
// 用迴圈比較耗費，仔細看題目只要求針對第一個字，所以只要改它即可

// 1. 看清楚題意，條件可以合併。
// 2. 熟悉內建函式轉換，追求效能～

// function capitalize(n){
// 	if(65 <= n.charCodeAt(0) && n.charCodeAt(0) <= 90){		// 已經是大寫
// 		return n
// 	}
// 	else if(97 <= n.charCodeAt(0) && n.charCodeAt(0) <= 122){	// 首字為小寫
// 		let result = ''							// 設定最後回傳字串
// 		let num = n.charCodeAt(0)-32			// 小寫轉大寫的編碼
// 		result += String.fromCharCode(num)		// 傳入轉大寫的首字
// 		for(let i = 1 ; i < n.length ; i++){
// 			result += n[i]
// 		}
// 		return result
// 	}
// 	else{			//不是字母，忽略
// 		return n
// 	}
// }
