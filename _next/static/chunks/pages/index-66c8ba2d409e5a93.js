(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{75557:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(68442)}])},68442:function(e,t,n){"use strict";n.r(t),n.d(t,{__N_SSG:function(){return We},default:function(){return Ye}});var r=n(85893),i=n(67294),a=n(81645),s=n(51575),l=n(34051),o=n.n(l),c=n(14957),d=n(98456),u=n(9581),h=n(86886),m=n(44612),x=n(78262),f=n(82175),p=n(11163),v=n(68181);function g(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function j(e,t,n,r,i,a,s){try{var l=e[a](s),o=l.value}catch(c){return void n(c)}l.done?t(o):Promise.resolve(o).then(r,i)}function y(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function b(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,i,a=[],s=!0,l=!1;try{for(n=n.call(e);!(s=(r=n.next()).done)&&(a.push(r.value),!t||a.length!==t);s=!0);}catch(o){l=!0,i=o}finally{try{s||null==n.return||n.return()}finally{if(l)throw i}}return a}}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return g(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return g(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function w(e){var t=e.label,n=void 0===t?"No Label Provided":t,l=e.entityId,o=void 0===l?null:l,u=e.entityType,h=void 0===u?null:u,m=(0,i.useRef)(null),x=(0,i.useState)(!1),f=x[0],p=x[1],v=(0,i.useState)(null),g=v[0],j=v[1],y=(0,i.useState)(null),w=y[0],S=y[1],k=(0,i.useState)(!1),C=k[0],T=k[1];(0,i.useEffect)((function(){var e=new IntersectionObserver((function(e){b(e,1)[0].isIntersecting&&((0,a.r8)()&&0==C?(0,s.H3)(o,h).then((function(e){console.log("Retrieved user vote data for "+h),console.log(e),e.rating&&(j(e.rating.rating),S(e.rating.reviewText)),T(!0)})):T(!0))}));return e.observe(m.current),function(){return e.disconnect()}}),[]);var A=null;return A=0==C?(0,r.jsx)(d.Z,{}):g?(0,r.jsxs)(r.Fragment,{children:[" ",(0,r.jsx)(c.Z,{sx:{color:"#1976d2"}})," ",g," / 5"]}):(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(c.Z,{sx:{color:"#1976d2"}})," Rate"]}),(0,r.jsxs)("div",{ref:m,children:[(0,r.jsx)("a",{onClick:function(e){p(!f)},children:A}),(0,r.jsx)(N,{entityId:o,ratingValue:g,setRatingValue:j,reviewText:w,entityType:h,ratedLabel:n,open:f,onClose:function(e){p(!1)}})]})}function N(e){var t=e.onClose,n=(e.selectedValue,e.ratedLabel),l=e.open,c=e.setRatingValue,d=e.ratingValue,g=e.reviewText,b=e.entityId,w=e.entityType,N=((0,p.useRouter)(),(0,i.useState)(d)),S=N[0],k=N[1],C=(0,i.useState)(!1),T=(C[0],C[1],250),A=(0,f.TA)({initialValues:{review:""},onSubmit:function(){var e,t=(e=o().mark((function e(t){return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if((0,a.vS)("Sign in to leave a review")){e.next=2;break}return e.abrupt("return");case 2:b&&(0,s._Z)(b,w,S,A.values.review)&&c(S);case 3:case"end":return e.stop()}}),e)})),function(){var t=this,n=arguments;return new Promise((function(r,i){var a=e.apply(t,n);function s(e){j(a,r,i,s,l,"next",e)}function l(e){j(a,r,i,s,l,"throw",e)}s(void 0)}))});return function(e){return t.apply(this,arguments)}}()});return 0==d&&"-",(0,r.jsx)(x.Z,{onClose:function(){t()},open:l,maxWidth:"sm",fullWidth:!0,children:(0,r.jsxs)(u.Z,{style:{alignItems:"center"},children:[(0,r.jsxs)(h.ZP,{container:!0,className:"rating-star",children:[(0,r.jsx)(h.ZP,{item:!0,xs:12,children:(0,r.jsx)(v.Z,{size:3,children:n})}),(0,r.jsx)(h.ZP,{item:!0,xs:12,children:(0,r.jsx)(m.Z,{name:"hover-feedback",size:"large",max:5,value:S,onChange:function(e,t){k(t)}})})]}),function(){var e;return(0,r.jsx)("div",{children:(0,r.jsxs)("form",{onSubmit:A.handleSubmit,children:[(0,r.jsxs)("p",{children:[A.values.review.length," / ",T]}),(0,r.jsxs)("li",{children:[(0,r.jsx)("input",(e={type:"text",placeholder:"Type here",className:"input input-bordered w-full max-w-xs",id:"review"},y(e,"type","text"),y(e,"placeholder","Leave an optional text review"),y(e,"value",A.values.review),y(e,"onChange",A.handleChange),e)),(0,r.jsx)("p",{children:g})]}),(0,r.jsx)("div",{className:"form-control",children:(0,r.jsxs)("label",{className:"label cursor-pointer",children:[(0,r.jsx)("span",{className:"label-text",children:"Review Cotains Spoilers"}),(0,r.jsx)("input",{type:"checkbox",className:"toggle toggle-primary"})]})}),(0,r.jsx)("li",{children:(0,r.jsx)("button",{type:"submit",className:"btn btn-wide",children:"Submit/Update Review"})})]})})}()]})})}var S=n(26447),k=n(81458),C=n(55113),T=n(42151),A=n(41664),E=n.n(A);function Z(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function D(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,i,a=[],s=!0,l=!1;try{for(n=n.call(e);!(s=(r=n.next()).done)&&(a.push(r.value),!t||a.length!==t);s=!0);}catch(o){l=!0,i=o}finally{try{s||null==n.return||n.return()}finally{if(l)throw i}}return a}}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return Z(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return Z(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}(0,T.ZP)(C.Z)((function(e){var t=e.theme;return{padding:t.spacing(0),textAlign:"center",color:t.palette.text.secondary}}));function R(e){e.initialUserVote;var t=e.initialTotalVotes,n=void 0===t?0:t,a=(e.boutId,e.voteData),s=void 0===a?null:a,l=e.label,o=void 0===l?null:l,c=e.goToLink,d=D(i.useState(0),2),u=(d[0],d[1]),h=D(i.useState(!1),2),x=h[0],f=h[1];(0,p.useRouter)();(0,i.useEffect)((function(){u(n)}),[n]),(0,i.useEffect)((function(){u(n)}),[]);var v=0,g=0;return console.log(s),s&&s.ratingValue&&(v=s.ratingValue.toFixed(1),g=s.totalVotes),(0,r.jsxs)(S.Z,{children:[(0,r.jsx)("div",{onClick:function(){f(!0)},children:(0,r.jsx)("a",{children:(0,r.jsx)("li",{children:(0,r.jsx)("div",{children:(0,r.jsxs)("div",{children:[(0,r.jsxs)("div",{className:"flex",children:[(0,r.jsx)(m.Z,{name:"read-only",value:5,max:1,readOnly:!0}),(0,r.jsx)("div",{className:"p-1 text-center",children:(0,r.jsxs)("p",{className:"font-bold",style:{fontSize:"1.1rem",lineHeight:"0.8rem"},children:[v," "]})})]}),(0,r.jsxs)("p",{style:{fontSize:"0.6rem"},children:[g," votes "]})]})})})})}),x&&(0,r.jsx)(O,{ratedLabel:o,voteData:s,open:x,onClose:function(e){f(!1)},goToLink:c}),(0,r.jsx)("input",{type:"checkbox",id:"my-modal",className:"modal-toggle"}),(0,r.jsx)("div",{className:"modal",children:(0,r.jsxs)("div",{className:"modal-box",children:[(0,r.jsx)("h3",{className:"font-bold text-lg",children:"Congratulations random Internet user!"}),(0,r.jsx)("p",{className:"py-4",children:"You've been selected for a chance to get one year of subscription to use Wikipedia for free!"}),(0,r.jsx)("div",{className:"modal-action",children:(0,r.jsx)("label",{for:"my-modal",className:"btn",children:"Yay!"})})]})})]})}function I(e){return[5,4,3,2,1].map((function(t){var n,i,a=0;return e&&e.breakdown&&t.toString()in e.breakdown&&(a=(a=e.breakdown[t.toString()].quantity/e.totalVotes*100).toFixed(0)),(0,r.jsx)(r.Fragment,{children:(n=t.toString()+" star",i=a,(0,r.jsxs)("div",{className:"flex items-center mt-1",children:[(0,r.jsx)("div",{className:" w-1/5 customAccentText",children:(0,r.jsx)("span",{children:n})}),(0,r.jsx)(k.Z,{variant:"determinate",sx:{width:200,height:8},value:i}),(0,r.jsx)("div",{className:"w-1/5 text-gray-700 pl-3",children:(0,r.jsxs)("span",{className:"text-sm",children:[i,"%"]})})]}))})}))}function L(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,i=I(e),a=0,s=0;e&&e.ratingValue&&(a=e.ratingValue,s=e.totalVotes);var l=null;return n&&(l=(0,r.jsx)(E(),{href:n,children:(0,r.jsx)("a",{children:(0,r.jsx)("button",{className:"btn",children:" View All Reviews "})})})),(0,r.jsxs)("div",{className:" ",children:[(0,r.jsxs)("div",{className:"mb-1 tracking-wide px-4 py-4",children:[(0,r.jsxs)("h2",{className:"text-gray-800 font-semibold mt-1",children:[a," out of 5"]}),(0,r.jsxs)("h2",{className:"text-gray-800 font-semibold mt-1",children:[s," Users reviews ttt"]}),(0,r.jsx)("div",{className:"border-b -mx-8 px-8 pb-3",children:i})]}),l]})}function O(e){var t=e.onClose,n=e.ratedLabel,a=e.goToLink,s=e.open,l=e.voteData,o=(0,i.useState)(0),c=o[0],d=o[1];return 0==c&&"-",console.log("lalalala"),console.log(l),(0,r.jsx)(x.Z,{onClose:function(){t(),d(0)},open:s,fullWidth:!0,children:(0,r.jsx)(u.Z,{style:{alignItems:"center"},children:L(l,n,a)})})}var U=function(e){var t=e.bout,n=t.fighterData[t.fighterAId],i=t.fighterData[t.fighterBId];return(0,r.jsxs)("div",{className:"w-full flex space-x-2 p-2 "+a.CS,children:[(0,r.jsxs)("div",{className:"flex space-x-5 w-2/12",children:[(0,r.jsx)(R,{boutId:t.id,goToLink:"/bout/"+t.id}),(0,r.jsx)(w,{entityId:t.id,entityType:"bout"})]}),(0,r.jsx)("p",{className:" text-center",children:n.name}),(0,r.jsx)("p",{children:"vs"}),(0,r.jsx)("p",{className:" text-center",children:i.name}),(0,r.jsxs)("p",{children:["(",t.timestamp,")"]})]})},F=n(69661),M=n(83984);function P(e){var t=null;if(e){var n=e.toLowerCase();("sct"==n||"en"==n||"wa"==n)&&(n="gb"),t="".concat("https://flagcdn.com/").concat(n,".svg")}else t=null;return t}function B(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:120,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,i=.6*t,a=(0,r.jsx)(F.Z,{className:"customShadow",variant:"rounded",sx:{width:t,height:i},src:P(e)});return n?(0,r.jsx)(M.Z,{title:e,enterDelay:500,leaveDelay:200,children:a}):a}var V=n(9008),z=n.n(V),_=function(e){var t=e.title,n=e.keywords,i=e.description;return(0,r.jsxs)(z(),{children:[(0,r.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),(0,r.jsx)("meta",{name:"keywords",content:n}),(0,r.jsx)("meta",{name:"description",content:i}),(0,r.jsx)("meta",{charSet:"utf-8"}),(0,r.jsxs)("title",{children:[t," | ",a.pB]})]})};_.defaultProps={title:a.pB+" - The All In One Martial Art Community",keywords:"boxing mma bjj martial art  muay thai fight legacy records reviews predictions",description:"The All in one martial art community. Fight Ratings, Reviews, events, fight promoters and techniques"};var H=_,W=n(14603),Y=n(36111),G=n(91811),q=n(40470),J=n(64459),K=n(87918),X=n(83321),$=n(40044),Q=n(11703),ee=n(14564),te=n(15861);function ne(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function re(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,i,a=[],s=!0,l=!1;try{for(n=n.call(e);!(s=(r=n.next()).done)&&(a.push(r.value),!t||a.length!==t);s=!0);}catch(o){l=!0,i=o}finally{try{s||null==n.return||n.return()}finally{if(l)throw i}}return a}}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return ne(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return ne(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function ie(e){var t=e.popupContent,n=void 0===t?null:t,a=e.anchorHorizontalCustom,s=void 0===a?"left":a,l=e.anchorVerticalCustom,o=void 0===l?"bottom":l,c=e.children,d=re(i.useState(null),2),u=d[0],h=d[1],m=function(){h(null)},x=Boolean(u);return(0,r.jsxs)("div",{children:[(0,r.jsx)(te.Z,{"aria-owns":x?"mouse-over-popover":void 0,"aria-haspopup":"true",onMouseEnter:function(e){h(e.currentTarget)},onMouseLeave:m,children:c}),(0,r.jsx)(ee.ZP,{transitionDuration:500,id:"mouse-over-popover",sx:{pointerEvents:"none"},open:x,anchorEl:u,anchorOrigin:{vertical:"top",horizontal:"left"},transformOrigin:{vertical:o,horizontal:s},onClose:m,disableRestoreFocus:!0,children:n})]})}var ae=n(22961),se=n(72450),le=function(e,t){return(0,r.jsx)("div",{onClick:e,children:(0,r.jsx)(M.Z,{title:"Hide fight results on this page",enterDelay:500,leaveDelay:200,children:(0,r.jsxs)("div",{className:"text-white",children:[(0,r.jsx)("li",{children:"Spoilers"}),(0,r.jsx)("li",{children:t?(0,r.jsx)(se.Z,{className:"event-fab-icon"}):(0,r.jsx)(ae.Z,{className:"event-fab-icon"})})]})})})},oe=n(41733),ce=n(77957),de=n(10105),ue=n(57976),he=n(93419),me=n(55819);(0,T.ZP)(C.Z)((function(e){var t=e.theme;return{padding:t.spacing(0),textAlign:"center",color:t.palette.text.secondary}}));var xe=n(11986);function fe(e){var t=e.handleDelete,n=e.handleReport,a=e.isCurrentUser,s=void 0!==a&&a,l=(0,i.useState)(null),o=l[0],c=l[1],d=Boolean(o),u=function(){c(null)};return(0,r.jsxs)("div",{children:[(0,r.jsx)(X.Z,{id:"demo-positioned-button","aria-controls":d?"demo-positioned-menu":void 0,"aria-haspopup":"true","aria-expanded":d?"true":void 0,onClick:function(e){c(e.currentTarget)},children:(0,r.jsx)(ue.Z,{})}),(0,r.jsxs)(he.Z,{id:"demo-positioned-menu","aria-labelledby":"demo-positioned-button",anchorEl:o,open:d,onClose:u,anchorOrigin:{vertical:"bottom",horizontal:"left"},transformOrigin:{vertical:"top",horizontal:"left"},children:[s&&(0,r.jsxs)(me.Z,{onClick:function(){t(),u()},children:[(0,r.jsx)(oe.Z,{}),"Delete"]}),s&&(0,r.jsxs)(me.Z,{onClick:function(){u()},children:[(0,r.jsx)(ce.Z,{}),"Edit"]}),!s&&(0,r.jsxs)(me.Z,{onClick:function(){n(),u()},children:[(0,r.jsx)(de.Z,{})," Report"]})]})]})}function pe(e){var t=e.entry,n=e.likesData,l=e.username,o=e.router,c=e.pendingReplyMap,d=e.setPendingReplyMap,u=e.setMyReplyText,h=e.myReplyText,m=e.setMyPostText,x=e.myPostText,f=e.showReplies,p=e.hideSpoilers,v=(0,i.useState)(!1),g=v[0],j=v[1],y=(0,r.jsxs)("div",{className:"w-12/12 flex border-t-2 border-blue-500 pt-2",children:[(0,r.jsx)("input",{type:"text",placeholder:"Add a comment",className:"input input-bordered input-lg w-full rounded",value:t.id in c?c[t.id]:"",onChange:function(e){var n=e.target.value;if(1!=n.length){var r=c;c[t.id]=n,d(r),u(!h)}else(0,a.vS)("Sign in to post a comment")}})," ",(0,r.jsx)("button",{className:"btn customAccentBackground text-white",onClick:function(){if((0,a.vS)("Sign in to post a comment")&&t.id in c){var e=c[t.id];""!=e&&(0,s.sq)(e,!1,t.id).then((function(e){1==e.success&&(console.log("Reply Added"),m(!x),j(!1))}))}},children:"Post"})]}),b=(0,r.jsx)(G.Z,{});t.id in n&&(b=(0,r.jsx)(Y.Z,{color:"error"}));var w=t.textContent;1==t.spoilers&&p&&(w="Spoilers Hidden");var N=t.replycount?t.replycount:0,S=t.replies&&f?t.replies.replies.map((function(e){return(0,r.jsx)(pe,{hideSpoilers:p,entry:e,likesData:n,username:l,router:o,pendingReplyMap:c,setPendingReplyMap:d,setMyReplyText:u,myReplyText:h,setMyPostText:m,myPostText:x})})):null,k=t.originUrl=="/user/"+l,C=(0,r.jsxs)("div",{className:"bg-gray-300 w-full p-2 flex rounded border-b-2 border-blue-500",children:[(0,r.jsx)("div",{className:"w-2/12 border-r-2 border-blue-500 px-5 pt-2",children:(0,r.jsx)(F.Z,{variant:"rounded",sx:{width:75,height:75},src:a.ti+t.originImage,width:100})}),(0,r.jsxs)("div",{className:"pl-5 w-full ",children:[(0,r.jsxs)("div",{className:"flex ",children:[(0,r.jsxs)("div",{className:"w-11/12",children:[(0,r.jsx)(ie,{anchorHorizontalCustom:"center",popupContent:(0,r.jsxs)("div",{className:"flex p-4 w-12/12",children:[(0,r.jsx)(F.Z,{variant:"rounded",sx:{width:200,height:200},src:a.ti+t.originImage}),(0,r.jsxs)("div",{className:"p-5",children:[" ",(0,r.jsx)("p",{children:t.name}),(0,r.jsx)(K.Z,{label:t.originEntity,color:"primary"})]})]}),children:(0,r.jsx)(E(),{href:t.originUrl,children:(0,r.jsxs)("a",{className:"customAccentText font-bold hover:link",children:[" ",t.name]})})}),(0,r.jsx)("p",{children:(0,s.BR)(t.timestamp)})]}),(0,r.jsx)(fe,{handleDelete:function(){(0,s.S8)(t.id).then((function(e){1==e.success&&(0,s.qW)().then((function(e){console.log("FEED DEBUG"),console.log(e),setFeedData(e.data.feed)}))}))},handleReport:null,isCurrentUser:k})]}),(0,r.jsxs)("p",{className:"mt-3 pr-10",children:[" ",w]}),t.targetUrl&&(0,r.jsx)(E(),{href:t.targetUrl,children:(0,r.jsx)(X.Z,{className:"link",children:"View"})}),t.imageUrl&&(0,r.jsx)(F.Z,{variant:"rounded",sx:{width:300,height:300},src:a.ti+t.imageUrl}),(0,r.jsxs)("div",{className:"flex w-full space-x-10 mt-3",children:[(0,r.jsxs)(X.Z,{className:"text-black",onClick:function(e){if((0,a.vS)("Sign in to like content")){var r=n,i=null;t.id in r?(console.log("Deleting like"),delete r[t.id],i=!1):(console.log("Adding like"),r[t.id]=null,i=!0),(0,s.UG)(t.id,i).then((function(e){console.log("Danny likey"),(0,s.qW)().then((function(e){console.log("FEED DEBUG"),console.log(e),setFeedData(e.data.feed)}))})),setLikesData(null),setLikesData(r)}},children:[b," 0 Likes"]})," ",(0,r.jsxs)(X.Z,{className:"text-black",children:[" ",(0,r.jsx)(W.Z,{})," View ",N," Comments"]}),(0,r.jsxs)(X.Z,{className:"text-black",onClick:function(){j(!g)},children:[(0,r.jsx)(J.Z,{})," Reply"]}),(0,r.jsxs)(X.Z,{className:"text-black",onClick:function(){o.push("/posts/"+t.id)},children:[" ",(0,r.jsx)(q.Z,{})," Link"]})]}),g&&y]})]});return(0,r.jsxs)("div",{children:[C,(0,r.jsx)("div",{className:"pl-10",children:S})]})}function ve(e){var t=e.feedOwnerUsername,n=void 0===t?null:t,l=e.inputFeedData,o=void 0===l?null:l,c=e.showReplies,d=void 0!==c&&c,u=e.displayFilters,h=void 0!==u&&u,m=(0,p.useRouter)(),x=(0,i.useState)("all"),f=x[0],v=x[1],g=(0,i.useState)(null),j=g[0],y=g[1],b=(0,i.useState)({}),w=b[0],N=b[1],S=(0,i.useState)(null),k=(S[0],S[1],(0,i.useState)(null)),C=k[0],T=k[1],A=(0,i.useState)([]),E=A[0],Z=A[1],D=(0,i.useState)({}),R=D[0],I=D[1],L=(0,i.useState)(!1),O=L[0],U=L[1],M=(0,i.useState)(""),P=M[0],B=M[1],V=(0,i.useState)(!0),z=V[0],_=V[1];(0,i.useEffect)((function(){}),[R]),(0,i.useEffect)((function(){_((0,a.Kj)(n||(0,a.Uf)())),B((0,a.Uf)()),o?Z(o):(0,s.qW)().then((function(e){console.log("FEED DEBUG"),console.log(e),Z(e.data.feed)})),(0,a.r8)()&&(0,s.my)().then((function(e){console.log("LIKES DEBUG"),console.log(e.data),I(e.data)}))}),[]);var H=null;E&&(H=E.filter((function(e){return"all"==f||e.originEntity===f})).map((function(e){return(0,r.jsx)(pe,{hideSpoilers:O,entry:e,likesData:R,username:P,router:m,pendingReplyMap:w,setPendingReplyMap:N,setMyReplyText:T,myReplyText:C,setMyPostText:y,myPostText:j,showReplies:d})})));var W=[["all","all"],["Fights","Athlete"],["Events","event"],["Promoters","Promoter"],["Techniques","Martial Art Position"],["Rankings","rank"],["Community","Community Member"],["Announcements","website"]].map((function(e){return(0,r.jsx)($.Z,{label:e[0],value:e[1]})}));return(0,r.jsxs)("div",{className:"space-y-2",children:[z&&(0,r.jsxs)("div",{className:"bg-gray-400 rounded p-2",children:[(0,r.jsxs)("div",{className:"flex ",children:[(0,r.jsx)(F.Z,{sx:{width:75,height:75},src:a.ti+"dfsf.jpg",width:100}),(0,r.jsx)("input",{type:"text",placeholder:"Share an update with your followers",className:"input input-bordered input-lg w-full",value:j,onChange:function(e){y(e.target.value)}})," ",le((function(){U(!O)}),O)]}),(0,r.jsx)("button",{disabled:""==j,onClick:function(e){(0,s.sq)(j,!1).then((function(e){1==e.success&&((0,s.qW)().then((function(e){console.log("FEED DEBUG"),console.log(e),Z(e.data.feed)})),y(""))}))},className:"btn w-full customAccentBackground",children:"Post"})]}),h&&(0,r.jsx)("div",{className:"",children:(0,r.jsx)(Q.Z,{variant:"scrollable",scrollButtons:"auto","aria-label":"scrollable auto tabs example",value:f,onChange:function(e,t){v(t)},children:W})}),(0,r.jsxs)(xe.Vr,{children:[(0,r.jsx)("div",{children:H}),0==H.length&&(0,r.jsxs)("p",{className:" text-center space-y-5",children:[(0,r.jsx)("p",{className:"",children:"No posts founds"}),(0,r.jsxs)("p",{children:["Follow ",f,"s on ",a.pB," see more"]})]})]},f)]},Object.keys(R).length)}function ge(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var je=function(e){var t=e.sideContent,n=void 0===t?null:t,i=e.mainContent,s=void 0===i?null:i;ge(e,["sideContent","mainContent"]);return(0,r.jsxs)("div",{className:"flex w-full min-h-screen containerNavBar",children:[(0,r.jsx)("div",{className:"w-8/12 py-10",children:s}),(0,r.jsx)("div",{className:" w-4/12  py-10"+a.CS,children:n})]})},ye=n(30719),be=(n(21082),n(11972),n(36797),n(8701)),we=(n(13352),function(e){var t=e.inputData,n=void 0===t?[]:t,i=e.timeDelayMs,a=void 0===i?5e3:i,s=e.discrete,l=void 0===s||s,o=e.perView,c=void 0===o?4:o,d=e.loop,u=void 0!==d&&d,h=e.direction,m=void 0===h?"horizontal":h;return(0,r.jsx)(ye.tq,{showsPagination:!1,direction:m,spaceBetween:50,slidesPerView:c,loop:u,freeMode:!l,pagination:{clickable:!0,el:null},navigation:!1,autoplay:{delay:a,disableOnInteraction:!1},modules:[be.W_,be.pt,be.rj,be.tl],className:"mySwiper w-full",children:n.map((function(e){return(0,r.jsx)(ye.o5,{children:e})}))})}),Ne=n(64871),Se=n(94020);function ke(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:120,n="/belts/"+e+".png";return(0,r.jsx)("img",{className:"",width:t,src:n})}var Ce=n(72232);function Te(e){var t=e.title,n=void 0===t?"TITLE_PLACEHOLDER":t,i=e.description,a=void 0===i?"DESCRIPTION PLACEHOLDER TACO TACO DANNY BOY HELLO":i,s=e.flip,l=void 0!==s&&s,o=e.link,c=void 0===o?null:o,d=e.tiles,u=void 0===d?[]:d,h=e.overrideTiles,m=void 0!==h&&h,x=(0,r.jsxs)("div",{className:"w-4/12  p-5 text-2xl space-y-3",children:[(0,r.jsx)("p",{children:a}),(0,r.jsx)("div",{children:c&&(0,r.jsx)(E(),{href:c,children:(0,r.jsx)("a",{className:"customAccentText link",children:"See All"})})})]}),f=(0,r.jsxs)("div",{className:"w-8/12 ",children:[!m&&(0,r.jsx)("div",{className:"flex space-x-2 ",children:u.filter((function(e){return null!=e})).map((function(e){return e?(0,r.jsx)(Ce.rS,{width:200,height:200,imageUrl:e.img,label1:e.name,label2:e.subName,targetLink:e.link}):null})).slice(0,4)}),m&&u]});if(l){var p=f;f=x,x=p}return(0,r.jsxs)("section",{className:"my-20 fadeY",children:[(0,r.jsx)(v.Z,{showArrow:!1,showBar:!0,size:2,children:n}),(0,r.jsxs)("div",{className:"flex space-x-10",children:[x,f]})]})}var Ae=n(43800);function Ee(e){return(0,r.jsx)("p",{className:"customShadow font-bold px-5 py-2 mt-2 hover:bg-blue-100 hover:text-black customAccentBackground text-white",children:e.toUpperCase()})}function Ze(e){e=null!==e?e:function(e){throw e}(new TypeError("Cannot destructure undefined"));(0,i.useEffect)((function(){var e=document.querySelectorAll(".animatedtag"),t=new IntersectionObserver((function(e){e.forEach((function(e){e.isIntersecting?(e.target.classList.add("fadeX"),t.unobserve(e.target)):e.target.classList.remove("fadeX")}))}),{rootMargin:"-25px",threshold:1});e.forEach((function(e){t.observe(e)}))}),[]);var t=["cat","dog","catdog","Tacos in my butt"];return(0,r.jsxs)("div",{children:[(0,r.jsx)(v.Z,{textColor:"animatedtag flex w-full justify-center text-center animatedTagDelayLabel fadeY",size:4,children:"Combine tags for more control".toUpperCase()}),(0,r.jsxs)("div",{className:"w-full animatedtagset space-x-10 flex justify-center",children:[(0,r.jsx)("div",{className:"animatedtag animatedtagDelay fadeY",children:Ee(t[0])}),(0,r.jsxs)("div",{className:"animatedtag space-x-5 flex animatedtagDelay2 fadeY ",children:[(0,r.jsx)(Ae.Z,{fontSize:"large"}),Ee(t[1])]}),(0,r.jsxs)("div",{className:"animatedtag space-x-5 flex animatedtagDelay3 fadeY",children:[(0,r.jsx)(Ae.Z,{fontSize:"large"}),Ee(t[2])]}),(0,r.jsxs)("div",{className:"animatedtag space-x-5 flex animatedtagDelay4 fadeY",children:[(0,r.jsx)(Ae.Z,{fontSize:"large"}),Ee(t[3])]})]})]})}function De(e){var t=e.alternative,n=void 0!==t&&t,a=(0,i.useState)(["Draw","Split Decision","No Contest","Undefeated vs Undefeated","Title Fight","Unification Title Fight","Rear Naked Choke","One Strike KO","Doctor's Stoppage","Trilogy Fight","Light Heavyweight","Corner Towel Stoppage","Broken Bone","Retirement Fight","Saved By the Bell","Early Referee Stoppage","Last Second Finish","Kneebar Finish","Comeback","Fight of the Night","Disqualificaton","Fake Glove Touch","2010 - 2014","CANADA","Female"]),s=a[0],l=a[1];return(0,i.useEffect)((function(){var e=s;n&&(e=["Longest Win Streak","Longest Active Win Streak","Most Wins","Most Fights","Fastest Knockout","Fastest Submission","Most Draws","Tallest","Longest Reach","Oldest Champions","Most Decisions","Most Championship Wins","Most Losses"]);var t=e.sort((function(){return.5-Math.random()}));l(t)}),[]),(0,r.jsx)("div",{className:"flexwrap space-x-2",children:s.map((function(e){return Ee(e)}))})}var Re=n(36315),Ie=n(88078),Le=n(50635),Oe=n(26462),Ue=n(83977),Fe=n(53059),Me=(0,Ue.ZF)({apiKey:"AIzaSyCEpfwQceSdZJIaY6CYS0rLawE9W8UDNf0",authDomain:"fightl.firebaseapp.com",projectId:"fightl",storageBucket:"fightl.appspot.com",messagingSenderId:"129170786205",appId:"1:129170786205:web:3489cae5f9c00e2a1ad174",measurementId:"G-5JKYQ05GE4"}),Pe=(0,Oe.ad)(Me),Be=null;Me.name&&(Be=(0,Fe.IH)(Me));n(58913),n(34816),n(43815),n(19264),Math.PI;var Ve=n(22004);function ze(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function _e(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,i,a=[],s=!0,l=!1;try{for(n=n.call(e);!(s=(r=n.next()).done)&&(a.push(r.value),!t||a.length!==t);s=!0);}catch(o){l=!0,i=o}finally{try{s||null==n.return||n.return()}finally{if(l)throw i}}return a}}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return ze(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return ze(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function He(e){var t=e.statsData,n=void 0===t?null:t,s=e.landingData,l=void 0===s?null:s,o=function(e){if(console.log("IMAGE "),console.log(e),(e=e.replace(/\\/g,"/"))&&!a.WI&&e.includes("/")){var t=e.split("/");return t[t.length-1]}return e},c=function(){return(0,r.jsxs)("div",{children:[(0,r.jsx)(Re.Z,{id:"outlined-basic",variant:"outlined",className:"clickupShadow w-10/12 min-h-[50px] ",label:"Enter your Email",type:"email",value:N,onChange:function(e){console.log(e.target.value),S(e.target.value)}}),(0,r.jsxs)(xe.W2,{translate:!0,speed:.05,scalar:5,className:"btn w-10/12 mt-3 customAccentBackground clickupShadow logoFont text-xl",children:[x&&(0,r.jsx)(d.Z,{}),!x&&(0,r.jsx)("button",{onClick:function(){console.log("Clicked"),console.log(N),N.length>3&&(f(!0),(0,Oe.ET)((0,Oe.hJ)(Pe,"user_registrations"),{email:N,timestamp:(new Date).toISOString()}).then((function(e){f(!1),y(!0),console.log("Sent")})))},children:j?"SUCCESS":"JOIN THE WAITLIST"})]}),(0,r.jsxs)("div",{className:"flex space-x-4 justify-center pt-3",children:[(0,r.jsx)("a",{href:a.g5,children:(0,r.jsx)(X.Z,{children:(0,r.jsx)(Ne.Z,{fontSize:"large"})})}),(0,r.jsx)("a",{href:a._v,children:(0,r.jsx)(X.Z,{children:(0,r.jsx)(Se.Z,{fontSize:"large"})})})]})]})},u=((0,p.useRouter)(),(0,i.useState)(0)),h=u[0],m=(u[1],(0,i.useState)(!1)),x=m[0],f=m[1],g=(0,i.useState)(!1),j=g[0],y=g[1],b=(0,i.useState)(null),N=b[0],S=b[1],k=(0,r.jsx)("div",{className:"w-full bg-green-500",children:(0,r.jsx)(Ie.Z,{className:"w-full bg-yellow-500",height:300})}),C=n?n.stats.map((function(e){return(0,r.jsx)("div",{className:"w-2/12 pt-5 pb-5",children:(0,r.jsx)(Le.Z,{label:e[0],mainLabel:e[1],secondaryColor:" clickupColor "})})})):null;(0,i.useEffect)((function(){var e,t=document.querySelectorAll("section"),n=new IntersectionObserver((function(e){e.forEach((function(e){e.isIntersecting?(e.target.classList.add("fadeX"),n.unobserve(e.target)):e.target.classList.remove("fadeX")}))}),{rootMargin:"-25px",threshold:.5});t.forEach((function(e){n.observe(e)})),e="testy",(0,Fe.Kz)(Be,e)}),[]);var T=[],A=!0,E=!1,Z=void 0;try{for(var D,I=Object.entries(l.tournamentTypes)[Symbol.iterator]();!(A=(D=I.next()).done);A=!0){var L=_e(D.value,2),O=(L[0],L[1]),U={img:"/tournament_types"+O.imageUrl,name:O.name,id:"",link:""};T.push(U)}}catch(_){E=!0,Z=_}finally{try{A||null==I.return||I.return()}finally{if(E)throw Z}}var M,P,V,z=(0,r.jsx)("span",{className:"customAccentText",children:(0,r.jsx)(xe.Vr,{children:["Legacy","Fights","Techniques","Rankings","Lineage","Athletes","Promoters","Tournaments","Champions","Referees","Judges","Instructors"][h].toUpperCase()},h)});return(0,r.jsxs)("div",{className:"container",children:[(0,r.jsx)(H,{}),(0,r.jsxs)("div",{className:"py-10",children:[(0,r.jsx)("div",{className:"clickup z-0"}),(0,r.jsxs)("div",{className:"flex min-h-[600px]",children:[(0,r.jsx)("div",{className:"w-6/12 centerdat",children:(0,r.jsxs)("div",{children:[(0,r.jsxs)("div",{className:"flex space-x-5",children:[(0,r.jsx)(v.Z,{textColor:"clickupColor",children:"THE ".toUpperCase()}),(0,r.jsxs)(v.Z,{textColor:"clickupColor",children:[" ",z]})]}),(0,r.jsx)(v.Z,{textColor:"clickupColor",children:" of Martial Arts".toUpperCase()}),(0,r.jsx)(v.Z,{textColor:"clickupColor",size:4,children:"THE ALL IN ONE MARTIAL ART COMMUNITY".toUpperCase()}),c()]})}),(0,r.jsx)("div",{className:"w-6/12 centerdat ",children:(0,r.jsx)("div",{className:"w-full player-wrapper",children:(0,r.jsx)(Ve.Z,{className:"clickupShadow",url:"https://www.youtube.com/watch?v=BoJBfSbYNKU",config:{youtube:{playerVars:(M={autoplay:0,controls:1,autohide:0,wmode:"opaque",modestbranding:1,color:"blue",rel:0,fs:0},P="controls",V=1,P in M?Object.defineProperty(M,P,{value:V,enumerable:!0,configurable:!0,writable:!0}):M[P]=V,M)}}})})})]}),(0,r.jsxs)("div",{className:"",children:[(0,r.jsx)("div",{className:"flex border-t-2 pb-10",children:C}),(0,r.jsx)("div",{className:"flex space-x-1 mt-10",children:l.activities.map((function(e){return(0,r.jsx)(Ce.Ez,{width:200,height:200,imageUrl:a.ti+o(e.imageUrl),label1:e.name,targetLink:"/martialart/"+e.id})})).slice(0,6)}),(0,r.jsx)("div",{className:"mb-10 flex space-x-1 ",children:l.activities.map((function(e){return(0,r.jsx)(Ce.Ez,{width:200,height:200,imageUrl:a.ti+o(e.imageUrl),label1:e.name,targetLink:"/martialart/"+e.id})})).slice(0,6)}),(0,r.jsx)(Te,{title:"DIVERSE PROFILES",description:"Detailed profiles from all perspectives in the martial arts community",tiles:[["fighter.jpg","Athletes"],["referee.jpg","Referees"],["judge.jpg","Judges"],["instructor.jpg","Teachers"]].map((function(e){return{value:null,name:e[1].toUpperCase(),img:"/"+e[0],subName:null,link:""}})),link:null}),(0,r.jsx)(Te,{flip:!0,title:"TOURNAMENT CREATOR",description:"Seamless tournament creation. Any fight type, any progression format, any scoring system, fully customizable",tiles:(0,r.jsx)(we,{discrete:!1,perView:4,loop:!0,timeDelayMs:2e3,inputData:T.map((function(e){return(0,r.jsx)(Ce.rS,{width:200,height:200,imageUrl:e.img,label1:e.name,targetLink:"/martialart/"+e.id})}))}),overrideTiles:!0,link:null}),(0,r.jsx)(Te,{title:"TECHNIQUE LIBRARY",description:"Learn how do react, defend and attack from any fight position in the fight technique library",tiles:l.positions.map((function(e){return{value:null,name:e.name,img:a.ti+o(e.imageUrl),subName:null,link:"/position/"+e.id}})),link:null}),(0,r.jsxs)("div",{className:"",children:[(0,r.jsx)(Te,{flip:!0,title:"LINEAGE AND RANKS",description:"Browse the worldwide verified list of martial art rank holders, past and present",tiles:(0,r.jsx)("div",{className:"space-y-1",children:[{name:"Cris Cyborg",flag:"br",art:"BJJ",belt:"belt_brown",year:"2001"},{name:"Ronda Rousey",flag:"us",art:"Judo",belt:"belt_black",year:"2001"},{name:"Stephen Thompson",flag:"us",art:"Kickboxing",belt:"belt_black",year:"2001"},{name:"Royce Gracie",flag:"br",art:"BJJ",belt:"belt_black",year:"2001"}].map((function(e){return(0,r.jsxs)("div",{className:a.CS+"flex w-full p-2",children:[(0,r.jsx)("div",{className:"w-1/12",children:B(e.flag,30)}),(0,r.jsx)("p",{className:"w-3/12 customAccentText",children:e.name}),(0,r.jsx)("p",{className:"w-2/12",children:e.art}),(0,r.jsx)("div",{className:"w-3/12",children:ke(e.belt,80)}),(0,r.jsx)("p",{children:e.year})]})}))}),overrideTiles:!0,link:null}),(0,r.jsx)(Te,{title:"RATINGS, REVIEWS, PREDICTIONS",description:"Rate, review and vote on fights to decide the best fights of the year, all time and a range of other categories",tiles:(0,r.jsx)("div",{className:"space-y-1",children:[{fa:"Brock Lesnar",fb:"Frank Mir",art:"MMA",year:"2000",ratingValue:2,totalVotes:35},{fa:"Lenox Lewis",fb:"Mike Tyson",art:"boxing",year:"2000",ratingValue:3.2,totalVotes:85},{fa:"Royce Gracie",fb:"Frank Shamrock",art:"mma",year:"2000",ratingValue:4.5,totalVotes:1223},{fa:"Joe Frazier",fb:"Muhammed Ali",art:"boxing",year:"2000",ratingValue:1,totalVotes:23}].map((function(e){return(0,r.jsxs)("div",{className:a.CS+"flex w-full space-x-10 px-2 py-1",children:[(0,r.jsx)(R,{voteData:e,initialTotalVotes:43,goToLink:"/bout/"}),(0,r.jsx)(w,{}),(0,r.jsx)("div",{className:"customAccentText link w-4/12",children:e.fa}),(0,r.jsx)("p",{children:"vs"}),(0,r.jsx)("div",{className:"customAccentText link w-4/12",children:e.fb}),(0,r.jsx)("p",{className:"w-2/12",children:e.art}),(0,r.jsx)("div",{className:"w-3/12",children:e.year})]})}))}),overrideTiles:!0,link:null})]}),(0,r.jsx)(Te,{title:"ADVANCED FIGHT SEARCH",description:"Browse fight data like never before with fight labels. Search based on moments, win methods, country, time frame, fight promoter and many more",tiles:(0,r.jsx)(De,{}),overrideTiles:!0,flip:!0,link:null}),(0,r.jsx)(Ze,{}),(0,r.jsx)(Te,{title:"FIGHT PROMOTERS",description:"Detailed Fight Promoters pages from around the world with their own internal rankings, records and ratings",tiles:l.promoters.map((function(e){return{value:null,name:null,img:a.ti+o(e.imageUrl),subName:null,link:"/promotion/"+e.id}})),link:null}),(0,r.jsx)(Te,{title:"WORLDWIDE AND LOCAL RANKINGS",description:"Per martial art worldwide, national, division and gender fighter rankings. Track your journey from the 1st fight to world champion",tiles:k,overrideTiles:!0,link:null,flip:!0}),(0,r.jsx)(Te,{title:"FOR YOU FEED",description:"Tailor your content by following Fighters, Promoters and Martial Arts to create a custom update feed",tiles:(0,r.jsx)(F.Z,{variant:"rounded",className:"",src:"./social-graph.jpg",sx:{width:700,height:400}}),overrideTiles:!0,link:null}),(0,r.jsx)("section",{className:" centerdat text-center fadeY",children:(0,r.jsxs)("div",{className:"w-6/12 space-y-2",children:[(0,r.jsxs)(v.Z,{textColor:"text-center w-full justify-center flex ",size:2,children:["START YOUR"," ",(0,r.jsx)("span",{className:"customAccentText pl-4",children:" LEGACY"})]}),(0,r.jsx)("div",{children:"Follow us to get notified when we launch"}),c()]})})]})]})]})}var We=!0;function Ye(e){var t=e.statsData,n=e.featuredData,l=e.trendingPeopleData,o=e.trendingTechniqueData,c=e.favouriteBoutsData,d=e.landingData,u=(0,i.useState)(!1),h=u[0],m=u[1],x=(0,i.useState)([]),f=x[0],p=x[1];if((0,i.useEffect)((function(){m((0,a.r8)()),h&&(0,s.ZD)().then((function(e){console.log("Followed Fighter Feed Debug"),console.log(e),p(e.feed)}))}),[]),0==h)return(0,r.jsx)(He,{landingData:d,statsData:t});var g=f.map((function(e){return(0,r.jsx)("div",{children:(0,r.jsx)(ie,{anchorVerticalCustom:"center",anchorHorizontalCustom:"right",popupContent:(0,r.jsx)("div",{children:(0,r.jsx)(U,{bout:e.postTypeData})}),children:(0,r.jsx)(E(),{href:"/fdfd",children:(0,r.jsx)("a",{children:(0,r.jsxs)("div",{className:"space-x-3 flex",children:[(0,r.jsx)("p",{className:"w-5/12 customAccentText hover:link",children:e.name}),(0,r.jsx)(K.Z,{className:"w-3/12",label:e.postTypeData.activityName}),(0,r.jsx)("p",{children:(0,s.BR)(e.postTypeTimestamp)})]})})})})})})),j=(c.data.slice(0,9).map((function(e){return(0,r.jsx)(U,{bout:e.boutData})})),l.popular.slice(0,5).map((function(e){return(0,r.jsx)("div",{className:"border-b-2 border-blue-500 flex",children:(0,r.jsx)("p",{className:"pl-5 customAccentText hover:link w-10/12 ",children:e.entity.name})})})));j=j.slice(0,8);var y=o.popular.map((function(e){return(0,r.jsxs)("div",{className:"w-3/12",children:[(0,r.jsx)(F.Z,{variant:"rounded",sx:{width:100,height:100},src:a.ti+e.entity.imageUrl}),(0,r.jsx)(v.Z,{textColor:" overflow-hidden",size:5,children:e.entity.name})]})}));y=y.slice(0,8);var b=[(0,r.jsx)(F.Z,{variant:"rounded",sx:{width:250,height:250},src:a.ti+"booty.jpg"}),(0,r.jsx)(F.Z,{variant:"rounded",sx:{width:250,height:250},src:a.ti+"booty2.jpg"}),(0,r.jsx)(F.Z,{variant:"rounded",sx:{width:250,height:250},src:a.ti+"booty3.jpg"}),(0,r.jsx)(F.Z,{variant:"rounded",sx:{width:250,height:250},src:a.ti+"advert2.jpg"})],w=(0,r.jsx)(we,{inputData:b}),N=n.events.map((function(e){return(0,r.jsx)("div",{className:"border-b-2 border-blue-500 text-black",children:(0,r.jsx)(ie,{anchorVerticalCustom:"center",anchorHorizontalCustom:"right",popupContent:(0,r.jsxs)("div",{className:"flex p-4 w-12/12",children:[(0,r.jsx)(F.Z,{variant:"rounded",sx:{width:300,height:400},src:a.ti+e.imageUrl}),B(e.countryCode)]}),children:(0,r.jsx)(E(),{href:"/event/"+e.id,children:(0,r.jsx)("a",{children:(0,r.jsxs)("div",{className:"flex",children:[(0,r.jsx)("p",{className:"w-9/12",children:e.name}),(0,r.jsx)("p",{children:(0,s.BR)(e.dateOfEvent)})]})})})})})}));return(0,r.jsxs)("div",{children:[(0,r.jsx)(H,{}),(0,r.jsx)(je,{mainContent:(0,r.jsxs)("div",{className:"w-full px-5 space-y-2 justify-center",children:[(0,r.jsx)("div",{className:"w-12/12 text-white",children:(0,r.jsx)("div",{className:"flex w-full space-x-1 ",children:w})}),(0,r.jsx)(ve,{displayFilters:!0,showReplies:!0})]}),sideContent:(0,r.jsxs)("div",{className:"w-full px-10 space-y-10",children:[(0,r.jsxs)("div",{className:"w-full text-white bg-gray-300",children:[(0,r.jsx)(v.Z,{textColor:" w-full customAccentBackground text-white",size:3,children:"Trending"}),(0,r.jsx)("div",{className:"w-full border-t-2 space-y-5 pt-3 border-blue-500 text-black",children:j})]}),(0,r.jsxs)("div",{className:"w-full text-white bg-gray-300",children:[(0,r.jsx)(v.Z,{textColor:" w-full customAccentBackground text-white",size:3,children:"Upcoming Events"}),(0,r.jsx)("div",{className:"w-full border-t-2 space-y-5 pt-3 border-blue-500",children:N})]}),(0,r.jsxs)("div",{className:"w-full text-white bg-gray-300",children:[(0,r.jsxs)("div",{className:"flex customAccentBackground w-full ",children:[(0,r.jsx)(v.Z,{textColor:" text-white",size:3,children:"Upcoming Fights"}),(0,r.jsx)("button",{className:"btn ml-10",children:"View All"})]}),(0,r.jsx)("div",{className:"w-full border-t-2 space-y-5 pt-3 border-blue-500 text-black",children:g})]})]})}),(0,r.jsx)("div",{className:"pt-10 pb-10"})]})}}},function(e){e.O(0,[243,572,774,888,179],(function(){return t=75557,e(e.s=t);var t}));var t=e.O();_N_E=t}]);