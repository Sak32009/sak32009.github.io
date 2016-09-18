var GetDLCInfofromSteamDB = {

    // STEAMDB
    steamDB: {
        appID: "",
        appIDBg: "",
        appIDLogo: "",
        appIDName: "",
        configEXE: "",
        configARG: "",
        dlcs: {},
        dlcsTot: 0,
        xml: null,
    },
    // SCRIPT
    script: {
        author: "Sak32009",
        name: "Get DLC Info from SteamDB",
        steamDB: "https://steamdb.info/app/",
        homepage: "https://sak32009.github.com/steamdb/",
        support: "http://cs.rin.ru/forum/viewtopic.php?f=10&t=71837"
    },
    // YQL
    yql: "https://query.yahooapis.com/v1/public/yql",
    // FORMAT
    format: {},
    // OPTIONS
    options: {
        username: {
            title: "Username",
            type: "text",
            placeholder: "..."
        },
        game_language: {
            title: "Game Language",
            type: "text",
            placeholder: "english"
        },
        auto_download: {
            title: "Auto downloading file .INI when you click Get DLC List",
            type: "checkbox"
        },
        save_selection: {
            title: "Save the last selection of the format",
            type: "checkbox"
        },
        save_selection_getDLCList: {
            title: "When is checked (Save the last selection of the format) and you open the page, automatically submit Get DLC List",
            type: "checkbox"
        }
    },

    // RUN
    run: function() {

        // GET PARAM
        GetDLCInfofromSteamDB.steamDB.appID = GetDLCInfofromSteamDB.getParam("appid");

        if (GetDLCInfofromSteamDB.steamDB.appID !== false && GetDLCInfofromSteamDB.steamDB.appID.length && $.isNumeric(GetDLCInfofromSteamDB.steamDB.appID)) {

            // OVERLAY
            GetDLCInfofromSteamDB.overlay("Wait!");

            // REQUEST TO STEAMDB
            GetDLCInfofromSteamDB.request(GetDLCInfofromSteamDB.yql,
                "SELECT * FROM html WHERE url='" + GetDLCInfofromSteamDB.script.steamDB + GetDLCInfofromSteamDB.steamDB.appID + "'",
                function($xml) {
                    // SAVE DOM
                    GetDLCInfofromSteamDB.steamDB.xml = $xml;
                    // HIDE OVERLAY
                    GetDLCInfofromSteamDB.overlay();
                    // CALL OTHER FUNCTIONS
                    GetDLCInfofromSteamDB.call();
                });

        } else {
            GetDLCInfofromSteamDB.alert("You must enter the appid this: <strong>" + GetDLCInfofromSteamDB.script.homepage + "?appid=ID</strong>");
        }

    },

    // CALL
    call: function() {

        // GET DATA FROM STEAMDB
        GetDLCInfofromSteamDB.getDataFromSteamDB();
        // CREATE STYLES
        GetDLCInfofromSteamDB.createStyles();

        // CHECK
        var $check = GetDLCInfofromSteamDB.steamDB.xml.find(".tabnav-tab[data-target='#dlc']");

        if ($check.length) {
            // LOAD FORMAT LIST
            GetDLCInfofromSteamDB.loadFormatList();
            // GLOBAL OPTIONS
            GetDLCInfofromSteamDB.tabGlobalOptions();
            // SUBMIT OPTIONS
            GetDLCInfofromSteamDB.submitOptions();
            // LOAD OPTIONS
            GetDLCInfofromSteamDB.loadOptions();
            // LOAD CUSTOM FORMAT LIST
            GetDLCInfofromSteamDB.loadCustomFormatList();
            // EVENTS CUSTOM FORMAT LIST
            GetDLCInfofromSteamDB.eventsCustomFormatList();
            // GET DLC LIST
            GetDLCInfofromSteamDB.getDLCList();
        } else {
            GetDLCInfofromSteamDB.alert("This appID doesn't have DLCs!");
        }

    },

    // GET DATA
    getDataFromSteamDB: function() {

        // APPID LOGO
        GetDLCInfofromSteamDB.steamDB.appIDLogo = GetDLCInfofromSteamDB.steamDB.xml.find("img.app-logo").attr("src");
        // APPID BACKGROUND
        GetDLCInfofromSteamDB.steamDB.appIDBg = GetDLCInfofromSteamDB.steamDB.xml.find(".header-app.header-wrapper").attr("style");
        // APPID NAME
        GetDLCInfofromSteamDB.steamDB.appIDName = GetDLCInfofromSteamDB.steamDB.xml.find("td[itemprop='name']").text().trim();

        // DLCs
        GetDLCInfofromSteamDB.steamDB.xml.find(".tab-pane#dlc .app[data-appid]").each(function() {

            var $this = $(this);
            var appID = $this.data("appid");
            var appIDName = $this.find("td:nth-of-type(2)").text().trim();

            GetDLCInfofromSteamDB.steamDB.dlcs[appID] = appIDName;
            GetDLCInfofromSteamDB.steamDB.dlcsTot++;

        });

        // CONFIG
        var $config = GetDLCInfofromSteamDB.steamDB.xml.find(".tab-pane#config > table:nth-of-type(1) tbody tr:nth-of-type(1)");
        // CONFIG EXE
        GetDLCInfofromSteamDB.steamDB.configEXE = $config.find("td:nth-of-type(2)").text().trim();
        // CONFIG ARG
        GetDLCInfofromSteamDB.steamDB.configARG = $config.find("td:nth-of-type(3)").text().trim();

    },

    // CREATE STYLES
    createStyles: function() {

        $("#header").attr("style", GetDLCInfofromSteamDB.steamDB.appIDBg);
        $("#GetDLCInfofromSteamDB_appIDHeader").attr("src", GetDLCInfofromSteamDB.steamDB.appIDLogo);
        $("*#GetDLCInfofromSteamDB_appID").text(GetDLCInfofromSteamDB.steamDB.appID);
        $("*#GetDLCInfofromSteamDB_appIDName").text(GetDLCInfofromSteamDB.steamDB.appIDName);
        $("*#GetDLCInfofromSteamDB_configEXE").text(GetDLCInfofromSteamDB.steamDB.configEXE);
        $("*#GetDLCInfofromSteamDB_configARG").text(GetDLCInfofromSteamDB.steamDB.configARG);

    },

    // LOAD FORMAT LIST
    loadFormatList: function() {

        // SELECT
        var select = $("#GetDLCInfoFromSteamDB_select");

        $.each(GetDLCInfofromSteamDB.format, function(key, values) {

            var name = values.name;
            var options = values.options;

            // ADD OPTION
            $("<option>").attr({
                "value": key
            }).text(name).appendTo(select);

            // FORMAT OPTIONS
            if (Object.keys(options).length) {
                $("#GetDLCInfofromSteamDB_nav_tabs").append("<li class='nav-item'><a class='nav-link' data-toggle='tab' href='#" + key + "'>" + name + "</a></li>");
                $("#GetDLCInfofromSteamDB_tab_content").append(
                    "<div class='tab-pane' id='" + key + "'>" +
                    "   <form id='GetDLCInfoFromSteamDB_submit_options'>" +
                    "       <div class='card-block'>" +
                    "           <button type='submit' class='btn btn-block btn-success'>Save Options</button>" +
                    "       </div>" +
                    "       <div class='table-responsive'>" +
                    "           <table class='table table-bordered m-b-0'><tbody>" +
                    GetDLCInfofromSteamDB.htmlOptions(options) +
                    "           </tbody></table>" +
                    "       </div>" +
                    "       <div class='card-block'>" +
                    "           <button type='submit' class='btn btn-block btn-success'>Save Options</button>" +
                    "       </div>" +
                    "   </form>" +
                    "</div>");
            }

        });

        // ACTIVE FIRST TAB
        $("#GetDLCInfofromSteamDB_nav_tabs .nav-item:first-child .nav-link").tab("show");

        // ..... SAVE SELECTION
        if (Storage.get("save_selection") == "true" && Storage.check("save_selection_value")) {
            select.find("option[value='" + Storage.get("save_selection_value") + "']").prop("selected", true);
        }
        // .....

    },

    // GLOBAL OPTIONS
    tabGlobalOptions: function() {

        $(".GetDLCInfoFromSteamDB_globalOptions table > tbody").html(GetDLCInfofromSteamDB.htmlOptions(GetDLCInfofromSteamDB.options));

    },

    // SUBMIT OPTIONS
    submitOptions: function() {

        // SUBMIT OPTIONS
        $("form#GetDLCInfoFromSteamDB_submit_options").submit(function(e) {

            e.preventDefault();

            // SAVE DATA
            $(this).find("input, select").each(function() {

                var $this = $(this);
                var val = $this.val();
                var type = $this.attr("type");
                var name = $this.attr("name");
                if (type == "checkbox") {
                    val = $this.prop("checked");
                }

                Storage.set(name, val);

            });

            // ALERT
            alert("Saved!");

        });

        // RESET OPTIONS
        $("#GetDLCInfoFromSteamDB_resetOptions").click(function(e) {

            e.preventDefault();

            // CLEAR STORAGE
            Storage.clear();
            // LOAD OPTIONS
            GetDLCInfofromSteamDB.loadOptions();
            // LOAD CUSTOM FORMAT LIST
            GetDLCInfofromSteamDB.loadCustomFormatList();
            // ALERT
            alert("Restored default options!");

        });

    },

    // LOAD OPTIONS
    loadOptions: function() {

        $("form#GetDLCInfoFromSteamDB_submit_options").find("input, select").each(function() {

            var $this = $(this);
            var type = $this.attr("type");
            var name = $this.attr("name");
            var tagName = $this.prop("tagName");
            var item = Storage.get(name);

            if (tagName == "SELECT") {
                var optionSel = Storage.check(item) ? "value='" + item + "'" : "selected";
                $this.find("option[" + optionSel + "]").prop("selected", true);
            } else if (type == "checkbox") {
                $this.prop("checked", item == "true");
            } else {
                $this.val(item);
            }

        });

    },

    // LOAD CUSTOM FORMAT
    loadCustomFormatList: function() {

        // RESULT
        var result = "";
        // ALL CUSTOM FORMAT
        var custom_all = CustomFormat.all();

        $.each(custom_all, function(key, value) {

            var name = value.name;
            var format = value.format;

            result += "<tr data-id='" + key + "'>" +
                "    <td>" + name + "</td>" +
                "    <td><textarea class='form-control' rows='1'>" + format + "</textarea></td>" +
                "    <td><button type='button' class='btn btn-sm btn-info' id='GetDLCInfoFromSteamDB_customFormatView'>View</button></td>" +
                "    <td><button type='button' class='btn btn-sm btn-success' id='GetDLCInfoFromSteamDB_customFormatSave'>Save</button></td>" +
                "    <td><button type='button' class='btn btn-sm btn-danger' id='GetDLCInfoFromSteamDB_customFormatRemove'>Remove</button></td>" +
                "</tr>";

        });

        // ADD TO TABLE
        $("#GetDLCInfoFromSteamDB_customFormatList table tbody").html(result);

    },

    // EVENTS CUSTOM FORMAT LIST
    eventsCustomFormatList: function() {

        // NEW
        $("#GetDLCInfoFromSteamDB_customFormatNew form").submit(function(e) {

            e.preventDefault();

            var $this = $(this);
            var name = $this.find("input[name='name']");
            var format = $this.find("textarea[name='format']");
            var fname = name.val();
            var fformat = format.val();

            if (fname.length && fformat.length) {

                // RESET INPUT
                name.val("");
                format.val("");

                // ADD CUSTOM FORMAT
                CustomFormat.add(fname, fformat);
                // LOAD CUSTOM FORMAT LIST
                GetDLCInfofromSteamDB.loadCustomFormatList();

                // ALERT
                alert("Added!");

            } else {
                alert("Input(s) empty");
            }

        });

        // REMOVE
        $(document).on("click", "button#GetDLCInfoFromSteamDB_customFormatRemove", function(e) {

            e.preventDefault();

            var $this = $(this);
            var tr = $this.closest("tr");
            var id = tr.data("id");

            // REMOVE CUSTOM FORMAT
            CustomFormat.remove(id);
            // LOAD CUSTOM FORMAT LIST
            GetDLCInfofromSteamDB.loadCustomFormatList();

            // ALERT
            alert("Removed!");

        });

        // SAVE
        $(document).on("click", "button#GetDLCInfoFromSteamDB_customFormatSave", function(e) {

            e.preventDefault();

            var $this = $(this);
            var tr = $this.closest("tr");
            var id = tr.data("id");
            var txtarea = tr.find("textarea");

            if (txtarea.length) {

                // ADD CUSTOM FORMAT
                CustomFormat.save(id, txtarea.val());
                // LOAD CUSTOM FORMAT LIST
                GetDLCInfofromSteamDB.loadCustomFormatList();

                // ALERT
                alert("Saved!");

            } else {
                alert("Input(s) empty");
            }

        });

        // VIEW
        $(document).on("click", "button#GetDLCInfoFromSteamDB_customFormatView", function(e) {

            e.preventDefault();

            var $this = $(this);
            var tr = $this.closest("tr");
            var id = tr.data("id");
            var custom_format = CustomFormat.get(id);
            var modal = $("#GetDLCInfoFromSteamDB_customFormatViewModal");
            modal.find(".modal-title").text(custom_format.name);
            modal.find(".modal-body textarea").val(GetDLCInfofromSteamDB.dlcFormatsStr(custom_format.format));
            modal.modal("show");

        });

    },

    // GET DLC LIST
    getDLCList: function() {

        // SUBMIT
        var submt = $("#GetDLCInfoFromSteamDB_submit");

        // EVENT
        submt.submit(function(e) {

            e.preventDefault();

            var $this = $(this);
            var result = "";
            var $select = $this.find("#GetDLCInfoFromSteamDB_select option:selected");
            var format_key = $select.val();
            var format_data = GetDLCInfofromSteamDB.format[format_key];
            var format_title = format_data.name;
            var format_ini = format_data.ini;
            var format_idata = format_data.data;

            // INFO
            result += "; " + GetDLCInfofromSteamDB.script.name + " by " + GetDLCInfofromSteamDB.script.author + "\n" +
                "; Format: " + format_title + "\n" +
                "; AppID: " + GetDLCInfofromSteamDB.steamDB.appID + "\n" +
                "; AppID Name: " + GetDLCInfofromSteamDB.steamDB.appIDName + "\n" +
                "; Total DLCs: " + GetDLCInfofromSteamDB.steamDB.dlcsTot + "\n" +
                "; SteamDB: " + GetDLCInfofromSteamDB.script.steamDB + GetDLCInfofromSteamDB.steamDB.appID + "\n" +
                "; Website: " + GetDLCInfofromSteamDB.script.homepage + "?appid=" + GetDLCInfofromSteamDB.steamDB.appID + "\n" +
                "; Support: " + GetDLCInfofromSteamDB.script.support + "\n\n";

            // FORMAT DATA
            result += GetDLCInfofromSteamDB.dlcFormatsStr(format_idata);

            // FILE INI
            $("#GetDLCInfoFromSteamDB_ini").attr({
                href: Download.data(result),
                download: format_ini
            });

            // RESULT
            $("#GetDLCInfoFromSteamDB_textarea").text(result);

            // ..... AUTO DOWNLOAD
            if (Storage.get("auto_download") == "true") {
                document.getElementById("GetDLCInfoFromSteamDB_ini").click();
            }
            // .....

            // ..... SAVE SELECTION
            if (Storage.get("save_selection") == "true") {
                Storage.set("save_selection_value", format_key);
            }
            // .....

        });

        // ..... SAVE SELECTION GET DLC LIST
        if (Storage.get("save_selection") == "true" && Storage.get("save_selection_getDLCList") == "true") {
            submt.trigger("submit");
        }
        // .....

    },

    // HTML OPTIONS
    htmlOptions: function(options) {

        // RESULT
        var result = "";

        $.each(options, function(key, values) {

            var title = values.title;
            var type = values.type;

            result += "<tr><td>" + title + "</td><td>";

            if (type == "text") {

                var placeholder = values.placeholder;

                result += "<input type='text' class='form-control' name='" + key + "' placeholder='" + placeholder + "'>";

            } else if (type == "checkbox") {

                result += "<input type='checkbox' name='" + key + "'>";

            } else if (type == "select") {

                var select_options = values.options;
                var select_default = values.default;

                result += "<select class='form-control' name='" + key + "'>";

                $.each(select_options, function(key, value) {

                    var selected = key == select_default ? "selected" : "";

                    result += "<option value='" + key + "' " + selected + ">" + value + "</option>";

                });

                result += "</select>";

            }

            result += "</td></tr>";

        });

        return result;

    },

    // DLC EACH
    dlcEach: function(string, from_zero, format_index, format_index_zeros) {

        // RESULT
        var result = "";
        // INDEX START
        var index = from_zero ? 0 : -1;

        $.each(GetDLCInfofromSteamDB.steamDB.dlcs, function(id, name) {

            index++;

            result += GetDLCInfofromSteamDB.dlcEachFormat(string, {
                "dlc_id": id,
                "dlc_name": name,
                "dlc_index": GetDLCInfofromSteamDB.dlcIndexFormat(index, format_index, format_index_zeros)
            });

        });

        return result;

    },

    // DLC INDEX FORMAT
    dlcIndexFormat: function(val, format, zero) {

        if (format) {

            var zeros = "0".repeat(zero || 3);
            var sub = zeros.length - val.toString().length;

            return sub > 0 ? zeros.substring(0, sub) + val : val;

        }

        return val;

    },

    // DLC EACH FORMAT
    dlcEachFormat: function(str, values) {

        $.each(values, function(key, value) {

            var re = new RegExp("{" + key + "}", "g");

            str = str.replace(re, value);

        });

        return str;

    },

    // DLC FORMATS STR
    dlcFormatsStr: function(str) {

        var re_match = str.match(/\[(\w+)(?:\=(.*))?\]([^\[]+)\[\/(\w+)\]/g);

        if (re_match !== null && re_match.length) {

            $.each(re_match, function(i, val) {

                var re_exec = /\[(\w+)(?:\=(.*))?\]([^\[]+)\[\/(\w+)\]/g.exec(val);

                if (re_exec !== null && re_exec.length) {

                    var bbcode_name = re_exec[1];
                    var bbcode_opt = re_exec[2];
                    var bbcode_val = re_exec[3];
                    var bbcode_close = re_exec[4];

                    if (bbcode_name == bbcode_close && bbcode_val.length) {

                        var bbcode_opts = typeof bbcode_opt != "undefined" ? bbcode_opt.split(":") : [];

                        switch (bbcode_name) {
                            case "steamdb":
                                if (bbcode_val in GetDLCInfofromSteamDB.steamDB) {
                                    str = str.replace(val, GetDLCInfofromSteamDB.steamDB[bbcode_val]);
                                }
                                break;
                            case "option":
                                if (bbcode_opts.length) {
                                    str = str.replace(val, Storage.getDef(bbcode_val, bbcode_opts[0]));
                                }
                                break;
                            case "dlcEach":
                                str = str.replace(val, GetDLCInfofromSteamDB.dlcEach(bbcode_val, bbcode_opts[0] == "true", bbcode_opts[1] == "true", bbcode_opts[2] || 0));
                                break;
                        }

                    }

                }

            });

        }

        return str;

    },

    // GET PARAM
    getParam: function(param) {

        var search = window.location.search.substr(1);
        var ssplit = search.split("?");

        for (var i = 0; i < ssplit.length; i++) {

            var qsplit = ssplit[i].split("=");
            var key = qsplit[0];
            var val = qsplit[1];

            if (key == param) {

                return decodeURIComponent(val);

            }

        }

        return false;

    },

    // REQUEST
    request: function(url, query, callback) {

        $.get(url, {
            q: query,
            format: "xml"
        }, function(data) {

            callback($(data));

        });

    },

    // OVERLAY
    overlay: function(txt) {

        if (typeof txt !== "undefined") {

            $(".overlay").show().find(".overlay-text").text(txt);

        } else {

            $(".overlay").hide();

        }

    },

    // ALERT
    alert: function(str) {

        $("#main").html("<div class='alert alert-danger m-a-2'>" + str + "</div>");

    }

};

// DOWNLOAD
var Download = {

    // DATA
    data: function(str) {

        return "data:text/plain;charset=utf-8," + encodeURIComponent(str);

    }

};

// STORAGE
var Storage = {

    // PREFIX DATA
    prefix: "GetDLCInfoFromSteamDB_",

    // GET OPTION
    get: function(name) {

        return window.localStorage.getItem(this.prefix + name);

    },

    // GET OPTION IF NOT EXISTS RETURN DEFAULT
    getDef: function(name, def) {

        var item = Storage.get(name);

        return Storage.check(item) ? item : def;

    },

    // SET OPTION
    set: function(name, val) {

        return window.localStorage.setItem(this.prefix + name, val);

    },

    // REMOVE OPTION
    remove: function(name) {

        return window.localStorage.removeItem(this.prefix + name);

    },

    // CLEAR OPTIONS
    clear: function() {

        window.localStorage.clear();

    },

    // CHECK OPTION
    check: function(item) {

        return item !== null && item.length;

    }

};

// CUSTOM FORMAT
var CustomFormat = {

    // GET ALL
    all: function() {

        var data = Storage.get("custom_format");

        return Storage.check(data) ? JSON.parse(data) : {};

    },

    // ---
    set: function(data) {

        Storage.set("custom_format", JSON.stringify(data));

    },

    // GET CUSTOM FORMAT
    get: function(uniqueid) {

        var data = this.all();

        return data[uniqueid];

    },

    // ADD FORMAT
    add: function(name, val) {

        var data = this.all();
        var uniqueid = "custom_format_" + new Date().getTime();

        data[uniqueid] = {
            "name": name,
            "format": val
        };

        this.set(data);

    },

    // SAVE FORMAT
    save: function(uniqueid, val) {

        var data = this.all();

        if (uniqueid in data) {

            data[uniqueid].format = val;

            this.set(data);

        }

    },

    // REMOVE FORMAT
    remove: function(uniqueid) {

        var data = this.all();

        if (uniqueid in data) {

            delete data[uniqueid];

            this.set(data);

        }

    }

};
