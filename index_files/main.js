/*****************************************************************************************
 	This is our main script. It will run once RequireJS (and this file) 
 	have been loaded into the page.	It has some class dependencies for execution.
*****************************************************************************************/

requirejs.config({
    baseUrl: '/independent.co.uk/assets/js/',
    paths: {
		'facebook': '//connect.facebook.net/en_US/all',    	
		'gigya': 'http://cdn.gigya.com/js/socialize.js?apiKey=2_bkQWNsWGVZf-fA4GnOiUOYdGuROCvoMoEN4WMj6_YBq4iecWA-Jp9D2GZCLbzON4',
		'gigya.blippar': 'gigya.actions',
		'inskinmedia.tablet': 'http://cdn.inskinmedia.com/isfe/publishercode/independent/indytablet',
		'jquery.cookie': 'jquery.cookie.min',    	
		'jquery144.iecors': 'jquery-1.4.4.ie.cors',
		'kalooga': 'http://publishing.kalooga.com/acct/449',		
		'lpr.widget': 'lpr.widget',
		'patimeline': 'modules/patimeline',
		'patimeline.lions': 'http://d2l2xq4ky4xm0j.cloudfront.net/51bf07a131e59/sqwidget',		
		'perform': 'http://static.eplayer.performgroup.com/flash/js/performgroup',
		'perform.player': 'jquery.performwrapper',
		'swfobject': 'http://static.eplayer.performgroup.com/flash/js/swfobject',
		'teads': 'modules/teads',
		'teads.tv': '//cdn.teads.tv/js/all-v1',
		'onscroll': '//d3c3cq33003psk.cloudfront.net/opentag-76050-687310',
		'skimlinks': 'http://s.skimresources.com/js/44681X1154550.skimlinks',
        'brightcove': 'http://admin.brightcove.com/js/BrightcoveExperiences_all',
        'handlebars': 'modules/handlebars',		
		'opta': 'http://widget.cloud.opta.net/2.0/js/widgets.opta',
		'jquery-loader': 'modules/jquery-loader',
        'handlebars': 'modules/handlebars.min',
        'modernizr': 'modules/modernizr.min',
        'history.polyfill': 'modules/jquery.history'	
    },
	shim: {
		'facebook' : {
      		exports: 'FB'
    	},		
		'lpr.widget': {
			deps: ['jquery144.iecors'],
			exports: 'jQuery.fn.lprwidget'
		},
		'teads.tv': {
			deps: ['teads']
		},
		'gigya.blippar': {
			deps: ['gigya', 'jquery.cookie'],
			exports: 'jQuery.fn.gigyablippar'
		},
		'perform.player': {
			deps: ['perform', 'swfobject'],
			exports: 'jQuery.fn.performplayer'
		},
		'handlebars': {
			exports: 'Handlebars'
		},
		'modernizr': {
			deps: ['history.polyfill'],
			exports: 'Modernizr'
		}
    }
});

/* Load Facebook SDK */
require(['modules/fb']);

/* JavaScript Object Augmentation */
require(['modules/jsobjects.augmentation']);

// Root object holding all methods and properties together in one namespace
// Method to burst wallpaper outside iframe
var INDYES = INDYES || {};
INDYES.injectWallpaperCSS = function (ctrId, inlineCSS) {
        $('#' + ctrId).append(inlineCSS);
};