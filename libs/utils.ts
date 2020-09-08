


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