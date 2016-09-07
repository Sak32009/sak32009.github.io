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
        steamDB: "https://steamdb.info/app/"
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

        // GET PARAM
        var param = this.getParam("steamdb");

        if (param !== false && param.length) {

            try {

                // PARSE JSON
                this.steamDB = JSON.parse(param);

            } catch (e) {

                this.alert(e);

            } finally {

                // VARS
                this.steamDB.dlcsTot = Object.keys(this.steamDB.dlcs).length;
                this.steamDB.configEXE = this.steamDB.configEXE.replace(/\/\//g, "/");
                this.script.steamDB += this.steamDB.appID;
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

            }

        } else {
            this.alert("Param <strong>steamdb</strong> doesn't exists or is empty.");
        }

    },

    // INFO FROM STEAMDB
    infoFromSteamDB: function () {

        $("#GetDLCInfofromSteamDB_appID").attr("href", this.script.steamDB).text(this.steamDB.appID);
        $("#GetDLCInfofromSteamDB_appIDName").text(this.steamDB.appIDName);
        $("#GetDLCInfofromSteamDB_dlcs").text(Object.keys(this.steamDB.dlcs).join(", "));
        $("#GetDLCInfofromSteamDB_dlcsTot").text(this.steamDB.dlcsTot);
        $("#GetDLCInfofromSteamDB_configEXE").text(this.steamDB.configEXE);
        $("#GetDLCInfofromSteamDB_configARG").text(this.steamDB.configARG);
        $("#GetDLCInfoFromSteamDB_steam_appid").attr("href", Download.data(this.steamDB.appID));

    },

    // CREATE FORMAT LIST
    createFormatList: function () {

        // SELF
        var self = this;
        // SELECT
        var select = $("#GetDLCInfoFromSteamDB_select");

        $.each(this.format, function (key, values) {

            var name = values.name;
            var ini = values.ini;
            var options = values.options;

            // ADD OPTION
            $("<option>").attr({"value": key, "data-file": ini}).text(name).appendTo(select);
            // FORMAT OPTIONS
            if (Object.keys(options).length) {

                $("#GetDLCInfofromSteamDB_nav_tabs").append("<li class='nav-item'><a class='nav-link' data-toggle='tab' href='#" + key + "'>" + name + "</a></li>");
                $("#GetDLCInfofromSteamDB_tab_content").append("<div class='tab-pane' id='" + key + "'>" +
                    "   <div class='card border-top-0'>" +
                    "       <form id='GetDLCInfoFromSteamDB_submit_options'>" +
                    "           <div class='card-block'>" +
                    "               <button type='submit' class='btn btn-block btn-success'>Save Options</button>" +
                    "           </div>" +
                    "           <div class='table-responsive'>" +
                    "               <table class='table table-bordered m-b-0'><tbody>" +
                    self.htmlOptions(options) +
                    "               </tbody></table>" +
                    "           </div>" +
                    "           <div class='card-block'>" +
                    "               <button type='submit' class='btn btn-block btn-success'>Save Options</button>" +
                    "           </div>" +
                    "       </form>" +
                    "   </div>" +
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
    globalOptions: function () {

        $(".GetDLCInfoFromSteamDB_globalOptions table > tbody").html(this.htmlOptions(this.options));

    },

    // SUBMIT OPTIONS
    submitOptions: function () {

        // SELF
        var self = this;

        // SUBMIT OPTIONS
        $("form#GetDLCInfoFromSteamDB_submit_options").submit(function (e) {

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
                if (type == "checkbox" || val.length) {
                    Storage.set(name, val);
                }

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

        // SELF
        var self = this;
        // SUBMIT
        var submit = $("#GetDLCInfoFromSteamDB_submit");

        // EVENT
        submit.submit(function (e) {

            e.preventDefault();

            var $this = $(this);
            var result = "";
            var $select = $this.find("#GetDLCInfoFromSteamDB_select option:selected");
            var format_key = $select.val();
            var format_title = $select.text();
            var format_ini = $select.data("file");

            // INFO
            result += "; " + self.script.name + " by " + self.script.author + "\n" +
                "; Format: " + format_title + "\n" +
                "; AppID: " + self.steamDB.appID + "\n" +
                "; AppID Name: " + self.steamDB.appIDName + "\n" +
                "; Total DLCs: " + self.steamDB.dlcsTot + "\n" +
                "; SteamDB: " + self.script.steamDB + "\n" +
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

        // RESULT
        var result = "";

        $.each(options, function (key, values) {

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

        // SELF
        var self = this;
        // RESULT
        var result = "";
        // INDEX START
        var index = from_zero ? 0 : -1;

        $.each(this.steamDB.dlcs, function (id, name) {

            index++;

            var findex = self.dlcIndexFormat(index, format_index, format_index_zeros);

            result += self.dlcEachFormat(string, {
                "dlc_id": id,
                "dlc_name": name,
                "dlc_index": findex
            });

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

        // SELF
        var self = this;

        // SCRIPT
        var re_match = str.match(/\[(.*?)\]([^\[]+)\[\/(.*?)\]/g);

        if (re_match !== null && re_match.length) {

            $.each(re_match, function (i, val) {

                var re_exec = /\[(.*)\]([^\[]+)\[\/(.*)\]/g.exec(val);

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
                                if (tag_value in self.steamDB) {
                                    str = str.replace(val, self.steamDB[tag_value]);
                                }
                                break;
                            case "option":
                                if (typeof tag_option_1 !== "undefined") {
                                    str = str.replace(val, Storage.getDef(tag_value, tag_option_1));
                                }
                                break;
                            case "dlcEach":
                                str = str.replace(val, self.dlcEach(tag_value, tag_option_1 === "true", tag_option_2 === "true", tag_option_3 || 0));
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
