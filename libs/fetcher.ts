// (async () => {
//     const rawResponse = await fetch('https://httpbin.org/post', {
//       method: 'POST',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({a: 1, b: 'Textual content'})
//     });
//     const content = await rawResponse.json();

import Axios, { Method } from "axios"

  
//     console.log(content);
//   })();
// import fetch from 'isomorphic-unfetch'
// import axios from 'axios'
// export default async function fetcher(url: string, fetchopt:RequestInit) {
//   const res= await axios(url, { method: "GET", ...fetchopt})
//   if(res.status == 200){
//     // console.log(res.data)
//     return res.data
//   }else{
//     // console.log(res.data)
//     return {message: res.data}    
//   }
// }


export default (method: Method, header?: Headers, body:string="")=>{
    const headers = new Headers({'Content-Type': 'application/json'})
    if(header){
        header.forEach((value, key, _parent)=>{
            headers.append(key, value)
        })
    }
    // headers = Object.assign({'Content-Type': 'application/json'}, headers)
    if(body || body.length==0 || method == 'get'){
        return (url: RequestInfo)=>{
            return fetch(url, {method, headers})
        }
    }else{
        return (url:RequestInfo)=>{
            const re = fetch(url, {method, headers, body})
            return re
        }
    }
} 