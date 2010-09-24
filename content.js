if (finded2k()) {
    chrome.extension.sendRequest({ed2kFound:1}, function(response){});

    chrome.extension.sendRequest({getOptions:1}, function(response){
        options = response.options;
        if ('popup' == options['hook'])
            hooked2kpopup(options['clientURL']);
        else
            hooked2kajax(options['clientURL'], options['AJAXTimeout']);
    });
}

function finded2k() {
    try {
        var cnt = $('a[href^=ed2k]').length;
        return cnt>0;
    } catch (e) {
        return false;
    }
}

function hooked2kajax(url, timeout) {
    $('a[href^=ed2k]').click(function(){
        if (!isurl(url)) {
            alert('Please set the URL of MLDonkey in the options page !');
            return false;
        }

        var itemName = this.innerText;
        $.ajax({
            type:"GET",
            url:url+"/submit?q="+escape(this.href),
            timeout:timeout,
            success:function(response){
                chrome.extension.sendRequest({notify:1,success:1,task:itemName}, function(response){
                    if (1 == response.alert)
                        alert('Successfully added: '+itemName);
                });
            },
            error:function(req, msg){
                chrome.extension.sendRequest({notify:1,success:0,task:itemName}, function(response){
                    if (1 == response.alert)
                        alert('Failed to add: '+itemName);
                });
            }
        });
        return false;
    });
}

function hooked2kpopup(url) {
    $('a[href^=ed2k]').click(function(){
        if (!isurl(url)) {
            alert('Please set the URL of MLDonkey in the options page !');
            return false;
        }

        window.open(url+"/submit?q="+escape(this.href),"MLDonkey","width=500,height=300");
    });
}

function isurl(url) {
    var regex = /^http[s]?:\/\/.+/;
    return regex.test(url);
}
