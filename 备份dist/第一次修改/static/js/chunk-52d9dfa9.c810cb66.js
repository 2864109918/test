(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-52d9dfa9"],{1148:function(t,e,n){"use strict";var i=n("a691"),r=n("1d80");t.exports="".repeat||function(t){var e=String(r(this)),n="",a=i(t);if(a<0||a==1/0)throw RangeError("Wrong number of repetitions");for(;a>0;(a>>>=1)&&(e+=e))1&a&&(n+=e);return n}},"11e9":function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"bulletin"},[i("navBar",{staticClass:"navBg van-hairline--bottom",attrs:{arrow:2}},[i("p",{staticClass:"navTitle",attrs:{slot:"tabContent"},slot:"tabContent"},[t._v("通知公告")])]),t.bulletinList.length?i("div",{staticClass:"list"},[i("van-list",{attrs:{finished:t.finished,"finished-text":"没有更多了"},on:{load:t.onLoad},model:{value:t.loading,callback:function(e){t.loading=e},expression:"loading"}},t._l(t.bulletinList,(function(e,n){return i("div",{key:n,staticClass:"item ali-c"},[i("div",{staticClass:"info",on:{click:function(n){return t.toDetails(e.id)}}},[i("p",{staticClass:"text van-multi-ellipsis--l2"},[t._v(t._s(e.title))]),i("p",{staticClass:"time"},[t._v(t._s(e.createtime))])]),i("div",{staticClass:"img"},[i("img",{attrs:{src:e.image,alt:""}})])])})),0)],1):i("div",{staticClass:"none"},[i("img",{attrs:{src:n("35a7"),alt:""}}),i("p",[t._v("暂无通知公告哦~")])])],1)},r=[],a=(n("99af"),n("2909")),o=(n("2994"),n("2bdd")),c=n("2b0e"),s=n("268c"),l=n("fa7d"),u=n("fd03");c["a"].use(o["a"]);var d={name:"",components:{navBar:s["a"]},props:{},data:function(){return{bulletinList:[],page:0,pagesize:10,loading:!1,finished:!1}},watch:{},computed:{},methods:{getData:function(){var t=this;return Object(u["l"])({page:++this.page,pagesize:this.pagesize}).then((function(e){if(1==e.code)return t.bulletinList=[].concat(Object(a["a"])(t.bulletinList),Object(a["a"])(e.data.list)),e.data.list.length}))},onLoad:Object(l["a"])((function(){var t=this;this.getData().then((function(e){e<t.pagesize&&(t.finished=!0),t.loading=!1}))}),2e3),toDetails:function(t){this.$router.push({path:"/bulletinDetails/"+t})}},created:function(){this.getData()},mounted:function(){}},f=d,h=(n("fa58"),n("2877")),g=Object(h["a"])(f,i,r,!1,null,"328d7065",null);e["default"]=g.exports},"25f0":function(t,e,n){"use strict";var i=n("6eeb"),r=n("825a"),a=n("d039"),o=n("ad6d"),c="toString",s=RegExp.prototype,l=s[c],u=a((function(){return"/a/b"!=l.call({source:"a",flags:"b"})})),d=l.name!=c;(u||d)&&i(RegExp.prototype,c,(function(){var t=r(this),e=String(t.source),n=t.flags,i=String(void 0===n&&t instanceof RegExp&&!("flags"in s)?o.call(t):n);return"/"+e+"/"+i}),{unsafe:!0})},2909:function(t,e,n){"use strict";function i(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,i=new Array(e);n<e;n++)i[n]=t[n];return i}function r(t){if(Array.isArray(t))return i(t)}n.d(e,"a",(function(){return s}));n("a4d3"),n("e01a"),n("d28b"),n("a630"),n("d3b7"),n("3ca3"),n("ddb0");function a(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}n("fb6a"),n("b0c0"),n("25f0");function o(t,e){if(t){if("string"===typeof t)return i(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?i(t,e):void 0}}function c(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function s(t){return r(t)||a(t)||o(t)||c()}},2994:function(t,e,n){"use strict";n("68ef"),n("e3b3"),n("c0c2")},"2bdd":function(t,e,n){"use strict";var i=n("d282"),r=n("02de"),a=n("a8c1"),o=n("5fbe"),c=n("543e"),s=Object(i["a"])("list"),l=s[0],u=s[1],d=s[2];e["a"]=l({mixins:[Object(o["a"])((function(t){this.scroller||(this.scroller=Object(a["d"])(this.$el)),t(this.scroller,"scroll",this.check)}))],model:{prop:"loading"},props:{error:Boolean,loading:Boolean,finished:Boolean,errorText:String,loadingText:String,finishedText:String,immediateCheck:{type:Boolean,default:!0},offset:{type:[Number,String],default:300},direction:{type:String,default:"down"}},data:function(){return{innerLoading:this.loading}},updated:function(){this.innerLoading=this.loading},mounted:function(){this.immediateCheck&&this.check()},watch:{loading:"check",finished:"check"},methods:{check:function(){var t=this;this.$nextTick((function(){if(!(t.innerLoading||t.finished||t.error)){var e,n=t.$el,i=t.scroller,a=t.offset,o=t.direction;e=i.getBoundingClientRect?i.getBoundingClientRect():{top:0,bottom:i.innerHeight};var c=e.bottom-e.top;if(!c||Object(r["a"])(n))return!1;var s=!1,l=t.$refs.placeholder.getBoundingClientRect();s="up"===o?e.top-l.top<=a:l.bottom-e.bottom<=a,s&&(t.innerLoading=!0,t.$emit("input",!0),t.$emit("load"))}}))},clickErrorText:function(){this.$emit("update:error",!1),this.check()},genLoading:function(){var t=this.$createElement;if(this.innerLoading&&!this.finished)return t("div",{class:u("loading"),key:"loading"},[this.slots("loading")||t(c["a"],{attrs:{size:"16"}},[this.loadingText||d("loading")])])},genFinishedText:function(){var t=this.$createElement;if(this.finished){var e=this.slots("finished")||this.finishedText;if(e)return t("div",{class:u("finished-text")},[e])}},genErrorText:function(){var t=this.$createElement;if(this.error){var e=this.slots("error")||this.errorText;if(e)return t("div",{on:{click:this.clickErrorText},class:u("error-text")},[e])}}},render:function(){var t=arguments[0],e=t("div",{ref:"placeholder",class:u("placeholder")});return t("div",{class:u(),attrs:{role:"feed","aria-busy":this.innerLoading}},["down"===this.direction?this.slots():e,this.genLoading(),this.genFinishedText(),this.genErrorText(),"up"===this.direction?this.slots():e])}})},"35a7":function(t,e,n){t.exports=n.p+"static/img/c_record_empty@2x.b7a5ad3d.png"},"408a":function(t,e,n){var i=n("c6b6");t.exports=function(t){if("number"!=typeof t&&"Number"!=i(t))throw TypeError("Incorrect invocation");return+t}},"4df4":function(t,e,n){"use strict";var i=n("0366"),r=n("7b0b"),a=n("9bdd"),o=n("e95a"),c=n("50c4"),s=n("8418"),l=n("35a1");t.exports=function(t){var e,n,u,d,f,h,g=r(t),p="function"==typeof this?this:Array,v=arguments.length,b=v>1?arguments[1]:void 0,m=void 0!==b,y=l(g),x=0;if(m&&(b=i(b,v>2?arguments[2]:void 0,2)),void 0==y||p==Array&&o(y))for(e=c(g.length),n=new p(e);e>x;x++)h=m?b(g[x],x):g[x],s(n,x,h);else for(d=y.call(g),f=d.next,n=new p;!(u=f.call(d)).done;x++)h=m?a(d,b,[u.value,x],!0):u.value,s(n,x,h);return n.length=x,n}},"99af":function(t,e,n){"use strict";var i=n("23e7"),r=n("d039"),a=n("e8b5"),o=n("861d"),c=n("7b0b"),s=n("50c4"),l=n("8418"),u=n("65f0"),d=n("1dde"),f=n("b622"),h=n("2d00"),g=f("isConcatSpreadable"),p=9007199254740991,v="Maximum allowed index exceeded",b=h>=51||!r((function(){var t=[];return t[g]=!1,t.concat()[0]!==t})),m=d("concat"),y=function(t){if(!o(t))return!1;var e=t[g];return void 0!==e?!!e:a(t)},x=!b||!m;i({target:"Array",proto:!0,forced:x},{concat:function(t){var e,n,i,r,a,o=c(this),d=u(o,0),f=0;for(e=-1,i=arguments.length;e<i;e++)if(a=-1===e?o:arguments[e],y(a)){if(r=s(a.length),f+r>p)throw TypeError(v);for(n=0;n<r;n++,f++)n in a&&l(d,f,a[n])}else{if(f>=p)throw TypeError(v);l(d,f++,a)}return d.length=f,d}})},a630:function(t,e,n){var i=n("23e7"),r=n("4df4"),a=n("1c7e"),o=!a((function(t){Array.from(t)}));i({target:"Array",stat:!0,forced:o},{from:r})},a7b1:function(t,e,n){},b680:function(t,e,n){"use strict";var i=n("23e7"),r=n("a691"),a=n("408a"),o=n("1148"),c=n("d039"),s=1..toFixed,l=Math.floor,u=function(t,e,n){return 0===e?n:e%2===1?u(t,e-1,n*t):u(t*t,e/2,n)},d=function(t){var e=0,n=t;while(n>=4096)e+=12,n/=4096;while(n>=2)e+=1,n/=2;return e},f=s&&("0.000"!==8e-5.toFixed(3)||"1"!==.9.toFixed(0)||"1.25"!==1.255.toFixed(2)||"1000000000000000128"!==(0xde0b6b3a7640080).toFixed(0))||!c((function(){s.call({})}));i({target:"Number",proto:!0,forced:f},{toFixed:function(t){var e,n,i,c,s=a(this),f=r(t),h=[0,0,0,0,0,0],g="",p="0",v=function(t,e){var n=-1,i=e;while(++n<6)i+=t*h[n],h[n]=i%1e7,i=l(i/1e7)},b=function(t){var e=6,n=0;while(--e>=0)n+=h[e],h[e]=l(n/t),n=n%t*1e7},m=function(){var t=6,e="";while(--t>=0)if(""!==e||0===t||0!==h[t]){var n=String(h[t]);e=""===e?n:e+o.call("0",7-n.length)+n}return e};if(f<0||f>20)throw RangeError("Incorrect fraction digits");if(s!=s)return"NaN";if(s<=-1e21||s>=1e21)return String(s);if(s<0&&(g="-",s=-s),s>1e-21)if(e=d(s*u(2,69,1))-69,n=e<0?s*u(2,-e,1):s/u(2,e,1),n*=4503599627370496,e=52-e,e>0){v(0,n),i=f;while(i>=7)v(1e7,0),i-=7;v(u(10,i,1),0),i=e-1;while(i>=23)b(1<<23),i-=23;b(1<<i),v(1,1),b(2),p=m()}else v(0,n),v(1<<-e,0),p=m()+o.call("0",f);return f>0?(c=p.length,p=g+(c<=f?"0."+o.call("0",f-c)+p:p.slice(0,c-f)+"."+p.slice(c-f))):p=g+p,p}})},c0c2:function(t,e,n){},fa58:function(t,e,n){"use strict";var i=n("a7b1"),r=n.n(i);r.a},fa7d:function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return o}));n("99af"),n("b680"),n("d3b7"),n("25f0");var i=function(t,e){switch(e){case"notEmpty":return t&&t.length>0&&!/^\s/.test(t);case"phone":return/^(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8}$/.test(t);case"sixFigures":return/^\d{6}$/.test(t);case"idcard":return/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(t);case"name":return/^[\u4e00-\u9fa5]{2,4}$/.test(t);default:alert("函数type参数不匹配");break}},r=function(t,e){var n=Object.assign({type:"all",markFrot:"-",markBack:":"},e),i=new Date(t),r=i.getFullYear(),o=a(i.getMonth()+1),c=a(i.getDate()),s=a(i.getHours()),l=a(i.getMinutes()),u=a(i.getSeconds());switch(n.type){case"ymd":return"".concat(r).concat(n.markFrot).concat(o).concat(n.markFrot).concat(c);case"ymdhm":return"".concat(r).concat(n.markFrot).concat(o).concat(n.markFrot).concat(c," ").concat(s).concat(n.markBack).concat(l);default:return"".concat(r).concat(n.markFrot).concat(o).concat(n.markFrot).concat(c," ").concat(s).concat(n.markBack).concat(l).concat(n.markBack).concat(u)}},a=function(t){return t=t.toString(),t[1]?t:"0"+t},o=function(t){var e,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1e3;return function(){var i=this,r=arguments;e&&clearTimeout(e),e=setTimeout((function(){t.apply(i,r)}),n)}}},fb6a:function(t,e,n){"use strict";var i=n("23e7"),r=n("861d"),a=n("e8b5"),o=n("23cb"),c=n("50c4"),s=n("fc6a"),l=n("8418"),u=n("b622"),d=n("1dde"),f=n("ae40"),h=d("slice"),g=f("slice",{ACCESSORS:!0,0:0,1:2}),p=u("species"),v=[].slice,b=Math.max;i({target:"Array",proto:!0,forced:!h||!g},{slice:function(t,e){var n,i,u,d=s(this),f=c(d.length),h=o(t,f),g=o(void 0===e?f:e,f);if(a(d)&&(n=d.constructor,"function"!=typeof n||n!==Array&&!a(n.prototype)?r(n)&&(n=n[p],null===n&&(n=void 0)):n=void 0,n===Array||void 0===n))return v.call(d,h,g);for(i=new(void 0===n?Array:n)(b(g-h,0)),u=0;h<g;h++,u++)h in d&&l(i,u,d[h]);return i.length=u,i}})}}]);
//# sourceMappingURL=chunk-52d9dfa9.c810cb66.js.map