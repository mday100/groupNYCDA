define(["handlebars"], function(Handlebars) {
	Handlebars.registerHelper("foreach",function(arr,options) {
	    if(options.inverse && !arr.length)
	        return options.inverse(this);

	    return arr.map(function(item,index) {
	        item.$index = index;
	        item.$first = index === 0;
	        item.$last  = index === arr.length-1;
	        return options.fn(item);
	    }).join('');
	});

	Handlebars.registerHelper('ifCond', function(v1, v2, options) {
	  if(v1 === v2) {
	    return options.fn(this);
	  }
	  return options.inverse(this);
	});

	Handlebars.registerHelper('stripHtml', function(str) {
		var regex = /(<([^>]+)>)/ig;
		return (str.replace(regex, "")).replace(/\"/g, "&quot;");
	});

	Handlebars.registerHelper('lt', function( a, b, options ){
		return (a < b) ? options.fn(this) : options.inverse(this);
	});
});