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
        xml: null
    },
    // SCRIPT
    script: {
        author: "Sak32009",
        name: "Get DLC Info from SteamDB",
        steamDB: "https://steamdb.info/app/",
        homepage: "https://sak32009.github.com/steamdb/?appid=",
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
            title: "Game language",
            type: "text",
            placeholder: "english"
        },
        auto_download: {
            title: "Automatically download file .INI",
            type: "checkbox"
        },
        save_selection: {
            title: "Save the last selection of the format",
            type: "checkbox"
        },
        auto_submit: {
            title: "Automatically submit format when you open the page",
            type: "checkbox"
        },
        ignore_steamdb_unknown_app: {
            title: "Ignore DLCs 'SteamDB Unknown App'",
            type: "checkbox"
        }
    },

    // RUN
    run: function () {

        // GET APPID
        GetDLCInfofromSteamDB.steamDB.appID = GetDLCInfofromSteamDB.getParam("appid");

        if (GetDLCInfofromSteamDB.steamDB.appID !== false && GetDLCInfofromSteamDB.steamDB.appID.length) {

            if ($.isNumeric(GetDLCInfofromSteamDB.steamDB.appID)) {

                // FROM CACHE
                var cache = $(CacheAppID.get(GetDLCInfofromSteamDB.steamDB.appID));

                if (cache.length) {

                    // SAVE DOM
                    GetDLCInfofromSteamDB.steamDB.xml = cache;
                    // CALL OTHER FUNCTIONS
                    GetDLCInfofromSteamDB.call();
                    // CACHE STATUS
                    GetDLCInfofromSteamDB.cacheStatus(true);

                } else {

                    // SHOW OVERLAY
                    GetDLCInfofromSteamDB.overlay(true);

                    // REQUEST TO STEAMDB
                    $.get(GetDLCInfofromSteamDB.yql, {
                        q: "SELECT * FROM html WHERE url='" + GetDLCInfofromSteamDB.script.steamDB + GetDLCInfofromSteamDB.steamDB.appID + "'",
                        format: "xml"
                    }, function (data) {
                        // SAVE DOM
                        GetDLCInfofromSteamDB.steamDB.xml = $(data);
                        // SAVE CACHE
                        CacheAppID.set(GetDLCInfofromSteamDB.steamDB.appID, GetDLCInfofromSteamDB.steamDB.xml.find("body").html());
                        // CALL OTHER FUNCTIONS
                        GetDLCInfofromSteamDB.call();
                        // HIDE OVERLAY
                        GetDLCInfofromSteamDB.overlay(false);
                    });

                }

            } else {
                GetDLCInfofromSteamDB.alert("The AppID isn't valid!");
            }

        } else {
            GetDLCInfofromSteamDB.alert("Enter the AppID in search form!");
        }

    },

    // CALL
    call: function () {

        // CHECK
        var $check = GetDLCInfofromSteamDB.steamDB.xml.find(".tabnav-tab[data-target='#dlc']");

        if ($check.length) {

            // GET DATA FROM STEAMDB
            GetDLCInfofromSteamDB.getDataFromSteamDB();
            // CREATE STYLES
            GetDLCInfofromSteamDB.createStyles();
            // CREATE NEW TAB GLOBAL OPTIONS
            GetDLCInfofromSteamDB.createTabOptions("global_options", "Global Options", GetDLCInfofromSteamDB.options);
            // CREATE FORMAT LIST
            GetDLCInfofromSteamDB.createFormatList();
            // CREATE CUSTOM FORMAT LIST
            GetDLCInfofromSteamDB.createCustomFormatList();
            // LOAD OPTIONS
            GetDLCInfofromSteamDB.loadOptions();
            // EVENTS
            GetDLCInfofromSteamDB.events();
            // ACTIVE FIRST TAB OPTIONS
            $("#GetDLCInfofromSteamDB_optionsNav a:first").tab("show");

        } else {
            GetDLCInfofromSteamDB.alert("This AppID doesn't have DLCs!");
        }

    },

    // GET DATA FROM STEAMDB
    getDataFromSteamDB: function () {

        // APPID LOGO
        GetDLCInfofromSteamDB.steamDB.appIDLogo = GetDLCInfofromSteamDB.steamDB.xml.find("img.app-logo").attr("src").trim();
        // APPID BACKGROUND
        GetDLCInfofromSteamDB.steamDB.appIDBg = GetDLCInfofromSteamDB.steamDB.xml.find(".header-app.header-wrapper").attr("style").trim();
        // APPID NAME
        GetDLCInfofromSteamDB.steamDB.appIDName = GetDLCInfofromSteamDB.steamDB.xml.find("td[itemprop='name']").text().trim();

        // APPID DLCs
        GetDLCInfofromSteamDB.steamDB.xml.find(".tab-pane#dlc .app[data-appid]").each(function () {

            var $this = $(this);
            var appID = $this.data("appid");
            var appIDName = $this.find("td:nth-of-type(2)").text().trim();

            GetDLCInfofromSteamDB.steamDB.dlcs[appID] = appIDName;
            GetDLCInfofromSteamDB.steamDB.dlcsTot++;

        });

        // APPID CONFIG
        var $config = GetDLCInfofromSteamDB.steamDB.xml.find(".tab-pane#config > table:nth-of-type(1) tbody tr:nth-of-type(1)");
        // APPID CONFIG EXE
        GetDLCInfofromSteamDB.steamDB.configEXE = $config.find("td:nth-of-type(2)").text().trim();
        // APPID CONFIG ARG
        GetDLCInfofromSteamDB.steamDB.configARG = $config.find("td:nth-of-type(3)").text().trim();

    },

    // CREATE STYLES
    createStyles: function () {

        $("#header").attr("style", GetDLCInfofromSteamDB.steamDB.appIDBg);
        $("#GetDLCInfofromSteamDB_appIDHeader").attr("src", GetDLCInfofromSteamDB.steamDB.appIDLogo);
        $("#GetDLCInfoFromSteamDB_steam_appid").attr("href", Download.data(GetDLCInfofromSteamDB.steamDB.appID));

    },

    // CREATE FORMAT LIST
    createFormatList: function () {

        // SELECT
        var selct = $("#GetDLCInfoFromSteamDB_select");

        $.each(GetDLCInfofromSteamDB.format, function (key, values) {

            var name = values.name;
            var options = values.options;

            // ADD OPTION TO SELECT
            $("<option>").attr("value", key).text(name).appendTo(selct);

            // CREATE NEW TAB WITH FORMAT OPTIONS
            GetDLCInfofromSteamDB.createTabOptions(key, name, options);

        });

        // ..... SAVE SELECTION
        if (Storage.get("save_selection") == "true" && Storage.check("save_selection_value")) {
            selct.find("option[value='" + Storage.get("save_selection_value") + "']").prop("selected", true);
        }
        // .....

    },

    // EVENTS
    events: function () {

        // SUBMIT
        var submt = $("#GetDLCInfoFromSteamDB_submit");

        // GET DLC LIST SUBMIT
        submt.submit(function (e) {

            e.preventDefault();

            var $this = $(this);
            var result = "";
            var format_key = $this.find("#GetDLCInfoFromSteamDB_select option:selected").val();
            var format_data = GetDLCInfofromSteamDB.format[format_key];
            var format_title = format_data.name;
            var format_ini = format_data.ini;
            var format_idata = format_data.data;

            // INFO
            result += "; " + GetDLCInfofromSteamDB.script.name + " by " + GetDLCInfofromSteamDB.script.author + "\r\n" +
                "; Format: " + format_title + "\r\n" +
                "; AppID: " + GetDLCInfofromSteamDB.steamDB.appID + "\r\n" +
                "; AppID Name: " + GetDLCInfofromSteamDB.steamDB.appIDName + "\r\n" +
                "; Config EXE: " + GetDLCInfofromSteamDB.steamDB.configEXE + "\r\n" +
                "; Config ARG: " + GetDLCInfofromSteamDB.steamDB.configARG + "\r\n" +
                "; Total DLCs: " + GetDLCInfofromSteamDB.steamDB.dlcsTot + "\r\n" +
                "; SteamDB: " + GetDLCInfofromSteamDB.script.steamDB + GetDLCInfofromSteamDB.steamDB.appID + "\r\n" +
                "; Website: " + GetDLCInfofromSteamDB.script.homepage + GetDLCInfofromSteamDB.steamDB.appID + "\r\n" +
                "; Support: " + GetDLCInfofromSteamDB.script.support + "\r\n\r\n";

            // FORMAT DATA
            result += GetDLCInfofromSteamDB.dlcFormatsStr(format_idata);

            // FILE INI
            $("#GetDLCInfoFromSteamDB_ini").attr({
                href: Download.data(result),
                download: format_ini
            }).find("span").text(format_ini);

            // RESULT
            $("#GetDLCInfoFromSteamDB_textarea").html(result);

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

            // ACTIVE TAB
            $("a[href='#get_dlcs_list']").tab("show");

        });

        // ..... AUTO SUBMIT
        if (Storage.get("auto_submit") == "true") {
            submt.trigger("submit");
        }
        // .....

        // SUBMIT OPTIONS
        $("form#GetDLCInfoFromSteamDB_submitOptions").submit(function (e) {

            e.preventDefault();

            // SAVE DATA
            $(this).find("input, select").each(function () {

                var $this = $(this);
                var val = $this.val();
                var type = $this.attr("type");
                var name = $this.attr("name");
                if (type == "checkbox") {
                    val = $this.prop("checked");
                }

                // SAVE TO LOCAL STORAGE
                Storage.set(name, val);

            });

            // ALERT
            alert("Options saved!");

        });

        // RESET OPTIONS
        $("#GetDLCInfoFromSteamDB_resetOptions").click(function (e) {

            e.preventDefault();

            // CONFIRM
            if (window.confirm("Do you really want to reset options (and custom formats)?")) {
                // CLEAR STORAGE
                Storage.clear();
                // ALERT
                alert("Restored default options! Reload page...");
                // RELOAD PAGE
                GetDLCInfofromSteamDB.reloadPage();
            }

        });

        // CLEAN CACHE
        $("#GetDLCInfoFromSteamDB_cleanCache").click(function (e) {

            e.preventDefault();

            // CONFIRM
            if (window.confirm("Do you really want to clean cache?")) {
                // CLEAR STORAGE
                Storage.remove("cacheAppID");
                // ALERT
                alert("Cleared cache! Reload page...");
                // RELOAD PAGE
                GetDLCInfofromSteamDB.reloadPage();
            }

        });

        // NEW CUSTOM FORMAT
        $("#GetDLCInfoFromSteamDB_customFormatNew form").submit(function (e) {

            e.preventDefault();

            var $this = $(this);
            var name = $this.find("input[name='name']").val();
            var format = $this.find("textarea[name='format']").val();

            if (name.length && format.length) {

                // RESET FORM
                $this[0].reset();

                // SET CUSTOM FORMAT
                CustomFormat.set(name, format);
                // CREATE CUSTOM FORMAT LIST
                GetDLCInfofromSteamDB.createCustomFormatList();

                // ALERT
                alert("Added!");

            } else {
                alert("Input(s) empty");
            }

        });

        // REMOVE CUSTOM FORMAT
        $(document).on("click", "button#GetDLCInfoFromSteamDB_customFormatRemove", function (e) {

            e.preventDefault();

            var $this = $(this);
            var tr = $this.closest("tr");
            var id = tr.data("id");

            // REMOVE CUSTOM FORMAT
            CustomFormat.remove(id);
            // CREATE CUSTOM FORMAT LIST
            GetDLCInfofromSteamDB.createCustomFormatList();

            // ALERT
            alert("Removed!");

        });

        // EDIT CUSTOM FORMAT
        $(document).on("click", "button#GetDLCInfoFromSteamDB_customFormatEdit", function (e) {

            e.preventDefault();

            var $this = $(this);
            var tr = $this.closest("tr");
            var id = tr.data("id");
            var txtarea = tr.find("textarea").val();

            if (txtarea.length) {

                // SAVE CUSTOM FORMAT
                CustomFormat.save(id, txtarea);
                // CREATE CUSTOM FORMAT LIST
                GetDLCInfofromSteamDB.createCustomFormatList();

                // ALERT
                alert("Saved!");

            } else {
                alert("Input(s) empty");
            }

        });

    },

    // CREATE CUSTOM FORMAT LIST
    createCustomFormatList: function () {

        // RESULT
        var result = "";

        // GET ALL CUSTOM FORMAT
        $.each(CustomFormat.getAll(), function (key, value) {

            var name = value.name;
            var format = value.format;

            result += "<tr data-id='" + key + "'>" +
                "    <td>" + name + "</td>" +
                "    <td><textarea class='form-control'>" + format + "</textarea></td>" +
                "    <td><textarea class='form-control' readonly>" + GetDLCInfofromSteamDB.dlcFormatsStr(format) + "</textarea></td>" +
                "    <td>" +
                "		<div class='btn-group'>" +
                "			<button type='button' class='btn btn-success' id='GetDLCInfoFromSteamDB_customFormatEdit'><i class='fa fa-hdd-o' aria-hidden='true'></i> Edit</button>" +
                "			<button type='button' class='btn btn-danger' id='GetDLCInfoFromSteamDB_customFormatRemove'><i class='fa fa-trash' aria-hidden='true'></i> Remove</button>" +
                "		</div>" +
                "	</td>" +
                "</tr>";

        });

        // UPDATE TABLE
        $("#GetDLCInfoFromSteamDB_customFormatList table tbody").html(result);

    },

    // LOAD OPTIONS
    loadOptions: function () {

        $("form#GetDLCInfoFromSteamDB_submitOptions").find("input, select").each(function () {

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

    // CREATE TAB OPTIONS
    createTabOptions: function (key, name, options) {

        if (Object.keys(options).length) {
            $("#GetDLCInfofromSteamDB_optionsNav").append("<li class='nav-item'><a class='nav-link' data-toggle='tab' href='#" + key + "'>" + name + "</a></li>");
            $("#GetDLCInfofromSteamDB_optionsContent").append(
                "<div class='tab-pane' id='" + key + "'>" +
                "   <form id='GetDLCInfoFromSteamDB_submitOptions'>" +
                "       <div class='card-block'>" +
                "           <button type='submit' class='btn btn-block btn-success'>Save Options</button>" +
                "       </div>" +
                "       <div class='table-responsive'>" +
                "           <table class='table table-bordered m-b-0'><tbody>" +
                GetDLCInfofromSteamDB.convertOptions2HTML(options) +
                "           </tbody></table>" +
                "       </div>" +
                "       <div class='card-block'>" +
                "           <button type='submit' class='btn btn-block btn-success'>Save Options</button>" +
                "       </div>" +
                "   </form>" +
                "</div>");
        }

    },

    // CONVERT OPTIONS TO HTML
    convertOptions2HTML: function (options) {

        // RESULT
        var result = "";

        $.each(options, function (key, values) {

            var title = values.title;
            var type = values.type;
            var placeholder = values.placeholder || "";
            var select_options = values.options || {};
            var select_default = values.default || "";

            result += "<tr><td>" + title + "</td><td>";

            if (type == "text") {
                result += "<input type='text' class='form-control' name='" + key + "' placeholder='" + placeholder + "'>";
            } else if (type == "checkbox") {
                result += "<input type='checkbox' name='" + key + "'>";
            } else if (type == "select") {
                result += "<select class='form-control' name='" + key + "'>";

                $.each(select_options, function (key, value) {

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
    dlcEach: function (string, from_zero, format_index, format_index_zeros) {

        // RESULT
        var result = "";
        // INDEX START FROM
        var index = from_zero ? 0 : -1;

        $.each(GetDLCInfofromSteamDB.steamDB.dlcs, function (id, name) {

            // ..... IGNORE DLCs 'SteamDB Unknown App'
            if (!(Storage.get("ignore_steamdb_unknown_app") == "true" && name.indexOf("SteamDB Unknown App") !== -1)) {

                index++;

                result += GetDLCInfofromSteamDB.dlcEachFormat(string, {
                    "dlc_id": id,
                    "dlc_name": name,
                    "dlc_index": GetDLCInfofromSteamDB.dlcIndexFormat(index, format_index, format_index_zeros)
                });

            }
            // .....

        });

        return result;

    },

    // DLC INDEX FORMAT
    dlcIndexFormat: function (val, format, zero) {

        if (format) {

            var zeros = "0".repeat(zero || 3);
            var sub = zeros.length - val.toString().length;

            return sub > 0 ? zeros.substring(0, sub) + val : val;

        }

        return val;

    },

    // DLC EACH FORMAT
    dlcEachFormat: function (str, values) {

        $.each(values, function (key, value) {

            var re = new RegExp("{" + key + "}", "g");

            str = str.replace(re, value);

        });

        return str;

    },

    // DLC FORMATS STR
    dlcFormatsStr: function (str) {

        var re_match = str.match(/\[(\w+)(?:\=(.*))?\]([^\[]+)\[\/(\w+)\]/g);

        if (re_match !== null && re_match.length) {

            $.each(re_match, function (i, val) {

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
    getParam: function (param) {

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

    // OVERLAY
    overlay: function (bool) {

        var dom = $(".overlay-loading");

        return bool ? dom.show() : dom.hide();

    },

    // CACHE STATUS
    cacheStatus: function (bool) {

        var dom = $("#GetDLCInfoFromSteamDB_cacheStatus");

        return bool ? dom.text("Yes") : dom.text("No");

    },

    // ALERT
    alert: function (str) {

        $("#main").html("<div class='alert alert-danger m-a-1'>" + str + "</div>");

    },

    // RELOAD PAGE
    reloadPage: function () {

        window.location.reload(true);

    }

};

// DOWNLOAD
var Download = {

    // DATA
    data: function (str) {

        return "data:text/plain;charset=utf-8," + encodeURIComponent(str);

    }

};

// STORAGE
var Storage = {

    // PREFIX DATA
    prefix: "GetDLCInfoFromSteamDB_",

    // GET OPTION
    get: function (name) {

        return window.localStorage.getItem(this.prefix + name);

    },

    // GET OPTION IF NOT EXISTS RETURN DEFAULT
    getDef: function (name, def) {

        var item = Storage.get(name);

        return Storage.check(item) ? item : def;

    },

    // SET OPTION
    set: function (name, val) {

        return window.localStorage.setItem(this.prefix + name, val);

    },

    // REMOVE OPTION
    remove: function (name) {

        return window.localStorage.removeItem(this.prefix + name);

    },

    // CLEAR OPTIONS
    clear: function () {

        window.localStorage.clear();

    },

    // CHECK OPTION
    check: function (item) {

        return item !== null && item.length;

    }

};

// CUSTOM FORMAT
var CustomFormat = {

    // STORAGE KEY
    storageKey: "custom_format",

    // SET ALL
    setAll: function (data) {

        Storage.set(this.storageKey, JSON.stringify(data));

    },

    // GET ALL
    getAll: function () {

        var data = Storage.get(this.storageKey);

        return Storage.check(data) ? JSON.parse(data) : {};

    },

    // GET
    get: function (uniqueid) {

        var data = this.getAll();

        return data[uniqueid];

    },

    // SET
    set: function (name, val) {

        var data = this.getAll();
        var uniqueid = new Date().getTime();

        data[uniqueid] = {
            "name": name,
            "format": val
        };

        this.setAll(data);

    },

    // SAVE
    save: function (uniqueid, val) {

        var data = this.getAll();

        if (uniqueid in data) {

            data[uniqueid].format = val;

            this.setAll(data);

        }

    },

    // REMOVE
    remove: function (uniqueid) {

        var data = this.getAll();

        if (uniqueid in data) {

            delete data[uniqueid];

            this.setAll(data);

        }

    }

};

// CACHE APPID
var CacheAppID = {

    // STORAGE KEY
    storageKey: "cacheAppID",

    // SET ALL
    setAll: function (data) {

        Storage.set(this.storageKey, JSON.stringify(data));

    },

    // GET ALL
    getAll: function () {

        var data = Storage.get(this.storageKey);

        return Storage.check(data) ? JSON.parse(data) : {};

    },

    // GET
    get: function (appID) {

        var data = this.getAll();

        return data[appID];

    },

    // SET
    set: function (appID, val) {

        var data = this.getAll();

        data[appID] = val;

        this.setAll(data);

    }

};
