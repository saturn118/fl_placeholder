(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{75557:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(88052)}])},88052:function(e,t,n){"use strict";n.r(t),n.d(t,{__N_SSG:function(){return He},default:function(){return We}});var r=n(85893),i=n(67294),l=n(81645),a=n(51575),s=n(34051),o=n.n(s),c=n(14957),d=n(98456),u=n(9581),h=n(86886),x=n(44612),m=n(78262),f=n(82175),p=n(11163),v=n(68181);function j(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function g(e,t,n,r,i,l,a){try{var s=e[l](a),o=s.value}catch(c){return void n(c)}s.done?t(o):Promise.resolve(o).then(r,i)}function y(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function b(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,i,l=[],a=!0,s=!1;try{for(n=n.call(e);!(a=(r=n.next()).done)&&(l.push(r.value),!t||l.length!==t);a=!0);}catch(o){s=!0,i=o}finally{try{a||null==n.return||n.return()}finally{if(s)throw i}}return l}}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return j(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return j(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function w(e){var t=e.label,n=void 0===t?"No Label Provided":t,s=e.entityId,o=void 0===s?null:s,u=e.entityType,h=void 0===u?null:u,x=(0,i.useRef)(null),m=(0,i.useState)(!1),f=m[0],p=m[1],v=(0,i.useState)(null),j=v[0],g=v[1],y=(0,i.useState)(null),w=y[0],k=y[1],S=(0,i.useState)(!1),C=S[0],T=S[1];(0,i.useEffect)((function(){var e=new IntersectionObserver((function(e){b(e,1)[0].isIntersecting&&((0,l.r8)()&&0==C?(0,a.H3)(o,h).then((function(e){console.log("Retrieved user vote data for "+h),console.log(e),e.rating&&(g(e.rating.rating),k(e.rating.reviewText)),T(!0)})):T(!0))}));return e.observe(x.current),function(){return e.disconnect()}}),[]);var A=null;return A=0==C?(0,r.jsx)(d.Z,{}):j?(0,r.jsxs)(r.Fragment,{children:[" ",(0,r.jsx)(c.Z,{sx:{color:"#1976d2"}})," ",j," / 5"]}):(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(c.Z,{sx:{color:"#1976d2"}})," Rate"]}),(0,r.jsxs)("div",{ref:x,children:[(0,r.jsx)("a",{onClick:function(e){p(!f)},children:A}),(0,r.jsx)(N,{entityId:o,ratingValue:j,setRatingValue:g,reviewText:w,entityType:h,ratedLabel:n,open:f,onClose:function(e){p(!1)}})]})}function N(e){var t=e.onClose,n=(e.selectedValue,e.ratedLabel),s=e.open,c=e.setRatingValue,d=e.ratingValue,j=e.reviewText,b=e.entityId,w=e.entityType,N=((0,p.useRouter)(),(0,i.useState)(d)),k=N[0],S=N[1],C=(0,i.useState)(!1),T=(C[0],C[1],250),A=(0,f.TA)({initialValues:{review:""},onSubmit:function(){var e,t=(e=o().mark((function e(t){return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if((0,l.vS)("Sign in to leave a review")){e.next=2;break}return e.abrupt("return");case 2:b&&(0,a._Z)(b,w,k,A.values.review)&&c(k);case 3:case"end":return e.stop()}}),e)})),function(){var t=this,n=arguments;return new Promise((function(r,i){var l=e.apply(t,n);function a(e){g(l,r,i,a,s,"next",e)}function s(e){g(l,r,i,a,s,"throw",e)}a(void 0)}))});return function(e){return t.apply(this,arguments)}}()});return 0==d&&"-",(0,r.jsx)(m.Z,{onClose:function(){t()},open:s,maxWidth:"sm",fullWidth:!0,children:(0,r.jsxs)(u.Z,{style:{alignItems:"center"},children:[(0,r.jsxs)(h.ZP,{container:!0,className:"rating-star",children:[(0,r.jsx)(h.ZP,{item:!0,xs:12,children:(0,r.jsx)(v.Z,{size:3,children:n})}),(0,r.jsx)(h.ZP,{item:!0,xs:12,children:(0,r.jsx)(x.Z,{name:"hover-feedback",size:"large",max:5,value:k,onChange:function(e,t){S(t)}})})]}),function(){var e;return(0,r.jsx)("div",{children:(0,r.jsxs)("form",{onSubmit:A.handleSubmit,children:[(0,r.jsxs)("p",{children:[A.values.review.length," / ",T]}),(0,r.jsxs)("li",{children:[(0,r.jsx)("input",(e={type:"text",placeholder:"Type here",className:"input input-bordered w-full max-w-xs",id:"review"},y(e,"type","text"),y(e,"placeholder","Leave an optional text review"),y(e,"value",A.values.review),y(e,"onChange",A.handleChange),e)),(0,r.jsx)("p",{children:j})]}),(0,r.jsx)("div",{className:"form-control",children:(0,r.jsxs)("label",{className:"label cursor-pointer",children:[(0,r.jsx)("span",{className:"label-text",children:"Review Cotains Spoilers"}),(0,r.jsx)("input",{type:"checkbox",className:"toggle toggle-primary"})]})}),(0,r.jsx)("li",{children:(0,r.jsx)("button",{type:"submit",className:"btn btn-wide",children:"Submit/Update Review"})})]})})}()]})})}var k=n(26447),S=n(81458),C=n(55113),T=n(42151),A=n(41664),Z=n.n(A);function E(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function D(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,i,l=[],a=!0,s=!1;try{for(n=n.call(e);!(a=(r=n.next()).done)&&(l.push(r.value),!t||l.length!==t);a=!0);}catch(o){s=!0,i=o}finally{try{a||null==n.return||n.return()}finally{if(s)throw i}}return l}}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return E(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return E(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}(0,T.ZP)(C.Z)((function(e){var t=e.theme;return{padding:t.spacing(0),textAlign:"center",color:t.palette.text.secondary}}));function R(e){e.initialUserVote;var t=e.initialTotalVotes,n=void 0===t?0:t,l=(e.boutId,e.voteData),a=void 0===l?null:l,s=e.label,o=void 0===s?null:s,c=e.goToLink,d=D(i.useState(0),2),u=(d[0],d[1]),h=D(i.useState(!1),2),m=h[0],f=h[1];(0,p.useRouter)();(0,i.useEffect)((function(){u(n)}),[n]),(0,i.useEffect)((function(){u(n)}),[]);var v=0,j=0;return console.log(a),a&&a.ratingValue&&(v=a.ratingValue.toFixed(1),j=a.totalVotes),(0,r.jsxs)(k.Z,{children:[(0,r.jsx)("div",{onClick:function(){f(!0)},children:(0,r.jsx)("a",{children:(0,r.jsx)("li",{children:(0,r.jsx)("div",{children:(0,r.jsxs)("div",{children:[(0,r.jsxs)("div",{className:"flex",children:[(0,r.jsx)(x.Z,{name:"read-only",value:5,max:1,readOnly:!0}),(0,r.jsx)("div",{className:"p-1 text-center",children:(0,r.jsxs)("p",{className:"font-bold",style:{fontSize:"1.1rem",lineHeight:"0.8rem"},children:[v," "]})})]}),(0,r.jsxs)("p",{style:{fontSize:"0.6rem"},children:[j," votes "]})]})})})})}),m&&(0,r.jsx)(U,{ratedLabel:o,voteData:a,open:m,onClose:function(e){f(!1)},goToLink:c}),(0,r.jsx)("input",{type:"checkbox",id:"my-modal",className:"modal-toggle"}),(0,r.jsx)("div",{className:"modal",children:(0,r.jsxs)("div",{className:"modal-box",children:[(0,r.jsx)("h3",{className:"font-bold text-lg",children:"Congratulations random Internet user!"}),(0,r.jsx)("p",{className:"py-4",children:"You've been selected for a chance to get one year of subscription to use Wikipedia for free!"}),(0,r.jsx)("div",{className:"modal-action",children:(0,r.jsx)("label",{for:"my-modal",className:"btn",children:"Yay!"})})]})})]})}function I(e){return[5,4,3,2,1].map((function(t){var n,i,l=0;return e&&e.breakdown&&t.toString()in e.breakdown&&(l=(l=e.breakdown[t.toString()].quantity/e.totalVotes*100).toFixed(0)),(0,r.jsx)(r.Fragment,{children:(n=t.toString()+" star",i=l,(0,r.jsxs)("div",{className:"flex items-center mt-1",children:[(0,r.jsx)("div",{className:" w-1/5 customAccentText",children:(0,r.jsx)("span",{children:n})}),(0,r.jsx)(S.Z,{variant:"determinate",sx:{width:200,height:8},value:i}),(0,r.jsx)("div",{className:"w-1/5 text-gray-700 pl-3",children:(0,r.jsxs)("span",{className:"text-sm",children:[i,"%"]})})]}))})}))}function O(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,i=I(e),l=0,a=0;e&&e.ratingValue&&(l=e.ratingValue,a=e.totalVotes);var s=null;return n&&(s=(0,r.jsx)(Z(),{href:n,children:(0,r.jsx)("a",{children:(0,r.jsx)("button",{className:"btn",children:" View All Reviews "})})})),(0,r.jsxs)("div",{className:" ",children:[(0,r.jsxs)("div",{className:"mb-1 tracking-wide px-4 py-4",children:[(0,r.jsxs)("h2",{className:"text-gray-800 font-semibold mt-1",children:[l," out of 5"]}),(0,r.jsxs)("h2",{className:"text-gray-800 font-semibold mt-1",children:[a," Users reviews ttt"]}),(0,r.jsx)("div",{className:"border-b -mx-8 px-8 pb-3",children:i})]}),s]})}function U(e){var t=e.onClose,n=e.ratedLabel,l=e.goToLink,a=e.open,s=e.voteData,o=(0,i.useState)(0),c=o[0],d=o[1];return 0==c&&"-",console.log("lalalala"),console.log(s),(0,r.jsx)(m.Z,{onClose:function(){t(),d(0)},open:a,fullWidth:!0,children:(0,r.jsx)(u.Z,{style:{alignItems:"center"},children:O(s,n,l)})})}var L=function(e){var t=e.bout,n=t.fighterData[t.fighterAId],i=t.fighterData[t.fighterBId];return(0,r.jsxs)("div",{className:"w-full flex space-x-2 p-2 "+l.CS,children:[(0,r.jsxs)("div",{className:"flex space-x-5 w-2/12",children:[(0,r.jsx)(R,{boutId:t.id,goToLink:"/bout/"+t.id}),(0,r.jsx)(w,{entityId:t.id,entityType:"bout"})]}),(0,r.jsx)("p",{className:" text-center",children:n.name}),(0,r.jsx)("p",{children:"vs"}),(0,r.jsx)("p",{className:" text-center",children:i.name}),(0,r.jsxs)("p",{children:["(",t.timestamp,")"]})]})},F=n(69661),M=n(83984);function P(e){var t=null;if(e){var n=e.toLowerCase();("sct"==n||"en"==n||"wa"==n)&&(n="gb"),t="".concat("https://flagcdn.com/").concat(n,".svg")}else t=null;return t}function B(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:120,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,i=.6*t,l=(0,r.jsx)(F.Z,{className:"customShadow",variant:"rounded",sx:{width:t,height:i},src:P(e)});return n?(0,r.jsx)(M.Z,{title:e,enterDelay:500,leaveDelay:200,children:l}):l}var V=n(9008),z=n.n(V),_=function(e){var t=e.title,n=e.keywords,i=e.description;return(0,r.jsxs)(z(),{children:[(0,r.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),(0,r.jsx)("meta",{name:"keywords",content:n}),(0,r.jsx)("meta",{name:"description",content:i}),(0,r.jsx)("meta",{charSet:"utf-8"}),(0,r.jsxs)("title",{children:[t," | ",l.pB]})]})};_.defaultProps={title:l.fC+" - The Home of Martial Arts Data",keywords:"bjj fight legacy mma boxing fight legacy record martial art",description:"Fight record keeping, teaching materials, events and fighter profiles."};var H=_,W=n(14603),G=n(36111),q=n(91811),Y=n(40470),J=n(64459),K=n(87918),$=n(83321),Q=n(40044),X=n(11703),ee=n(14564),te=n(15861);function ne(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function re(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,i,l=[],a=!0,s=!1;try{for(n=n.call(e);!(a=(r=n.next()).done)&&(l.push(r.value),!t||l.length!==t);a=!0);}catch(o){s=!0,i=o}finally{try{a||null==n.return||n.return()}finally{if(s)throw i}}return l}}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return ne(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return ne(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function ie(e){var t=e.popupContent,n=void 0===t?null:t,l=e.anchorHorizontalCustom,a=void 0===l?"left":l,s=e.anchorVerticalCustom,o=void 0===s?"bottom":s,c=e.children,d=re(i.useState(null),2),u=d[0],h=d[1],x=function(){h(null)},m=Boolean(u);return(0,r.jsxs)("div",{children:[(0,r.jsx)(te.Z,{"aria-owns":m?"mouse-over-popover":void 0,"aria-haspopup":"true",onMouseEnter:function(e){h(e.currentTarget)},onMouseLeave:x,children:c}),(0,r.jsx)(ee.ZP,{transitionDuration:500,id:"mouse-over-popover",sx:{pointerEvents:"none"},open:m,anchorEl:u,anchorOrigin:{vertical:"top",horizontal:"left"},transformOrigin:{vertical:o,horizontal:a},onClose:x,disableRestoreFocus:!0,children:n})]})}var le=n(22961),ae=n(72450),se=function(e,t){return(0,r.jsx)("div",{onClick:e,children:(0,r.jsx)(M.Z,{title:"Hide fight results on this page",enterDelay:500,leaveDelay:200,children:(0,r.jsxs)("div",{className:"text-white",children:[(0,r.jsx)("li",{children:"Spoilers"}),(0,r.jsx)("li",{children:t?(0,r.jsx)(ae.Z,{className:"event-fab-icon"}):(0,r.jsx)(le.Z,{className:"event-fab-icon"})})]})})})},oe=n(41733),ce=n(77957),de=n(10105),ue=n(57976),he=n(93419),xe=n(55819);(0,T.ZP)(C.Z)((function(e){var t=e.theme;return{padding:t.spacing(0),textAlign:"center",color:t.palette.text.secondary}}));var me=n(11986);function fe(e){var t=e.handleDelete,n=e.handleReport,l=e.isCurrentUser,a=void 0!==l&&l,s=(0,i.useState)(null),o=s[0],c=s[1],d=Boolean(o),u=function(){c(null)};return(0,r.jsxs)("div",{children:[(0,r.jsx)($.Z,{id:"demo-positioned-button","aria-controls":d?"demo-positioned-menu":void 0,"aria-haspopup":"true","aria-expanded":d?"true":void 0,onClick:function(e){c(e.currentTarget)},children:(0,r.jsx)(ue.Z,{})}),(0,r.jsxs)(he.Z,{id:"demo-positioned-menu","aria-labelledby":"demo-positioned-button",anchorEl:o,open:d,onClose:u,anchorOrigin:{vertical:"bottom",horizontal:"left"},transformOrigin:{vertical:"top",horizontal:"left"},children:[a&&(0,r.jsxs)(xe.Z,{onClick:function(){t(),u()},children:[(0,r.jsx)(oe.Z,{}),"Delete"]}),a&&(0,r.jsxs)(xe.Z,{onClick:function(){u()},children:[(0,r.jsx)(ce.Z,{}),"Edit"]}),!a&&(0,r.jsxs)(xe.Z,{onClick:function(){n(),u()},children:[(0,r.jsx)(de.Z,{})," Report"]})]})]})}function pe(e){var t=e.entry,n=e.likesData,s=e.username,o=e.router,c=e.pendingReplyMap,d=e.setPendingReplyMap,u=e.setMyReplyText,h=e.myReplyText,x=e.setMyPostText,m=e.myPostText,f=e.showReplies,p=e.hideSpoilers,v=(0,i.useState)(!1),j=v[0],g=v[1],y=(0,r.jsxs)("div",{className:"w-12/12 flex border-t-2 border-blue-500 pt-2",children:[(0,r.jsx)("input",{type:"text",placeholder:"Add a comment",className:"input input-bordered input-lg w-full rounded",value:t.id in c?c[t.id]:"",onChange:function(e){var n=e.target.value;if(1!=n.length){var r=c;c[t.id]=n,d(r),u(!h)}else(0,l.vS)("Sign in to post a comment")}})," ",(0,r.jsx)("button",{className:"btn customAccentBackground text-white",onClick:function(){if((0,l.vS)("Sign in to post a comment")&&t.id in c){var e=c[t.id];""!=e&&(0,a.sq)(e,!1,t.id).then((function(e){1==e.success&&(console.log("Reply Added"),x(!m),g(!1))}))}},children:"Post"})]}),b=(0,r.jsx)(q.Z,{});t.id in n&&(b=(0,r.jsx)(G.Z,{color:"error"}));var w=t.textContent;1==t.spoilers&&p&&(w="Spoilers Hidden");var N=t.replycount?t.replycount:0,k=t.replies&&f?t.replies.replies.map((function(e){return(0,r.jsx)(pe,{hideSpoilers:p,entry:e,likesData:n,username:s,router:o,pendingReplyMap:c,setPendingReplyMap:d,setMyReplyText:u,myReplyText:h,setMyPostText:x,myPostText:m})})):null,S=t.originUrl=="/user/"+s,C=(0,r.jsxs)("div",{className:"bg-gray-300 w-full p-2 flex rounded border-b-2 border-blue-500",children:[(0,r.jsx)("div",{className:"w-2/12 border-r-2 border-blue-500 px-5 pt-2",children:(0,r.jsx)(F.Z,{variant:"rounded",sx:{width:75,height:75},src:l.ti+t.originImage,width:100})}),(0,r.jsxs)("div",{className:"pl-5 w-full ",children:[(0,r.jsxs)("div",{className:"flex ",children:[(0,r.jsxs)("div",{className:"w-11/12",children:[(0,r.jsx)(ie,{anchorHorizontalCustom:"center",popupContent:(0,r.jsxs)("div",{className:"flex p-4 w-12/12",children:[(0,r.jsx)(F.Z,{variant:"rounded",sx:{width:200,height:200},src:l.ti+t.originImage}),(0,r.jsxs)("div",{className:"p-5",children:[" ",(0,r.jsx)("p",{children:t.name}),(0,r.jsx)(K.Z,{label:t.originEntity,color:"primary"})]})]}),children:(0,r.jsx)(Z(),{href:t.originUrl,children:(0,r.jsxs)("a",{className:"customAccentText font-bold hover:link",children:[" ",t.name]})})}),(0,r.jsx)("p",{children:(0,a.BR)(t.timestamp)})]}),(0,r.jsx)(fe,{handleDelete:function(){(0,a.S8)(t.id).then((function(e){1==e.success&&(0,a.qW)().then((function(e){console.log("FEED DEBUG"),console.log(e),setFeedData(e.data.feed)}))}))},handleReport:null,isCurrentUser:S})]}),(0,r.jsxs)("p",{className:"mt-3 pr-10",children:[" ",w]}),t.targetUrl&&(0,r.jsx)(Z(),{href:t.targetUrl,children:(0,r.jsx)($.Z,{className:"link",children:"View"})}),t.imageUrl&&(0,r.jsx)(F.Z,{variant:"rounded",sx:{width:300,height:300},src:l.ti+t.imageUrl}),(0,r.jsxs)("div",{className:"flex w-full space-x-10 mt-3",children:[(0,r.jsxs)($.Z,{className:"text-black",onClick:function(e){if((0,l.vS)("Sign in to like content")){var r=n,i=null;t.id in r?(console.log("Deleting like"),delete r[t.id],i=!1):(console.log("Adding like"),r[t.id]=null,i=!0),(0,a.UG)(t.id,i).then((function(e){console.log("Danny likey"),(0,a.qW)().then((function(e){console.log("FEED DEBUG"),console.log(e),setFeedData(e.data.feed)}))})),setLikesData(null),setLikesData(r)}},children:[b," 0 Likes"]})," ",(0,r.jsxs)($.Z,{className:"text-black",children:[" ",(0,r.jsx)(W.Z,{})," View ",N," Comments"]}),(0,r.jsxs)($.Z,{className:"text-black",onClick:function(){g(!j)},children:[(0,r.jsx)(J.Z,{})," Reply"]}),(0,r.jsxs)($.Z,{className:"text-black",onClick:function(){o.push("/posts/"+t.id)},children:[" ",(0,r.jsx)(Y.Z,{})," Link"]})]}),j&&y]})]});return(0,r.jsxs)("div",{children:[C,(0,r.jsx)("div",{className:"pl-10",children:k})]})}function ve(e){var t=e.feedOwnerUsername,n=void 0===t?null:t,s=e.inputFeedData,o=void 0===s?null:s,c=e.showReplies,d=void 0!==c&&c,u=e.displayFilters,h=void 0!==u&&u,x=(0,p.useRouter)(),m=(0,i.useState)("all"),f=m[0],v=m[1],j=(0,i.useState)(null),g=j[0],y=j[1],b=(0,i.useState)({}),w=b[0],N=b[1],k=(0,i.useState)(null),S=(k[0],k[1],(0,i.useState)(null)),C=S[0],T=S[1],A=(0,i.useState)([]),Z=A[0],E=A[1],D=(0,i.useState)({}),R=D[0],I=D[1],O=(0,i.useState)(!1),U=O[0],L=O[1],M=(0,i.useState)(""),P=M[0],B=M[1],V=(0,i.useState)(!0),z=V[0],_=V[1];(0,i.useEffect)((function(){}),[R]),(0,i.useEffect)((function(){_((0,l.Kj)(n||(0,l.Uf)())),B((0,l.Uf)()),o?E(o):(0,a.qW)().then((function(e){console.log("FEED DEBUG"),console.log(e),E(e.data.feed)})),(0,l.r8)()&&(0,a.my)().then((function(e){console.log("LIKES DEBUG"),console.log(e.data),I(e.data)}))}),[]);var H=null;Z&&(H=Z.filter((function(e){return"all"==f||e.originEntity===f})).map((function(e){return(0,r.jsx)(pe,{hideSpoilers:U,entry:e,likesData:R,username:P,router:x,pendingReplyMap:w,setPendingReplyMap:N,setMyReplyText:T,myReplyText:C,setMyPostText:y,myPostText:g,showReplies:d})})));var W=[["all","all"],["Fights","Athlete"],["Events","event"],["Promoters","Promoter"],["Techniques","Martial Art Position"],["Rankings","rank"],["Community","Community Member"],["Announcements","website"]].map((function(e){return(0,r.jsx)(Q.Z,{label:e[0],value:e[1]})}));return(0,r.jsxs)("div",{className:"space-y-2",children:[z&&(0,r.jsxs)("div",{className:"bg-gray-400 rounded p-2",children:[(0,r.jsxs)("div",{className:"flex ",children:[(0,r.jsx)(F.Z,{sx:{width:75,height:75},src:l.ti+"dfsf.jpg",width:100}),(0,r.jsx)("input",{type:"text",placeholder:"Share an update with your followers",className:"input input-bordered input-lg w-full",value:g,onChange:function(e){y(e.target.value)}})," ",se((function(){L(!U)}),U)]}),(0,r.jsx)("button",{disabled:""==g,onClick:function(e){(0,a.sq)(g,!1).then((function(e){1==e.success&&((0,a.qW)().then((function(e){console.log("FEED DEBUG"),console.log(e),E(e.data.feed)})),y(""))}))},className:"btn w-full customAccentBackground",children:"Post"})]}),h&&(0,r.jsx)("div",{className:"",children:(0,r.jsx)(X.Z,{variant:"scrollable",scrollButtons:"auto","aria-label":"scrollable auto tabs example",value:f,onChange:function(e,t){v(t)},children:W})}),(0,r.jsxs)(me.Vr,{children:[(0,r.jsx)("div",{children:H}),0==H.length&&(0,r.jsxs)("p",{className:" text-center space-y-5",children:[(0,r.jsx)("p",{className:"",children:"No posts founds"}),(0,r.jsxs)("p",{children:["Follow ",f,"s on ",l.pB," see more"]})]})]},f)]},Object.keys(R).length)}function je(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var ge=function(e){var t=e.sideContent,n=void 0===t?null:t,i=e.mainContent,a=void 0===i?null:i;je(e,["sideContent","mainContent"]);return(0,r.jsxs)("div",{className:"flex w-full min-h-screen containerNavBar",children:[(0,r.jsx)("div",{className:"w-8/12 py-10",children:a}),(0,r.jsx)("div",{className:" w-4/12  py-10"+l.CS,children:n})]})},ye=n(30719),be=(n(21082),n(11972),n(36797),n(8701)),we=(n(13352),function(e){var t=e.inputData,n=void 0===t?[]:t,i=e.timeDelayMs,l=void 0===i?5e3:i,a=e.discrete,s=void 0===a||a,o=e.perView,c=void 0===o?4:o,d=e.loop,u=void 0!==d&&d,h=e.direction,x=void 0===h?"horizontal":h;return(0,r.jsx)(ye.tq,{showsPagination:!1,direction:x,spaceBetween:50,slidesPerView:c,loop:u,freeMode:!s,pagination:{clickable:!0,el:null},navigation:!1,autoplay:{delay:l,disableOnInteraction:!1},modules:[be.W_,be.pt,be.rj,be.tl],className:"mySwiper w-full",children:n.map((function(e){return(0,r.jsx)(ye.o5,{children:e})}))})}),Ne=n(64871),ke=n(94020);function Se(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:120,n="/belts/"+e+".png";return(0,r.jsx)("img",{className:"",width:t,src:n})}var Ce=n(76128);function Te(e){var t=e.targetLink,n=void 0===t?"":t,i=e.width,l=void 0===i?150:i,a=e.height,s=void 0===a?150:a,o=e.imageUrl,c=e.label1,d=e.round;return void 0!==d&&d&&"",(0,r.jsx)("div",{children:(0,r.jsx)(Z(),{href:n,children:(0,r.jsx)("div",{children:(0,r.jsx)("a",{children:(0,r.jsx)(Ce.E.button,{whileHover:{scale:1.04,transition:{duration:.2}},whileTap:{scale:.9},children:(0,r.jsxs)("div",{className:"customShadow relative ",children:[(0,r.jsx)(F.Z,{className:"hover:brightness-90 brightness-50 transition duration-500 ease-in-out",variant:"rounded",sx:{width:l,height:s},src:o}),(0,r.jsx)("div",{className:" pointer-events-none w-full technique-overlay-label-central inset-y-1/2 flex justify-center ",children:(0,r.jsx)(v.Z,{textColor:"text-white text-center",size:6,children:c.toUpperCase()})})]})})})})})})}function Ae(e){var t=e.targetLink,n=void 0===t?"":t,i=e.width,l=void 0===i?150:i,a=e.height,s=void 0===a?150:a,o=e.imageUrl,c=e.label1,d=e.label2,u=(e.label3,e.round),h=function(){return(0,r.jsx)("div",{children:(0,r.jsxs)("a",{children:[" ",(0,r.jsx)(Ce.E.button,{whileHover:{scale:1.08,transition:{duration:.2}},whileTap:{scale:.9},children:(0,r.jsxs)("div",{className:"relative customShadow",children:[(0,r.jsx)(F.Z,{variant:"rounded",sx:{width:l,height:s},src:o}),(0,r.jsx)("div",{className:"technique-overlay-label customOverlayBackground customShadow rounded",children:(0,r.jsxs)("p",{className:"overflow-hidden",children:[" ",d]})}),(0,r.jsx)("div",{className:"flex ",children:(0,r.jsx)("div",{className:"w-full trimBackground overflow-hidden",children:c})})]})})]})})};return void 0!==u&&u&&"",n?(0,r.jsx)("div",{className:"",children:(0,r.jsx)(Z(),{href:n,children:h()})}):(0,r.jsx)("div",{className:"",children:h()})}function Ze(e){var t=e.title,n=void 0===t?"TITLE_PLACEHOLDER":t,i=e.description,l=void 0===i?"DESCRIPTION PLACEHOLDER TACO TACO DANNY BOY HELLO":i,a=e.flip,s=void 0!==a&&a,o=e.link,c=void 0===o?null:o,d=e.tiles,u=void 0===d?[]:d,h=e.overrideTiles,x=void 0!==h&&h,m=(0,r.jsxs)("div",{className:"w-4/12  p-5 text-2xl space-y-3",children:[(0,r.jsx)("p",{children:l}),(0,r.jsx)("div",{children:c&&(0,r.jsx)(Z(),{href:c,children:(0,r.jsx)("a",{className:"customAccentText link",children:"See All"})})})]}),f=(0,r.jsxs)("div",{className:"w-8/12 ",children:[!x&&(0,r.jsx)("div",{className:"flex space-x-2 ",children:u.filter((function(e){return null!=e})).map((function(e){return e?(0,r.jsx)(Ae,{width:200,height:200,imageUrl:e.img,label1:e.name,label2:e.subName,targetLink:e.link}):null})).slice(0,4)}),x&&u]});if(s){var p=f;f=m,m=p}return(0,r.jsxs)("section",{className:"my-20",children:[(0,r.jsx)(v.Z,{showArrow:!1,showBar:!0,size:2,children:n}),(0,r.jsxs)("div",{className:"flex space-x-10",children:[m,f]})]})}function Ee(e){var t=e.alternative,n=void 0!==t&&t,l=(0,i.useState)(["Draw","Split Decision","No Contest","Undefeated vs Undefeated","Title Fight","Unification Title Fight","Rear Naked Choke","One Strike KO","Doctor's Stoppage","Trilogy Fight","Light Heavyweight","Corner Towel Stoppage","Broken Bone","Retirement Fight","Saved By the Bell","Early Referee Stoppage","Last Second Finish","Kneebar Finish","Comeback","Fight of the Night","Disqualificaton","Fake Glove Touch","2010 - 2014","CANADA","Female"]),a=l[0],s=l[1];return(0,i.useEffect)((function(){var e=a;n&&(e=["Longest Win Streak","Longest Active Win Streak","Most Wins","Most Fights","Fastest Knockout","Fastest Submission","Most Draws","Tallest","Longest Reach","Oldest Champions","Most Decisions","Most Championship Wins","Most Losses"]);var t=e.sort((function(){return.5-Math.random()}));s(t)}),[]),(0,r.jsx)("div",{className:"flexwrap space-x-2",children:a.map((function(e){return(0,r.jsx)("p",{className:"customShadow font-bold px-5 py-2 mt-2 hover:bg-blue-100 hover:text-black customAccentBackground text-white",children:e.toUpperCase()})}))})}var De=n(36315),Re=n(88078),Ie=n(50635),Oe=n(26462),Ue=n(83977),Le=n(53059),Fe=(0,Ue.ZF)({apiKey:"AIzaSyCEpfwQceSdZJIaY6CYS0rLawE9W8UDNf0",authDomain:"fightl.firebaseapp.com",projectId:"fightl",storageBucket:"fightl.appspot.com",messagingSenderId:"129170786205",appId:"1:129170786205:web:3489cae5f9c00e2a1ad174",measurementId:"G-5JKYQ05GE4"}),Me=(0,Oe.ad)(Fe),Pe=null;Fe.name&&(Pe=(0,Le.IH)(Fe));n(58913),n(34816),n(43815),n(19264),Math.PI;var Be=n(22004);function Ve(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function ze(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,i,l=[],a=!0,s=!1;try{for(n=n.call(e);!(a=(r=n.next()).done)&&(l.push(r.value),!t||l.length!==t);a=!0);}catch(o){s=!0,i=o}finally{try{a||null==n.return||n.return()}finally{if(s)throw i}}return l}}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return Ve(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return Ve(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _e(e){var t=e.statsData,n=void 0===t?null:t,a=e.landingData,s=void 0===a?null:a,o=function(e){if(console.log("IMAGE "),console.log(e),e&&!l.WI&&e.includes("/")){var t=e.split("/");return t[t.length-1]}return e},c=function(){return(0,r.jsxs)("div",{children:[(0,r.jsx)(De.Z,{id:"outlined-basic",variant:"outlined",className:"clickupShadow w-10/12 min-h-[50px] ",label:"Enter your Email",type:"email",value:k,onChange:function(e){console.log(e.target.value),S(e.target.value)}}),(0,r.jsxs)(me.W2,{translate:!0,speed:.05,scalar:5,className:"btn w-10/12 mt-3 customAccentBackground clickupShadow logoFont text-xl",children:[f&&(0,r.jsx)(d.Z,{}),!f&&(0,r.jsx)("button",{onClick:function(){console.log("Clicked"),console.log(k),k.length>3&&(j(!0),(0,Oe.ET)((0,Oe.hJ)(Me,"user_registrations"),{email:k,timestamp:(new Date).toISOString()}).then((function(e){j(!1),b(!0),console.log("Sent")})))},children:y?"SUCCESS":"JOIN THE WAITLIST"})]}),(0,r.jsxs)("div",{className:"flex space-x-4 justify-center pt-3",children:[(0,r.jsx)("a",{href:l.g5,children:(0,r.jsx)($.Z,{children:(0,r.jsx)(Ne.Z,{fontSize:"large"})})}),(0,r.jsx)("a",{href:l._v,children:(0,r.jsx)($.Z,{children:(0,r.jsx)(ke.Z,{fontSize:"large"})})})]})]})},u=((0,p.useRouter)(),(0,i.useState)(0)),h=u[0],x=u[1],m=(0,i.useState)(!1),f=m[0],j=m[1],g=(0,i.useState)(!1),y=g[0],b=g[1],N=(0,i.useState)(null),k=N[0],S=N[1],C=(0,r.jsx)("div",{className:"w-full bg-green-500",children:(0,r.jsx)(Re.Z,{className:"w-full bg-yellow-500",height:300})}),T=n?n.stats.map((function(e){return(0,r.jsx)("div",{className:"w-2/12 pt-5 pb-5",children:(0,r.jsx)(Ie.Z,{label:e[0],mainLabel:e[1],secondaryColor:" clickupColor "})})})):null,A=["Legacy","Fights","Techniques","Rankings","Lineage","Athletes","Promoters","Tournaments","Champions","Referees","Judges","Instructors"];(0,i.useEffect)((function(){var e;e="testy",(0,Le.Kz)(Pe,e);var t=0;setInterval((function(){(t+=1)===A.length&&(t=0),x(t)}),3e3,t)}),[]);var Z=[],E=!0,D=!1,I=void 0;try{for(var O,U=Object.entries(s.tournamentTypes)[Symbol.iterator]();!(E=(O=U.next()).done);E=!0){var L=ze(O.value,2),M=(L[0],L[1]),P={img:"/tournament_types"+M.imageUrl,name:M.name,id:"",link:""};Z.push(P)}}catch(W){D=!0,I=W}finally{try{E||null==U.return||U.return()}finally{if(D)throw I}}var V,z,_,H=(0,r.jsx)("span",{className:"customAccentText",children:(0,r.jsx)(me.Vr,{children:A[h].toUpperCase()},h)});return(0,r.jsx)("div",{className:"container",children:(0,r.jsxs)("div",{className:"py-10",children:[(0,r.jsx)("div",{className:"clickup z-0"}),(0,r.jsxs)("div",{className:"flex min-h-[600px]",children:[(0,r.jsx)("div",{className:"w-6/12 centerdat",children:(0,r.jsxs)("div",{children:[(0,r.jsxs)("div",{className:"flex space-x-5",children:[(0,r.jsx)(v.Z,{textColor:"clickupColor",children:"THE ".toUpperCase()}),(0,r.jsxs)(v.Z,{textColor:"clickupColor",children:[" ",H]})]}),(0,r.jsx)(v.Z,{textColor:"clickupColor",children:" of Martial Arts".toUpperCase()}),(0,r.jsx)(v.Z,{textColor:"clickupColor",size:4,children:"THE ALL IN ONE MARTIAL ART COMMUNITY".toUpperCase()}),c()]})}),(0,r.jsx)("div",{className:"w-6/12 centerdat ",children:(0,r.jsx)("div",{className:"w-full player-wrapper",children:(0,r.jsx)(Be.Z,{className:"clickupShadow",url:"https://www.youtube.com/watch?v=BoJBfSbYNKU",config:{youtube:{playerVars:(V={autoplay:0,controls:1,autohide:0,wmode:"opaque",modestbranding:1,color:"blue",rel:0,fs:0},z="controls",_=1,z in V?Object.defineProperty(V,z,{value:_,enumerable:!0,configurable:!0,writable:!0}):V[z]=_,V)}}})})})]}),(0,r.jsxs)("div",{className:"",children:[(0,r.jsx)("div",{className:"flex border-t-2 pb-10",children:T}),(0,r.jsx)("div",{className:"flex space-x-1 -translate-x-1/3 mt-10",children:s.activities.map((function(e){return(0,r.jsx)(Te,{width:200,height:200,imageUrl:l.ti+o(e.imageUrl),label1:e.name,targetLink:"/martialart/"+e.id})}))}),(0,r.jsx)("div",{className:"mb-10 flex space-x-1 -translate-x-1/4 ",children:s.activities.map((function(e){return(0,r.jsx)(Te,{width:200,height:200,imageUrl:l.ti+o(e.imageUrl),label1:e.name,targetLink:"/martialart/"+e.id})}))}),(0,r.jsx)(Ze,{title:"DIVERSE PROFILES",description:"Detailed profiles from all perspectives in the martial arts community",tiles:[["fighter.jpg","Athletes"],["referee.jpg","Referees"],["judge.jpg","Judges"],["instructor.jpg","Teachers"]].map((function(e){return{value:null,name:e[1].toUpperCase(),img:"/"+e[0],subName:null,link:""}})),link:null}),(0,r.jsx)(Ze,{flip:!0,title:"TOURNAMENT CREATOR",description:"Seamless tournament creation. Any fight type, any progression format, any scoring system, fully customizable",tiles:(0,r.jsx)(we,{discrete:!1,perView:4,loop:!0,timeDelayMs:2e3,inputData:Z.map((function(e){return(0,r.jsx)(Ae,{width:200,height:200,imageUrl:e.img,label1:e.name,targetLink:"/martialart/"+e.id})}))}),overrideTiles:!0,link:null}),(0,r.jsx)(Ze,{title:"TECHNIQUE LIBRARY",description:"Learn how do react, defend and attack from any fight position in the fight technique library",tiles:s.positions.map((function(e){return{value:null,name:e.name,img:l.ti+o(e.imageUrl),subName:null,link:"/position/"+e.id}})),link:null}),(0,r.jsxs)("div",{className:"",children:[(0,r.jsx)(Ze,{flip:!0,title:"MARTIAL ART RANK DIRECTORY",description:"Browse the worldwide verified list of martial art rank holders, past and present",tiles:(0,r.jsx)("div",{className:"space-y-1",children:[{name:"Cris Cyborg",flag:"br",art:"BJJ",belt:"belt_brown",year:"2001"},{name:"Ronda Rousey",flag:"us",art:"Judo",belt:"belt_black",year:"2001"},{name:"Stephen Thompson",flag:"us",art:"Kickboxing",belt:"belt_black",year:"2001"},{name:"Royce Gracie",flag:"br",art:"BJJ",belt:"belt_black",year:"2001"}].map((function(e){return(0,r.jsxs)("div",{className:l.CS+"flex w-full p-2",children:[(0,r.jsx)("div",{className:"w-1/12",children:B(e.flag,30)}),(0,r.jsx)("p",{className:"w-3/12 customAccentText",children:e.name}),(0,r.jsx)("p",{className:"w-2/12",children:e.art}),(0,r.jsx)("div",{className:"w-3/12",children:Se(e.belt,80)}),(0,r.jsx)("p",{children:e.year})]})}))}),overrideTiles:!0,link:null}),(0,r.jsx)(Ze,{title:"RATINGS, REVIEWS, PREDICTIONS",description:"Rate, review and vote on fights to decide the best fights of the year, all time and a range of other categories",tiles:(0,r.jsx)("div",{className:"space-y-1",children:[{fa:"Brock Lesnar",fb:"Frank Mir",art:"MMA",year:"2000",ratingValue:2,totalVotes:35},{fa:"Lenox Lewis",fb:"Mike Tyson",art:"boxing",year:"2000",ratingValue:3.2,totalVotes:85},{fa:"Royce Gracie",fb:"Frank Shamrock",art:"mma",year:"2000",ratingValue:4.5,totalVotes:1223},{fa:"Joe Frazier",fb:"Muhammed Ali",art:"boxing",year:"2000",ratingValue:1,totalVotes:23}].map((function(e){return(0,r.jsxs)("div",{className:l.CS+"flex w-full space-x-10 px-2 py-1",children:[(0,r.jsx)(R,{voteData:e,initialTotalVotes:43,goToLink:"/bout/"}),(0,r.jsx)(w,{}),(0,r.jsx)("div",{className:"customAccentText link w-4/12",children:e.fa}),(0,r.jsx)("p",{children:"vs"}),(0,r.jsx)("div",{className:"customAccentText link w-4/12",children:e.fb}),(0,r.jsx)("p",{className:"w-2/12",children:e.art}),(0,r.jsx)("div",{className:"w-3/12",children:e.year})]})}))}),overrideTiles:!0,link:null})]}),(0,r.jsx)(Ze,{title:"ADVANCED FIGHT SEARCH",description:"Browse fight data like never before with fight labels. Search based on moments, win methods, country, time frame, fight promoter and many more",tiles:(0,r.jsx)(Ee,{}),overrideTiles:!0,flip:!0,link:null}),(0,r.jsx)(Ze,{title:"FIGHT PROMOTERS",description:"Detailed Fight Promoters pages from around the world with their own internal rankings, records and ratings",tiles:s.promoters.map((function(e){return{value:null,name:null,img:l.ti+o(e.imageUrl),subName:null,link:"/promotion/"+e.id}})),link:null}),(0,r.jsx)(Ze,{title:"WORLDWIDE AND LOCAL RANKINGS",description:"Per martial art worldwide, national, division and gender fighter rankings. Track your journey from the 1st fight to world champion",tiles:C,overrideTiles:!0,link:null,flip:!0}),(0,r.jsx)(Ze,{title:"FOR YOU FEED",description:"Tailor your content by following Fighters, Promoters and Martial Arts to create a custom update feed",tiles:(0,r.jsx)(F.Z,{variant:"rounded",className:"",src:"./social-graph.jpg",sx:{width:700,height:400}}),overrideTiles:!0,link:null}),(0,r.jsx)("div",{className:" centerdat text-center",children:(0,r.jsxs)("div",{className:"w-6/12 space-y-2",children:[(0,r.jsxs)(v.Z,{textColor:"text-center w-full justify-center flex ",size:2,children:["START YOUR"," ",(0,r.jsx)("span",{className:"customAccentText pl-4",children:" LEGACY"})]}),(0,r.jsx)("div",{children:"Follow us to get notified when we launch"}),c()]})})]})]})})}var He=!0;function We(e){var t=e.statsData,n=e.featuredData,s=e.trendingPeopleData,o=e.trendingTechniqueData,c=e.favouriteBoutsData,d=e.landingData,u=(0,i.useState)(!1),h=u[0],x=u[1],m=(0,i.useState)([]),f=m[0],p=m[1];if((0,i.useEffect)((function(){x((0,l.r8)()),h&&(0,a.ZD)().then((function(e){console.log("Followed Fighter Feed Debug"),console.log(e),p(e.feed)}))}),[]),0==h)return(0,r.jsx)(_e,{landingData:d,statsData:t});var j=f.map((function(e){return(0,r.jsx)("div",{children:(0,r.jsx)(ie,{anchorVerticalCustom:"center",anchorHorizontalCustom:"right",popupContent:(0,r.jsx)("div",{children:(0,r.jsx)(L,{bout:e.postTypeData})}),children:(0,r.jsx)(Z(),{href:"/fdfd",children:(0,r.jsx)("a",{children:(0,r.jsxs)("div",{className:"space-x-3 flex",children:[(0,r.jsx)("p",{className:"w-5/12 customAccentText hover:link",children:e.name}),(0,r.jsx)(K.Z,{className:"w-3/12",label:e.postTypeData.activityName}),(0,r.jsx)("p",{children:(0,a.BR)(e.postTypeTimestamp)})]})})})})})})),g=(c.data.slice(0,9).map((function(e){return(0,r.jsx)(L,{bout:e.boutData})})),s.popular.slice(0,5).map((function(e){return(0,r.jsx)("div",{className:"border-b-2 border-blue-500 flex",children:(0,r.jsx)("p",{className:"pl-5 customAccentText hover:link w-10/12 ",children:e.entity.name})})})));g=g.slice(0,8);var y=o.popular.map((function(e){return(0,r.jsxs)("div",{className:"w-3/12",children:[(0,r.jsx)(F.Z,{variant:"rounded",sx:{width:100,height:100},src:l.ti+e.entity.imageUrl}),(0,r.jsx)(v.Z,{textColor:" overflow-hidden",size:5,children:e.entity.name})]})}));y=y.slice(0,8);var b=[(0,r.jsx)(F.Z,{variant:"rounded",sx:{width:250,height:250},src:l.ti+"booty.jpg"}),(0,r.jsx)(F.Z,{variant:"rounded",sx:{width:250,height:250},src:l.ti+"booty2.jpg"}),(0,r.jsx)(F.Z,{variant:"rounded",sx:{width:250,height:250},src:l.ti+"booty3.jpg"}),(0,r.jsx)(F.Z,{variant:"rounded",sx:{width:250,height:250},src:l.ti+"advert2.jpg"})],w=(0,r.jsx)(we,{inputData:b}),N=n.events.map((function(e){return(0,r.jsx)("div",{className:"border-b-2 border-blue-500 text-black",children:(0,r.jsx)(ie,{anchorVerticalCustom:"center",anchorHorizontalCustom:"right",popupContent:(0,r.jsxs)("div",{className:"flex p-4 w-12/12",children:[(0,r.jsx)(F.Z,{variant:"rounded",sx:{width:300,height:400},src:l.ti+e.imageUrl}),B(e.countryCode)]}),children:(0,r.jsx)(Z(),{href:"/event/"+e.id,children:(0,r.jsx)("a",{children:(0,r.jsxs)("div",{className:"flex",children:[(0,r.jsx)("p",{className:"w-9/12",children:e.name}),(0,r.jsx)("p",{children:(0,a.BR)(e.dateOfEvent)})]})})})})})}));return(0,r.jsxs)("div",{children:[(0,r.jsx)(H,{}),(0,r.jsx)(ge,{mainContent:(0,r.jsxs)("div",{className:"w-full px-5 space-y-2 justify-center",children:[(0,r.jsx)("div",{className:"w-12/12 text-white",children:(0,r.jsx)("div",{className:"flex w-full space-x-1 ",children:w})}),(0,r.jsx)(ve,{displayFilters:!0,showReplies:!0})]}),sideContent:(0,r.jsxs)("div",{className:"w-full px-10 space-y-10",children:[(0,r.jsxs)("div",{className:"w-full text-white bg-gray-300",children:[(0,r.jsx)(v.Z,{textColor:" w-full customAccentBackground text-white",size:3,children:"Trending"}),(0,r.jsx)("div",{className:"w-full border-t-2 space-y-5 pt-3 border-blue-500 text-black",children:g})]}),(0,r.jsxs)("div",{className:"w-full text-white bg-gray-300",children:[(0,r.jsx)(v.Z,{textColor:" w-full customAccentBackground text-white",size:3,children:"Upcoming Events"}),(0,r.jsx)("div",{className:"w-full border-t-2 space-y-5 pt-3 border-blue-500",children:N})]}),(0,r.jsxs)("div",{className:"w-full text-white bg-gray-300",children:[(0,r.jsxs)("div",{className:"flex customAccentBackground w-full ",children:[(0,r.jsx)(v.Z,{textColor:" text-white",size:3,children:"Upcoming Fights"}),(0,r.jsx)("button",{className:"btn ml-10",children:"View All"})]}),(0,r.jsx)("div",{className:"w-full border-t-2 space-y-5 pt-3 border-blue-500 text-black",children:j})]})]})}),(0,r.jsx)("div",{className:"pt-10 pb-10"})]})}}},function(e){e.O(0,[243,708,774,888,179],(function(){return t=75557,e(e.s=t);var t}));var t=e.O();_N_E=t}]);