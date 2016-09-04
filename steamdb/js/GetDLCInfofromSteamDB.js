var GetDLCInfofromSteamDB = {

    // STEAMDB
    steamDB: {},
    // FORMAT
    format: {},
    // SCRIPT INFO
    script: {
        name: "Get DLC Info from SteamDB",
        homepage: "https://github.com/Sak32009/GetDLCInfoFromSteamDB",
        support: "http://cs.rin.ru/forum/viewtopic.php?f=10&t=71837",
        author: "Sak32009"
    },
    // OPTIONS
    options: {
        username: {
            title: "Username",
            type: "text",
            placeholder: "..."
        },
        auto_download: {
            title: "Auto downloading file .INI when you click Get DLC List",
            type: "checkbox"
        },
        save_selection: {
            title: "Save the last selection of the format",
            type: "checkbox"
        },
        game_language: {
            title: "Game Language",
            type: "text",
            placeholder: "english"
        }
    },

    // RUN
    run: function () {

        try {

            // GET PARAM
            var steamdb = this.getParam("steamdb");

            if (steamdb !== false && steamdb.length) {

                // PARSE JSON
                this.steamDB = JSON.parse(steamdb);
                // INFO FROM STEAMDB
                this.infoFromSteamDB();
                // CREATE FORMAT LIST
                this.createFormatList();
                // GLOBAL OPTIONS
                this.globalOptions();
                // SUBMIT OPTIONS
                this.submitOptions();
                // RELOAD OPTIONS
                this.reloadOptions();
                // GET DLC LIST
                this.getDLCList();

            } else {
                throw "Param <strong>steamdb</strong> doesn't exists or is empty.";
            }

        } catch (e) {
            this.alert(e);
        }

    },

    // INFO FROM STEAMDB
    infoFromSteamDB: function () {

        $("#GetDLCInfofromSteamDB_appID").text(this.steamDB.appID);
        $("#GetDLCInfofromSteamDB_appIDName").text(this.steamDB.appIDName);
        $("#GetDLCInfofromSteamDB_dlcsTot").text(this.steamDB.dlcsTot);
        $("#GetDLCInfofromSteamDB_configEXE").text(this.steamDB.configEXE);
        $("#GetDLCInfofromSteamDB_configARG").text(this.steamDB.configARG);
        $("#GetDLCInfoFromSteamDB_steam_appid").attr("href", Download.data(this.steamDB.appID));

    },

    // CREATE FORMAT LIST
    createFormatList: function () {

        var select = $("#GetDLCInfoFromSteamDB_select");

        for (var key in this.format) {
            if (this.format.hasOwnProperty(key)) {

                var values = this.format[key];
                var name = values.name;
                var ini = values.ini;

                // ADD OPTION
                $("<option>").attr({"value": key, "data-file": ini}).text(name).appendTo(select);

                // FORMAT OPTIONS
                this.formatOptions(key, values);

            }
        }

        // ACTIVE FIRST TAB
        $("#GetDLCInfofromSteamDB_nav_tabs .nav-item:first-child .nav-link").tab("show");

        // ..... SAVE SELECTION
        if (Storage.get("save_selection") == "true" && Storage.check("save_selection_value")) {
            select.find("option[value='" + Storage.get("save_selection_value") + "']").prop("selected", true);
        }
        // .....

    },

    // FORMAT OPTIONS
    formatOptions: function (key, values) {

        var name = values.name;
        var options = values.options;

        if (Object.keys(options).length) {

            $("#GetDLCInfofromSteamDB_nav_tabs").append("<li class='nav-item'>" +
                "<a class='nav-link' data-toggle='tab' href='#" + key + "'>" + name + "</a>" +
                "</li>");

            var tab_content = $("<div class='tab-pane' id='" + key + "'>" +
                "<div class='card border-top-0'>" +
                "<form id='GetDLCInfoFromSteamDB_submit_options'>" +
                "<div class='table-responsive'>" +
                "<table class='table table-bordered m-b-0'>" +
                "<tbody></tbody>" +
                "</table>" +
                "</div>" +
                "<div class='card-block'>" +
                "<button type='submit' class='btn btn-block btn-success'>Save Options</button>" +
                "</div>" +
                "</form>" +
                "</div>" +
                "</div>");

            tab_content.find("#GetDLCInfoFromSteamDB_submit_options table > tbody").html(this.htmlOptions(options));
            tab_content.appendTo("#GetDLCInfofromSteamDB_tab_content");

        }

    },

    // HTML OPTIONS
    htmlOptions: function (options) {

        var result = "";

        for (var key in options) {
            if (options.hasOwnProperty(key)) {

                var values = options[key];
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
                    for (var key_1 in select_options) {
                        if (select_options.hasOwnProperty(key_1)) {
                            var value_1 = select_options[key_1];
                            var selected = key_1 == select_default ? "selected" : "";
                            result += "<option value='" + key_1 + "' " + selected + ">" + value_1 + "</option>";
                        }
                    }
                    result += "</select>";
                }

                result += "</td></tr>";

            }
        }

        return result;

    },

    // GLOBAL OPTIONS
    globalOptions: function () {

        $(".GetDLCInfoFromSteamDB_globalOptions table > tbody").html(this.htmlOptions(this.options));

    },

    // SUBMIT OPTIONS
    submitOptions: function () {

        var self = this;

        // SUBMIT OPTIONS
        $("form#GetDLCInfoFromSteamDB_submit_options").submit(function (e) {

            e.preventDefault();

            $(this).find("input, select").each(function () {

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
        $("#GetDLCInfoFromSteamDB_resetOptions").click(function (e) {

            e.preventDefault();

            // CLEAR STORAGE
            Storage.clear();

            // RELOAD OPTIONS
            self.reloadOptions();

            // ALERT
            alert("Restored default options!");

        });

    },

    // RELOAD OPTIONS
    reloadOptions: function () {

        // LOAD OPTIONS VALUE
        $("form#GetDLCInfoFromSteamDB_submit_options").find("input, select").each(function () {

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

    // GET DLC LIST
    getDLCList: function () {

        var self = this;

        $("#GetDLCInfoFromSteamDB_submit").submit(function (e) {

            e.preventDefault();

            var $this = $(this);
            var result = "";
            var $select = $this.find("#GetDLCInfoFromSteamDB_select");
            var $selected = $select.find("option:selected");
            var format_key = $select.val();
            var format_title = $selected.text();
            var format_ini = $selected.attr("data-file");

            // INFO
            result += "; " + self.script.name + " by " + self.script.author + "\n" +
                "; Format: " + format_title + "\n" +
                "; AppID: " + self.steamDB.appID + "\n" +
                "; AppID Name: " + self.steamDB.appIDName + "\n" +
                "; Total DLCs: " + self.steamDB.dlcsTot + "\n" +
                "; SteamDB: " + self.steamDB.url + "\n" +
                "; Userscript: " + self.script.homepage + "\n" +
                "; Support: " + self.script.support + "\n\n";

            // FORMAT DATA
            result += self.dlcFormatsStr(self.format[format_key].data);

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

    },

    // DLC EACH
    dlcEach: function (string, from_zero, format_index, format_index_zeros) {

        var result = "";
        var index = from_zero ? 0 : -1;

        for (var dlc_id in this.steamDB.dlcs) {
            if (this.steamDB.dlcs.hasOwnProperty(dlc_id)) {

                index++;

                var dlc_name = this.steamDB.dlcs[dlc_id];
                var dlc_index = this.dlcIndexFormat(index, format_index, format_index_zeros);

                result += this.dlcEachFormat(string, {
                    "dlc_id": dlc_id,
                    "dlc_name": dlc_name,
                    "dlc_index": dlc_index
                });

            }
        }

        return result;

    },

    // DLC INDEX FORMAT
    dlcIndexFormat: function (val, format, zero) {

        if (format) {

            zero = zero || 3;

            var string = val.toString();
            var zeros = "0".repeat(zero);
            var sub = zeros.length - string.length;

            return sub > 0 ? zeros.substring(0, sub) + val : val;

        }

        return val;

    },

    // DLC EACH FORMAT
    dlcEachFormat: function (str, args) {

        for (var key in args) {
            if (args.hasOwnProperty(key)) {

                var value = args[key];
                var re = new RegExp("{" + key + "}", "g");

                str = str.replace(re, value);

            }
        }

        return str;

    },

    // DLC FORMATS STR
    dlcFormatsStr: function (str) {

        var re_match = /\[(.*?)\]([^\[]+)\[\/(.*?)\]/g;
        var match = str.match(re_match);

        if (match !== null && match.length) {

            for (var i = 0; i < match.length; i++) {

                var find_match = match[i];
                var re_exec = /\[(.*)\]([^\[]+)\[\/(.*)\]/g;
                var re_exec_val = re_exec.exec(find_match);

                if (re_exec_val.length) {

                    re_exec_val = re_exec_val.slice(1);

                    var tag_name = re_exec_val[0];
                    var tag_value = re_exec_val[1];
                    var tag_name_close = re_exec_val[2];
                    var tag_options = [];

                    if (tag_name.indexOf('=') !== -1) {
                        var tag_name_cc = tag_name.split("=");
                        tag_name = tag_name_cc[0];
                        tag_options = tag_name_cc[1].split(":");
                    }

                    var tag_option_1 = tag_options[0];
                    var tag_option_2 = tag_options[1];
                    var tag_option_3 = tag_options[2];

                    if (tag_name !== tag_name_close && tag_value.length) {
                        continue;
                    }

                    switch (tag_name) {
                        case "steamdb":
                            if (tag_value in this.steamDB) {
                                str = str.replace(find_match, this.steamDB[tag_value]);
                            }
                            break;
                        case "option":
                            if (typeof tag_option_1 !== "undefined") {
                                str = str.replace(find_match, Storage.getDef(tag_value, tag_option_1));
                            }
                            break;
                        case "dlcEach":
                            if (typeof tag_option_1 !== "undefined" && typeof tag_option_2 !== "undefined" && typeof tag_option_3 !== "undefined") {
                                tag_option_1 = tag_option_1 === "true";
                                tag_option_2 = tag_option_2 === "true";
                                tag_option_3 = tag_option_3 || 0;
                                str = str.replace(find_match, this.dlcEach(tag_value, tag_option_1, tag_option_2, tag_option_3));
                            } else if (typeof tag_option_1 !== "undefined") {
                                tag_option_1 = tag_option_1 === "true";
                                str = str.replace(find_match, this.dlcEach(tag_value, tag_option_1));
                            } else {
                                str = str.replace(find_match, this.dlcEach(tag_value));
                            }
                            break;
                    }

                }

            }

        }

        return str;

    },

    // GET PARAM
    getParam: function (param) {

        var query = window.location.search.substring(1);
        var vars = query.split("&");

        for (var i = 0; i < vars.length; i++) {

            var pair = vars[i].split("=");

            if (pair[0] == param) {
                return decodeURIComponent(pair[1]);
            }

        }

        return false;

    },

    // ALERT
    alert: function (str) {

        $("body").empty().prepend("<div class='alert alert-danger m-a-2'>" + str + "</div>");

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
