/*! v0.0.0 */
angular.module("topicoContentEditorsApp",[]),angular.module("topicoContentEditorsApp").directive("topicoVideoEmbed",["topicoCESvc",function(a){return{template:'<iframe width="{{ config.width }}" height="{{ config.height }}" src="{{ config.src }}" frameborder="0" allowfullscreen></iframe>',restrict:"E",link:function(b,c,d){var e,f,g;return g=a.videoTypes,f=a.res(b,c,d),(e=g.validate(f.subType))!==!0?(c.text(""),console.warn(e)):b.config=g.config(f)}}}]);var __indexOf=[].indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(b in this&&this[b]===a)return b;return-1};angular.module("topicoContentEditorsApp").service("topicoCESvc",function(){var a,b,c;return b=function(a,b){var c;return a=function(){try{return a.toLowerCase()}catch(b){return c=b,null}}(),__indexOf.call(b,a)<0?"subtype "+a+" is not valid. valid subtypes: "+b:!0},a=function(a){var b,d,e,f;e=a.subType,null==e&&(e=function(){var b,e,g;for(g=[],b=0,e=c.length;e>b;b++)f=c[b],(d=a.url.match(new RegExp(f,"i")))&&g.push(d[0]);return g}()[0]);try{return e.toLowerCase()}catch(g){return b=g,"youtube"}},c=["youtube","vimeo"],{res:function(a,b,c){var d;return d=c.res,"string"==typeof d&&(d=a.$eval(d)),d||console.warn("res is not defined for element: "+b[0].nodeName),d},videoTypes:{list:c,validate:function(a){return b(a,c)},subType:a,config:function(b){var c,d,e;return c=function(){var c;return c={youtube:"embed",vimeo:"video"}[a(b)],""+location.protocol+"//"+a(b)+".com/"+c+"/"+b.sourceId},d=null!=(e=b.url)?e:c(),d=d.replace(/watch\?v=/,"embed/"),{src:d,width:b.width,height:b.height}}}}});
/*
//@ sourceMappingURL=topico-content-editors.map
*/