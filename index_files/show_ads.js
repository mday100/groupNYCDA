(function(){
var g=false,l=null,m=true,n=(new Date).getTime();function o(a,b){var c=parseFloat(a);return isNaN(c)||c>1||c<0?b:c}function p(a,b){var c=/^([\w-]+\.)+[\w-]{2,}(\:[0-9]+)?$/;return c.test(a)?a:b};var aa="pagead2.googlesyndication.com",ba="googleads.g.doubleclick.net",ca="partner.googleadservices.com",q=p("pagead2.googlesyndication.com",aa),da=p("googleads.g.doubleclick.net",ba),ea=p("pagead2.googlesyndication.com",aa),fa=p("partner.googleadservices.com",ca);var ga={google_ad_channel:"channel",google_ad_host:"host",google_ad_host_channel:"h_ch",google_ad_host_tier_id:"ht_id",google_ad_region:"region",google_ad_section:"region",google_ad_type:"ad_type",google_adtest:"adtest",google_allow_expandable_ads:"ea",google_alternate_ad_url:"alternate_ad_url",google_alternate_color:"alt_color",google_bid:"bid",google_city:"gcs",google_color_bg:"color_bg",google_color_border:"color_border",google_color_line:"color_line",google_color_link:"color_link",google_color_text:"color_text",
google_color_url:"color_url",google_contents:"contents",google_country:"gl",google_cust_age:"cust_age",google_cust_ch:"cust_ch",google_cust_gender:"cust_gender",google_cust_id:"cust_id",google_cust_interests:"cust_interests",google_cust_job:"cust_job",google_cust_l:"cust_l",google_cust_lh:"cust_lh",google_cust_u_url:"cust_u_url",google_disable_video_autoplay:"disable_video_autoplay",google_ed:"ed",google_encoding:"oe",google_feedback:"feedback_link",google_flash_version:"flash",google_font_face:"f",
google_gl:"gl",google_hints:"hints",google_kw:"kw",google_kw_type:"kw_type",google_language:"hl",google_page_url:"url",google_referrer_url:"ref",google_region:"gr",google_reuse_colors:"reuse_colors",google_safe:"adsafe",google_tag_info:"gut",google_targeting:"targeting",google_ui_features:"ui",google_ui_version:"uiv",google_video_doc_id:"video_doc_id",google_video_product_type:"video_product_type"},ha={google_ad_format:"format",google_ad_output:"output",google_ad_callback:"callback",google_ad_height:"h",
google_ad_override:"google_ad_override",google_ad_slot:"slotname",google_ad_width:"w",google_analytics_uacct:"ga_wpids",google_correlator:"correlator",google_cpa_choice:"cpa_choice",google_ctr_threshold:"ctr_t",google_image_size:"image_size",google_last_modified_time:"lmt",google_max_num_ads:"num_ads",google_max_radlink_len:"max_radlink_len",google_num_radlinks:"num_radlinks",google_num_radlinks_per_unit:"num_radlinks_per_unit",google_only_ads_with_video:"only_ads_with_video",google_page_location:"loc",
google_rl_dest_url:"rl_dest_url",google_rl_filtering:"rl_filtering",google_rl_mode:"rl_mode",google_rt:"rt",google_skip:"skip"},ia={google_only_pyv_ads:"pyv"};function r(a){return ga[a]||ha[a]||ia[a]||l};document.URL.indexOf("?google_debug")>0||document.URL.indexOf("&google_debug")>0;function v(a){return typeof encodeURIComponent=="function"?encodeURIComponent(a):escape(a)}function ja(a,b,c){var d=document.createElement("script");d.type="text/javascript";if(b)d.onload=b;if(c)d.id=c;d.src=a;var e=document.getElementsByTagName("head")[0];if(!e)return g;window.setTimeout(function(){e.appendChild(d)},0);return m}function x(){this.b=this.n();this.g=g;if(!this.b)this.g=this.h()}x.prototype.e="__gads=";x.prototype.c="GoogleAdServingTest=";x.prototype.l=function(){return this.b};
x.prototype.setCookieInfo=function(a){this.a=a._cookies_[0];if(this.a!=l){this.b=this.a._value_;this.o()}};x.prototype.j=function(a){var b=(new Date).valueOf(),c=new Date;c.setTime(b+a);return c};var na="http://"+fa+"/gampad/cookie.js?callback=_GA_googleCookieHelper.setCookieInfo";x.prototype.i=function(a){if(!(this.b||!this.g)){var b="script",c=document.domain,d=na+"&client="+v(a)+"&domain="+v(c);document.write("<"+b+' src="'+d+'"></'+b+">")}};
x.prototype.h=function(){document.cookie=this.c+"Good";var a=this.f(this.c),b=a=="Good";if(b){var c=this.j(-1);document.cookie=this.c+"; expires="+c.toGMTString()}return b};x.prototype.n=function(){var a=this.f(this.e);return a};x.prototype.f=function(a){var b=document.cookie,c=b.indexOf(a),d="";if(c!=-1){var e=c+a.length,f=b.indexOf(";",e);if(f==-1)f=b.length;d=b.substring(e,f)}return d};
x.prototype.o=function(){if(!(this.a==l))if(this.b){var a=new Date;a.setTime(1000*this.a._expires_);var b=this.a._domain_,c=this.e+this.b+"; expires="+a.toGMTString()+"; path="+this.a._path_+"; domain=."+b;document.cookie=c}};function oa(a){if(a in y)return y[a];return y[a]=navigator.userAgent.toLowerCase().indexOf(a)!=-1}var y={};function pa(){return oa("msie")&&!window.opera}
function qa(){if(navigator.plugins&&navigator.mimeTypes.length){var a=navigator.plugins["Shockwave Flash"];if(a&&a.description)return a.description.replace(/([a-zA-Z]|\s)+/,"").replace(/(\s)+r/,".")}else if(navigator.userAgent&&navigator.userAgent.indexOf("Windows CE")>=0){for(var b=3,c=1;c;)try{c=new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+(b+1));b++}catch(d){c=l}return b.toString()}else if(pa()){c=l;try{c=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7")}catch(e){b=0;try{c=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
b=6;c.AllowScriptAccess="always"}catch(f){if(b==6)return b.toString()}try{c=new ActiveXObject("ShockwaveFlash.ShockwaveFlash")}catch(j){}}if(c){b=c.GetVariable("$version").split(" ")[1];return b.replace(/,/g,".")}}return"0"};function ra(a,b){try{return a.top.document.URL==b.URL}catch(c){}return g}function sa(a,b,c,d){var e=c||a.google_ad_width,f=d||a.google_ad_height;if(ra(a,b))return g;var j=b.documentElement;if(e&&f){var k=1,i=1;if(a.innerHeight){k=a.innerWidth;i=a.innerHeight}else if(j&&j.clientHeight){k=j.clientWidth;i=j.clientHeight}else if(b.body){k=b.body.clientWidth;i=b.body.clientHeight}if(i>2*f||k>2*e)return g}return m}function ta(a,b){for(var c in b)a["google_"+c]=b[c]}
function ua(a,b){if(!b)return a.URL;return a.referrer}function va(a,b){if(!b&&a.google_referrer_url==l)return"0";else if(b&&a.google_referrer_url==l)return"1";else if(!b&&a.google_referrer_url!=l)return"2";else if(b&&a.google_referrer_url!=l)return"3";return"4"}function wa(a,b,c,d){a.page_url=ua(c,d);a.page_location=l}function xa(a,b,c,d){a.page_url=b.google_page_url;a.page_location=ua(c,d)||"EMPTY"}
function ya(a,b){var c={},d=sa(a,b,a.google_ad_width,a.google_ad_height);c.iframing=va(a,d);a.google_page_url?xa(c,a,b,d):wa(c,a,b,d);c.last_modified_time=b.URL==c.page_url?Date.parse(b.lastModified)/1000:l;c.referrer_url=d?a.google_referrer_url:a.google_page_url&&a.google_referrer_url?a.google_referrer_url:b.referrer;return c}function za(a){var b={},c=a.URL.substring(a.URL.lastIndexOf("http"));b.iframing=l;b.page_url=c;b.page_location=a.URL;b.last_modified_time=l;b.referrer_url=c;return b}
function Aa(a,b){var c=Ba(a,b);ta(a,c)}function Ba(a,b){var c;return c=a.google_page_url==l&&Ca[b.domain]?za(b):ya(a,b)}var Ca={};Ca["ad.yieldmanager.com"]=m;var A=this,B=function(a){var b=typeof a;if(b=="object")if(a){if(a instanceof Array||!(a instanceof Object)&&Object.prototype.toString.call(a)=="[object Array]"||typeof a.length=="number"&&typeof a.splice!="undefined"&&typeof a.propertyIsEnumerable!="undefined"&&!a.propertyIsEnumerable("splice"))return"array";if(!(a instanceof Object)&&(Object.prototype.toString.call(a)=="[object Function]"||typeof a.call!="undefined"&&typeof a.propertyIsEnumerable!="undefined"&&!a.propertyIsEnumerable("call")))return"function"}else return"null";
else if(b=="function"&&typeof a.call=="undefined")return"object";return b};var Da=function(a){var b=B(a);return b=="array"||b=="object"&&typeof a.length=="number"};var Ea=function(a){var b=B(a);return b=="object"||b=="array"||b=="function"};Math.floor(Math.random()*2147483648).toString(36);var Fa=function(a){var b=B(a);if(b=="object"||b=="array"){if(a.clone)return a.clone.call(a);var c=b=="array"?[]:{};for(var d in a)c[d]=Fa(a[d]);return c}return a},Ga=Date.now||function(){return(new Date).getTime()};var Ha=function(a,b,c){if(a.forEach)a.forEach(b,c);else if(Array.forEach)Array.forEach(a,b,c);else for(var d=a.length,e=typeof a=="string"?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)},Ia=function(a){if(B(a)=="array")return a.concat();else{for(var b=[],c=0,d=a.length;c<d;c++)b[c]=a[c];return b}};var C=function(a,b){this.x=typeof a!="undefined"?a:0;this.y=typeof b!="undefined"?b:0};C.prototype.clone=function(){return new C(this.x,this.y)};C.prototype.toString=function(){return"("+this.x+", "+this.y+")"};var D=function(a,b){this.width=a;this.height=b};D.prototype.clone=function(){return new D(this.width,this.height)};D.prototype.toString=function(){return"("+this.width+" x "+this.height+")"};D.prototype.ceil=function(){this.width=Math.ceil(this.width);this.height=Math.ceil(this.height);return this};D.prototype.floor=function(){this.width=Math.floor(this.width);this.height=Math.floor(this.height);return this};
D.prototype.round=function(){this.width=Math.round(this.width);this.height=Math.round(this.height);return this};D.prototype.scale=function(a){this.width*=a;this.height*=a;return this};var Ja=function(a,b,c){for(var d in a)b.call(c,a[d],d,a)};var Ka=function(a){return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")},Qa=function(a,b){if(b)return a.replace(La,"&amp;").replace(Ma,"&lt;").replace(Na,"&gt;").replace(Oa,"&quot;");else{if(!Pa.test(a))return a;if(a.indexOf("&")!=-1)a=a.replace(La,"&amp;");if(a.indexOf("<")!=-1)a=a.replace(Ma,"&lt;");if(a.indexOf(">")!=-1)a=a.replace(Na,"&gt;");if(a.indexOf('"')!=-1)a=a.replace(Oa,"&quot;");return a}},La=/&/g,Ma=/</g,Na=/>/g,Oa=/\"/g,Pa=/[&<>\"]/,Ra=function(a,b){for(var c=b.length,d=0;d<c;d++){var e=c==
1?b:b.charAt(d);if(a.charAt(0)==e&&a.charAt(a.length-1)==e)return a.substring(1,a.length-1)}return a};
var Ta=function(a,b){for(var c=0,d=Ka(String(a)).split("."),e=Ka(String(b)).split("."),f=Math.max(d.length,e.length),j=0;c==0&&j<f;j++){var k=d[j]||"",i=e[j]||"",h=new RegExp("(\\d*)(\\D*)","g"),z=new RegExp("(\\d*)(\\D*)","g");do{var t=h.exec(k)||["","",""],u=z.exec(i)||["","",""];if(t[0].length==0&&u[0].length==0)break;var s=t[1].length==0?0:parseInt(t[1],10),G=u[1].length==0?0:parseInt(u[1],10);c=Sa(s,G)||Sa(t[2].length==0,u[2].length==0)||Sa(t[2],u[2])}while(c==0)}return c},Sa=function(a,b){if(a<
b)return-1;else if(a>b)return 1;return 0};Ga();var E,Ua,F,Va,Wa,Xa,Ya,Za,$a,ab=function(){return A.navigator?A.navigator.userAgent:l};var bb=function(){Xa=Wa=Va=F=Ua=E=g;var a;if(a=ab()){var b=A.navigator;E=a.indexOf("Opera")==0;Ua=!E&&a.indexOf("MSIE")!=-1;Va=(F=!E&&a.indexOf("WebKit")!=-1)&&a.indexOf("Mobile")!=-1;Xa=(Wa=!E&&!F&&b.product=="Gecko")&&b.vendor=="Camino"}};bb();
var H=E,I=Ua,J=Wa,K=F,cb=Va,eb=function(){var a=A.navigator;return a&&a.platform||""},ib=eb(),jb=function(){Ya=ib.indexOf("Mac")!=-1;Za=ib.indexOf("Win")!=-1;$a=ib.indexOf("Linux")!=-1};jb();var kb=Ya,lb=Za,mb=$a,nb=function(){var a="",b;if(H&&A.opera){var c=A.opera.version;a=typeof c=="function"?c():c}else{if(J)b=/rv\:([^\);]+)(\)|;)/;else if(I)b=/MSIE\s+([^\);]+)(\)|;)/;else if(K)b=/WebKit\/(\S+)/;if(b){var d=b.exec(ab());a=d?d[1]:""}}return a},ob=nb();
var pb={},L=function(a){return pb[a]||(pb[a]=Ta(ob,a)>=0)};var qb;var rb=function(a){return a?new M(N(a)):qb||(qb=new M)};
var sb=function(a){return typeof a=="string"?document.getElementById(a):a},tb=sb,vb=function(a,b){Ja(b,function(c,d){if(d=="style")a.style.cssText=c;else if(d=="class")a.className=c;else if(d=="for")a.htmlFor=c;else if(d in ub)a.setAttribute(ub[d],c);else a[d]=c})},ub={cellpadding:"cellPadding",cellspacing:"cellSpacing",colspan:"colSpan",rowspan:"rowSpan",valign:"vAlign",height:"height",width:"width",usemap:"useMap",frameborder:"frameBorder",type:"type"};
var wb=function(a){var b=a.document;if(K&&!L("500")&&!cb){if(typeof a.innerHeight=="undefined")a=window;var c=a.innerHeight,d=a.document.documentElement.scrollHeight;if(a==a.top)if(d<c)c-=15;return new D(a.innerWidth,c)}var e=b.compatMode=="CSS1Compat"&&(!H||H&&L("9.50"))?b.documentElement:b.body;return new D(e.clientWidth,e.clientHeight)},xb=function(a){var b=!K&&a.compatMode=="CSS1Compat"?a.documentElement:a.body;return new C(b.scrollLeft,b.scrollTop)};
var zb=function(){return yb(document,arguments)},yb=function(a,b){var c=b[0],d=b[1];if(I&&d&&(d.name||d.type)){var e=["<",c];d.name&&e.push(' name="',Qa(d.name),'"');if(d.type){e.push(' type="',Qa(d.type),'"');d=Fa(d);delete d.type}e.push(">");c=e.join("")}var f=a.createElement(c);d&&vb(f,d);if(b.length>2){function j(h){if(h)f.appendChild(typeof h=="string"?a.createTextNode(h):h)}for(var k=2;k<b.length;k++){var i=b[k];Da(i)&&!(Ea(i)&&i.nodeType>0)?Ha(Ab(i)?Ia(i):i,j):j(i)}}return f};
var Bb=function(a,b){a.appendChild(b)},Cb=function(a){return a&&a.parentNode?a.parentNode.removeChild(a):l},Db=function(a,b){var c=b.parentNode;c&&c.replaceChild(a,b)};
var Eb=K&&Ta(ob,"521")<=0,Fb=function(a,b){if(typeof a.contains!="undefined"&&!Eb&&b.nodeType==1)return a==b||a.contains(b);if(typeof a.compareDocumentPosition!="undefined")return a==b||Boolean(a.compareDocumentPosition(b)&16);for(;b&&a!=b;)b=b.parentNode;return b==a},N=function(a){return a.nodeType==9?a:a.ownerDocument||a.document},Ab=function(a){if(a&&typeof a.length=="number")if(Ea(a))return typeof a.item=="function"||typeof a.item=="string";else if(B(a)=="function")return typeof a.item=="function";
return g},M=function(a){this.d=a||A.document||document};M.prototype.createElement=function(a){return this.d.createElement(a)};M.prototype.createTextNode=function(a){return this.d.createTextNode(a)};M.prototype.m=function(){return this.d.compatMode=="CSS1Compat"};M.prototype.k=function(){return xb(this.d)};M.prototype.appendChild=Bb;M.prototype.removeNode=Cb;M.prototype.replaceNode=Db;M.prototype.contains=Fb;var Gb,Hb,Ib,Jb,Kb,Lb,Mb=function(){Lb=Kb=Jb=Ib=Hb=Gb=g;var a=ab();if(a)if(a.indexOf("Firefox")!=-1)Gb=m;else if(a.indexOf("Camino")!=-1)Hb=m;else if(a.indexOf("iPhone")!=-1||a.indexOf("iPod")!=-1)Ib=m;else if(a.indexOf("Android")!=-1)Jb=m;else if(a.indexOf("Chrome")!=-1)Kb=m;else if(a.indexOf("Safari")!=-1)Lb=m};Mb();var Nb=function(a,b){var c=N(a);if(c.defaultView&&c.defaultView.getComputedStyle){var d=c.defaultView.getComputedStyle(a,"");if(d)return d[b]}return l};var O=function(a,b){return Nb(a,b)||(a.currentStyle?a.currentStyle[b]:l)||a.style[b]};
var Ob=function(a){var b;b=a?a.nodeType==9?a:N(a):document;if(I&&!rb(b).m())return b.body;return b.documentElement},Pb=function(a){var b=a.getBoundingClientRect();if(I){var c=a.ownerDocument;b.left-=c.documentElement.clientLeft+c.body.clientLeft;b.top-=c.documentElement.clientTop+c.body.clientTop}return b},Qb=function(a){if(I)return a.offsetParent;for(var b=N(a),c=O(a,"position"),d=c=="fixed"||c=="absolute",e=a.parentNode;e&&e!=b;e=e.parentNode){c=O(e,"position");d=d&&c=="static"&&e!=b.documentElement&&
e!=b.body;if(!d&&(e.scrollWidth>e.clientWidth||e.scrollHeight>e.clientHeight||c=="fixed"||c=="absolute"))return e}return l},Rb=function(a){var b,c=N(a),d=O(a,"position"),e=J&&c.getBoxObjectFor&&!a.getBoundingClientRect&&d=="absolute"&&(b=c.getBoxObjectFor(a))&&(b.screenX<0||b.screenY<0),f=new C(0,0),j=Ob(c);if(a==j)return f;if(a.getBoundingClientRect){b=Pb(a);var k=rb(c).k();f.x=b.left+k.x;f.y=b.top+k.y}else if(c.getBoxObjectFor&&!e){b=c.getBoxObjectFor(a);var i=c.getBoxObjectFor(j);f.x=b.screenX-
i.screenX;f.y=b.screenY-i.screenY}else{var h=a;do{f.x+=h.offsetLeft;f.y+=h.offsetTop;if(h!=a){f.x+=h.clientLeft||0;f.y+=h.clientTop||0}if(K&&O(h,"position")=="fixed"){f.x+=c.body.scrollLeft;f.y+=c.body.scrollTop;break}h=h.offsetParent}while(h&&h!=a);if(H||K&&d=="absolute")f.y-=c.body.offsetTop;for(h=a;(h=Qb(h))&&h!=c.body;){f.x-=h.scrollLeft;if(!H||h.tagName!="TR")f.y-=h.scrollTop}}return f};J&&L("1.9");
var Sb=function(a,b,c,d){if(/^\d+px?$/.test(b))return parseInt(b,10);else{var e=a.style[c],f=a.runtimeStyle[c];a.runtimeStyle[c]=a.currentStyle[c];a.style[c]=b;var j=a.style[d];a.style[c]=e;a.runtimeStyle[c]=f;return j}},Tb=function(a){var b=N(a),c="";if(b.createTextRange){var d=b.body.createTextRange();d.moveToElementText(a);c=d.queryCommandValue("FontName")}if(!c){c=O(a,"fontFamily");if(H&&mb)c=c.replace(/ \[[^\]]*\]/,"")}var e=c.split(",");if(e.length>1)c=e[0];return Ra(c,"\"'")},Ub=function(a){var b=
a.match(/[^\d]+$/);return b&&b[0]||l},Vb={cm:1,"in":1,mm:1,pc:1,pt:1},Wb={em:1,ex:1},Xb=function(a){var b=O(a,"fontSize"),c=Ub(b);if(b&&"px"==c)return parseInt(b,10);if(I)if(c in Vb)return Sb(a,b,"left","pixelLeft");else if(a.parentNode&&a.parentNode.nodeType==1&&c in Wb){var d=a.parentNode,e=O(d,"fontSize");return Sb(d,b==e?"1em":b,"left","pixelLeft")}var f=zb("span",{style:"visibility:hidden;position:absolute;line-height:0;padding:0;margin:0;border:0;height:1em;"});Bb(a,f);b=f.offsetHeight;Cb(f);
return b};var P=document,Q=navigator,R=window;
function Yb(){var a=P.cookie,b=Math.round((new Date).getTime()/1000),c=R.google_analytics_domain_name,d=typeof c=="undefined"?Zb("auto"):Zb(c),e=a.indexOf("__utma="+d+".")>-1,f=a.indexOf("__utmb="+d)>-1,j=a.indexOf("__utmc="+d)>-1,k,i={},h=!!R&&!!R.gaGlobal;if(e){k=a.split("__utma="+d+".")[1].split(";")[0].split(".");i.sid=f&&j?k[3]+"":h&&R.gaGlobal.sid?R.gaGlobal.sid:b+"";i.vid=k[0]+"."+k[1];i.from_cookie=m}else{i.sid=h&&R.gaGlobal.sid?R.gaGlobal.sid:b+"";i.vid=h&&R.gaGlobal.vid?R.gaGlobal.vid:($b()^
ac()&2147483647)+"."+b;i.from_cookie=g}i.dh=d;i.hid=h&&R.gaGlobal.hid?R.gaGlobal.hid:$b();return R.gaGlobal=i}function $b(){return Math.round(Math.random()*2147483647)}
function ac(){var a=P.cookie?P.cookie:"",b=R.history.length,c,d,e=[Q.appName,Q.version,Q.language?Q.language:Q.browserLanguage,Q.platform,Q.userAgent,Q.javaEnabled()?1:0].join("");if(R.screen)e+=R.screen.width+"x"+R.screen.height+R.screen.colorDepth;else if(R.java){d=java.awt.Toolkit.getDefaultToolkit().getScreenSize();e+=d.screen.width+"x"+d.screen.height}e+=a;e+=P.referrer?P.referrer:"";for(c=e.length;b>0;)e+=b--^c++;return bc(e)}
function bc(a){var b=1,c=0,d,e;if(!(a==undefined||a=="")){b=0;for(d=a.length-1;d>=0;d--){e=a.charCodeAt(d);b=(b<<6&268435455)+e+(e<<14);c=b&266338304;b=c!=0?b^c>>21:b}}return b}function Zb(a){if(!a||a==""||a=="none")return 1;if("auto"==a){a=P.domain;if("www."==a.substring(0,4))a=a.substring(4,a.length)}return bc(a.toLowerCase())};var S="";function cc(a){if(a){if(S!="")S+=",";S+=a}}function dc(a){if(a&&a instanceof Array)for(var b=0;b<a.length;b++)a[b]&&typeof a[b]=="string"&&cc(a[b])}var ec=g;
function fc(a,b){var c="script";(ec=gc(a,b))||(a.google_allow_expandable_ads=g);var d=!hc();ec&&d&&b.write("<"+c+' src="http://'+q+'/pagead/expansion_embed.js"></'+c+">");var e=ic(a,b,o("1",0.01)),f=d||e;f&&pa()?b.write("<"+c+' src="http://'+q+'/pagead/render_ads.js"></'+c+">"):b.write("<"+c+">window.google_render_ad();</"+c+">")}function T(a){return a!=l?'"'+a+'"':'""'}function U(a,b){if(a&&b)window.google_ad_url+="&"+a+"="+b}
function V(a){var b=window,c=r(a),d=b[a];U(c,d)}function W(a,b){b!=l&&U(a,v(b))}function X(a){var b=window,c=r(a),d=b[a];W(c,d)}function Y(a,b){var c=window,d=r(a),e=c[a];if(d&&e&&typeof e=="object")e=e[b%e.length];U(d,e)}
function jc(a){var b=a.screen,c=navigator.javaEnabled(),d=-(new Date).getTimezoneOffset();if(b){U("u_h",b.height);U("u_w",b.width);U("u_ah",b.availHeight);U("u_aw",b.availWidth);U("u_cd",b.colorDepth)}U("u_tz",d);U("u_his",history.length);U("u_java",c);navigator.plugins&&U("u_nplug",navigator.plugins.length);navigator.mimeTypes&&U("u_nmime",navigator.mimeTypes.length)}
function kc(a){if(a.google_enable_first_party_cookie){if(a._GA_googleCookieHelper==l)a._GA_googleCookieHelper=new x;if(!a._google_cookie_fetched){a._google_cookie_fetched=m;a._GA_googleCookieHelper.i(lc(a.google_ad_client))}}}function lc(a){if(a){a=a.toLowerCase();if(a.substring(0,3)!="ca-")a="ca-"+a}return a}function mc(a){if(a){a=a.toLowerCase();if(a.substring(0,9)!="dist-aff-")a="dist-aff-"+a}return a}function nc(a){var b="google_unique_id";if(a[b])++a[b];else a[b]=1;return a[b]}
function oc(){var a=I&&L("6")&&!L("8"),b=J&&L("1.8.1"),c=K&&L("525");if(lb&&(a||b||c))return m;else if(kb&&(c||b))return m;else if(mb&&b)return m;return g}function hc(){return typeof ExpandableAdSlotFactory=="function"&&typeof ExpandableAdSlotFactory.createIframe=="function"}function gc(a,b){if(a.google_allow_expandable_ads===g||!b.body||a.google_ad_output!="html"||sa(a,b)||pc(a)||Z(a.google_ad_format)||isNaN(a.google_ad_height)||isNaN(a.google_ad_width)||!oc())return g;return m}
function qc(){var a=Math.random(),b=o("0.01",0);if(a<b)return"68120011";var c=2*b;if(a<c)return"68120021";c+=b;if(a<c)return"68120031";c+=b;if(a<c)return"68120041";if((window.google_unique_id||0)==0&&window.google_ad_output=="html"&&document.body&&typeof document.body.getBoundingClientRect=="function"){var d=o("0",0);c+=d;if(a<c)return"36812001";c+=d;if(a<c)return"36812002"}return""}
function rc(a,b,c,d){var e=nc(a);c=c.substring(0,1992);c=c.replace(/%\w?$/,"");var f="script";if((a.google_ad_output=="js"||a.google_ad_output=="json_html")&&(a.google_ad_request_done||a.google_radlink_request_done))b.write("<"+f+' language="JavaScript1.1" src='+T($(c))+"></"+f+">");else if(a.google_ad_output=="html")if(ec&&hc()){var j=a.google_container_id||d||l;a["google_expandable_ad_slot"+e]=ExpandableAdSlotFactory.createIframe("google_ads_frame"+e,$(c),a.google_ad_width,a.google_ad_height,j)}else{var k=
'<iframe name="google_ads_frame" width='+T(a.google_ad_width)+" height="+T(a.google_ad_height)+" frameborder="+T(a.google_ad_frameborder)+" src="+T($(c))+' marginwidth="0" marginheight="0" vspace="0" hspace="0" allowtransparency="true" scrolling="no"></iframe>';a.google_container_id?sc(a.google_container_id,b,k):b.write(k)}else a.google_ad_output=="textlink"&&b.write("<"+f+' language="JavaScript1.1" src='+T($(c))+"></"+f+">")}function tc(a,b,c){if(!a)return g;if(!b)return m;return c}
function uc(a){for(var b in ga)a[b]=l;for(b in ha)b=="google_correlator"||(a[b]=l);for(b in ia)a[b]=l;a.google_allow_expandable_ads=l;a.google_container_id=l;a.google_tag_info=l;a.google_eids=l}function pc(a){if(a.google_ad_format)return a.google_ad_format.indexOf("_0ads")>0;return a.google_ad_output!="html"&&a.google_num_radlinks>0}function Z(a){return!!a&&a.indexOf("_sdo")!=-1}
function vc(a,b){var c=l,d=window,e=document,f=n,j=d.google_ad_format,k=wc(d),i;if(d.google_cpa_choice!=c){d.google_ad_url=k+"/cpa/ads?";i=escape(lc(d.google_ad_client));d.google_ad_region="_google_cpa_region_";V("google_cpa_choice");if(typeof e.characterSet!="undefined")W("oe",e.characterSet);else typeof e.charset!="undefined"&&W("oe",e.charset)}else if(Z(j)){d.google_ad_url=k+"/pagead/sdo?";i=escape(mc(d.google_ad_client))}else{d.google_ad_url=k+"/pagead/ads?";i=escape(lc(d.google_ad_client))}d.google_ad_url+=
"client="+i;V("google_ad_host");V("google_ad_host_tier_id");var h=d.google_num_slots_by_client,z=d.google_num_slots_by_channel,t=d.google_prev_ad_formats_by_region,u=d.google_prev_ad_slotnames_by_region;if(d.google_ad_region==c&&d.google_ad_section!=c)d.google_ad_region=d.google_ad_section;var s=d.google_ad_region==c?"":d.google_ad_region;if(Z(j)){d.google_num_sdo_slots=d.google_num_sdo_slots?d.google_num_sdo_slots+1:1;if(d.google_num_sdo_slots>4)return g}else if(pc(d)){d.google_num_0ad_slots=d.google_num_0ad_slots?
d.google_num_0ad_slots+1:1;if(d.google_num_0ad_slots>3)return g}else if(d.google_cpa_choice==c){d.google_num_ad_slots=d.google_num_ad_slots?d.google_num_ad_slots+1:1;if(d.google_num_slots_to_rotate){t[s]=c;u[s]=c;if(d.google_num_slot_to_show==c)d.google_num_slot_to_show=f%d.google_num_slots_to_rotate+1;if(d.google_num_slot_to_show!=d.google_num_ad_slots)return g}else if(d.google_num_ad_slots>6&&s=="")return g}U("dt",n);V("google_language");d.google_country?V("google_country"):V("google_gl");V("google_region");
X("google_city");X("google_hints");V("google_safe");V("google_encoding");V("google_last_modified_time");X("google_alternate_ad_url");V("google_alternate_color");V("google_skip");V("google_targeting");var G=d.google_ad_client;if(h[G])h[G]+=1;else{h[G]=1;h.length+=1}if(t[s])if(!Z(j)){W("prev_fmts",t[s].toLowerCase());h.length>1&&U("slot",h[G])}u[s]&&W("prev_slotnames",u[s].toLowerCase());if(tc(j,d.google_ad_slot,d.google_override_format)){W("format",j.toLowerCase());Z(j)||(t[s]=t[s]?t[s]+","+j:j)}else if(d.google_ad_slot)u[s]=
u[s]?u[s]+","+d.google_ad_slot:d.google_ad_slot;V("google_max_num_ads");U("output",d.google_ad_output);V("google_adtest");V("google_ad_callback");V("google_ad_slot");X("google_correlator");d.google_new_domain_checked==1&&d.google_new_domain_enabled==0&&U("dblk",1);if(d.google_ad_channel){X("google_ad_channel");for(var db="",fb=d.google_ad_channel.split(xc),ka=0;ka<fb.length;ka++){var la=fb[ka];if(z[la])db+=la+"+";else z[la]=1}W("pv_ch",db)}if(d.google_ad_host_channel){X("google_ad_host_channel");
var Cc=yc(d.google_ad_host_channel,d.google_viewed_host_channels);W("pv_h_ch",Cc)}d.google_enable_first_party_cookie&&W("cookie",d._GA_googleCookieHelper.l());X("google_page_url");Y("google_color_bg",f);Y("google_color_text",f);Y("google_color_link",f);Y("google_color_url",f);Y("google_color_border",f);Y("google_color_line",f);d.google_reuse_colors?U("reuse_colors",1):U("reuse_colors",0);V("google_font_face");V("google_kw_type");X("google_kw");X("google_contents");V("google_num_radlinks");V("google_max_radlink_len");
V("google_rl_filtering");V("google_rl_mode");V("google_rt");X("google_rl_dest_url");V("google_num_radlinks_per_unit");V("google_ad_type");V("google_image_size");V("google_ad_region");dc(d.google_eids);W("eid",S);var gb=d.google_allow_expandable_ads;if(gb!=l)gb?U("ea","1"):U("ea","0");V("google_feedback");X("google_referrer_url");X("google_page_location");U("frm",d.google_iframing);V("google_bid");V("google_ctr_threshold");V("google_cust_age");V("google_cust_gender");V("google_cust_interests");V("google_cust_id");
V("google_cust_job");V("google_cust_u_url");V("google_cust_l");V("google_cust_lh");V("google_cust_ch");V("google_ed");V("google_video_doc_id");V("google_video_product_type");X("google_ui_features");X("google_ui_version");X("google_tag_info");X("google_only_ads_with_video");X("google_only_pyv_ads");X("google_disable_video_autoplay");if(a){W("ff",Tb(a));W("fs",Xb(a));var w;if(b)if(typeof a.getBoundingClientRect=="function"){var hb=a.getBoundingClientRect();w={x:hb.left,y:hb.top}}else{w={};w.x="-252738";
w.y="-252738"}else try{w=Rb(a)}catch(Hc){w={};w.x="-252738";w.y="-252738"}var ma=wb(window);if(w&&ma){W("biw",ma.width);W("bih",ma.height);W("adx",w.x);W("ady",w.y)}}Yb();U("ga_vid",d.gaGlobal.vid);U("ga_sid",d.gaGlobal.sid);U("ga_hid",d.gaGlobal.hid);U("ga_fc",d.gaGlobal.from_cookie);X("google_analytics_uacct");V("google_ad_override");V("google_flash_version");U("w",d.google_ad_width||-1);U("h",d.google_ad_height||-1);jc(d);return m}
function yc(a,b){for(var c=a.split("|"),d=-1,e=[],f=0;f<c.length;f++){var j=c[f].split(xc);b[f]||(b[f]={});for(var k="",i=0;i<j.length;i++){var h=j[i];if(!(h==""))if(b[f][h])k+="+"+h;else b[f][h]=1}k=k.slice(1);e[f]=k;if(k!="")d=f}var z="";if(d>-1){for(f=0;f<d;f++)z+=e[f]+"|";z+=e[d]}return z}
function zc(){var a=window,b=document;kc(a);var c=qc();cc(c);var d,e=g,f=g,j=g;switch(c){case "68120031":j=m;case "68120021":f=m;case "68120041":e=m;break;case "36812002":if(!window.google_atf_included){window.google_atf_included=m;ja("http://"+q+"/pagead/atf.js")}break}if(e){var k="google_temp_span";d=a.google_container_id&&tb(a.google_container_id)||tb(k);if(!d&&!a.google_container_id){b.write("<span id="+k+"></span>");d=tb(k)}}var i=g;i=f?vc(d,j):vc();d&&d.id==k&&Cb(d);if(i){rc(a,b,a.google_ad_url);
uc(a)}}function $(a){var b=(new Date).getTime()-n,c="&dtd="+(b<1000?b:"M");return a+c}function Ac(){zc();return m}
function Bc(a){var b=window,c=l,d=b.onerror;b.onerror=a;if(b.google_ad_frameborder==c)b.google_ad_frameborder=0;if(b.google_ad_output==c)b.google_ad_output="html";if(Z(b.google_ad_format)){var e=b.google_ad_format.match(/^(\d+)x(\d+)_.*/);if(e){b.google_ad_width=parseInt(e[1],10);b.google_ad_height=parseInt(e[2],10);b.google_ad_output="html"}}if(b.google_ad_format==c&&b.google_ad_output=="html")b.google_ad_format=b.google_ad_width+"x"+b.google_ad_height;Aa(b,document);if(b.google_num_slots_by_channel==
c)b.google_num_slots_by_channel=[];if(b.google_viewed_host_channels==c)b.google_viewed_host_channels=[];if(b.google_num_slots_by_client==c)b.google_num_slots_by_client=[];if(b.google_prev_ad_formats_by_region==c)b.google_prev_ad_formats_by_region=[];if(b.google_prev_ad_slotnames_by_region==c)b.google_prev_ad_slotnames_by_region=[];if(b.google_correlator==c)b.google_correlator=n;if(b.google_adslot_loaded==c)b.google_adslot_loaded={};if(b.google_adContentsBySlot==c)b.google_adContentsBySlot={};if(b.google_flash_version==
c)b.google_flash_version=qa();if(b.google_new_domain_checked==c)b.google_new_domain_checked=0;if(b.google_new_domain_enabled==c)b.google_new_domain_enabled=0;b.onerror=d}function Dc(a){for(var b={},c=a.split("?"),d=c[c.length-1].split("&"),e=0;e<d.length;e++){var f=d[e].split("=");if(f[0])try{b[f[0].toLowerCase()]=f.length>1?window.decodeURIComponent?decodeURIComponent(f[1].replace(/\+/g," ")):unescape(f[1]):""}catch(j){}}return b}
function Ec(){var a=window,b=Dc(document.URL);if(b.google_ad_override){a.google_ad_override=b.google_ad_override;a.google_adtest="on"}}function sc(a,b,c){if(a){var d=b.getElementById(a);if(d&&c&&c.length!=""){d.style.visibility="visible";d.innerHTML=c}}}var xc=/[+, ]/;window.google_render_ad=zc;var Fc={google:1,googlegroups:1,gmail:1,googlemail:1,googleimages:1,googleprint:1};function Gc(a){var b=a.google_page_location||a.google_page_url;if(!b)return g;b=b.toString();if(b.indexOf("http://")==0)b=b.substring(7,b.length);else if(b.indexOf("https://")==0)b=b.substring(8,b.length);var c=b.indexOf("/");if(c==-1)c=b.length;var d=b.substring(0,c),e=d.split("."),f=g;if(e.length>=3)f=e[e.length-3]in Fc;if(e.length>=2)f=f||e[e.length-2]in Fc;return f}
function ic(a,b,c){if(Gc(a)){a.google_new_domain_checked=1;return g}if(a.google_new_domain_checked==0){var d=Math.random();if(d<=c){var e="http://"+da+"/pagead/test_domain.js",f="script";b.write("<"+f+' src="'+e+'"></'+f+">");a.google_new_domain_checked=1;return m}}return g}function wc(a){if(!Gc(a)&&a.google_new_domain_enabled==1)return"http://"+da;return"http://"+ea};Ec();Bc(Ac);fc(window,document);
})()
