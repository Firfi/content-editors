angular.module("topicoContentEditors",[]).run(["$templateCache",function(a){a.put("editor/includeDialog.html",'<div class="modal fade" id="wmd-include-{{ editorUniqueId }}">\n    <div class="modal-header">\n        <a class="close" data-dismiss="modal">&times;</a>\n        <h3>Modal Header</h3>\n    </div>\n    <div class="modal-body">\n        <p>Test Modal</p>\n    </div>\n    <div class="modal-footer">\n        <a href="#" class="btn" data-dismiss="modal">Close</a>\n        <a href="#" class="btn btn-primary">Save Changes</a>\n    </div>\n</div>'),a.put("main.html",'<div class="hero-unit">\n    <topico-video-embed res="youtube"></topico-video-embed>\n    <textarea ng-model="descriptionMarkdown"></textarea>\n    <textarea ng-model="descriptionHtml"></textarea>\n    <topico-editor markdown="descriptionMarkdown" html="descriptionHtml"></topico-editor>\n</div>\n')}]),angular.module("topicoContentEditors").directive("topicoEditor",["topicoCEEditorSvc","topicoResourcesSvc","$compile","$timeout","$templateCache",function(a,b,c,d){var e;return e=0,{template:'<div class="pagedown-bootstrap-editor">\n<div class="wmd-panel">\n  <div id="wmd-button-bar-{{ editorUniqueId }}"></div>\n  <textarea class="wmd-input" id="wmd-input-{{ editorUniqueId }}"></textarea>\n  <div id="wmd-preview-{{ editorUniqueId }}" class="wmd-panel wmd-preview"></div>\n</div>\n<div ng-include=" \'editor/includeDialog.html\' "></div>\n<a id="{{ includeLinkId }}" style="display: none;" href="#wmd-include-{{ editorUniqueId }}" data-toggle="modal"></a>\n</div>',replace:!0,restrict:"E",scope:{markdown:"=",html:"="},link:function(a,b){return a.editorUniqueId=e++,a.includeLinkId="wmd-include-link-"+a.editorUniqueId,d(function(){var c,e,f,g,h,i,j,k;return e=new Markdown.Converter,g=function(){return alert("Topico markdown editor")},h=function(){return $("#"+a.includeLinkId).click()},f=new Markdown.Editor(e,"-"+a.editorUniqueId,{handler:g,includeCallback:h},{buttonBar:b[0].firstElementChild.children[0],input:b[0].firstElementChild.children[1],preview:b[0].firstElementChild.children[2]}),f.run(),j=!1,k={},e.hooks.chain("preConversion",function(b){var c,e,g,h,i,j;for(a.markdown=b,c=[],h=b.replace(/{{include (.+?)}}/g,function(b,e){var g,h;return e=e.trim(),g=function(){return a.$parent.$watch(e,function(){return d(function(){return f.refreshPreview()})})},k[e]||(k[e]=g()),c.push(e),null!=(h=a.$parent[e])?h:e}),e=jQuery.extend({},k),delete e[c],i=0,j=e.length;j>i;i++)g=e[i],g();return h}),e.hooks.chain("postConversion",function(b){return a.html=b}),f.hooks.chain("onPreviewRefresh",function(){return j?void 0:a.$apply()}),c=$("#wmd-input-"+a.editorUniqueId),a.$watch("markdown",function(a){return c.val(a),j=!0,f.refreshPreview(),j=!1}),i=function(){}})}}}]),angular.module("topicoContentEditors").directive("topicoVideoEmbed",["topicoCEVideoSvc",function(a){return{template:'<div class="topico-embed-video">\n<iframe\n\nwidth="{{ config.width }}"\nheight="{{ config.height }}"\nsrc="{{ config.src }}"\nframeborder="{{ config.frameborder }}"\nwebkitAllowFullScreen mozallowfullscreen allowFullScreen>\n\n</iframe>\n<div ng-bind-html-unsafe="config.desc"></div>\n</div>',restrict:"E",scope:{res:"="},replace:!0,link:function(b,c){var d,e,f;return f=a.videoTypes,e=b.res,(d=f.validate(e.subType))!==!0?(c.text(""),console.warn(d)):b.config=f.config(e)}}}]),angular.module("topicoContentEditors").service("topicoCEEditorSvc",function(){});var __indexOf=[].indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(b in this&&this[b]===a)return b;return-1};angular.module("topicoContentEditors").service("topicoCESvc",function(){return{validate:function(a,b){var c;return a=function(){try{return a.toLowerCase()}catch(b){return c=b,null}}(),__indexOf.call(b,a)<0?"subtype "+a+" is not valid. valid subtypes: "+b:!0}}}),angular.module("topicoContentEditors").service("topicoCEVideoSvc",["topicoCESvc",function(a){return{videoTypes:{list:["youtube","vimeo"],validate:function(b){return a.validate(b,this.list)},subType:function(a){var b,c,d,e;d=a.subType;try{return(d=function(){var b,d,f,g;for(f=this.list,g=[],b=0,d=f.length;d>b;b++)e=f[b],(c=a.url.match(new RegExp(e,"i")))&&g.push(c[0]);return g}.call(this)[0]).toLowerCase()}catch(f){return b=f,"youtube"}},config:function(a){var b,c,d,e,f,g,h,i,j;return d=this.subType(a),f={youtube:838,vimeo:500}[d],c={youtube:480,vimeo:281}[d],b=function(){var b,c,e;return b={youtube:"embed",vimeo:"video"}[d],e={youtube:"",vimeo:"player."}[d],c={youtube:"",vimeo:"?title=0&amp;byline=0&amp;portrait=0&amp;badge=0"}[d],""+location.protocol+"//"+e+d+".com/"+b+"/"+a.sourceId+c},e=null!=(g=b())?g:a.url,e=e.replace(/watch\?v=/,"embed/"),{src:e,width:null!=(h=a.width)?h:f,height:null!=(i=a.height)?i:c,frameborder:0,desc:null!=(j=a.desc)?j:""}}}}}]),angular.module("topicoContentEditors").service("topicoResourcesSvc",function(){return{list:function(){return[{id:"first",type:"note"},{id:"second",type:"task"}]}}});