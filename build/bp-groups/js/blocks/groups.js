parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"NVR6":[function(require,module,exports) {
function e(e,o){(null==o||o>e.length)&&(o=e.length);for(var l=0,r=new Array(o);l<o;l++)r[l]=e[l];return r}module.exports=e,module.exports.default=module.exports,module.exports.__esModule=!0;
},{}],"XfJI":[function(require,module,exports) {
var r=require("./arrayLikeToArray.js");function e(e){if(Array.isArray(e))return r(e)}module.exports=e,module.exports.default=module.exports,module.exports.__esModule=!0;
},{"./arrayLikeToArray.js":"NVR6"}],"OMTj":[function(require,module,exports) {
function e(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}module.exports=e,module.exports.default=module.exports,module.exports.__esModule=!0;
},{}],"UyFj":[function(require,module,exports) {
var r=require("./arrayLikeToArray.js");function e(e,t){if(e){if("string"==typeof e)return r(e,t);var o=Object.prototype.toString.call(e).slice(8,-1);return"Object"===o&&e.constructor&&(o=e.constructor.name),"Map"===o||"Set"===o?Array.from(e):"Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)?r(e,t):void 0}}module.exports=e,module.exports.default=module.exports,module.exports.__esModule=!0;
},{"./arrayLikeToArray.js":"NVR6"}],"wFNi":[function(require,module,exports) {
function e(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}module.exports=e,module.exports.default=module.exports,module.exports.__esModule=!0;
},{}],"Fhqp":[function(require,module,exports) {
var e=require("./arrayWithoutHoles.js"),r=require("./iterableToArray.js"),o=require("./unsupportedIterableToArray.js"),u=require("./nonIterableSpread.js");function t(t){return e(t)||r(t)||o(t)||u()}module.exports=t,module.exports.default=module.exports,module.exports.__esModule=!0;
},{"./arrayWithoutHoles.js":"XfJI","./iterableToArray.js":"OMTj","./unsupportedIterableToArray.js":"UyFj","./nonIterableSpread.js":"wFNi"}],"OUZ9":[function(require,module,exports) {
function e(e){if(Array.isArray(e))return e}module.exports=e,module.exports.default=module.exports,module.exports.__esModule=!0;
},{}],"vKPt":[function(require,module,exports) {
function e(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var o=[],r=!0,l=!1,n=void 0;try{for(var u,d=e[Symbol.iterator]();!(r=(u=d.next()).done)&&(o.push(u.value),!t||o.length!==t);r=!0);}catch(i){l=!0,n=i}finally{try{r||null==d.return||d.return()}finally{if(l)throw n}}return o}}module.exports=e,module.exports.default=module.exports,module.exports.__esModule=!0;
},{}],"Rom6":[function(require,module,exports) {
function e(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}module.exports=e,module.exports.default=module.exports,module.exports.__esModule=!0;
},{}],"HETk":[function(require,module,exports) {
var e=require("./arrayWithHoles.js"),r=require("./iterableToArrayLimit.js"),o=require("./unsupportedIterableToArray.js"),t=require("./nonIterableRest.js");function u(u,s){return e(u)||r(u,s)||o(u,s)||t()}module.exports=u,module.exports.default=module.exports,module.exports.__esModule=!0;
},{"./arrayWithHoles.js":"OUZ9","./iterableToArrayLimit.js":"vKPt","./unsupportedIterableToArray.js":"UyFj","./nonIterableRest.js":"Rom6"}],"jS06":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.EXTRA_INFO=exports.GROUP_STATI=exports.AVATAR_SIZES=void 0;var e=wp,s=e.i18n.__,r=[{label:s("None","buddypress"),value:"none"},{label:s("Thumb","buddypress"),value:"thumb"},{label:s("Full","buddypress"),value:"full"}];exports.AVATAR_SIZES=r;var u={public:s("Public","buddypress"),private:s("Private","buddypress"),hidden:s("Hidden","buddypress")};exports.GROUP_STATI=u;var l=[{label:s("None","buddypress"),value:"none"},{label:s("Group's description","buddypress"),value:"description"},{label:s("Last time the group was active","buddypress"),value:"active"},{label:s("Amount of group members","buddypress"),value:"popular"}];exports.EXTRA_INFO=l;
},{}],"Ccmh":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=n(require("@babel/runtime/helpers/toConsumableArray")),t=n(require("@babel/runtime/helpers/slicedToArray")),r=require("./constants");function n(e){return e&&e.__esModule?e:{default:e}}var o=wp,s=o.blockEditor,a=s.InspectorControls,i=s.BlockControls,l=o.components,u=l.Placeholder,d=l.PanelBody,c=l.SelectControl,p=l.ToggleControl,m=l.Button,b=l.Dashicon,g=l.Tooltip,f=l.ToolbarGroup,v=l.RangeControl,y=o.compose.compose,h=o.data.withSelect,_=o.element,A=_.createElement,S=_.Fragment,C=_.useState,I=o.i18n,x=I.__,N=I.sprintf,k=I._n,T=o.apiFetch,G=o.url.addQueryArgs,P=bp.blockComponents.AutoCompleter,O=lodash,E=O.reject,R=O.remove,w=O.sortBy,D=function(e){return e&&e.status&&r.GROUP_STATI[e.status]?r.GROUP_STATI[e.status]:null},B=function(n){var o,s=n.attributes,l=n.setAttributes,y=n.isSelected,h=n.bpSettings.isAvatarEnabled,_=s.itemIDs,I=s.avatarSize,O=s.displayGroupName,B=s.extraInfo,q=s.layoutPreference,F=s.columns,j=0!==_.length,z=C([]),L=(0,t.default)(z,2),M=L[0],Q=L[1],U=[{icon:"text",title:x("List view","buddypress"),onClick:function(){return l({layoutPreference:"list"})},isActive:"list"===q},{icon:"screenoptions",title:x("Grid view","buddypress"),onClick:function(){return l({layoutPreference:"grid"})},isActive:"grid"===q}],V="bp-block-groups avatar-"+I,X=r.EXTRA_INFO;"grid"===q&&(V+=" is-grid columns-"+F,X=r.EXTRA_INFO.filter(function(e){return"description"!==e.value}));return j&&_.length!==M.length&&T({path:G("/buddypress/v1/groups",{populate_extras:!0,include:_})}).then(function(e){Q(w(e,[function(e){return _.indexOf(e.id)}]))}),M.length&&(o=M.map(function(e){var t=!1,r="group-content";return"list"===q&&"description"===B&&e.description&&e.description.rendered&&(t=!0,r="group-content has-description"),A("div",{key:"bp-group-"+e.id,className:r},y&&A(g,{text:x("Remove group","buddypress")},A(m,{className:"is-right",onClick:function(){var t;(t=e.id)&&-1!==_.indexOf(t)&&(Q(E(M,["id",t])),l({itemIDs:R(_,function(e){return e!==t})}))},label:x("Remove group","buddypress")},A(b,{icon:"no"}))),h&&"none"!==I&&A("div",{className:"item-header-avatar"},A("a",{href:e.link,target:"_blank"},A("img",{key:"avatar-"+e.id,className:"avatar",alt:N(x("Profile photo of %s","buddypress"),e.name),src:e.avatar_urls[I]}))),A("div",{className:"group-description"},O&&A("strong",null,A("a",{href:e.link,target:"_blank"},e.name)),t&&A("div",{className:"group-description-content",dangerouslySetInnerHTML:{__html:e.description.rendered}}),"active"===B&&e.last_activity&&e.last_activity_diff&&A("time",{dateTime:e.last_activity},N(x("Active %s","buddypress"),e.last_activity_diff)),"popular"===B&&e.total_member_count&&A("div",{className:"group-meta"},N(k("%1$d member","%1$d members",e.total_member_count,"buddypress"),e.total_member_count))))})),A(S,null,A(a,null,A(d,{title:x("Settings","buddypress"),initialOpen:!0},A(p,{label:x("Display the group's name","buddypress"),checked:!!O,onChange:function(){l({displayGroupName:!O})},help:x(O?"Include the group's name.":"Toggle to include group's name.","buddypress")}),h&&A(c,{label:x("Avatar size","buddypress"),value:I,options:r.AVATAR_SIZES,help:x('Select "None" to disable the avatar.',"buddypress"),onChange:function(e){l({avatarSize:e})}}),A(c,{label:x("Group extra information","buddypress"),value:B,options:X,help:x('Select "None" to show no extra information.',"buddypress"),onChange:function(e){l({extraInfo:e})}}),"grid"===q&&A(v,{label:x("Columns","buddypress"),value:F,onChange:function(e){return l({columns:e})},min:2,max:4,required:!0}))),A(i,null,A(f,{controls:U})),j&&A("div",{className:V},o),(y||0===_.length)&&A(u,{icon:j?"":"groups",label:j?"":x("BuddyPress Groups","buddypress"),instructions:x("Start typing the name of the group you want to add to the groups list.","buddypress"),className:0!==_.length?"is-appender":"is-large"},A(P,{component:"groups",objectQueryArgs:{show_hidden:!1,exclude:_},slugValue:D,ariaLabel:x("Group's name","buddypress"),placeholder:x("Enter Group's name here…","buddypress"),onSelectItem:function(t){var r=t.itemID;r&&-1===_.indexOf(r)&&l({itemIDs:[].concat((0,e.default)(_),[parseInt(r,10)])})},useAvatar:h})))},q=y([h(function(e){return{bpSettings:e("core/editor").getEditorSettings().bp.groups||{}}})])(B),F=q;exports.default=F;
},{"@babel/runtime/helpers/toConsumableArray":"Fhqp","@babel/runtime/helpers/slicedToArray":"HETk","./constants":"jS06"}],"jcTh":[function(require,module,exports) {
"use strict";var e=t(require("./groups/edit"));function t(e){return e&&e.__esModule?e:{default:e}}var r=wp,s=r.blocks.registerBlockType,u=r.i18n.__;s("bp/groups",{title:u("Groups","buddypress"),description:u("BuddyPress Groups.","buddypress"),icon:"buddicons-groups",category:"buddypress",attributes:{itemIDs:{type:"array",items:{type:"integer"},default:[]},avatarSize:{type:"string",default:"full"},displayGroupName:{type:"boolean",default:!0},extraInfo:{type:"string",default:"none"},layoutPreference:{type:"string",default:"list"},columns:{type:"number",default:2}},edit:e.default});
},{"./groups/edit":"Ccmh"}]},{},["jcTh"], null)