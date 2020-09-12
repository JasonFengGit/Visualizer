(this.webpackJsonpvisualizer=this.webpackJsonpvisualizer||[]).push([[0],{100:function(t,e,n){},101:function(t,e,n){},108:function(t,e,n){"use strict";n.r(e);var a=n(0),i=n.n(a),s=n(26),r=n.n(s),o=(n(49),n(50),n(9)),l=n(10),c=n(7),h=n(13),u=n(12),d=n(14),g=(n(51),function(t){Object(h.a)(n,t);var e=Object(u.a)(n);function n(){return Object(o.a)(this,n),e.apply(this,arguments)}return Object(l.a)(n,[{key:"render",value:function(){var t=this.props,e=t.row,n=t.col,a=t.isFinish,s=t.isStart,r=t.onMouseDown,o=t.onMouseEnter,l=t.onMouseUp,c=t.isWall,h=a?"node-finish":s?"node-start":c?"node-wall":"";return i.a.createElement("div",{id:"node-".concat(e,"-").concat(n),className:"node ".concat(h),onMouseDown:function(){return r(e,n)},onMouseEnter:function(){return o(e,n)},onMouseUp:function(){return l()}})}}]),n}(a.Component)),m=n(29);function f(t,e,n){var a=[];e.distance=0;for(var i=function(t){var e,n=[],a=Object(m.a)(t);try{for(a.s();!(e=a.n()).done;){var i,s=e.value,r=Object(m.a)(s);try{for(r.s();!(i=r.n()).done;){var o=i.value;n.push(o)}}catch(l){r.e(l)}finally{r.f()}}}catch(l){a.e(l)}finally{a.f()}return n}(t);i.length;){i.sort((function(t,e){return t.distance-e.distance}));var s=i.shift();if(!s.isWall){if(s.distance===1/0)return a;if(s.isVisited=!0,a.push(s),s===n)return a;F(s,t)}}return a}function p(t,e){return Math.floor(Math.random()*(e-t+1)+t)}function v(t){return p(0,t.length-1)}function b(t,e,n){var a=n.row,i=n.col,s=[{row:a+2,col:i},{row:a-2,col:i},{row:a,col:i+2},{row:a,col:i-2}];s=function(t,e){for(var n=t.length,a=t[0].length,i=[],s=0;s<e.length;s++){var r=e[s],o=r.row,l=r.col;0<=o&&o<n&&0<=l&&l<a&&i.push(e[s])}return i}(t,s.slice());var r=[],o=[];return s.forEach((function(t){!function(t,e){for(var n=e.row,a=e.col,i=0;i<t.length;i++){var s=t[i],r=s.row,o=s.col;if(n===r&&a===o)return!0}return!1}(e,t)?o.push(t):r.push(t)})),{c:r,u:o}}function E(t,e,n){var a=e.row,i=e.col;y(t,(a+n.row)/2,(i+n.col)/2,!1)}function y(t,e,n,a){var i=t[e][n],s=Object(d.a)(Object(d.a)({},i),{},{isWall:a});t[e][n]=s}function S(t,e,n){}function k(t,e,n){}function w(t,e,n){}function F(t,e){var n=[],a=t.row,i=t.col;a>0&&n.push(e[a-1][i]),a<e.length-1&&n.push(e[a+1][i]),i>0&&n.push(e[a][i-1]),i<e[0].length-1&&n.push(e[a][i+1]);for(var s=0,r=n;s<r.length;s++){var o=r[s];o.isVisited||(o.distance=t.distance+1,o.previousNode=t)}}n(52);var C=function(t){Object(h.a)(n,t);var e=Object(u.a)(n);function n(t){var a;return Object(o.a)(this,n),(a=e.call(this,t)).state={grid:[],FR:7,FC:31,mouseIsPressed:!1,changingStart:!1,changingFinish:!1,visualized:!1,rendering:!1,numRow:17,numCol:37,SR:7,SC:5,currentAlgorithm:-1,algorithms:["BFS","Dijkstra","A Star","DFS"],pathfindingAlgorithms:[k,f,w,S]},a.visualizePathfinding=a.visualizePathfinding.bind(Object(c.a)(a)),a.clearVisualizer=a.clearVisualizer.bind(Object(c.a)(a)),a.setAlgorithm=a.setAlgorithm.bind(Object(c.a)(a)),a.props.getFunctions(a.visualizePathfinding,a.clearVisualizer,a.setAlgorithm,a.state.algorithms),a}return Object(l.a)(n,[{key:"setAlgorithm",value:function(t){this.setState({currentAlgorithm:t})}},{key:"isRendering",value:function(){return this.state.rendering}},{key:"componentDidMount",value:function(){var t=this.initializeGrid(!1);this.setState({grid:t}),this.state.grid=t}},{key:"initializeGrid",value:function(t){for(var e=[],n=0;n<this.state.numRow;n++){for(var a=[],i=0;i<this.state.numCol;i++){var s=!1,r=document.getElementById("node-".concat(n,"-").concat(i));!r||"node node-path"!==r.className&&"node node-visited"!==r.className||(r.className="node"),!t&&r&&"node node-wall"===r.className&&(s=!0),a.push(this.createNode(n,i,s))}e.push(a)}return e}},{key:"createNode",value:function(t,e,n){return{col:e,row:t,isStart:t===this.state.SR&&e===this.state.SC,isFinish:t===this.state.FR&&e===this.state.FC,distance:1/0,isVisited:!1,isWall:n,previousNode:null}}},{key:"handleMouseDown",value:function(t,e){t===this.state.SR&&e===this.state.SC?this.setState({changingStart:!0}):t===this.state.FR&&e===this.state.FC?this.setState({changingFinish:!0}):this.state.rendering||(this.updateGridWithWall(this.state.grid,t,e),this.setState({mouseIsPressed:!0}))}},{key:"handleMouseEnter",value:function(t,e){if(!this.state.changingStart||t===this.state.FR&&e===this.state.FC)if(!this.state.changingFinish||t===this.state.SR&&e===this.state.SC)this.state.mouseIsPressed&&(this.updateGridWithWall(this.state.grid,t,e),this.setState({mouseIsPressed:!0}));else{var n=document.getElementById("node-".concat(this.state.FR,"-").concat(this.state.FC));n&&(n.className="node",n.isFinish=!1,this.state.grid[this.state.FR][this.state.FC].isFinish=!1);var a=document.getElementById("node-".concat(t,"-").concat(e));a&&(a.isFinish=!0,a.className="node node-finish",this.state.grid[t][e].isFinish=!0),this.setState({FR:t,FC:e})}else{var i=document.getElementById("node-".concat(this.state.SR,"-").concat(this.state.SC));i&&(i.className="node",i.isStart=!1,this.state.grid[this.state.SR][this.state.SC].isStart=!1);var s=document.getElementById("node-".concat(t,"-").concat(e));s&&(s.isStart=!0,s.className="node node-start",this.state.grid[t][e].isStart=!0),i&&s&&this.setState({SR:t,SC:e})}}},{key:"handleMouseUp",value:function(){this.setState({changingStart:!1,changingFinish:!1,mouseIsPressed:!1})}},{key:"updateGridWithWall",value:function(t,e,n){var a=t[e][n],i=Object(d.a)(Object(d.a)({},a),{},{isWall:!a.isWall});t[e][n]=i}},{key:"visualizePathfinding",value:function(){var t=this;if(-1!=this.state.currentAlgorithm&&!this.state.rendering){this.setState({visualized:!0,rendering:!0}),this.props.setVisualizerRendering(!0),this.componentDidMount();for(var e=this.state.grid,n=e[this.state.SR][this.state.SC],a=e[this.state.FR][this.state.FC],i=this.state.pathfindingAlgorithms[this.state.currentAlgorithm](e,n,a),s=function(t){for(var e=[],n=t;null!==n;)e.unshift(n),n=n.previousNode;return e}(a),r=function(t){setTimeout((function(){var e=i[t];e.isStart||e.isFinish||(document.getElementById("node-".concat(e.row,"-").concat(e.col)).className="node node-visited")}),7*t)},o=0;o<i.length;o++)r(o);for(var l=function(t){setTimeout((function(){var e=s[t];e.isStart||e.isFinish||(document.getElementById("node-".concat(e.row,"-").concat(e.col)).className="node node-path")}),7*i.length+50*t)},c=0;c<s.length;c++)l(c);setTimeout((function(){t.setState({rendering:!1}),t.props.setVisualizerRendering(!1)}),7*i.length+50*s.length)}}},{key:"clearVisualizer",value:function(){this.state.rendering||this.setState({grid:this.initializeGrid(!0),visualized:!1})}},{key:"render",value:function(){var t=this,e=this.state.grid;return i.a.createElement(i.a.Fragment,null,i.a.createElement("div",{className:"grid"},e.map((function(e,n){return i.a.createElement("div",{key:n},e.map((function(e,n){var a=e.row,s=e.col,r=e.isFinish,o=e.isStart,l=e.isWall;return i.a.createElement(g,{key:n,row:a,col:s,isStart:o,isFinish:r,isWall:l,mouseIsPressed:t.state.mouseIsPressed,onMouseDown:function(e,n){return t.handleMouseDown(e,n)},onMouseEnter:function(e,n){return t.handleMouseEnter(e,n)},onMouseUp:function(){return t.handleMouseUp()}})})))}))),i.a.createElement("button",{onClick:function(){!function(t){for(var e=t.length,n=t[0].length,a=0;a<e;a++)for(var i=0;i<n;i++)y(t,a,i,!1);for(var s=0;s<e;s++)for(var r=s%2+1;r<n;r+=s%2+1)y(t,s,r,!0);for(var o=0;o<e;o++)y(t,o,0,!0);var l=[],c=[{row:7,col:17}];for(console.log(7,17,c.slice());c.length>0;){var h=v(c),u=c[h];c.splice(h,1);var d=b(t,l=l.concat([u]),u),g=d.c,m=d.u;if(g.length>0){var f=v(g);E(t,u,g[f]),g.splice(f)}c=c.concat(m)}}(t.state.grid),t.setState({finish:!1})},type:"button",class:"btn btn-outline-dark",style:{"margin-top":"5px",height:"30px"},disabled:this.state.rendering},i.a.createElement("p",{style:{"margin-top":"-6px"}},"generate maze")))}}]),n}(a.Component),z=(n(53),n(54),function(t){Object(h.a)(n,t);var e=Object(u.a)(n);function n(){return Object(o.a)(this,n),e.apply(this,arguments)}return Object(l.a)(n,[{key:"render",value:function(){var t=this.props,e=t.val,n=t.isChanging,a=t.finished,s=t.colorSetIndex,r=t.changingColors,o=void 0===r?["rgb(228, 230, 120)","rgb(155, 147, 229)","rgb(248, 250, 140)"]:r,l=t.normalColors,c=void 0===l?["rgb(200,".concat(255*(1-e/45)+50,", 255)"),"rgb(250,200, ".concat(255*(1-e/80),")"),"rgb( ".concat(255*(1-e/80),",200,250)")]:l,h="";n&&(h="-changing"),a&&(h="-finished");var u="-changing"===h?o[s]:c[s];return i.a.createElement(i.a.Fragment,null,i.a.createElement("div",{className:"pile"+h,style:{height:"".concat(8*e,"px"),background:u}},i.a.createElement("p",{className:"value"},e)))}}]),n}(a.Component));function O(t,e,n){var a=t[e];t[e]=t[n],t[n]=a}function A(t){for(var e=[],n=0;n<t.length-1;n++){for(var a=n,i=n+1;i<t.length;i++){t[i]<t[a]&&(a=i);var s={piles:t.slice(),changing:[i]};e.push(s)}O(t,a,n);var r={piles:t.slice(),changing:[a,n]};e.push(r)}return e}function j(t){for(var e=[],n=t.length;n>1;){for(var a=0,i=1;i<n;i++)if(t[i-1]>t[i]){O(t,i-1,i),a=i;var s={piles:t.slice(),changing:[i]};e.push(s)}n=a}return e}function M(t){for(var e=[],n=1;n<t.length;n++)for(var a=n;a>0&&t[a-1]>t[a];a--){O(t,a,a-1);var i={piles:t.slice(),changing:[a-1]};e.push(i)}return console.log(e),e}function P(t){var e=[];return function t(e,n,a,i){if(n===a)return;var s=Math.floor((n+a)/2);t(e,n,s,i),t(e,s+1,a,i),function(t,e,n,a,i){var s=e,r=e,o=n+1,l=t.slice();for(;r<=n&&o<=a;){l[r]<=l[o]?t[s++]=l[r++]:t[s++]=l[o++];var c={piles:t.slice(),changing:[r,o,s]};i.push(c)}for(;r<=n;){t[s++]=l[r++];var h={piles:t.slice(),changing:[r,s]};i.push(h)}for(;o<=a;){t[s++]=l[o++];var u={piles:t.slice(),changing:[o,s]};i.push(u)}}(e,n,s,a,i)}(t,0,t.length-1,e),e}function x(t){var e=[];return function t(e,n,a,i){if(n<a){var s=function(t,e,n,a){for(var i=t[n],s=e-1,r=e;r<=n-1;r++)if(t[r]<i){s++,O(t,s,r);var o={piles:t.slice(),changing:[s,r]};a.push(o)}O(t,s+1,n);var l={piles:t.slice(),changing:[s+1,n]};return a.push(l),a.push(l),s+1}(e,n,a,i);t(e,n,s-1,i),t(e,s+1,a,i)}}(t,0,t.length-1,e),e}var R=function(t){Object(h.a)(n,t);var e=Object(u.a)(n);function n(t){var a;return Object(o.a)(this,n),(a=e.call(this,t)).state={piles:[],numPiles:40,finished:!1,maxPile:80,changingPiles:[],pileDelayTimes:[30,40,40,80,80],colorSetIndex:N(0,3),currentAlgorithm:-1,unsortedPiles:[],algorithms:["Selection Sort","Bubble Sort","Insertion Sort","Merge Sort","Quick Sort"],sortingAlgorithms:[A,j,M,P,x]},a.randomizePiles=a.randomizePiles.bind(Object(c.a)(a)),a.visualizeSorting=a.visualizeSorting.bind(Object(c.a)(a)),a.setAlgorithm=a.setAlgorithm.bind(Object(c.a)(a)),a.props.getFunctions(a.visualizeSorting,a.randomizePiles,a.setAlgorithm,a.state.algorithms),a}return Object(l.a)(n,[{key:"componentDidMount",value:function(){var t=this.initializePiles();this.setState({piles:t}),this.setState({piles:t,unsortedPiles:t.slice()})}},{key:"setAlgorithm",value:function(t){this.state.unsortedPiles!==[]&&this.setState({finished:!1,changingPiles:[],piles:this.state.unsortedPiles}),this.setState({currentAlgorithm:t})}},{key:"initializePiles",value:function(){for(var t=[],e=0;e<this.state.numPiles;e++)t.push(e+5);for(var n=0;n<this.state.numPiles;n++){var a=N(0,n),i=t[n];t[n]=t[a],t[a]=i}return t.push(this.state.numPiles+5),t}},{key:"visualizeSorting",value:function(){var t=this;if(-1!==this.state.currentAlgorithm&&!this.state.rendering){this.state.finished&&(console.log(1),this.state.finished=!1,this.state.changingPiles=[],this.state.piles=this.state.unsortedPiles),this.setState({rendering:!0}),this.props.setVisualizerRendering(!0);for(var e=this.state.piles.slice(),n=this.state.sortingAlgorithms[this.state.currentAlgorithm](e),a=function(e){var a=n[e],i=a.piles,s=a.changing;setTimeout((function(){t.setState({piles:i,changingPiles:s})}),t.state.pileDelayTimes[t.state.currentAlgorithm]*e)},i=0;i<n.length;i++)a(i);setTimeout((function(){t.setState({rendering:!1,finished:!0}),t.props.setVisualizerRendering(!1)}),this.state.pileDelayTimes[this.state.currentAlgorithm]*n.length)}}},{key:"randomizePiles",value:function(){if(!this.state.rendering){this.setState({finished:!1,changingPiles:[],colorSetIndex:N(0,3)});var t=this.initializePiles();this.setState({piles:t,unsortedPiles:t.slice()})}}},{key:"render",value:function(){var t=this,e=this.state.piles;return i.a.createElement(i.a.Fragment,null,i.a.createElement("div",{className:"piles",class:"container"},e.map((function(e,n){return i.a.createElement(z,{dummy:n===t.state.numPiles,finished:t.state.finished,className:"pile",key:n,val:e,isChanging:-1!==t.state.changingPiles.indexOf(n),colorSetIndex:t.state.colorSetIndex})}))))}}]),n}(a.Component);function N(t,e){return Math.floor(Math.random()*e)+t}var I=n(8),V=(n(100),function(t){Object(h.a)(n,t);var e=Object(u.a)(n);function n(t){var a;return Object(o.a)(this,n),(a=e.call(this,t)).state={training:new Array(1e3),rendering:!1,min:-1,max:1,width:500,height:500,count:0,ptron:null,xOff:50,yOff:100,M:.4,B:.3},a.resetVisualizer=a.resetVisualizer.bind(Object(c.a)(a)),a.startVisualizer=a.startVisualizer.bind(Object(c.a)(a)),a.props.getFunctions(a.startVisualizer,a.resetVisualizer),a}return Object(l.a)(n,[{key:"f",value:function(t){return this.state.M*t+this.state.B}},{key:"map",value:function(t,e,n,a,i){return(t-e)/(n-e)*(i-a)+a}},{key:"initialize",value:function(){this.state.ptron=new T(3,.005);for(var t=0;t<this.state.training.length;t++){var e=B(this.state.min,this.state.max),n=B(this.state.min,this.state.max),a=1;n<this.f(e)&&(a=-1),this.state.training[t]={input:[e,n,1],output:a}}}},{key:"resetVisualizer",value:function(){this.state.rendering||(this.setState({count:0}),this.state.count=0)}},{key:"startVisualizer",value:function(){var t=this;this.setState({rendering:!0}),this.props.setVisualizerRendering(!0);for(var e=function(e){setTimeout((function(){t.setState({count:e}),t.state.count=e}),25*e)},n=0;n<this.state.training.length-1;n++)e(n);setTimeout((function(){t.setState({rendering:!1}),t.props.setVisualizerRendering(!1)}),25*this.state.training.length)}},{key:"render",value:function(){0===this.state.count&&this.initialize();var t=this.state.min,e=this.state.max,n=this.state.ptron,a=this.map(t,t,e,0,this.state.width),s=this.map(this.f(t),t,e,this.state.height,0),r=this.map(e,t,e,0,this.state.width),o=this.map(this.f(e),t,e,this.state.height,0),l=n.getWeights(),c=t,h=(-l[2]-l[0]*c)/l[1],u=e,d=(-l[2]-l[0]*u)/l[1];c=this.map(c,t,e,0,this.state.width),h=this.map(h,t,e,this.state.height,0),u=this.map(u,t,e,0,this.state.width),d=this.map(d,t,e,this.state.height,0),n.train(this.state.training[this.state.count].input,this.state.training[this.state.count].output);for(var g=[],m=0;m<this.state.count;m++){var f=n.feedforward(this.state.training[m].input),p=this.map(this.state.training[m].input[0],t,e,0,this.state.width),v=this.map(this.state.training[m].input[1],t,e,this.state.height,0);g.push({x:p,y:v,fill:f<0})}this.state.xOff,this.state.yOff;var b=-l[0]/l[1],E=-l[2]/l[1],y=b-this.state.M,S=E-this.state.B;return i.a.createElement(i.a.Fragment,null,i.a.createElement(I.Stage,{width:2*this.state.width,height:this.state.height+1,className:"stage",id:"stage"},i.a.createElement(I.Layer,null,i.a.createElement(I.Line,{points:[0,0,500,0],stroke:"black"}),i.a.createElement(I.Line,{points:[0,0,0,500],stroke:"black"}),i.a.createElement(I.Line,{points:[0,500,500,500],stroke:"black"}),i.a.createElement(I.Line,{points:[500,0,500,500],stroke:"black",strokeWidth:1}),i.a.createElement(I.Line,{points:[a+0,0+s,r+0,0+o],stroke:"red",strokeWidth:1}),i.a.createElement(I.Line,{points:[c+0,0+h,u+0,0+d],stroke:"blue",strokeWidth:this.state.count>0?1:0}),g.map((function(t,e){return i.a.createElement(I.Circle,{x:t.x+0,y:t.y+0,stroke:"black",radius:3,opacity:.7,fill:t.fill?"black":"white"})})),i.a.createElement(I.Text,{x:550,y:50,text:"Function Form: Y = M * X + B",fontFamily:"Calibri",fill:"black",fontSize:25}),i.a.createElement(I.Text,{x:550,y:80,text:"Original Function: M = ".concat(this.state.M," B = ").concat(this.state.B),fontFamily:"Calibri",fill:"black",fontSize:25}),i.a.createElement(I.Text,{x:550,y:135,text:"Approximation:\nM = ".concat(b,"\nB = ").concat(E),fontFamily:"Calibri",fill:"black",fontSize:25}),i.a.createElement(I.Text,{x:550,y:240,text:"Error:\nM: ".concat(y,"\nB:").concat(S),fontFamily:"Calibri",fill:"red",fontSize:25}))))}}]),n}(a.Component));function B(t,e){return Math.random()*(e-t)+t}var T=function(){function t(e,n){Object(o.a)(this,t),this.weights=new Array(e);for(var a=0;a<this.weights.length;a++)this.weights[a]=B(-1,1);this.c=n}return Object(l.a)(t,[{key:"train",value:function(t,e){for(var n=e-this.feedforward(t),a=0;a<this.weights.length;a++)this.weights[a]+=this.c*n*t[a]}},{key:"feedforward",value:function(t){for(var e=0,n=0;n<this.weights.length;n++)e+=t[n]*this.weights[n];return this.activate(e)}},{key:"activate",value:function(t){return t>0?1:-1}},{key:"getWeights",value:function(){return this.weights}}]),t}(),W=(n(101),function(t){Object(h.a)(n,t);var e=Object(u.a)(n);function n(t){var a;return Object(o.a)(this,n),(a=e.call(this,t)).state={mode:"main",rendering:!1,algorithms:[],currentAlgorithm:null,goFunction:function(){},resetFunction:function(){},setAlgorithm:function(){},sortingClicked:!1,pathClicked:!1},a.getFunctions=a.getFunctions.bind(Object(c.a)(a)),a.changeRenderingState=a.changeRenderingState.bind(Object(c.a)(a)),a}return Object(l.a)(n,[{key:"changeRenderingState",value:function(t){this.setState({rendering:t})}},{key:"getFunctions",value:function(t,e,n,a){this.state.goFunction=t,this.state.resetFunction=e,this.state.setAlgorithm=n,this.state.algorithms=a,this.setState({algorithms:a})}},{key:"render",value:function(){var t=this,e=null;e="pathfinding"===this.state.mode?i.a.createElement(C,{setVisualizerRendering:this.changeRenderingState,getFunctions:this.getFunctions}):"sorting"===this.state.mode?i.a.createElement(R,{setVisualizerRendering:this.changeRenderingState,getFunctions:this.getFunctions}):"perceptron"===this.state.mode?i.a.createElement(V,{setVisualizerRendering:this.changeRenderingState,getFunctions:this.getFunctions}):i.a.createElement("div",{class:"welbotron"},i.a.createElement("div",{class:"container welc"},i.a.createElement("h1",{class:"welcome"},"Hello, algorithms.",i.a.createElement("p",{class:"quote"},'"An algorithm must be seen to be believed."'),i.a.createElement("p",{class:"lead"},"This website might help you understand algorithms better by visualizing them."),i.a.createElement("p",{class:"secondline lead"},"Click on one of the categories below to visualize algorithms.")),i.a.createElement("a",{href:"#",className:"mainpage b",onClick:function(){t.state.rendering||(t.setState({mode:"pathfinding"}),t.setState({currentAlgorithm:null,pathClicked:!0}))},"data-toggle":this.state.pathClicked?"":"modal","data-target":"#pathIntroModal"},i.a.createElement("span",null),"PATH-FINDING"),i.a.createElement("a",{href:"#",className:"mainpage b",onClick:function(){t.state.rendering||t.setState({mode:"sorting",currentAlgorithm:null,sortingClicked:!0})},"data-toggle":this.state.sortingClicked?"":"modal","data-target":"#sortingIntroModal"},i.a.createElement("span",null),"SORTING"),i.a.createElement("a",{href:"#",className:"mainpage b",onClick:function(){t.state.rendering||t.setState({mode:"perceptron"})}},i.a.createElement("span",null),"Machine-Learning")));var n="";"main"===this.state.mode&&(n=" invisible");var a=this.state.algorithms;return i.a.createElement(i.a.Fragment,null,i.a.createElement("nav",{class:"navbar navbar-expand-lg navbar-light fixed-top bg-dark"},i.a.createElement("button",{onClick:function(){t.state.rendering||t.setState({mode:"main"})},type:"button",class:"btn btn-dark navbtn",disabled:this.state.rendering},"Main"),i.a.createElement("button",{onClick:function(){t.state.rendering||(t.setState({mode:"pathfinding"}),t.setState({currentAlgorithm:null,pathClicked:!0}))},type:"button",class:"btn btn-dark navbtn","data-toggle":this.state.pathClicked?"":"modal","data-target":"#pathIntroModal",disabled:this.state.rendering},"Pathfinding"),i.a.createElement("button",{onClick:function(){t.state.rendering||t.setState({mode:"sorting",currentAlgorithm:null,sortingClicked:!0})},type:"button",class:"btn btn-dark navbtn","data-toggle":this.state.sortingClicked?"":"modal","data-target":"#sortingIntroModal",disabled:this.state.rendering},"Sorting"),i.a.createElement("button",{onClick:function(){t.state.rendering||(t.setState({mode:"perceptron"}),t.setState({currentAlgorithm:null}))},type:"button",class:"btn btn-dark navbtn",disabled:this.state.rendering},"MachineLearning"),i.a.createElement("div",{class:"dropdown"+n},i.a.createElement("button",{class:"btn btn-light dropdown-toggle navbtn",type:"button",id:"dropdownMenuButton","data-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"false",disabled:this.state.rendering},"Actions"),i.a.createElement("div",{class:"dropdown-menu","aria-labelledby":"dropdownMenuButton"},i.a.createElement("li",null,i.a.createElement("button",{type:"button",class:"btn btn-light navbtn",onClick:function(){return t.state.goFunction()},"data-toggle":null===this.state.currentAlgorithm?"modal":"","data-target":"#setAlgoModal"},"Go!"),i.a.createElement("button",{type:"button",class:"btn btn-light navbtn",onClick:function(){return t.state.resetFunction()}},"Reset")))),i.a.createElement("div",{class:"dropdown"+n},i.a.createElement("button",{class:"btn btn-secondary dropdown-toggle navbtn",type:"button",id:"dropdownMenuButton","data-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"false",disabled:this.state.rendering},null==this.state.currentAlgorithm?"Algorithms":this.state.currentAlgorithm),i.a.createElement("div",{class:"dropdown-menu","aria-labelledby":"dropdownMenuButton"},i.a.createElement("li",null,a.map((function(e,n){return i.a.createElement("button",{type:"button",class:"btn btn-light navbtn",onClick:function(){t.state.setAlgorithm(n),t.setState({currentAlgorithm:t.state.algorithms[n]})}},e)})))))),i.a.createElement("div",{class:"modal fade",id:"setAlgoModal",role:"dialog"},i.a.createElement("div",{class:"modal-dialog"},i.a.createElement("div",{class:"modal-content"},i.a.createElement("div",{class:"modal-header"},i.a.createElement("h5",{class:"modal-title"},"No Algorithm Selected"),i.a.createElement("button",{type:"button",class:"close","data-dismiss":"modal"},"\xd7")),i.a.createElement("div",{class:"modal-body-alert"},i.a.createElement("p",null,"Please select an algorithm first.")),i.a.createElement("div",{class:"modal-footer"},i.a.createElement("button",{type:"button",class:"btn btn-dark","data-dismiss":"modal",style:{width:"100px"}},"OK"))))),i.a.createElement("div",{class:"modal fade",id:"pathIntroModal",role:"dialog"},i.a.createElement("div",{class:"modal-dialog"},i.a.createElement("div",{class:"modal-content intro"},i.a.createElement("div",{class:"modal-header"},i.a.createElement("h5",{class:"modal-title"},"Pathfinding"),i.a.createElement("button",{type:"button",class:"close","data-dismiss":"modal"},"\xd7")),i.a.createElement("div",{class:"modal-body intro"},i.a.createElement("p",null,'Pathfinding is generally the process of finding a route between two points. It is closely related to the shortest path problem in graph theory, which examines how to identify the "best" paths valued by different criteria (Ex. distance, cost, time consumption).'),i.a.createElement("p",null,"Pathfinding is also similar to Searching in some circumstances. For instance, we can use [breadth-first search] to find the shortest path in a grid world."),i.a.createElement("p",null,"In our scenario, the paths are valued by the number of cells they passed from START:",i.a.createElement("div",{class:"simg",width:"20",height:"20"}),"to the TARGET:",i.a.createElement("div",{class:"fimg",width:"20",height:"20"}),"."),i.a.createElement("p",null,"You may drag the START and TARGET icons to change their positions, and click on the blank nodes to add Walls."),i.a.createElement("p",null,"Now please choose a sorting algorithm and visualize it!"),i.a.createElement("p",{class:"tips"},"(after choosing an algorithm, click on the [Actions] button.)")),i.a.createElement("div",{class:"modal-footer"},i.a.createElement("button",{type:"button",class:"btn btn-dark","data-dismiss":"modal",style:{width:"100px"}},"OK"))))),i.a.createElement("div",{class:"modal fade",id:"sortingIntroModal",role:"dialog"},i.a.createElement("div",{class:"modal-dialog"},i.a.createElement("div",{class:"modal-content intro"},i.a.createElement("div",{class:"modal-header"},i.a.createElement("h5",{class:"modal-title"},"Sorting"),i.a.createElement("button",{type:"button",class:"close","data-dismiss":"modal"},"\xd7")),i.a.createElement("div",{class:"modal-body intro"},i.a.createElement("p",null,"Sorting is a process of arranging an ordered sequence. It is a common operation in many applications."),i.a.createElement("p",null,"Common uses of sorted sequences are:",i.a.createElement("div",{class:"uses-list"},i.a.createElement("p",null,"\xb7lookup or search efficiently"),i.a.createElement("p",null,"\xb7merge sequences efficiently"),i.a.createElement("p",null,"\xb7process data in a defined order")),"Now please choose a sorting algorithm and visualize it!"),i.a.createElement("p",{class:"tips"},"(after choosing an algorithm, click on the [Actions] button.)")),i.a.createElement("div",{class:"modal-footer"},i.a.createElement("button",{type:"button",class:"btn btn-dark","data-dismiss":"modal",style:{width:"100px"}},"OK"))))),i.a.createElement("div",null,i.a.createElement("div",null,e)))}}]),n}(a.Component)),G=(n(40),n(103),n(41),n(44));var D=function(){return i.a.createElement(i.a.Fragment,null,i.a.createElement("meta",{charset:"utf-8"}),i.a.createElement("meta",{name:"viewport",content:"width=device-width, initial-scale=1, shrink-to-fit=no"}),i.a.createElement("link",{rel:"stylesheet",href:"https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css",integrity:"sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z",crossorigin:"anonymous"}),i.a.createElement("div",{className:"App"},i.a.createElement(G.a,{basename:"JasonFengGit.github.io/"},i.a.createElement(W,null))),i.a.createElement("script",{src:"https://code.jquery.com/jquery-3.5.1.slim.min.js",integrity:"sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj",crossorigin:"anonymous"}),i.a.createElement("script",{src:"https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js",integrity:"sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN",crossorigin:"anonymous"}),i.a.createElement("script",{src:"https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js",integrity:"sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV",crossorigin:"anonymous"}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(i.a.createElement(D,{class:"app"}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()}))},45:function(t,e,n){t.exports=n(108)},49:function(t,e,n){},50:function(t,e,n){},51:function(t,e,n){},52:function(t,e,n){},53:function(t,e,n){},54:function(t,e,n){}},[[45,1,2]]]);
//# sourceMappingURL=main.b9586fea.chunk.js.map