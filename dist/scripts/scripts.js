angular.module("topicoContentEditors",["topicoAngularServiceApp"]),$.fn.getCursorPosition=function(){var a,b,c;return a=jQuery(this).get(0),document.selection?(a.focus(),b=document.selection.createRange(),c=document.selection.createRange().text.length,b.moveStart("character",-a.value.length),b.text.length-c):a.selectionStart||"0"===a.selectionStart?a.selectionStart:0},angular.module("topicoContentEditors").run(["$templateCache",function(a){a.put("views/editor/includeDialog.html",'<div class="modal hide fade" tabindex="-1" id="{{ modalId }}">\n    <div class="modal-header">\n        <a class="close" data-dismiss="modal">&times;</a>\n        <h3>Include resource</h3>\n    </div>\n    <div class="modal-body">\n        <p>Select resource type</p>\n        <div>\n            <button ng-repeat="type in types"\n                    button-toggle="active"\n                    class="btn" ng-model="type.checked">\n                {{ type.name }}\n            </button>\n        </div>\n        <div ng-show="servicesError">{{ servicesError }}</div>\n        <div>\n            <label>\n                <input ng-model="filters.title" type="text"/>\n                <span>Filter title</span>\n            </label>\n        </div>\n        <table class="table table-striped table-bordered table-condensed resources-popup-table">\n            <tr ng-repeat="resource in selectedResources()" ng-click="includeResource(resource.id)">\n                <td>{{ schemaOrType(resource) }}</td>\n                <td>{{ resource.title }}</td>\n            </tr>\n        </table>\n    </div>\n    <div class="modal-footer">\n        <a href="#" class="btn" data-dismiss="modal">Close</a>\n    </div>\n</div>'),a.put("views/main.html",'<div class="hero-unit">\n    <textarea ng-model="descriptionMarkdown"></textarea>\n    <textarea ng-model="descriptionHtml"></textarea>\n    <topico-editor markdown="descriptionMarkdown" html="descriptionHtml"></topico-editor>\n</div>\n')}]),angular.module("topicoContentEditors").directive("buttonToggle",function(){return{restrict:"A",require:"ngModel",link:function(a,b,c,d){var e;return e=c.buttonToggle,b.bind("click",function(){var b;return b=d.$viewValue,a.$apply(function(){return d.$setViewValue(!b)})}),a.$watch(c.ngModel,function(a){return a?b.addClass(e):b.removeClass(e)})}}}),angular.module("topicoContentEditors").directive("ilLazy",function(a){return{scope:{ilIf:"="},restrict:"A",link:function(b,c){var d,e,f;return console.warn("load lazy"),d=c.html(),e=function(){var d,e;return d=b.ilIf,d?(f(),e=a('<topico-editor markdown="descriptionMarkdown" html="descriptionHtml"></topico-editor>')(b.$parent),console.warn(e),c.append(e)):c.html("")},f=b.$watch("ilIf",e),e()}}}),angular.module("topicoContentEditors").directive("topicoEditor",["topicoCEEditorSvc","topicoResourcesSvc","$compile","$timeout","$templateCache","$filter","topicoResourcesService","topicoCETestResourceSvc","$q","topicoPopupContentSvc",function(a,b,c,d,e,f,g,h,i,j){var k;return k=0,{template:'<div class="pagedown-bootstrap-editor">\n<div class="wmd-panel">\n  <div id="wmd-button-bar-{{ editorUniqueId }}"></div>\n  <textarea class="wmd-input" id="{{ editorAreaId }}"></textarea>\n  <div id="wmd-preview-{{ editorUniqueId }}" class="wmd-panel wmd-preview"></div>\n</div>\n<div ng-include=" \'views/editor/includeDialog.html\' "></div>\n<a id="{{ includeLinkId }}" style="display: none;" href="#{{ modalId }}"></a>\n</div>',replace:!0,restrict:"E",scope:{markdown:"=",html:"="},compile:function(){return function(a,b){var c,e,g,l;return a.editorUniqueId=k++,a.includeLinkId="wmd-include-link-"+a.editorUniqueId,a.editorAreaId="wmd-input-"+a.editorUniqueId,a.modalId="wmd-include-"+a.editorUniqueId,c=null,e=null,g=i.defer(),a.resources=[],l=function(b){var f;return c=b,a.schemaOrType=function(a){return a.resSchemaName||a.type},a.types=_.map(_.chain($.extend(b.tasks,b.topics)).groupBy(a.schemaOrType).value(),function(a,b){return{name:b,resources:a,checked:!1}}),f=function(){var b,c;return b=$.map(a.types,function(a){return a.resources}),(c=[]).concat.apply(c,b)},a.resources=f(),a.filters={title:""},a.selectedTypes=function(){var b;return b=_.select(a.types,function(a){return a.checked===!0}),b=b.length>0?b:a.types},a.selectedResources=function(){var b,c;return b=_.map(a.selectedTypes(),function(b){return""===a.filters.title?b.resources:_.select(b.resources,function(b){var c,d;return-1!==(null!=(c=b.title)?null!=(d=c.toLowerCase())?d.indexOf(a.filters.title.toLowerCase()):void 0:void 0)})}),(c=[]).concat.apply(c,b)},d(function(){return e.refreshPreview()}),g.resolve()},j.content().then(l,function(b){return a.servicesError="error in request to "+b.url+":\n"+b.msg+". Make sure that you can access "+b.url+" through browser.\nFor now you'll see mockup data.",l(h)}),d(function(){var c,g,h,i,j,k,l;return h=$("#"+a.editorAreaId),g=new Markdown.Converter,i=function(){return alert("Topico markdown editor")},k={type:"Res",resSchemaName:"Topic",tag:"groovy",description:"Test topic 2",aboutTopicIds:[],aboutResIds:[],title:"Test topic 2",topics:[],nonTopicAbouts:[],statements:[{predicate:"IS_ABOUT",objectId:"518d3cd70cf27f0e99132475"}]},a.includeCallback=function(){return a.popupState={carret:h.getCursorPosition(),text:h.val()},$("#"+a.modalId).modal()},a.includeResource=function(b){var c,f,g,i,j;return c=a.popupState.carret,j=a.popupState.text,i=j.substring(0,c),f=j.substring(c,j.length),g=""+i+"{{include "+b+"}}"+f,a.popupState.text=g,h.val(g),d(function(){return e.refreshPreview()}),modal.modal("hide")},e=new Markdown.Editor(g,"-"+a.editorUniqueId,{handler:i,includeCallback:a.includeCallback},{buttonBar:b[0].firstElementChild.children[0],input:b[0].firstElementChild.children[1],preview:b[0].firstElementChild.children[2]}),e.run(),j=!1,l={},g.hooks.chain("preConversion",function(b){var c,g,h,i,j,k;for(a.markdown=b,c=[],i=b.replace(/{{include (.+?)}}/g,function(b,g){var h,i,j,k;return g=g.trim(),i=function(){return a.$parent[g]?a.$parent.$watch(g,function(){return d(function(){return e.refreshPreview()})}):void 0},i&&(l[g]||(l[g]=i()),c.push(g)),null!=(j=null!=(k=a.$parent[g])?k:(h=f("getById")(a.resources,g),(null!=h?h.text:void 0)||(null!=h?h.description:void 0)))?j:g}),g=jQuery.extend({},l),delete g[c],j=0,k=g.length;k>j;j++)h=g[j],h();return i}),g.hooks.chain("postConversion",function(b){return a.html=b}),e.hooks.chain("onPreviewRefresh",function(){return j?void 0:a.$apply()}),c=$("#wmd-input-"+a.editorUniqueId),a.$watch("markdown",function(a){return c.val(a),j=!0,e.refreshPreview(),j=!1}),d(function(){return e.refreshPreview()})})}}}}]),angular.module("topicoContentEditors").directive("topicoVideoEmbed",["topicoCEVideoSvc",function(a){return{template:'<div class="topico-embed-video">\n<iframe\n\nwidth="{{ config.width }}"\nheight="{{ config.height }}"\nsrc="{{ config.src }}"\nframeborder="{{ config.frameborder }}"\nwebkitAllowFullScreen mozallowfullscreen allowFullScreen>\n\n</iframe>\n<div ng-bind-html-unsafe="config.desc"></div>\n</div>',restrict:"E",scope:{res:"="},replace:!0,link:function(b,c){var d,e,f;return f=a.videoTypes,e=b.res,(d=f.validate(e.subType))!==!0?(c.text(""),console.warn(d)):b.config=f.config(e)}}}]),angular.module("topicoContentEditors").filter("getById",function(){return function(a,b){var c,d,e;for(d=0,e=a.length;e>d;d++)if(c=a[d],c.id===b)return c}}),angular.module("topicoContentEditors").service("topicoCEEditorSvc",function(){});var __indexOf=[].indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(b in this&&this[b]===a)return b;return-1};angular.module("topicoContentEditors").service("topicoCESvc",function(){return{validate:function(a,b){var c;return a=function(){try{return a.toLowerCase()}catch(b){return c=b,null}}(),__indexOf.call(b,a)<0?"subtype "+a+" is not valid. valid subtypes: "+b:!0}}}),angular.module("topicoContentEditors").service("topicoCEVideoSvc",["topicoCESvc",function(a){return{videoTypes:{list:["youtube","vimeo"],validate:function(b){return a.validate(b,this.list)},subType:function(a){var b,c,d,e;d=a.subType;try{return(d=function(){var b,d,f,g;for(f=this.list,g=[],b=0,d=f.length;d>b;b++)e=f[b],(c=a.url.match(new RegExp(e,"i")))&&g.push(c[0]);return g}.call(this)[0]).toLowerCase()}catch(f){return b=f,"youtube"}},config:function(a){var b,c,d,e,f,g,h,i,j;return d=this.subType(a),f={youtube:838,vimeo:500}[d],c={youtube:480,vimeo:281}[d],b=function(){var b,c,e;return b={youtube:"embed",vimeo:"video"}[d],e={youtube:"",vimeo:"player."}[d],c={youtube:"",vimeo:"?title=0&amp;byline=0&amp;portrait=0&amp;badge=0"}[d],""+location.protocol+"//"+e+d+".com/"+b+"/"+a.sourceId+c},e=null!=(g=b())?g:a.url,e=e.replace(/watch\?v=/,"embed/"),{src:e,width:null!=(h=a.width)?h:f,height:null!=(i=a.height)?i:c,frameborder:0,desc:null!=(j=a.desc)?j:""}}}}}]),angular.module("topicoContentEditors").service("topicoPopupContentSvc",["topicoResourcesService",function(a){var b,c;return b=null,c=function(){return b=a.getTasks()},c(),{content:function(){return b},refresh:c()}}]),angular.module("topicoContentEditors").service("topicoResourcesSvc",function(){return{list:function(){return[{id:"first",type:"note"},{id:"second",type:"task"}]}}});