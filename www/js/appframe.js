function getArraySubObjects(data) {
    if (data.constructor != Array) {
        var temp = [];
        temp.push(data)
        return temp
    } else
        return data;
}

var XMLTools = 
{
	domParser : function (xml_string) {
		var xmldoc;
		if (window.DOMParser) {
			parser = new DOMParser();
			xmldoc = parser.parseFromString(xml_string, "text/xml");
		} else // Internet Explorer
		{
			xmldoc = new ActiveXObject("Microsoft.XMLDOM");
			xmldoc.async = false;
			xmldoc.loadXML(xml_string);
		}
		return xmldoc;
	}
};



var Logging = {
	debug : function ( message ){
		console.log ( " -- [DEBUG]: " + message );
	},
	trace : function ( message ){
		console.log ( " -- [TRACE]: " + message );
	},
	error : function ( message ){
		console.log ( " -- [ERROR]: " + message );
	}
};


var FileTools = {
	
	fileToString : function ( filename )
	{
		var rawFile = new XMLHttpRequest();
		rawFile.open("GET", filename, true );
		rawFile.onreadystatechange = function ()
		{
			if(rawFile.readyState === 4)
			{
				if(rawFile.status === 200 || rawFile.status == 0)
				{
					var allText = rawFile.responseText;
					return allText;
				}
			}
		}
		rawFile.send(null);
	}
	
}

