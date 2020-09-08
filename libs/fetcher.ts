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