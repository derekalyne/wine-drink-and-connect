(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{14:function(e,t,n){},15:function(e,t,n){},16:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(2),c=n.n(o),i=(n(14),n(3)),l=n(4),s=n(6),u=n(5),m=n(7),d=(n(15),function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(s.a)(this,Object(u.a)(t).call(this,e))).fetch_data=function(){fetch("http://sp19-cs411-46.cs.illinois.edu:8000/api/members/",{method:"GET"}).then(function(e){return console.log(e),e.json()}).catch(function(e){return console.error("Error:",e)}).then(function(e){return e?(n.setState({data:e.data}),n.setState({loading:!1})):alert("Internal Error. The browser is intimidated by some monsters. Maybe refresh and try again."),console.log("Success:",e)})},n.state={data:[]},n}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.state.data.map(function(e){return r.a.createElement("tr",{key:e.netid},r.a.createElement("td",null,e.netid,"  "),r.a.createElement("td",null,e.name))});return r.a.createElement("div",{className:"App"},r.a.createElement("header",{className:"App-header"},r.a.createElement("p",null,"Welcome to the Wine App. The APP in WIP, but you can click the button to interact with our team member database."),r.a.createElement("p",null,"(It invokes GET request from server that will pull member info from db)"),r.a.createElement("button",{onClick:this.fetch_data},"List Member"),r.a.createElement("div",null,e)))}}]),t}(a.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(d,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},8:function(e,t,n){e.exports=n(16)}},[[8,1,2]]]);
//# sourceMappingURL=main.86038b73.chunk.js.map