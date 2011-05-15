if (finded2k()) {
    // Show page action
    chrome.extension.sendRequest({ed2kFound:1}, function(response){});

    // Hook onClick actions for ed2k links
    chrome.extension.sendRequest({getOptions:1}, function(response){
        options = response.options;
        if ('popup' == options['hook'])
            hooked2kpopup(options['clientURL']);
        else
            hooked2kajax(options['clientURL'], options['AJAXTimeout']);
    });

    // Add listener for page action clicks
    chrome.extension.onRequest.addListener(function(request,sender,sendResponse){
        if (1 == request.startDownload) {
            var attrs = $('input[onclick*="download"]')[0].attributes;
            var clickstr = '';
            for(var i in attrs){
                if(attrs[i].name == 'onclick'){
                    clickstr = attrs[i].firstChild.data;
                    break;
                }
            }
            var groupName = clickstr.substring(clickstr.indexOf("'")+1,clickstr.lastIndexOf("'"));
            var checkboxes = document.getElementsByName(groupName);

            chrome.extension.sendRequest({getOptions:1}, function(response){
                var options = response.options;
                var itemName = 'Scheduled resource.';
                for (var i = 0; i < checkboxes.length; i++) {
                    if(checkboxes[i].checked){
                        $.ajax({
                            type:"GET",
                            url:options['clientURL']+"/submit?q="+escape(checkboxes[i].value),
                            timeout:options['AJAXTimeout'],
                            success:function(successResponse){
                                chrome.extension.sendRequest({notify:1,success:1,task:itemName}, function(response){
                                });
                            },
                            error:function(req, msg){
                                chrome.extension.sendRequest({notify:1,success:0,task:itemName}, function(response){
                                });
                            }
                        });
                    }
                };
            });
        };
        sendResponse({});
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
