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
        author: "Sak32009",
        steamdb: "https://steamdb.info/app/"
    },
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
    run: function () {

        try {

            // GET PARAM
            var steamdb = this.getParam("steamdb");

            if (steamdb !== false && steamdb.length) {

                // PARSE JSON
                this.steamDB = JSON.parse(steamdb);
                // ADD INFO
                this.script.steamdb += this.steamDB.appID;
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

        $("#GetDLCInfofromSteamDB_appID").attr("href", this.script.steamdb).text(this.steamDB.appID);
        $("#GetDLCInfofromSteamDB_appIDName").text(this.steamDB.appIDName);
        $("#GetDLCInfofromSteamDB_dlcs").text(Object.keys(this.steamDB.dlcs).join(", "));
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
                this.createFormatListOptions(key, values);

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

    // CREATE FORMAT LIST OPTIONS
    createFormatListOptions: function (key, values) {

        var name = values.name;
        var options = values.options;

        if (Object.keys(options).length) {

            $("#GetDLCInfofromSteamDB_nav_tabs").append("<li class='nav-item'><a class='nav-link' data-toggle='tab' href='#" + key + "'>" + name + "</a></li>");

            var tab_pane = $("<div class='tab-pane' id='" + key + "'>" +
                "   <div class='card border-top-0'>" +
                "       <form id='GetDLCInfoFromSteamDB_submit_options'>" +
                "           <div class='card-block'>" +
                "               <button type='submit' class='btn btn-block btn-success'>Save Options</button>" +
                "           </div>" +
                "           <div class='table-responsive'>" +
                "               <table class='table table-bordered m-b-0'><tbody></tbody></table>" +
                "           </div>" +
                "           <div class='card-block'>" +
                "               <button type='submit' class='btn btn-block btn-success'>Save Options</button>" +
                "           </div>" +
                "       </form>" +
                "   </div>" +
                "</div>");

            tab_pane.find("#GetDLCInfoFromSteamDB_submit_options table > tbody").html(this.htmlOptions(options));
            tab_pane.appendTo("#GetDLCInfofromSteamDB_tab_content");

        }

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
        var submit = $("#GetDLCInfoFromSteamDB_submit");

        submit.submit(function (e) {

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
                "; SteamDB: " + self.script.steamdb + "\n" +
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

        // ..... SAVE SELECTION GET DLC LIST
        if (Storage.get("save_selection") == "true" && Storage.get("save_selection_getDLCList") == "true") {
            submit.trigger("submit");
        }
        // .....

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
    dlcEachFormat: function (str, values) {

        for (var key in values) {
            if (values.hasOwnProperty(key)) {

                var value = values[key];
                var re = new RegExp("{" + key + "}", "g");

                str = str.replace(re, value);

            }
        }

        return str;

    },

    // DLC FORMATS STR
    dlcFormatsStr: function (str) {

        var re_match = str.match(/\[(.*?)\]([^\[]+)\[\/(.*?)\]/g);

        if (re_match !== null && re_match.length) {

            for (var i = 0; i < re_match.length; i++) {

                var val_match = re_match[i];
                var re_exec = /\[(.*)\]([^\[]+)\[\/(.*)\]/g.exec(val_match);

                if (re_exec !== null && re_exec.length) {

                    var tag_name = re_exec[1];
                    var tag_value = re_exec[2];
                    var tag_close = re_exec[3];

                    var tag_options = [];
                    if (tag_name.indexOf('=') !== -1) {
                        var tag_name_cc = tag_name.split("=");
                        tag_name = tag_name_cc[0];
                        tag_options = tag_name_cc[1].split(":");
                    }

                    if (tag_name === tag_close && tag_value.length) {

                        var tag_option_1 = tag_options[0];
                        var tag_option_2 = tag_options[1];
                        var tag_option_3 = tag_options[2];

                        switch (tag_name) {
                            case "steamdb":
                                if (tag_value in this.steamDB) {
                                    str = str.replace(val_match, this.steamDB[tag_value]);
                                }
                                break;
                            case "option":
                                if (typeof tag_option_1 !== "undefined") {
                                    str = str.replace(val_match, Storage.getDef(tag_value, tag_option_1));
                                }
                                break;
                            case "dlcEach":
                                str = str.replace(val_match, this.dlcEach(tag_value, tag_option_1 === "true", tag_option_2 === "true", tag_option_3 || 0));
                                break;
                        }

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

        $("main > .container-fluid").html("<div class='alert alert-danger m-a-2'>" + str + "</div>");

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
