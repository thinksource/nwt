
import _ from "lodash"

export function extractHostname(url:string) {
    console.log(url)
    var hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname
    var protocol;
    var port = '80'
    if (url.indexOf("//") > -1) {
        hostname = url.split('/')[2];
        protocol = url.split('/')[0];
    }
    else {
        hostname = url.split('/')[0];
        protocol = 'http:'
    }
    console.log(hostname)
    //find & remove port number
    if(url.indexOf(":")>-1){
        port = hostname.split(':')[1]
        hostname = hostname.split(':')[0];
    }
    //find & remove "?"
    // hostname = hostname.split('?')[0];
    console.log(hostname)
    return {protocol, hostname, port};
}



export function flaten(data: Object){
    var result =_.pickBy(data, v => (v !== undefined && typeof v != 'function'))
    _.map(result, data=>{
            if(typeof data =='object'){
                return flaten(data)
            }
        })
    return JSON.parse(JSON.stringify(result));
}

// export const dateStripped = (obj:Object) => {
// 	let newObj = {}
// 	Object.keys(obj).forEach((key:string) => {
// 		let value = obj[key as keyof typeof obj]
// 		if (value !== null || value !== undefined || typeof value !== 'function' ) {
// 			// If array, loop...
// 			if (Array.isArray(value)) {
// 				value = value.map(item => dateStripped(item))
// 			}
// 			// ...if property is date/time, stringify/parse...
// 			else if (typeof value === 'object') {
// 				value = JSON.parse(JSON.stringify(_.pickBy(value, v => (v !== undefined && typeof v != 'function')))
// 			}
// 			// ...and if a deep object, loop.
// 			else{
// 				value = dateStripped(value)
// 			}
// 		}
// 	})
// 	return newObj
// }

// 随机数字
export function randomNum(m: number, n: number) {
    return Math.floor(Math.random() * (n - m + 1) + m);
  }
  
  // 随机颜色
  export function randomColor() {
    return `rgb(${randomNum(0, 255)}, ${randomNum(0, 255)}, ${randomNum(0, 255)})`;
  }
  
  export const originalCharacter = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ];