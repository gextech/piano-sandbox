// Config vars - is this neccesary?
tp = window["tp"] || [];
tp.push(["setAid", "Gw0qLKfjdV"]);
tp.push(["setDebug", true]);
tp.push(["setSandbox", true]);
tp.push(["setEndpoint", "https://sandbox.tinypass.com"]);

// Load piano script
(function(src) {
    var a = document.createElement("script");
    a.type = "text/javascript";
    a.async = true;
    a.src = src;
    var b = document.getElementsByTagName("script")[0];
    b.parentNode.insertBefore(a, b)
})("https://sandbox.tinypass.com/xbuilder/experience/load?aid=Gw0qLKfjdV");
