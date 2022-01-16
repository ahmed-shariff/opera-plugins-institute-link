// The renaming url function
function renameURLToInstitute(){
    chrome.tabs.query({
	currentWindow: true,
	active: true
    }, function(tab) {

        // ******************************************************************************
        // ************************** University of Manitoba ****************************
        var splitURL = tab[0].url.split("/");
        splitURL.forEach(function(val, i){
	    if (val.endsWith(".org") || val.endsWith(".com")) {
    	        val = val.replace(/\./g, "-") + ".uml.idm.oclc.org";
            }
            splitURL[i] = val;
        });
        url = splitURL.join("/");
        // *********************** End of University of Manitoba ************************

        // ******************************************************************************
        // ************************************* UBCO  **********************************
        
        url = "https://go.openathens.net/redirector/ubc.ca?url=" + tab[0].url;

        // ******************************** end UBCO  ***********************************
        
        updateProperties = new Object();
        updateProperties.url = url;
        chrome.tabs.update(tab[0].id, updateProperties, function (){});
    });
}

chrome.browserAction.onClicked.addListener(renameURLToInstitute);

chrome.commands.onCommand.addListener(function(command) {
    if (command == 'rename-url') {
	renameURLToInstitute();
    }
});
