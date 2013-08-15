/*! v0.0.0 */
angular.module("topicoContentEditors",[]),angular.module("topicoContentEditors").directive("topicoEditor",["topicoCEEditorSvc","$compile",function(a,b){var c;return c=0,{template:'<div class="pagedown-bootstrap-editor"></div>',replace:!0,restrict:"E",scope:{markdown:"=",html:"="},link:function(a,d){var e,f,g,h,i,j,k;return h=c++,k=b('<div><div class="wmd-panel"><div id="wmd-button-bar-'+h+'"></div>'+'<textarea class="wmd-input" id="wmd-input-'+h+'">'+"</textarea>"+"</div>"+'<div id="wmd-preview-'+h+'" class="wmd-panel wmd-preview"></div>'+"</div>")(a),d.html(k),f=new Markdown.Converter,i=function(){return alert("help?")},g=new Markdown.Editor(f,"-"+h,{handler:i}),g.run(),j=!1,f.hooks.chain("preConversion",function(b){return a.markdown=b,b}),f.hooks.chain("postConversion",function(b){return a.html=b,b}),g.hooks.chain("onPreviewRefresh",function(){return j?void 0:a.$apply()}),e=$("#wmd-input-"+h),a.$watch("markdown",function(a){return e.val(a),j=!0,g.refreshPreview(),j=!1})}}}]),angular.module("topicoContentEditors").directive("topicoVideoEmbed",["topicoCEVideoSvc",function(a){return{template:'<iframe width="{{ config.width }}" height="{{ config.height }}" src="{{ config.src }}" frameborder="0" allowfullscreen></iframe>',restrict:"E",link:function(b,c,d){var e,f,g;return g=a.videoTypes,f=a.res(b,c,d),(e=g.validate(f.subType))!==!0?(c.text(""),console.warn(e)):b.config=g.config(f)}}}]),angular.module("topicoContentEditors").service("topicoCEEditorSvc",function(){});var __indexOf=[].indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(b in this&&this[b]===a)return b;return-1};angular.module("topicoContentEditors").service("topicoCESvc",function(){return{validate:function(a,b){var c;return a=function(){try{return a.toLowerCase()}catch(b){return c=b,null}}(),__indexOf.call(b,a)<0?"subtype "+a+" is not valid. valid subtypes: "+b:!0}}}),angular.module("topicoContentEditors").service("topicoCEVideoSvc",["topicoCESvc",function(a){return{res:function(a,b,c){var d;return d=c.res,"string"==typeof d&&(d=a.$eval(d)),d||console.warn("res is not defined for element: "+b[0].nodeName),d},videoTypes:{list:["youtube","vimeo"],validate:function(b){return a.validate(b,this.list)},subType:function(a){var b,c,d,e;d=a.subType,null==d&&(d=function(){var b,d,f,g;for(f=this.list,g=[],b=0,d=f.length;d>b;b++)e=f[b],(c=a.url.match(new RegExp(e,"i")))&&g.push(c[0]);return g}.call(this)[0]);try{return d.toLowerCase()}catch(f){return b=f,"youtube"}},config:function(a){var b,c,d;return b=function(){var b;return b={youtube:"embed",vimeo:"video"}[sub(a)],""+location.protocol+"//"+sub(a)+".com/"+b+"/"+a.sourceId},c=null!=(d=a.url)?d:b(),c=c.replace(/watch\?v=/,"embed/"),{src:c,width:a.width,height:a.height}}}}}]);
/*
//@ sourceMappingURL=topico-content-editors.map
*/