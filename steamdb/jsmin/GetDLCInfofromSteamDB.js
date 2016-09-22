var GetDLCInfofromSteamDB={steamDB:{appID:"",appIDBg:"",appIDLogo:"",appIDName:"",configEXE:"",configARG:"",dlcs:{},dlcsTot:0,xml:null},script:{author:"Sak32009",name:"Get DLC Info from SteamDB",steamDB:"https://steamdb.info/app/",homepage:"https://sak32009.github.com/steamdb/",support:"http://cs.rin.ru/forum/viewtopic.php?f=10&t=71837"},yql:"https://query.yahooapis.com/v1/public/yql",format:{},options:{username:{title:"Username",type:"text",placeholder:"..."},game_language:{title:"Game Language",type:"text",placeholder:"english"},auto_download:{title:"Auto downloading file .INI when you click Get DLC List",type:"checkbox"},save_selection:{title:"Save the last selection of the format",type:"checkbox"},save_selection_getDLCList:{title:"When is checked (Save the last selection of the format) and you open the page, automatically submit Get DLC List",type:"checkbox"}},run:function(){GetDLCInfofromSteamDB.steamDB.appID=GetDLCInfofromSteamDB.getParam("appid"),GetDLCInfofromSteamDB.steamDB.appID!==!1&&GetDLCInfofromSteamDB.steamDB.appID.length?$.isNumeric(GetDLCInfofromSteamDB.steamDB.appID)?(GetDLCInfofromSteamDB.overlay("Wait!"),$.get(GetDLCInfofromSteamDB.yql,{q:"SELECT * FROM html WHERE url='"+GetDLCInfofromSteamDB.script.steamDB+GetDLCInfofromSteamDB.steamDB.appID+"'",format:"xml"},function(t){GetDLCInfofromSteamDB.steamDB.xml=$(t),GetDLCInfofromSteamDB.call(),GetDLCInfofromSteamDB.overlay()})):GetDLCInfofromSteamDB.alert("The AppID isn't valid!"):GetDLCInfofromSteamDB.alert("Enter the AppID in search form!")},call:function(){GetDLCInfofromSteamDB.getDataFromSteamDB(),GetDLCInfofromSteamDB.createStyles()
var t=GetDLCInfofromSteamDB.steamDB.xml.find(".tabnav-tab[data-target='#dlc']")
t.length?(GetDLCInfofromSteamDB.createTabOptions("global_options","Global Options",GetDLCInfofromSteamDB.options),GetDLCInfofromSteamDB.createFormatList(),GetDLCInfofromSteamDB.createCustomFormatList(),GetDLCInfofromSteamDB.loadOptions(),GetDLCInfofromSteamDB.events(),$("#GetDLCInfofromSteamDB_nav_tabs .nav-item:first-child .nav-link").tab("show")):GetDLCInfofromSteamDB.alert("This AppID doesn't have DLCs!")},getDataFromSteamDB:function(){GetDLCInfofromSteamDB.steamDB.appIDLogo=GetDLCInfofromSteamDB.steamDB.xml.find("img.app-logo").attr("src"),GetDLCInfofromSteamDB.steamDB.appIDBg=GetDLCInfofromSteamDB.steamDB.xml.find(".header-app.header-wrapper").attr("style"),GetDLCInfofromSteamDB.steamDB.appIDName=GetDLCInfofromSteamDB.steamDB.xml.find("td[itemprop='name']").text().trim(),GetDLCInfofromSteamDB.steamDB.xml.find(".tab-pane#dlc .app[data-appid]").each(function(){var t=$(this),e=t.data("appid"),a=t.find("td:nth-of-type(2)").text().trim()
GetDLCInfofromSteamDB.steamDB.dlcs[e]=a,GetDLCInfofromSteamDB.steamDB.dlcsTot++})
var t=GetDLCInfofromSteamDB.steamDB.xml.find(".tab-pane#config > table:nth-of-type(1) tbody tr:nth-of-type(1)")
GetDLCInfofromSteamDB.steamDB.configEXE=t.find("td:nth-of-type(2)").text().trim(),GetDLCInfofromSteamDB.steamDB.configARG=t.find("td:nth-of-type(3)").text().trim()},createStyles:function(){$("#header").attr("style",GetDLCInfofromSteamDB.steamDB.appIDBg),$("#GetDLCInfofromSteamDB_appIDHeader").attr("src",GetDLCInfofromSteamDB.steamDB.appIDLogo),$("*#GetDLCInfofromSteamDB_appID").text(GetDLCInfofromSteamDB.steamDB.appID),$("*#GetDLCInfofromSteamDB_appIDName").text(GetDLCInfofromSteamDB.steamDB.appIDName),$("*#GetDLCInfofromSteamDB_configEXE").text(GetDLCInfofromSteamDB.steamDB.configEXE),$("*#GetDLCInfofromSteamDB_configARG").text(GetDLCInfofromSteamDB.steamDB.configARG)},createFormatList:function(){var t=$("#GetDLCInfoFromSteamDB_select")
$.each(GetDLCInfofromSteamDB.format,function(e,a){var o=a.name,n=a.options
$("<option>").attr({value:e}).text(o).appendTo(t),GetDLCInfofromSteamDB.createTabOptions(e,o,n)}),"true"==Storage.get("save_selection")&&Storage.check("save_selection_value")&&t.find("option[value='"+Storage.get("save_selection_value")+"']").prop("selected",!0)},events:function(){var t=$("#GetDLCInfoFromSteamDB_submit")
$("form#GetDLCInfoFromSteamDB_submitOptions").submit(function(t){t.preventDefault(),$(this).find("input, select").each(function(){var t=$(this),e=t.val(),a=t.attr("type"),o=t.attr("name")
"checkbox"==a&&(e=t.prop("checked")),Storage.set(o,e)}),alert("Options saved!")}),$("#GetDLCInfoFromSteamDB_resetOptions").click(function(t){t.preventDefault(),Storage.clear(),alert("Restored default options! Wait.."),GetDLCInfofromSteamDB.reloadPage()}),$("#GetDLCInfoFromSteamDB_customFormatNew form").submit(function(t){t.preventDefault()
var e=$(this),a=e.find("input[name='name']"),o=e.find("textarea[name='format']"),n=a.val(),r=o.val()
n.length&&r.length?(a.val(""),o.val(""),CustomFormat.add(n,r),GetDLCInfofromSteamDB.createCustomFormatList(),alert("Added!")):alert("Input(s) empty")}),$(document).on("click","button#GetDLCInfoFromSteamDB_customFormatRemove",function(t){t.preventDefault()
var e=$(this),a=e.closest("tr"),o=a.data("id")
CustomFormat.remove(o),GetDLCInfofromSteamDB.createCustomFormatList(),alert("Removed!")}),$(document).on("click","button#GetDLCInfoFromSteamDB_customFormatSave",function(t){t.preventDefault()
var e=$(this),a=e.closest("tr"),o=a.data("id"),n=a.find("textarea")
n.length?(CustomFormat.save(o,n.val()),GetDLCInfofromSteamDB.createCustomFormatList(),alert("Saved!")):alert("Input(s) empty")}),$(document).on("click","button#GetDLCInfoFromSteamDB_customFormatView",function(t){t.preventDefault()
var e=$(this),a=e.closest("tr"),o=a.data("id"),n=CustomFormat.get(o),r=$("#GetDLCInfoFromSteamDB_customFormatViewModal")
r.find(".modal-title").text(n.name),r.find(".modal-body textarea").val(GetDLCInfofromSteamDB.dlcFormatsStr(n.format)),r.modal("show")}),t.submit(function(t){t.preventDefault()
var e=$(this),a="",o=e.find("#GetDLCInfoFromSteamDB_select option:selected"),n=o.val(),r=GetDLCInfofromSteamDB.format[n],m=r.name,f=r.ini,i=r.data
a+="; "+GetDLCInfofromSteamDB.script.name+" by "+GetDLCInfofromSteamDB.script.author+"\n; Format: "+m+"\n; AppID: "+GetDLCInfofromSteamDB.steamDB.appID+"\n; AppID Name: "+GetDLCInfofromSteamDB.steamDB.appIDName+"\n; Total DLCs: "+GetDLCInfofromSteamDB.steamDB.dlcsTot+"\n; SteamDB: "+GetDLCInfofromSteamDB.script.steamDB+GetDLCInfofromSteamDB.steamDB.appID+"\n; Website: "+GetDLCInfofromSteamDB.script.homepage+"?appid="+GetDLCInfofromSteamDB.steamDB.appID+"\n; Support: "+GetDLCInfofromSteamDB.script.support+"\n\n",a+=GetDLCInfofromSteamDB.dlcFormatsStr(i),$("#GetDLCInfoFromSteamDB_ini").attr({href:Download.data(a),download:f}),$("#GetDLCInfoFromSteamDB_textarea").text(a),"true"==Storage.get("auto_download")&&document.getElementById("GetDLCInfoFromSteamDB_ini").click(),"true"==Storage.get("save_selection")&&Storage.set("save_selection_value",n)}),"true"==Storage.get("save_selection")&&"true"==Storage.get("save_selection_getDLCList")&&t.trigger("submit")},createCustomFormatList:function(){var t="",e=CustomFormat.getAll()
$.each(e,function(e,a){var o=a.name,n=a.format
t+="<tr data-id='"+e+"'>    <td>"+o+"</td>    <td><textarea class='form-control'>"+n+"</textarea></td>    <td>		<div class='btn-group'>			<button type='button' class='btn btn-info' id='GetDLCInfoFromSteamDB_customFormatView'><i class='fa fa-expand' aria-hidden='true'></i> View</button>			<button type='button' class='btn btn-success' id='GetDLCInfoFromSteamDB_customFormatSave'><i class='fa fa-hdd-o' aria-hidden='true'></i> Save</button>			<button type='button' class='btn btn-danger' id='GetDLCInfoFromSteamDB_customFormatRemove'><i class='fa fa-trash' aria-hidden='true'></i> Remove</button>		</div>	</td></tr>"}),$("#GetDLCInfoFromSteamDB_customFormatList table tbody").html(t)},loadOptions:function(){$("form#GetDLCInfoFromSteamDB_submitOptions").find("input, select").each(function(){var t=$(this),e=t.attr("type"),a=t.attr("name"),o=t.prop("tagName"),n=Storage.get(a)
if("SELECT"==o){var r=Storage.check(n)?"value='"+n+"'":"selected"
t.find("option["+r+"]").prop("selected",!0)}else"checkbox"==e?t.prop("checked","true"==n):t.val(n)})},createTabOptions:function(t,e,a){Object.keys(a).length&&($("#GetDLCInfofromSteamDB_nav_tabs").append("<li class='nav-item'><a class='nav-link' data-toggle='tab' href='#"+t+"'>"+e+"</a></li>"),$("#GetDLCInfofromSteamDB_tab_content").append("<div class='tab-pane' id='"+t+"'>   <form id='GetDLCInfoFromSteamDB_submitOptions'>       <div class='card-block'>           <button type='submit' class='btn btn-block btn-success'>Save Options</button>       </div>       <div class='table-responsive'>           <table class='table table-bordered m-b-0'><tbody>"+GetDLCInfofromSteamDB.convertOptions2HTML(a)+"           </tbody></table>       </div>       <div class='card-block'>           <button type='submit' class='btn btn-block btn-success'>Save Options</button>       </div>   </form></div>"))},convertOptions2HTML:function(t){var e=""
return $.each(t,function(t,a){var o=a.title,n=a.type
if(e+="<tr><td>"+o+"</td><td>","text"==n){var r=a.placeholder
e+="<input type='text' class='form-control' name='"+t+"' placeholder='"+r+"'>"}else if("checkbox"==n)e+="<input type='checkbox' name='"+t+"'>"
else if("select"==n){var m=a.options,f=a["default"]
e+="<select class='form-control' name='"+t+"'>",$.each(m,function(t,a){var o=t==f?"selected":""
e+="<option value='"+t+"' "+o+">"+a+"</option>"}),e+="</select>"}e+="</td></tr>"}),e},dlcEach:function(t,e,a,o){var n="",r=e?0:-1
return $.each(GetDLCInfofromSteamDB.steamDB.dlcs,function(e,m){r++,n+=GetDLCInfofromSteamDB.dlcEachFormat(t,{dlc_id:e,dlc_name:m,dlc_index:GetDLCInfofromSteamDB.dlcIndexFormat(r,a,o)})}),n},dlcIndexFormat:function(t,e,a){if(e){var o="0".repeat(a||3),n=o.length-(""+t).length
return n>0?o.substring(0,n)+t:t}return t},dlcEachFormat:function(t,e){return $.each(e,function(e,a){var o=RegExp("{"+e+"}","g")
t=t.replace(o,a)}),t},dlcFormatsStr:function(t){var e=t.match(/\[(\w+)(?:\=(.*))?\]([^\[]+)\[\/(\w+)\]/g)
return null!==e&&e.length&&$.each(e,function(e,a){var o=/\[(\w+)(?:\=(.*))?\]([^\[]+)\[\/(\w+)\]/g.exec(a)
if(null!==o&&o.length){var n=o[1],r=o[2],m=o[3],f=o[4]
if(n==f&&m.length){var i=void 0!==r?r.split(":"):[]
switch(n){case"steamdb":m in GetDLCInfofromSteamDB.steamDB&&(t=t.replace(a,GetDLCInfofromSteamDB.steamDB[m]))
break
case"option":i.length&&(t=t.replace(a,Storage.getDef(m,i[0])))
break
case"dlcEach":t=t.replace(a,GetDLCInfofromSteamDB.dlcEach(m,"true"==i[0],"true"==i[1],i[2]||0))}}}}),t},getParam:function(t){for(var e=window.location.search.substr(1),a=e.split("?"),o=0;o<a.length;o++){var n=a[o].split("="),r=n[0],m=n[1]
if(r==t)return decodeURIComponent(m)}return!1},overlay:function(t){void 0!==t?$(".overlay").show().find(".overlay-text").text(t):$(".overlay").hide()},alert:function(t){$("#main").html("<div class='alert alert-danger m-a-1'>"+t+"</div>")},reloadPage:function(){window.location.reload(!0)}},Download={data:function(t){return"data:text/plain;charset=utf-8,"+encodeURIComponent(t)}},Storage={prefix:"GetDLCInfoFromSteamDB_",get:function(t){return window.localStorage.getItem(this.prefix+t)},getDef:function(t,e){var a=Storage.get(t)
return Storage.check(a)?a:e},set:function(t,e){return window.localStorage.setItem(this.prefix+t,e)},remove:function(t){return window.localStorage.removeItem(this.prefix+t)},clear:function(){window.localStorage.clear()},check:function(t){return null!==t&&t.length}},CustomFormat={set:function(t){Storage.set("custom_format",JSON.stringify(t))},get:function(t){var e=this.getAll()
return e[t]},getAll:function(){var t=Storage.get("custom_format")
return Storage.check(t)?JSON.parse(t):{}},add:function(t,e){var a=this.getAll(),o=(new Date).getTime()
a[o]={name:t,format:e},this.set(a)},save:function(t,e){var a=this.getAll()
t in a&&(a[t].format=e,this.set(a))},remove:function(t){var e=this.getAll()
t in e&&(delete e[t],this.set(e))}}
