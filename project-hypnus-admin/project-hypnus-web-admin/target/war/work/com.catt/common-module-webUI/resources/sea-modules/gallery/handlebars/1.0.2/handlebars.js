define("gallery/handlebars/1.0.2/handlebars",[],function(t,e,s){var i={};(function(t,e){t.VERSION="1.0.0-rc.4",t.COMPILER_REVISION=3,t.REVISION_CHANGES={1:"<= 1.0.rc.2",2:"== 1.0.0-rc.3",3:">= 1.0.0-rc.4"},t.helpers={},t.partials={};var s=Object.prototype.toString,i="[object Function]",n="[object Object]";t.registerHelper=function(e,i,r){if(s.call(e)===n){if(r||i)throw new t.Exception("Arg not supported with multiple helpers");t.Utils.extend(this.helpers,e)}else r&&(i.not=r),this.helpers[e]=i},t.registerPartial=function(e,i){s.call(e)===n?t.Utils.extend(this.partials,e):this.partials[e]=i},t.registerHelper("helperMissing",function(t){if(2===arguments.length)return e;throw Error("Could not find property '"+t+"'")}),t.registerHelper("blockHelperMissing",function(e,n){var r=n.inverse||function(){},o=n.fn,a=s.call(e);return a===i&&(e=e.call(this)),e===!0?o(this):e===!1||null==e?r(this):"[object Array]"===a?e.length>0?t.helpers.each(e,n):r(this):o(e)}),t.K=function(){},t.createFrame=Object.create||function(e){t.K.prototype=e;var s=new t.K;return t.K.prototype=null,s},t.logger={DEBUG:0,INFO:1,WARN:2,ERROR:3,level:3,methodMap:{0:"debug",1:"info",2:"warn",3:"error"},log:function(e,s){if(e>=t.logger.level){var i=t.logger.methodMap[e];"undefined"!=typeof console&&console[i]&&console[i].call(console,s)}}},t.log=function(e,s){t.logger.log(e,s)},t.registerHelper("each",function(e,s){var i,n=s.fn,r=s.inverse,o=0,a="";if(s.data&&(i=t.createFrame(s.data)),e&&"object"==typeof e)if(e instanceof Array)for(var h=e.length;h>o;o++)i&&(i.index=o),a+=n(e[o],{data:i});else for(var l in e)e.hasOwnProperty(l)&&(i&&(i.key=l),a+=n(e[l],{data:i}),o++);return 0===o&&(a=r(this)),a}),t.registerHelper("if",function(e,n){var r=s.call(e);return r===i&&(e=e.call(this)),!e||t.Utils.isEmpty(e)?n.inverse(this):n.fn(this)}),t.registerHelper("unless",function(e,s){return t.helpers["if"].call(this,e,{fn:s.inverse,inverse:s.fn})}),t.registerHelper("with",function(s,i){return t.Utils.isEmpty(s)?e:i.fn(s)}),t.registerHelper("log",function(e,s){var i=s.data&&null!=s.data.level?parseInt(s.data.level,10):1;t.log(i,e)});var r=function(){function t(){this.yy={}}var s={trace:function(){},yy:{},symbols_:{error:2,root:3,program:4,EOF:5,simpleInverse:6,statements:7,statement:8,openInverse:9,closeBlock:10,openBlock:11,mustache:12,partial:13,CONTENT:14,COMMENT:15,OPEN_BLOCK:16,inMustache:17,CLOSE:18,OPEN_INVERSE:19,OPEN_ENDBLOCK:20,path:21,OPEN:22,OPEN_UNESCAPED:23,OPEN_PARTIAL:24,partialName:25,params:26,hash:27,DATA:28,param:29,STRING:30,INTEGER:31,BOOLEAN:32,hashSegments:33,hashSegment:34,ID:35,EQUALS:36,PARTIAL_NAME:37,pathSegments:38,SEP:39,$accept:0,$end:1},terminals_:{2:"error",5:"EOF",14:"CONTENT",15:"COMMENT",16:"OPEN_BLOCK",18:"CLOSE",19:"OPEN_INVERSE",20:"OPEN_ENDBLOCK",22:"OPEN",23:"OPEN_UNESCAPED",24:"OPEN_PARTIAL",28:"DATA",30:"STRING",31:"INTEGER",32:"BOOLEAN",35:"ID",36:"EQUALS",37:"PARTIAL_NAME",39:"SEP"},productions_:[0,[3,2],[4,2],[4,3],[4,2],[4,1],[4,1],[4,0],[7,1],[7,2],[8,3],[8,3],[8,1],[8,1],[8,1],[8,1],[11,3],[9,3],[10,3],[12,3],[12,3],[13,3],[13,4],[6,2],[17,3],[17,2],[17,2],[17,1],[17,1],[26,2],[26,1],[29,1],[29,1],[29,1],[29,1],[29,1],[27,1],[33,2],[33,1],[34,3],[34,3],[34,3],[34,3],[34,3],[25,1],[21,1],[38,3],[38,1]],performAction:function(t,e,s,i,n,r){var o=r.length-1;switch(n){case 1:return r[o-1];case 2:this.$=new i.ProgramNode([],r[o]);break;case 3:this.$=new i.ProgramNode(r[o-2],r[o]);break;case 4:this.$=new i.ProgramNode(r[o-1],[]);break;case 5:this.$=new i.ProgramNode(r[o]);break;case 6:this.$=new i.ProgramNode([],[]);break;case 7:this.$=new i.ProgramNode([]);break;case 8:this.$=[r[o]];break;case 9:r[o-1].push(r[o]),this.$=r[o-1];break;case 10:this.$=new i.BlockNode(r[o-2],r[o-1].inverse,r[o-1],r[o]);break;case 11:this.$=new i.BlockNode(r[o-2],r[o-1],r[o-1].inverse,r[o]);break;case 12:this.$=r[o];break;case 13:this.$=r[o];break;case 14:this.$=new i.ContentNode(r[o]);break;case 15:this.$=new i.CommentNode(r[o]);break;case 16:this.$=new i.MustacheNode(r[o-1][0],r[o-1][1]);break;case 17:this.$=new i.MustacheNode(r[o-1][0],r[o-1][1]);break;case 18:this.$=r[o-1];break;case 19:this.$=new i.MustacheNode(r[o-1][0],r[o-1][1]);break;case 20:this.$=new i.MustacheNode(r[o-1][0],r[o-1][1],!0);break;case 21:this.$=new i.PartialNode(r[o-1]);break;case 22:this.$=new i.PartialNode(r[o-2],r[o-1]);break;case 23:break;case 24:this.$=[[r[o-2]].concat(r[o-1]),r[o]];break;case 25:this.$=[[r[o-1]].concat(r[o]),null];break;case 26:this.$=[[r[o-1]],r[o]];break;case 27:this.$=[[r[o]],null];break;case 28:this.$=[[new i.DataNode(r[o])],null];break;case 29:r[o-1].push(r[o]),this.$=r[o-1];break;case 30:this.$=[r[o]];break;case 31:this.$=r[o];break;case 32:this.$=new i.StringNode(r[o]);break;case 33:this.$=new i.IntegerNode(r[o]);break;case 34:this.$=new i.BooleanNode(r[o]);break;case 35:this.$=new i.DataNode(r[o]);break;case 36:this.$=new i.HashNode(r[o]);break;case 37:r[o-1].push(r[o]),this.$=r[o-1];break;case 38:this.$=[r[o]];break;case 39:this.$=[r[o-2],r[o]];break;case 40:this.$=[r[o-2],new i.StringNode(r[o])];break;case 41:this.$=[r[o-2],new i.IntegerNode(r[o])];break;case 42:this.$=[r[o-2],new i.BooleanNode(r[o])];break;case 43:this.$=[r[o-2],new i.DataNode(r[o])];break;case 44:this.$=new i.PartialNameNode(r[o]);break;case 45:this.$=new i.IdNode(r[o]);break;case 46:r[o-2].push(r[o]),this.$=r[o-2];break;case 47:this.$=[r[o]]}},table:[{3:1,4:2,5:[2,7],6:3,7:4,8:6,9:7,11:8,12:9,13:10,14:[1,11],15:[1,12],16:[1,13],19:[1,5],22:[1,14],23:[1,15],24:[1,16]},{1:[3]},{5:[1,17]},{5:[2,6],7:18,8:6,9:7,11:8,12:9,13:10,14:[1,11],15:[1,12],16:[1,13],19:[1,19],20:[2,6],22:[1,14],23:[1,15],24:[1,16]},{5:[2,5],6:20,8:21,9:7,11:8,12:9,13:10,14:[1,11],15:[1,12],16:[1,13],19:[1,5],20:[2,5],22:[1,14],23:[1,15],24:[1,16]},{17:23,18:[1,22],21:24,28:[1,25],35:[1,27],38:26},{5:[2,8],14:[2,8],15:[2,8],16:[2,8],19:[2,8],20:[2,8],22:[2,8],23:[2,8],24:[2,8]},{4:28,6:3,7:4,8:6,9:7,11:8,12:9,13:10,14:[1,11],15:[1,12],16:[1,13],19:[1,5],20:[2,7],22:[1,14],23:[1,15],24:[1,16]},{4:29,6:3,7:4,8:6,9:7,11:8,12:9,13:10,14:[1,11],15:[1,12],16:[1,13],19:[1,5],20:[2,7],22:[1,14],23:[1,15],24:[1,16]},{5:[2,12],14:[2,12],15:[2,12],16:[2,12],19:[2,12],20:[2,12],22:[2,12],23:[2,12],24:[2,12]},{5:[2,13],14:[2,13],15:[2,13],16:[2,13],19:[2,13],20:[2,13],22:[2,13],23:[2,13],24:[2,13]},{5:[2,14],14:[2,14],15:[2,14],16:[2,14],19:[2,14],20:[2,14],22:[2,14],23:[2,14],24:[2,14]},{5:[2,15],14:[2,15],15:[2,15],16:[2,15],19:[2,15],20:[2,15],22:[2,15],23:[2,15],24:[2,15]},{17:30,21:24,28:[1,25],35:[1,27],38:26},{17:31,21:24,28:[1,25],35:[1,27],38:26},{17:32,21:24,28:[1,25],35:[1,27],38:26},{25:33,37:[1,34]},{1:[2,1]},{5:[2,2],8:21,9:7,11:8,12:9,13:10,14:[1,11],15:[1,12],16:[1,13],19:[1,19],20:[2,2],22:[1,14],23:[1,15],24:[1,16]},{17:23,21:24,28:[1,25],35:[1,27],38:26},{5:[2,4],7:35,8:6,9:7,11:8,12:9,13:10,14:[1,11],15:[1,12],16:[1,13],19:[1,19],20:[2,4],22:[1,14],23:[1,15],24:[1,16]},{5:[2,9],14:[2,9],15:[2,9],16:[2,9],19:[2,9],20:[2,9],22:[2,9],23:[2,9],24:[2,9]},{5:[2,23],14:[2,23],15:[2,23],16:[2,23],19:[2,23],20:[2,23],22:[2,23],23:[2,23],24:[2,23]},{18:[1,36]},{18:[2,27],21:41,26:37,27:38,28:[1,45],29:39,30:[1,42],31:[1,43],32:[1,44],33:40,34:46,35:[1,47],38:26},{18:[2,28]},{18:[2,45],28:[2,45],30:[2,45],31:[2,45],32:[2,45],35:[2,45],39:[1,48]},{18:[2,47],28:[2,47],30:[2,47],31:[2,47],32:[2,47],35:[2,47],39:[2,47]},{10:49,20:[1,50]},{10:51,20:[1,50]},{18:[1,52]},{18:[1,53]},{18:[1,54]},{18:[1,55],21:56,35:[1,27],38:26},{18:[2,44],35:[2,44]},{5:[2,3],8:21,9:7,11:8,12:9,13:10,14:[1,11],15:[1,12],16:[1,13],19:[1,19],20:[2,3],22:[1,14],23:[1,15],24:[1,16]},{14:[2,17],15:[2,17],16:[2,17],19:[2,17],20:[2,17],22:[2,17],23:[2,17],24:[2,17]},{18:[2,25],21:41,27:57,28:[1,45],29:58,30:[1,42],31:[1,43],32:[1,44],33:40,34:46,35:[1,47],38:26},{18:[2,26]},{18:[2,30],28:[2,30],30:[2,30],31:[2,30],32:[2,30],35:[2,30]},{18:[2,36],34:59,35:[1,60]},{18:[2,31],28:[2,31],30:[2,31],31:[2,31],32:[2,31],35:[2,31]},{18:[2,32],28:[2,32],30:[2,32],31:[2,32],32:[2,32],35:[2,32]},{18:[2,33],28:[2,33],30:[2,33],31:[2,33],32:[2,33],35:[2,33]},{18:[2,34],28:[2,34],30:[2,34],31:[2,34],32:[2,34],35:[2,34]},{18:[2,35],28:[2,35],30:[2,35],31:[2,35],32:[2,35],35:[2,35]},{18:[2,38],35:[2,38]},{18:[2,47],28:[2,47],30:[2,47],31:[2,47],32:[2,47],35:[2,47],36:[1,61],39:[2,47]},{35:[1,62]},{5:[2,10],14:[2,10],15:[2,10],16:[2,10],19:[2,10],20:[2,10],22:[2,10],23:[2,10],24:[2,10]},{21:63,35:[1,27],38:26},{5:[2,11],14:[2,11],15:[2,11],16:[2,11],19:[2,11],20:[2,11],22:[2,11],23:[2,11],24:[2,11]},{14:[2,16],15:[2,16],16:[2,16],19:[2,16],20:[2,16],22:[2,16],23:[2,16],24:[2,16]},{5:[2,19],14:[2,19],15:[2,19],16:[2,19],19:[2,19],20:[2,19],22:[2,19],23:[2,19],24:[2,19]},{5:[2,20],14:[2,20],15:[2,20],16:[2,20],19:[2,20],20:[2,20],22:[2,20],23:[2,20],24:[2,20]},{5:[2,21],14:[2,21],15:[2,21],16:[2,21],19:[2,21],20:[2,21],22:[2,21],23:[2,21],24:[2,21]},{18:[1,64]},{18:[2,24]},{18:[2,29],28:[2,29],30:[2,29],31:[2,29],32:[2,29],35:[2,29]},{18:[2,37],35:[2,37]},{36:[1,61]},{21:65,28:[1,69],30:[1,66],31:[1,67],32:[1,68],35:[1,27],38:26},{18:[2,46],28:[2,46],30:[2,46],31:[2,46],32:[2,46],35:[2,46],39:[2,46]},{18:[1,70]},{5:[2,22],14:[2,22],15:[2,22],16:[2,22],19:[2,22],20:[2,22],22:[2,22],23:[2,22],24:[2,22]},{18:[2,39],35:[2,39]},{18:[2,40],35:[2,40]},{18:[2,41],35:[2,41]},{18:[2,42],35:[2,42]},{18:[2,43],35:[2,43]},{5:[2,18],14:[2,18],15:[2,18],16:[2,18],19:[2,18],20:[2,18],22:[2,18],23:[2,18],24:[2,18]}],defaultActions:{17:[2,1],25:[2,28],38:[2,26],57:[2,24]},parseError:function(t){throw Error(t)},parse:function(t){function s(){var t;return t=i.lexer.lex()||1,"number"!=typeof t&&(t=i.symbols_[t]||t),t}var i=this,n=[0],r=[null],o=[],a=this.table,h="",l=0,c=0,p=0;this.lexer.setInput(t),this.lexer.yy=this.yy,this.yy.lexer=this.lexer,this.yy.parser=this,this.lexer.yylloc===e&&(this.lexer.yylloc={});var u=this.lexer.yylloc;o.push(u);var f=this.lexer.options&&this.lexer.options.ranges;"function"==typeof this.yy.parseError&&(this.parseError=this.yy.parseError);for(var g,d,m,y,v,k,S,x,b,E={};;){if(m=n[n.length-1],this.defaultActions[m]?y=this.defaultActions[m]:((null===g||g===e)&&(g=s()),y=a[m]&&a[m][g]),y===e||!y.length||!y[0]){var N="";if(!p){b=[];for(k in a[m])this.terminals_[k]&&k>2&&b.push("'"+this.terminals_[k]+"'");N=this.lexer.showPosition?"Parse error on line "+(l+1)+":\n"+this.lexer.showPosition()+"\nExpecting "+b.join(", ")+", got '"+(this.terminals_[g]||g)+"'":"Parse error on line "+(l+1)+": Unexpected "+(1==g?"end of input":"'"+(this.terminals_[g]||g)+"'"),this.parseError(N,{text:this.lexer.match,token:this.terminals_[g]||g,line:this.lexer.yylineno,loc:u,expected:b})}}if(y[0]instanceof Array&&y.length>1)throw Error("Parse Error: multiple actions possible at state: "+m+", token: "+g);switch(y[0]){case 1:n.push(g),r.push(this.lexer.yytext),o.push(this.lexer.yylloc),n.push(y[1]),g=null,d?(g=d,d=null):(c=this.lexer.yyleng,h=this.lexer.yytext,l=this.lexer.yylineno,u=this.lexer.yylloc,p>0&&p--);break;case 2:if(S=this.productions_[y[1]][1],E.$=r[r.length-S],E._$={first_line:o[o.length-(S||1)].first_line,last_line:o[o.length-1].last_line,first_column:o[o.length-(S||1)].first_column,last_column:o[o.length-1].last_column},f&&(E._$.range=[o[o.length-(S||1)].range[0],o[o.length-1].range[1]]),v=this.performAction.call(E,h,c,l,this.yy,y[1],r,o),v!==e)return v;S&&(n=n.slice(0,2*-1*S),r=r.slice(0,-1*S),o=o.slice(0,-1*S)),n.push(this.productions_[y[1]][0]),r.push(E.$),o.push(E._$),x=a[n[n.length-2]][n[n.length-1]],n.push(x);break;case 3:return!0}}return!0}},i=function(){var t={EOF:1,parseError:function(t,e){if(!this.yy.parser)throw Error(t);this.yy.parser.parseError(t,e)},setInput:function(t){return this._input=t,this._more=this._less=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},input:function(){var t=this._input[0];this.yytext+=t,this.yyleng++,this.offset++,this.match+=t,this.matched+=t;var e=t.match(/(?:\r\n?|\n).*/g);return e?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),t},unput:function(t){var e=t.length,s=t.split(/(?:\r\n?|\n)/g);this._input=t+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-e-1),this.offset-=e;var i=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),s.length-1&&(this.yylineno-=s.length-1);var n=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:s?(s.length===i.length?this.yylloc.first_column:0)+i[i.length-s.length].length-s[0].length:this.yylloc.first_column-e},this.options.ranges&&(this.yylloc.range=[n[0],n[0]+this.yyleng-e]),this},more:function(){return this._more=!0,this},less:function(t){this.unput(this.match.slice(t))},pastInput:function(){var t=this.matched.substr(0,this.matched.length-this.match.length);return(t.length>20?"...":"")+t.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var t=this.match;return 20>t.length&&(t+=this._input.substr(0,20-t.length)),(t.substr(0,20)+(t.length>20?"...":"")).replace(/\n/g,"")},showPosition:function(){var t=this.pastInput(),e=Array(t.length+1).join("-");return t+this.upcomingInput()+"\n"+e+"^"},next:function(){if(this.done)return this.EOF;this._input||(this.done=!0);var t,s,i,n,r;this._more||(this.yytext="",this.match="");for(var o=this._currentRules(),a=0;o.length>a&&(i=this._input.match(this.rules[o[a]]),!i||s&&!(i[0].length>s[0].length)||(s=i,n=a,this.options.flex));a++);return s?(r=s[0].match(/(?:\r\n?|\n).*/g),r&&(this.yylineno+=r.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:r?r[r.length-1].length-r[r.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+s[0].length},this.yytext+=s[0],this.match+=s[0],this.matches=s,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._input=this._input.slice(s[0].length),this.matched+=s[0],t=this.performAction.call(this,this.yy,this,o[n],this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),t?t:e):""===this._input?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+". Unrecognized text.\n"+this.showPosition(),{text:"",token:null,line:this.yylineno})},lex:function(){var t=this.next();return t!==e?t:this.lex()},begin:function(t){this.conditionStack.push(t)},popState:function(){return this.conditionStack.pop()},_currentRules:function(){return this.conditions[this.conditionStack[this.conditionStack.length-1]].rules},topState:function(){return this.conditionStack[this.conditionStack.length-2]},pushState:function(t){this.begin(t)}};return t.options={},t.performAction=function(t,e,s,i){switch(s){case 0:return e.yytext="\\",14;case 1:if("\\"!==e.yytext.slice(-1)&&this.begin("mu"),"\\"===e.yytext.slice(-1)&&(e.yytext=e.yytext.substr(0,e.yyleng-1),this.begin("emu")),e.yytext)return 14;break;case 2:return 14;case 3:return"\\"!==e.yytext.slice(-1)&&this.popState(),"\\"===e.yytext.slice(-1)&&(e.yytext=e.yytext.substr(0,e.yyleng-1)),14;case 4:return e.yytext=e.yytext.substr(0,e.yyleng-4),this.popState(),15;case 5:return this.begin("par"),24;case 6:return 16;case 7:return 20;case 8:return 19;case 9:return 19;case 10:return 23;case 11:return 23;case 12:this.popState(),this.begin("com");break;case 13:return e.yytext=e.yytext.substr(3,e.yyleng-5),this.popState(),15;case 14:return 22;case 15:return 36;case 16:return 35;case 17:return 35;case 18:return 39;case 19:break;case 20:return this.popState(),18;case 21:return this.popState(),18;case 22:return e.yytext=e.yytext.substr(1,e.yyleng-2).replace(/\\"/g,'"'),30;case 23:return e.yytext=e.yytext.substr(1,e.yyleng-2).replace(/\\'/g,"'"),30;case 24:return e.yytext=e.yytext.substr(1),28;case 25:return 32;case 26:return 32;case 27:return 31;case 28:return 35;case 29:return e.yytext=e.yytext.substr(1,e.yyleng-2),35;case 30:return"INVALID";case 31:break;case 32:return this.popState(),37;case 33:return 5}},t.rules=[/^(?:\\\\(?=(\{\{)))/,/^(?:[^\x00]*?(?=(\{\{)))/,/^(?:[^\x00]+)/,/^(?:[^\x00]{2,}?(?=(\{\{|$)))/,/^(?:[\s\S]*?--\}\})/,/^(?:\{\{>)/,/^(?:\{\{#)/,/^(?:\{\{\/)/,/^(?:\{\{\^)/,/^(?:\{\{\s*else\b)/,/^(?:\{\{\{)/,/^(?:\{\{&)/,/^(?:\{\{!--)/,/^(?:\{\{![\s\S]*?\}\})/,/^(?:\{\{)/,/^(?:=)/,/^(?:\.(?=[}/ ]))/,/^(?:\.\.)/,/^(?:[\/.])/,/^(?:\s+)/,/^(?:\}\}\})/,/^(?:\}\})/,/^(?:"(\\["]|[^"])*")/,/^(?:'(\\[']|[^'])*')/,/^(?:@[a-zA-Z]+)/,/^(?:true(?=[}\s]))/,/^(?:false(?=[}\s]))/,/^(?:-?[0-9]+(?=[}\s]))/,/^(?:[a-zA-Z0-9_$:\-]+(?=[=}\s\/.]))/,/^(?:\[[^\]]*\])/,/^(?:.)/,/^(?:\s+)/,/^(?:[a-zA-Z0-9_$\-\/]+)/,/^(?:$)/],t.conditions={mu:{rules:[5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,33],inclusive:!1},emu:{rules:[3],inclusive:!1},com:{rules:[4],inclusive:!1},par:{rules:[31,32],inclusive:!1},INITIAL:{rules:[0,1,2,33],inclusive:!0}},t}();return s.lexer=i,t.prototype=s,s.Parser=t,new t}();t.Parser=r,t.parse=function(e){return e.constructor===t.AST.ProgramNode?e:(t.Parser.yy=t.AST,t.Parser.parse(e))},t.AST={},t.AST.ProgramNode=function(e,s){this.type="program",this.statements=e,s&&(this.inverse=new t.AST.ProgramNode(s))},t.AST.MustacheNode=function(t,e,s){this.type="mustache",this.escaped=!s,this.hash=e;var i=this.id=t[0],n=this.params=t.slice(1),r=this.eligibleHelper=i.isSimple;this.isHelper=r&&(n.length||e)},t.AST.PartialNode=function(t,e){this.type="partial",this.partialName=t,this.context=e},t.AST.BlockNode=function(e,s,i,n){var r=function(e,s){if(e.original!==s.original)throw new t.Exception(e.original+" doesn't match "+s.original)};r(e.id,n),this.type="block",this.mustache=e,this.program=s,this.inverse=i,this.inverse&&!this.program&&(this.isInverse=!0)},t.AST.ContentNode=function(t){this.type="content",this.string=t},t.AST.HashNode=function(t){this.type="hash",this.pairs=t},t.AST.IdNode=function(e){this.type="ID",this.original=e.join(".");for(var s=[],i=0,n=0,r=e.length;r>n;n++){var o=e[n];if(".."===o||"."===o||"this"===o){if(s.length>0)throw new t.Exception("Invalid path: "+this.original);".."===o?i++:this.isScoped=!0}else s.push(o)}this.parts=s,this.string=s.join("."),this.depth=i,this.isSimple=1===e.length&&!this.isScoped&&0===i,this.stringModeValue=this.string},t.AST.PartialNameNode=function(t){this.type="PARTIAL_NAME",this.name=t},t.AST.DataNode=function(t){this.type="DATA",this.id=t},t.AST.StringNode=function(t){this.type="STRING",this.string=t,this.stringModeValue=t},t.AST.IntegerNode=function(t){this.type="INTEGER",this.integer=t,this.stringModeValue=Number(t)},t.AST.BooleanNode=function(t){this.type="BOOLEAN",this.bool=t,this.stringModeValue="true"===t},t.AST.CommentNode=function(t){this.type="comment",this.comment=t};var o=["description","fileName","lineNumber","message","name","number","stack"];t.Exception=function(){for(var t=Error.prototype.constructor.apply(this,arguments),e=0;o.length>e;e++)this[o[e]]=t[o[e]]},t.Exception.prototype=Error(),t.SafeString=function(t){this.string=t},t.SafeString.prototype.toString=function(){return""+this.string};var a={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},h=/[&<>"'`]/g,l=/[&<>"'`]/,c=function(t){return a[t]||"&amp;"};t.Utils={extend:function(t,e){for(var s in e)e.hasOwnProperty(s)&&(t[s]=e[s])},escapeExpression:function(e){return e instanceof t.SafeString?""+e:null==e||e===!1?"":(e=""+e,l.test(e)?e.replace(h,c):e)},isEmpty:function(t){return t||0===t?"[object Array]"===s.call(t)&&0===t.length?!0:!1:!0}};var p=t.Compiler=function(){},u=t.JavaScriptCompiler=function(){};p.prototype={compiler:p,disassemble:function(){for(var t,e,s,i=this.opcodes,n=[],r=0,o=i.length;o>r;r++)if(t=i[r],"DECLARE"===t.opcode)n.push("DECLARE "+t.name+"="+t.value);else{e=[];for(var a=0;t.args.length>a;a++)s=t.args[a],"string"==typeof s&&(s='"'+s.replace("\n","\\n")+'"'),e.push(s);n.push(t.opcode+" "+e.join(" "))}return n.join("\n")},equals:function(t){var e=this.opcodes.length;if(t.opcodes.length!==e)return!1;for(var s=0;e>s;s++){var i=this.opcodes[s],n=t.opcodes[s];if(i.opcode!==n.opcode||i.args.length!==n.args.length)return!1;for(var r=0;i.args.length>r;r++)if(i.args[r]!==n.args[r])return!1}if(e=this.children.length,t.children.length!==e)return!1;for(s=0;e>s;s++)if(!this.children[s].equals(t.children[s]))return!1;return!0},guid:0,compile:function(t,e){this.children=[],this.depths={list:[]},this.options=e;var s=this.options.knownHelpers;if(this.options.knownHelpers={helperMissing:!0,blockHelperMissing:!0,each:!0,"if":!0,unless:!0,"with":!0,log:!0},s)for(var i in s)this.options.knownHelpers[i]=s[i];return this.program(t)},accept:function(t){return this[t.type](t)},program:function(t){var e,s=t.statements;this.opcodes=[];for(var i=0,n=s.length;n>i;i++)e=s[i],this[e.type](e);return this.isSimple=1===n,this.depths.list=this.depths.list.sort(function(t,e){return t-e}),this},compileProgram:function(t){var e,s=(new this.compiler).compile(t,this.options),i=this.guid++;this.usePartial=this.usePartial||s.usePartial,this.children[i]=s;for(var n=0,r=s.depths.list.length;r>n;n++)e=s.depths.list[n],2>e||this.addDepth(e-1);return i},block:function(t){var e=t.mustache,s=t.program,i=t.inverse;s&&(s=this.compileProgram(s)),i&&(i=this.compileProgram(i));var n=this.classifyMustache(e);"helper"===n?this.helperMustache(e,s,i):"simple"===n?(this.simpleMustache(e),this.opcode("pushProgram",s),this.opcode("pushProgram",i),this.opcode("emptyHash"),this.opcode("blockValue")):(this.ambiguousMustache(e,s,i),this.opcode("pushProgram",s),this.opcode("pushProgram",i),this.opcode("emptyHash"),this.opcode("ambiguousBlockValue")),this.opcode("append")},hash:function(t){var e,s,i=t.pairs;this.opcode("pushHash");for(var n=0,r=i.length;r>n;n++)e=i[n],s=e[1],this.options.stringParams?(s.depth&&this.addDepth(s.depth),this.opcode("getContext",s.depth||0),this.opcode("pushStringParam",s.stringModeValue,s.type)):this.accept(s),this.opcode("assignToHash",e[0]);this.opcode("popHash")},partial:function(t){var e=t.partialName;this.usePartial=!0,t.context?this.ID(t.context):this.opcode("push","depth0"),this.opcode("invokePartial",e.name),this.opcode("append")},content:function(t){this.opcode("appendContent",t.string)},mustache:function(t){var e=this.options,s=this.classifyMustache(t);"simple"===s?this.simpleMustache(t):"helper"===s?this.helperMustache(t):this.ambiguousMustache(t),t.escaped&&!e.noEscape?this.opcode("appendEscaped"):this.opcode("append")},ambiguousMustache:function(t,e,s){var i=t.id,n=i.parts[0],r=null!=e||null!=s;this.opcode("getContext",i.depth),this.opcode("pushProgram",e),this.opcode("pushProgram",s),this.opcode("invokeAmbiguous",n,r)},simpleMustache:function(t){var e=t.id;"DATA"===e.type?this.DATA(e):e.parts.length?this.ID(e):(this.addDepth(e.depth),this.opcode("getContext",e.depth),this.opcode("pushContext")),this.opcode("resolvePossibleLambda")},helperMustache:function(t,e,s){var i=this.setupFullMustacheParams(t,e,s),n=t.id.parts[0];if(this.options.knownHelpers[n])this.opcode("invokeKnownHelper",i.length,n);else{if(this.options.knownHelpersOnly)throw Error("You specified knownHelpersOnly, but used the unknown helper "+n);this.opcode("invokeHelper",i.length,n)}},ID:function(t){this.addDepth(t.depth),this.opcode("getContext",t.depth);var e=t.parts[0];e?this.opcode("lookupOnContext",t.parts[0]):this.opcode("pushContext");for(var s=1,i=t.parts.length;i>s;s++)this.opcode("lookup",t.parts[s])},DATA:function(t){this.options.data=!0,this.opcode("lookupData",t.id)},STRING:function(t){this.opcode("pushString",t.string)},INTEGER:function(t){this.opcode("pushLiteral",t.integer)},BOOLEAN:function(t){this.opcode("pushLiteral",t.bool)},comment:function(){},opcode:function(t){this.opcodes.push({opcode:t,args:[].slice.call(arguments,1)})},declare:function(t,e){this.opcodes.push({opcode:"DECLARE",name:t,value:e})},addDepth:function(t){if(isNaN(t))throw Error("EWOT");0!==t&&(this.depths[t]||(this.depths[t]=!0,this.depths.list.push(t)))},classifyMustache:function(t){var e=t.isHelper,s=t.eligibleHelper,i=this.options;if(s&&!e){var n=t.id.parts[0];i.knownHelpers[n]?e=!0:i.knownHelpersOnly&&(s=!1)}return e?"helper":s?"ambiguous":"simple"},pushParams:function(t){for(var e,s=t.length;s--;)e=t[s],this.options.stringParams?(e.depth&&this.addDepth(e.depth),this.opcode("getContext",e.depth||0),this.opcode("pushStringParam",e.stringModeValue,e.type)):this[e.type](e)},setupMustacheParams:function(t){var e=t.params;return this.pushParams(e),t.hash?this.hash(t.hash):this.opcode("emptyHash"),e},setupFullMustacheParams:function(t,e,s){var i=t.params;return this.pushParams(i),this.opcode("pushProgram",e),this.opcode("pushProgram",s),t.hash?this.hash(t.hash):this.opcode("emptyHash"),i}};var f=function(t){this.value=t};u.prototype={nameLookup:function(t,e){return/^[0-9]+$/.test(e)?t+"["+e+"]":u.isValidJavaScriptVariableName(e)?t+"."+e:t+"['"+e+"']"},appendToBuffer:function(t){return this.environment.isSimple?"return "+t+";":{appendToBuffer:!0,content:t,toString:function(){return"buffer += "+t+";"}}},initializeBuffer:function(){return this.quotedString("")},namespace:"Handlebars",compile:function(e,s,i,n){this.environment=e,this.options=s||{},t.log(t.logger.DEBUG,this.environment.disassemble()+"\n\n"),this.name=this.environment.name,this.isChild=!!i,this.context=i||{programs:[],environments:[],aliases:{}},this.preamble(),this.stackSlot=0,this.stackVars=[],this.registers={list:[]},this.compileStack=[],this.inlineStack=[],this.compileChildren(e,s);var r,o=e.opcodes;for(this.i=0,y=o.length;y>this.i;this.i++)r=o[this.i],"DECLARE"===r.opcode?this[r.name]=r.value:this[r.opcode].apply(this,r.args);return this.createFunctionContext(n)},nextOpcode:function(){var t=this.environment.opcodes;return t[this.i+1]},eat:function(){this.i=this.i+1},preamble:function(){var t=[];if(this.isChild)t.push("");else{var e=this.namespace,s="helpers = helpers || "+e+".helpers;";this.environment.usePartial&&(s=s+" partials = partials || "+e+".partials;"),this.options.data&&(s+=" data = data || {};"),t.push(s)}this.environment.isSimple?t.push(""):t.push(", buffer = "+this.initializeBuffer()),this.lastContext=0,this.source=t},createFunctionContext:function(e){var s=this.stackVars.concat(this.registers.list);if(s.length>0&&(this.source[1]=this.source[1]+", "+s.join(", ")),!this.isChild)for(var i in this.context.aliases)this.source[1]=this.source[1]+", "+i+"="+this.context.aliases[i];this.source[1]&&(this.source[1]="var "+this.source[1].substring(2)+";"),this.isChild||(this.source[1]+="\n"+this.context.programs.join("\n")+"\n"),this.environment.isSimple||this.source.push("return buffer;");for(var n=this.isChild?["depth0","data"]:["Handlebars","depth0","helpers","partials","data"],r=0,o=this.environment.depths.list.length;o>r;r++)n.push("depth"+this.environment.depths.list[r]);var a=this.mergeSource();if(!this.isChild){var h=t.COMPILER_REVISION,l=t.REVISION_CHANGES[h];a="this.compilerInfo = ["+h+",'"+l+"'];\n"+a}if(e)return n.push(a),Function.apply(this,n);var c="function "+(this.name||"")+"("+n.join(",")+") {\n  "+a+"}";return t.log(t.logger.DEBUG,c+"\n\n"),c},mergeSource:function(){for(var t,s="",i=0,n=this.source.length;n>i;i++){var r=this.source[i];r.appendToBuffer?t=t?t+"\n    + "+r.content:r.content:(t&&(s+="buffer += "+t+";\n  ",t=e),s+=r+"\n  ")}return s},blockValue:function(){this.context.aliases.blockHelperMissing="helpers.blockHelperMissing";var t=["depth0"];this.setupParams(0,t),this.replaceStack(function(e){return t.splice(1,0,e),"blockHelperMissing.call("+t.join(", ")+")"})},ambiguousBlockValue:function(){this.context.aliases.blockHelperMissing="helpers.blockHelperMissing";var t=["depth0"];this.setupParams(0,t);var e=this.topStack();t.splice(1,0,e),t[t.length-1]="options",this.source.push("if (!"+this.lastHelper+") { "+e+" = blockHelperMissing.call("+t.join(", ")+"); }")},appendContent:function(t){this.source.push(this.appendToBuffer(this.quotedString(t)))},append:function(){this.flushInline();var t=this.popStack();this.source.push("if("+t+" || "+t+" === 0) { "+this.appendToBuffer(t)+" }"),this.environment.isSimple&&this.source.push("else { "+this.appendToBuffer("''")+" }")},appendEscaped:function(){this.context.aliases.escapeExpression="this.escapeExpression",this.source.push(this.appendToBuffer("escapeExpression("+this.popStack()+")"))},getContext:function(t){this.lastContext!==t&&(this.lastContext=t)},lookupOnContext:function(t){this.push(this.nameLookup("depth"+this.lastContext,t,"context"))},pushContext:function(){this.pushStackLiteral("depth"+this.lastContext)},resolvePossibleLambda:function(){this.context.aliases.functionType='"function"',this.replaceStack(function(t){return"typeof "+t+" === functionType ? "+t+".apply(depth0) : "+t})},lookup:function(t){this.replaceStack(function(e){return e+" == null || "+e+" === false ? "+e+" : "+this.nameLookup(e,t,"context")})},lookupData:function(t){this.push(this.nameLookup("data",t,"data"))},pushStringParam:function(t,e){this.pushStackLiteral("depth"+this.lastContext),this.pushString(e),"string"==typeof t?this.pushString(t):this.pushStackLiteral(t)},emptyHash:function(){this.pushStackLiteral("{}"),this.options.stringParams&&(this.register("hashTypes","{}"),this.register("hashContexts","{}"))},pushHash:function(){this.hash={values:[],types:[],contexts:[]}},popHash:function(){var t=this.hash;this.hash=e,this.options.stringParams&&(this.register("hashContexts","{"+t.contexts.join(",")+"}"),this.register("hashTypes","{"+t.types.join(",")+"}")),this.push("{\n    "+t.values.join(",\n    ")+"\n  }")},pushString:function(t){this.pushStackLiteral(this.quotedString(t))},push:function(t){return this.inlineStack.push(t),t},pushLiteral:function(t){this.pushStackLiteral(t)},pushProgram:function(t){null!=t?this.pushStackLiteral(this.programExpression(t)):this.pushStackLiteral(null)},invokeHelper:function(t,e){this.context.aliases.helperMissing="helpers.helperMissing";var s=this.lastHelper=this.setupHelper(t,e,!0);this.push(s.name),this.replaceStack(function(t){return t+" ? "+t+".call("+s.callParams+") "+": helperMissing.call("+s.helperMissingParams+")"})},invokeKnownHelper:function(t,e){var s=this.setupHelper(t,e);this.push(s.name+".call("+s.callParams+")")},invokeAmbiguous:function(t,e){this.context.aliases.functionType='"function"',this.pushStackLiteral("{}");var s=this.setupHelper(0,t,e),i=this.lastHelper=this.nameLookup("helpers",t,"helper"),n=this.nameLookup("depth"+this.lastContext,t,"context"),r=this.nextStack();this.source.push("if ("+r+" = "+i+") { "+r+" = "+r+".call("+s.callParams+"); }"),this.source.push("else { "+r+" = "+n+"; "+r+" = typeof "+r+" === functionType ? "+r+".apply(depth0) : "+r+"; }")},invokePartial:function(t){var e=[this.nameLookup("partials",t,"partial"),"'"+t+"'",this.popStack(),"helpers","partials"];this.options.data&&e.push("data"),this.context.aliases.self="this",this.push("self.invokePartial("+e.join(", ")+")")},assignToHash:function(t){var e,s,i=this.popStack();this.options.stringParams&&(s=this.popStack(),e=this.popStack());var n=this.hash;e&&n.contexts.push("'"+t+"': "+e),s&&n.types.push("'"+t+"': "+s),n.values.push("'"+t+"': ("+i+")")},compiler:u,compileChildren:function(t,e){for(var s,i,n=t.children,r=0,o=n.length;o>r;r++){s=n[r],i=new this.compiler;var a=this.matchExistingProgram(s);null==a?(this.context.programs.push(""),a=this.context.programs.length,s.index=a,s.name="program"+a,this.context.programs[a]=i.compile(s,e,this.context),this.context.environments[a]=s):(s.index=a,s.name="program"+a)}},matchExistingProgram:function(t){for(var e=0,s=this.context.environments.length;s>e;e++){var i=this.context.environments[e];if(i&&i.equals(t))return e}},programExpression:function(t){if(this.context.aliases.self="this",null==t)return"self.noop";
    for(var e,s=this.environment.children[t],i=s.depths.list,n=[s.index,s.name,"data"],r=0,o=i.length;o>r;r++)e=i[r],1===e?n.push("depth0"):n.push("depth"+(e-1));return(0===i.length?"self.program(":"self.programWithDepth(")+n.join(", ")+")"},register:function(t,e){this.useRegister(t),this.source.push(t+" = "+e+";")},useRegister:function(t){this.registers[t]||(this.registers[t]=!0,this.registers.list.push(t))},pushStackLiteral:function(t){return this.push(new f(t))},pushStack:function(t){this.flushInline();var e=this.incrStack();return t&&this.source.push(e+" = "+t+";"),this.compileStack.push(e),e},replaceStack:function(t){var e,s="",i=this.isInline();if(i){var n=this.popStack(!0);if(n instanceof f)e=n.value;else{var r=this.stackSlot?this.topStackName():this.incrStack();s="("+this.push(r)+" = "+n+"),",e=this.topStack()}}else e=this.topStack();var o=t.call(this,e);return i?((this.inlineStack.length||this.compileStack.length)&&this.popStack(),this.push("("+s+o+")")):(/^stack/.test(e)||(e=this.nextStack()),this.source.push(e+" = ("+s+o+");")),e},nextStack:function(){return this.pushStack()},incrStack:function(){return this.stackSlot++,this.stackSlot>this.stackVars.length&&this.stackVars.push("stack"+this.stackSlot),this.topStackName()},topStackName:function(){return"stack"+this.stackSlot},flushInline:function(){var t=this.inlineStack;if(t.length){this.inlineStack=[];for(var e=0,s=t.length;s>e;e++){var i=t[e];i instanceof f?this.compileStack.push(i):this.pushStack(i)}}},isInline:function(){return this.inlineStack.length},popStack:function(t){var e=this.isInline(),s=(e?this.inlineStack:this.compileStack).pop();return!t&&s instanceof f?s.value:(e||this.stackSlot--,s)},topStack:function(t){var e=this.isInline()?this.inlineStack:this.compileStack,s=e[e.length-1];return!t&&s instanceof f?s.value:s},quotedString:function(t){return'"'+t.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/\u2028/g,"\\u2028").replace(/\u2029/g,"\\u2029")+'"'},setupHelper:function(t,e,s){var i=[];this.setupParams(t,i,s);var n=this.nameLookup("helpers",e,"helper");return{params:i,name:n,callParams:["depth0"].concat(i).join(", "),helperMissingParams:s&&["depth0",this.quotedString(e)].concat(i).join(", ")}},setupParams:function(t,e,s){var i,n,r,o=[],a=[],h=[];o.push("hash:"+this.popStack()),n=this.popStack(),r=this.popStack(),(r||n)&&(r||(this.context.aliases.self="this",r="self.noop"),n||(this.context.aliases.self="this",n="self.noop"),o.push("inverse:"+n),o.push("fn:"+r));for(var l=0;t>l;l++)i=this.popStack(),e.push(i),this.options.stringParams&&(h.push(this.popStack()),a.push(this.popStack()));return this.options.stringParams&&(o.push("contexts:["+a.join(",")+"]"),o.push("types:["+h.join(",")+"]"),o.push("hashContexts:hashContexts"),o.push("hashTypes:hashTypes")),this.options.data&&o.push("data:data"),o="{"+o.join(",")+"}",s?(this.register("options",o),e.push("options")):e.push(o),e.join(", ")}};for(var g="break else new var case finally return void catch for switch while continue function this with default if throw delete in try do instanceof typeof abstract enum int short boolean export interface static byte extends long super char final native synchronized class float package throws const goto private transient debugger implements protected volatile double import public let yield".split(" "),d=u.RESERVED_WORDS={},m=0,y=g.length;y>m;m++)d[g[m]]=!0;u.isValidJavaScriptVariableName=function(t){return!u.RESERVED_WORDS[t]&&/^[a-zA-Z_$][0-9a-zA-Z_$]+$/.test(t)?!0:!1},t.precompile=function(e,s){if(null==e||"string"!=typeof e&&e.constructor!==t.AST.ProgramNode)throw new t.Exception("You must pass a string or Handlebars AST to Handlebars.precompile. You passed "+e);s=s||{},"data"in s||(s.data=!0);var i=t.parse(e),n=(new p).compile(i,s);return(new u).compile(n,s)},t.compile=function(s,i){function n(){var n=t.parse(s),r=(new p).compile(n,i),o=(new u).compile(r,i,e,!0);return t.template(o)}if(null==s||"string"!=typeof s&&s.constructor!==t.AST.ProgramNode)throw new t.Exception("You must pass a string or Handlebars AST to Handlebars.compile. You passed "+s);i=i||{},"data"in i||(i.data=!0);var r;return function(t,e){return r||(r=n()),r.call(this,t,e)}},t.VM={template:function(e){var s={escapeExpression:t.Utils.escapeExpression,invokePartial:t.VM.invokePartial,programs:[],program:function(e,s,i){var n=this.programs[e];return i?n=t.VM.program(e,s,i):n||(n=this.programs[e]=t.VM.program(e,s)),n},programWithDepth:t.VM.programWithDepth,noop:t.VM.noop,compilerInfo:null};return function(i,n){n=n||{};var r=e.call(s,t,i,n.helpers,n.partials,n.data),o=s.compilerInfo||[],a=o[0]||1,h=t.COMPILER_REVISION;if(a!==h){if(h>a){var l=t.REVISION_CHANGES[h],c=t.REVISION_CHANGES[a];throw"Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version ("+l+") or downgrade your runtime to an older version ("+c+")."}throw"Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version ("+o[1]+")."}return r}},programWithDepth:function(t,e,s){var i=Array.prototype.slice.call(arguments,3),n=function(t,n){return n=n||{},e.apply(this,[t,n.data||s].concat(i))};return n.program=t,n.depth=i.length,n},program:function(t,e,s){var i=function(t,i){return i=i||{},e(t,i.data||s)};return i.program=t,i.depth=0,i},noop:function(){return""},invokePartial:function(s,i,n,r,o,a){var h={helpers:r,partials:o,data:a};if(s===e)throw new t.Exception("The partial "+i+" could not be found");if(s instanceof Function)return s(n,h);if(t.compile)return o[i]=t.compile(s,{data:a!==e}),o[i](n,h);throw new t.Exception("The partial "+i+" could not be compiled when running in runtime-only mode")}},t.template=t.VM.template})(i),s.exports=i});
