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
        var param = this.getParam();

        if (param !== false && param.length) {

            try {

                // PARSE JSON
                this.steamDB = JSON.parse(param);
                // VARS
                this.steamDB.dlcsTot = Object.keys(this.steamDB.dlcs).length;
                this.steamDB.configEXE = this.steamDB.configEXE.replace(/\/\//g, "/");
                this.script.steamDB += this.steamDB.appID;
                // INFO FROM STEAMDB
                this.tabInfoFromSteamDB();
                // LOAD FORMAT LIST
                this.loadFormatList();
                // GLOBAL OPTIONS
                this.tabGlobalOptions();
                // SUBMIT OPTIONS
                this.submitOptions();
                // RELOAD OPTIONS
                this.reloadOptions();
                // LOAD CUSTOM FORMAT LIST
                this.loadCustomFormatList();
                // EVENTS CUSTOM FORMAT LIST
                this.eventsCustomFormatList();
                // GET DLC LIST
                this.getDLCList();

            } catch (e) {
                this.alert(e);
            }

        } else {
            this.alert("No param or is empty");
        }

    },

    // INFO FROM STEAMDB
    tabInfoFromSteamDB: function () {

        $("#GetDLCInfofromSteamDB_appID").attr("href", this.script.steamDB).text(this.steamDB.appID);
        $("#GetDLCInfofromSteamDB_appIDName").text(this.steamDB.appIDName);
        $("#GetDLCInfofromSteamDB_dlcs").text(Object.keys(this.steamDB.dlcs).join(", "));
        $("#GetDLCInfofromSteamDB_dlcsTot").text(this.steamDB.dlcsTot);
        $("#GetDLCInfofromSteamDB_configEXE").text(this.steamDB.configEXE);
        $("#GetDLCInfofromSteamDB_configARG").text(this.steamDB.configARG);
        $("#GetDLCInfoFromSteamDB_steam_appid").attr("href", Download.data(this.steamDB.appID));

    },

    // LOAD FORMAT LIST
    loadFormatList: function () {

        // SELF
        var self = this;
        // SELECT
        var select = $("#GetDLCInfoFromSteamDB_select");

        $.each(this.format, function (key, values) {

            var name = values.name;
            var options = values.options;

            // ADD OPTION
            $("<option>").attr({"value": key}).text(name).appendTo(select);
            // FORMAT OPTIONS
            if (Object.keys(options).length) {
                $("#GetDLCInfofromSteamDB_nav_tabs").append("<li class='nav-item'><a class='nav-link' data-toggle='tab' href='#" + key + "'>" + name + "</a></li>");
                $("#GetDLCInfofromSteamDB_tab_content").append("<div class='tab-pane' id='" + key + "'>" +
                    "   <form id='GetDLCInfoFromSteamDB_submit_options'>" +
                    "       <div class='card-block'>" +
                    "           <button type='submit' class='btn btn-block btn-success'>Save Options</button>" +
                    "       </div>" +
                    "       <div class='table-responsive'>" +
                    "           <table class='table table-bordered m-b-0'><tbody>" +
                    self.htmlOptions(options) +
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
    tabGlobalOptions: function () {

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
            // LOAD CUSTOM FORMAT LIST
            self.loadCustomFormatList();
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

    // LOAD CUSTOM FORMAT
    loadCustomFormatList: function () {

        // SELF
        var self = this;
        // RESULT
        var result = "";
        // ALL CUSTOM FORMAT
        var custom_all = CustomFormat.all();

        $.each(custom_all, function (key, value) {

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
        $("#GetDLCInfoFromSteamDB_customFormatList > table tbody").html(result);

    },

    // EVENTS CUSTOM FORMAT LIST
    eventsCustomFormatList: function () {

        // SELF
        var self = this;

        // NEW
        $("#GetDLCInfoFromSteamDB_customFormatNew form").submit(function (e) {

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
                self.loadCustomFormatList();

                // ALERT
                alert("Added!");

            } else {
                alert("Input(s) empty");
            }

        });

        // REMOVE
        $(document).on("click", "button#GetDLCInfoFromSteamDB_customFormatRemove", function (e) {

            e.preventDefault();

            var $this = $(this);
            var tr = $this.closest("tr");
            var id = tr.data("id");

            // REMOVE CUSTOM FORMAT
            CustomFormat.remove(id);
            // LOAD CUSTOM FORMAT LIST
            self.loadCustomFormatList();

            // ALERT
            alert("Removed!");

        });

        // SAVE
        $(document).on("click", "button#GetDLCInfoFromSteamDB_customFormatSave", function (e) {

            e.preventDefault();

            var $this = $(this);
            var tr = $this.closest("tr");
            var id = tr.data("id");
            var textarea = tr.find("textarea");

            if (textarea.length) {

                // ADD CUSTOM FORMAT
                CustomFormat.save(id, textarea.val());
                // LOAD CUSTOM FORMAT LIST
                self.loadCustomFormatList();

                // ALERT
                alert("Saved!");

            } else {
                alert("Input(s) empty");
            }

        });

        // VIEW
        $(document).on("click", "button#GetDLCInfoFromSteamDB_customFormatView", function (e) {

            e.preventDefault();

            var $this = $(this);
            var tr = $this.closest("tr");
            var id = tr.data("id");
            var custom_format = CustomFormat.get(id);
            var modal = $("#GetDLCInfoFromSteamDB_customFormatViewModal");
            modal.find(".modal-title").text(custom_format.name);
            modal.find(".modal-body textarea").val(self.dlcFormatsStr(custom_format.format));
            modal.modal("show");

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
            var format_data = self.format[format_key];
            var format_title = format_data.name;
            var format_ini = format_data.ini;
            var format_idata = format_data.data;

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
            result += self.dlcFormatsStr(format_idata);

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

            result += self.dlcEachFormat(string, {
                "dlc_id": id,
                "dlc_name": name,
                "dlc_index": self.dlcIndexFormat(index, format_index, format_index_zeros)
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
                                if (bbcode_val in self.steamDB) {
                                    str = str.replace(val, self.steamDB[bbcode_val]);
                                }
                                break;
                            case "option":
                                if (bbcode_opts.length) {
                                    str = str.replace(val, Storage.getDef(bbcode_val, bbcode_opts[0]));
                                }
                                break;
                            case "dlcEach":
                                str = str.replace(val, self.dlcEach(bbcode_val, bbcode_opts[0] == "true", bbcode_opts[1] == "true", bbcode_opts[2] || 0));
                                break;
                        }

                    }

                }

            });

        }

        return str;

    },

    // GET PARAM
    getParam: function () {

        var query = window.location.search.substr(1);

        return decodeURIComponent(query);

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

// CUSTOM FORMAT
var CustomFormat = {

    // GET ALL
    all: function () {

        var data = Storage.get("custom_format");

        return Storage.check(data) ? JSON.parse(data) : {};

    },

    // ---
    set: function (data) {

        Storage.set("custom_format", JSON.stringify(data));

    },

    // GET CUSTOM FORMAT
    get: function (uniqueid) {

        var data = this.all();

        return data[uniqueid];

    },

    // ADD FORMAT
    add: function (name, val) {

        var data = this.all();
        var uniqueid = "custom_format_" + new Date().getTime();

        data[uniqueid] = {
            "name": name,
            "format": val
        };

        this.set(data);

    },

    // SAVE FORMAT
    save: function (uniqueid, val) {

        var data = this.all();

        if (uniqueid in data) {

            data[uniqueid]["format"] = val;

            this.set(data);

        }

    },

    // REMOVE FORMAT
    remove: function (uniqueid) {

        var data = this.all();

        if (uniqueid in data) {

            delete data[uniqueid];

            this.set(data);

        }

    }

};
