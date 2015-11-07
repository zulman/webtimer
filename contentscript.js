var el = document.createElement("div");
el.setAttribute('id', 'web-timer'); 
el.setAttribute('title', 'web-timer-counter'); 
el.addEventListener("click", onWebCounterClicked);
document.body.appendChild(el);

var style = document.createElement('style')
style.type = 'text/css'
style.innerHTML = '#web-timer {\
    position: fixed;\
    left: 20px;\
    bottom: 20px;\
    // width: 24px;\
    // height: 24px;\
    padding: 5px;\
    // margin: 0px;\
    background-size: 100%;\
    background-color: #000;\
    color:#fff;\
    z-index: 2147483647;\
    opacity: 0.3;\
    text-align: left;\
    border-radius: 5px;\
    font-size: 14px;\
    font-family: "Courier New", Courier, monospace;\
}\
#web-timer:hover {opacity: 0.7;}'
document.getElementsByTagName('head')[0].appendChild(style)

toHHMMSS = function (timeStr) {
    var sec_num = parseInt(timeStr, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    var time    = hours+':'+minutes+':'+seconds;
    return time;
}

function onWebCounterClicked()
{
    el.style.display = 'none';
}

function redraw(){
    if(el.style.display == 'none')
        return;
    chrome.runtime.sendMessage({method: "getData"}, function(response) {
        var data = response.data;
        s = "";
        // s += toHHMMSS((data.current))+"<br>";
        s += "Today: "+toHHMMSS((data.today))+"<br>";
        s += "Total: "+toHHMMSS((data.all))+"<br>";
        el.innerHTML = s;
    });
}
setInterval(redraw, 3000);
redraw();