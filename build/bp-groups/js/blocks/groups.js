parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"NVR6":[function(require,module,exports) {
function e(e,o){(null==o||o>e.length)&&(o=e.length);for(var l=0,r=new Array(o);l<o;l++)r[l]=e[l];return r}module.exports=e,module.exports.default=module.exports,module.exports.__esModule=!0;
},{}],"XfJI":[function(require,module,exports) {
var r=require("./arrayLikeToArray.js");function e(e){if(Array.isArray(e))return r(e)}module.exports=e,module.exports.default=module.exports,module.exports.__esModule=!0;
},{"./arrayLikeToArray.js":"NVR6"}],"OMTj":[function(require,module,exports) {
function e(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}module.exports=e,module.exports.default=module.exports,module.exports.__esModule=!0;
},{}],"UyFj":[function(require,module,exports) {
var r=require("./arrayLikeToArray.js");function e(e,t){if(e){if("string"==typeof e)return r(e,t);var o=Object.prototype.toString.call(e).slice(8,-1);return"Object"===o&&e.constructor&&(o=e.constructor.name),"Map"===o||"Set"===o?Array.from(e):"Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)?r(e,t):void 0}}module.exports=e,module.exports.default=module.exports,module.exports.__esModule=!0;
},{"./arrayLikeToArray.js":"NVR6"}],"wFNi":[function(require,module,exports) {
function e(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}module.exports=e,module.exports.default=module.exports,module.exports.__esModule=!0;
},{}],"Fhqp":[function(require,module,exports) {
var e=require("./arrayWithoutHoles.js"),r=require("./iterableToArray.js"),o=require("./unsupportedIterableToArray.js"),u=require("./nonIterableSpread.js");function t(t){return e(t)||r(t)||o(t)||u()}module.exports=t,module.exports.default=module.exports,module.exports.__esModule=!0;
},{"./arrayWithoutHoles.js":"XfJI","./iterableToArray.js":"OMTj","./unsupportedIterableToArray.js":"UyFj","./nonIterableSpread.js":"wFNi"}],"OUZ9":[function(require,module,exports) {
function e(e){if(Array.isArray(e))return e}module.exports=e,module.exports.default=module.exports,module.exports.__esModule=!0;
},{}],"vKPt":[function(require,module,exports) {
function e(e,l){var r=e&&("undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"]);if(null!=r){var t,o,u=[],n=!0,a=!1;try{for(r=r.call(e);!(n=(t=r.next()).done)&&(u.push(t.value),!l||u.length!==l);n=!0);}catch(d){a=!0,o=d}finally{try{n||null==r.return||r.return()}finally{if(a)throw o}}return u}}module.exports=e,module.exports.default=module.exports,module.exports.__esModule=!0;
},{}],"Rom6":[function(require,module,exports) {
function e(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}module.exports=e,module.exports.default=module.exports,module.exports.__esModule=!0;
},{}],"HETk":[function(require,module,exports) {
var e=require("./arrayWithHoles.js"),r=require("./iterableToArrayLimit.js"),o=require("./unsupportedIterableToArray.js"),t=require("./nonIterableRest.js");function u(u,s){return e(u)||r(u,s)||o(u,s)||t()}module.exports=u,module.exports.default=module.exports,module.exports.__esModule=!0;
},{"./arrayWithHoles.js":"OUZ9","./iterableToArrayLimit.js":"vKPt","./unsupportedIterableToArray.js":"UyFj","./nonIterableRest.js":"Rom6"}],"jS06":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.EXTRA_INFO=exports.GROUP_STATI=exports.AVATAR_SIZES=void 0;var e=wp,s=e.i18n.__,r=[{label:s("None","buddypress"),value:"none"},{label:s("Thumb","buddypress"),value:"thumb"},{label:s("Full","buddypress"),value:"full"}];exports.AVATAR_SIZES=r;var u={public:s("Public","buddypress"),private:s("Private","buddypress"),hidden:s("Hidden","buddypress")};exports.GROUP_STATI=u;var l=[{label:s("None","buddypress"),value:"none"},{label:s("Group's description","buddypress"),value:"description"},{label:s("Last time the group was active","buddypress"),value:"active"},{label:s("Amount of group members","buddypress"),value:"popular"}];exports.EXTRA_INFO=l;
},{}],"Ccmh":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=n(require("@babel/runtime/helpers/toConsumableArray")),t=n(require("@babel/runtime/helpers/slicedToArray")),r=require("./constants");function n(e){return e&&e.__esModule?e:{default:e}}var o=wp,s=o.blockEditor,a=s.InspectorControls,i=s.BlockControls,l=o.components,u=l.Placeholder,d=l.PanelBody,c=l.SelectControl,p=l.ToggleControl,m=l.Button,b=l.Dashicon,g=l.Tooltip,v=l.ToolbarGroup,f=l.RangeControl,y=o.element,h=y.createElement,_=y.Fragment,A=y.useState,C=o.i18n,I=C.__,k=C.sprintf,x=C._n,N=o.apiFetch,S=o.url.addQueryArgs,T=bp,G=T.blockComponents.AutoCompleter,P=T.blockData.isActive,O=lodash,R=O.reject,D=O.remove,w=O.sortBy,E=function(e){return e&&e.status&&r.GROUP_STATI[e.status]?r.GROUP_STATI[e.status]:null},B=function(n){var o,s=n.attributes,l=n.setAttributes,y=n.isSelected,C=P("groups","avatar"),T=s.itemIDs,O=s.avatarSize,B=s.displayGroupName,q=s.extraInfo,F=s.layoutPreference,j=s.columns,z=0!==T.length,L=A([]),M=(0,t.default)(L,2),Q=M[0],U=M[1],V=[{icon:"text",title:I("List view","buddypress"),onClick:function(){return l({layoutPreference:"list"})},isActive:"list"===F},{icon:"screenoptions",title:I("Grid view","buddypress"),onClick:function(){return l({layoutPreference:"grid"})},isActive:"grid"===F}],X="bp-block-groups avatar-"+O,$=r.EXTRA_INFO;"grid"===F&&(X+=" is-grid columns-"+j,$=r.EXTRA_INFO.filter(function(e){return"description"!==e.value}));return z&&T.length!==Q.length&&N({path:S("/buddypress/v1/groups",{populate_extras:!0,include:T})}).then(function(e){U(w(e,[function(e){return T.indexOf(e.id)}]))}),Q.length&&(o=Q.map(function(e){var t=!1,r="group-content";return"list"===F&&"description"===q&&e.description&&e.description.rendered&&(t=!0,r="group-content has-description"),h("div",{key:"bp-group-"+e.id,className:r},y&&h(g,{text:I("Remove group","buddypress")},h(m,{className:"is-right",onClick:function(){var t;(t=e.id)&&-1!==T.indexOf(t)&&(U(R(Q,["id",t])),l({itemIDs:D(T,function(e){return e!==t})}))},label:I("Remove group","buddypress")},h(b,{icon:"no"}))),C&&"none"!==O&&h("div",{className:"item-header-avatar"},h("a",{href:e.link,target:"_blank"},h("img",{key:"avatar-"+e.id,className:"avatar",alt:k(I("Profile photo of %s","buddypress"),e.name),src:e.avatar_urls[O]}))),h("div",{className:"group-description"},B&&h("strong",null,h("a",{href:e.link,target:"_blank"},e.name)),t&&h("div",{className:"group-description-content",dangerouslySetInnerHTML:{__html:e.description.rendered}}),"active"===q&&e.last_activity&&e.last_activity_diff&&h("time",{dateTime:e.last_activity},k(I("Active %s","buddypress"),e.last_activity_diff)),"popular"===q&&e.total_member_count&&h("div",{className:"group-meta"},k(x("%1$d member","%1$d members",e.total_member_count,"buddypress"),e.total_member_count))))})),h(_,null,h(a,null,h(d,{title:I("Settings","buddypress"),initialOpen:!0},h(p,{label:I("Display the group's name","buddypress"),checked:!!B,onChange:function(){l({displayGroupName:!B})},help:I(B?"Include the group's name.":"Toggle to include group's name.","buddypress")}),C&&h(c,{label:I("Avatar size","buddypress"),value:O,options:r.AVATAR_SIZES,help:I('Select "None" to disable the avatar.',"buddypress"),onChange:function(e){l({avatarSize:e})}}),h(c,{label:I("Group extra information","buddypress"),value:q,options:$,help:I('Select "None" to show no extra information.',"buddypress"),onChange:function(e){l({extraInfo:e})}}),"grid"===F&&h(f,{label:I("Columns","buddypress"),value:j,onChange:function(e){return l({columns:e})},min:2,max:4,required:!0}))),h(i,null,h(v,{controls:V})),z&&h("div",{className:X},o),(y||0===T.length)&&h(u,{icon:z?"":"groups",label:z?"":I("BuddyPress Groups","buddypress"),instructions:I("Start typing the name of the group you want to add to the groups list.","buddypress"),className:0!==T.length?"is-appender":"is-large"},h(G,{component:"groups",objectQueryArgs:{show_hidden:!1,exclude:T},slugValue:E,ariaLabel:I("Group's name","buddypress"),placeholder:I("Enter Group's name here…","buddypress"),onSelectItem:function(t){var r=t.itemID;r&&-1===T.indexOf(r)&&l({itemIDs:[].concat((0,e.default)(T),[parseInt(r,10)])})},useAvatar:C})))},q=B;exports.default=q;
},{"@babel/runtime/helpers/toConsumableArray":"Fhqp","@babel/runtime/helpers/slicedToArray":"HETk","./constants":"jS06"}],"jcTh":[function(require,module,exports) {
"use strict";var e=t(require("./groups/edit"));function t(e){return e&&e.__esModule?e:{default:e}}var r=wp,u=r.blocks.registerBlockType,s=r.i18n.__;u("bp/groups",{title:s("Groups","buddypress"),description:s("BuddyPress Groups.","buddypress"),icon:{background:"#fff",foreground:"#d84800",src:"buddicons-groups"},category:"buddypress",attributes:{itemIDs:{type:"array",items:{type:"integer"},default:[]},avatarSize:{type:"string",default:"full"},displayGroupName:{type:"boolean",default:!0},extraInfo:{type:"string",default:"none"},layoutPreference:{type:"string",default:"list"},columns:{type:"number",default:2}},edit:e.default});
},{"./groups/edit":"Ccmh"}]},{},["jcTh"], null)
//# sourceMappingURL=/bp-groups/js/blocks/groups.js.map