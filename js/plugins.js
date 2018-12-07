/* HugoGiraudel Countdown.js */
!function(a){"use strict";a.extend=function(b,c){if(b=b||{},arguments.length>2)for(var d=1;d<arguments.length;d++)a.extend(b,arguments[d]);else for(var e in c)b[e]=c[e];return b};var b=function(b){this.conf=a.extend({dateStart:new Date,dateEnd:new Date((new Date).getTime()+864e5),selector:".timer",msgBefore:"Be ready!",msgAfter:"It's over, sorry folks!",msgPattern:"{days} days, {hours} hours, {minutes} minutes and {seconds} seconds left.",onStart:null,onEnd:null,leadingZeros:!1,initialize:!0},b),this.started=!1,this.selector=document.querySelectorAll(this.conf.selector),this.interval=1e3,this.patterns=[{pattern:"{years}",secs:31536e3},{pattern:"{months}",secs:2628e3},{pattern:"{weeks}",secs:604800},{pattern:"{days}",secs:86400},{pattern:"{hours}",secs:3600},{pattern:"{minutes}",secs:60},{pattern:"{seconds}",secs:1}],this.initialize!==!1&&this.initialize()};b.prototype.initialize=function(){return this.defineInterval(),this.isOver()?this.outOfInterval():void this.run()},b.prototype.seconds=function(a){return a.getTime()/1e3},b.prototype.isStarted=function(){return this.seconds(new Date)>=this.seconds(this.conf.dateStart)},b.prototype.isOver=function(){return this.seconds(new Date)>=this.seconds(this.conf.dateEnd)},b.prototype.run=function(){var b,c=this,d=Math.abs(this.seconds(this.conf.dateEnd)-this.seconds(new Date));this.isStarted()?this.display(d):this.outOfInterval(),b=a.setInterval(function(){d--,0>=d?(a.clearInterval(b),c.outOfInterval(),c.callback("end")):c.isStarted()&&(c.started||(c.callback("start"),c.started=!0),c.display(d))},this.interval)},b.prototype.display=function(a){for(var b=this.conf.msgPattern,c=0;c<this.patterns.length;c++){var d=this.patterns[c];if(-1!==this.conf.msgPattern.indexOf(d.pattern)){var e=Math.floor(a/d.secs),f=this.conf.leadingZeros&&9>=e?"0"+e:e;a-=e*d.secs,b=b.replace(d.pattern,f)}}for(var g=0;g<this.selector.length;g++)this.selector[g].innerHTML=b},b.prototype.defineInterval=function(){for(var a=this.patterns.length;a>0;a--){var b=this.patterns[a-1];if(-1!==this.conf.msgPattern.indexOf(b.pattern))return void(this.interval=1e3*b.secs)}},b.prototype.outOfInterval=function(){for(var a=new Date<this.conf.dateStart?this.conf.msgBefore:this.conf.msgAfter,b=0;b<this.selector.length;b++)this.selector[b].innerHTML!==a&&(this.selector[b].innerHTML=a)},b.prototype.callback=function(b){var c=b.capitalize();"function"==typeof this.conf["on"+c]&&this.conf["on"+c](),"undefined"!=typeof a.jQuery&&a.jQuery(this.conf.selector).trigger("countdown"+c)},String.prototype.capitalize=function(){return this.charAt(0).toUpperCase()+this.slice(1)},a.Countdown=b}(window);