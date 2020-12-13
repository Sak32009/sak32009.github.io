/*! Get DLC Info from SteamDB | MIT License | sak32009.github.io/getdlcinfofromsteamdb/ */
class m {
    constructor() {
        this.win = window.getdlcinfofromsteamdb;
        this.data = this.win.data;
        this.steamDB = this.win.steamDB;
        this.userscript = this.win.userscript;
    }
    run() {
        const self = this;
        self.fillInterface();
        self.loadEvents();
    }
    fillInterface() {
        const self = this;
        $("*[data-userscript='version']").text(self.userscript.script.version);
        $("*[data-userscript='year']").text(self.userscript.script.year);
        $.each(self.data, (_index, _values) => {
            const name = _values.name;
            $("<option>").attr("value", _index).text(name).appendTo(`select#select`);
        });
    }
    loadEvents() {
        const self = this;
        $(document).on("click", `button#convert`, (e) => {
            e.preventDefault();
            let result = "";
            const selected = $(`select#select option:selected`).val();
            const withDLCSUnknowns = $("input#unknowns").is(":checked");
            const data = self.data[selected];
            const name = data.name;
            const headerComment = data.header.comment;
            if (data.header.show) {
                result = `${self.userscript.script.name} by ${self.userscript.script.author} v${self.userscript.script.version} | ${self.userscript.script.year}
Format: ${name}
AppID: ${self.steamDB.appID}
AppID Name: ${self.steamDB.name}
AppID Total DLCS: ${self.steamDB.count}
AppID Total DLCS Unknowns: ${self.steamDB.countUnknowns}
SteamDB: ${self.steamDB.appURL}${self.steamDB.appID}
Homepage: ${self.userscript.script.homepage}
Support: ${self.userscript.script.supportURL}`;
                result = `${headerComment + result.split("\n").join(`\n${headerComment}`)}\n\n`;
            }
            result += self.bbcode(data.file.text, withDLCSUnknowns);
            const file = self.toBlob(self.bbcode(data.file.name, false), result, data.file.ext);
            $(`textarea#textarea`).text(result).scrollTop(0);
            $(`a#download`).attr({
                href: file.blob,
                download: file.name
            });
        });
    }
    toBlob(name, content, extension) {
        return {
            name: `${name.toString().length > 0 ? name : Math.random().toString(36).substring(2)}.${extension}`,
            blob: window.URL.createObjectURL(new Blob([content.replace(/\n/g, "\r\n")], {
                type: "application/octet-stream;charset=utf-8"
            }))
        };
    }
    bbcodeDLCSReplace(str, values) {
        $.each(values, (_index, _values) => {
            str = str.replace(new RegExp(`{${_index}}`, "g"), _values);
        });
        return str;
    }
    bbcodeDLCSPrefix(index, prefix) {
        return prefix > index.length ? "0".repeat(prefix - index.length) + index : index;
    }
    bbcodeDLCS(str, indexFromZero, indexPrefix, withDLCSUnknowns) {
        const self = this;
        let result = "";
        let index = indexFromZero ? 0 : -1;
        const dlcs = withDLCSUnknowns ? {
            ...self.steamDB.dlcs,
            ...self.steamDB.dlcsUnknowns
        } : self.steamDB.dlcs;
        $.each(dlcs, (_appid, _name) => {
            index += 1;
            result += self.bbcodeDLCSReplace(str, {
                "dlc_id": _appid,
                "dlc_name": _name,
                "dlc_index": self.bbcodeDLCSPrefix(index.toString(), parseInt(indexPrefix))
            });
        });
        return result;
    }
    bbcode(str, withDLCSUnknowns) {
        const self = this;
        let data = "";
        const re = /\[(\w+)(?:=(.*))?]([^[]+)\[\/(\w+)]/g;
        while ((data = re.exec(str)) !== null) {
            const [bbcode, bbcodeOpen, bbcodeOpt, bbcodeVal, bbcodeClose] = data;
            if (bbcodeOpen == bbcodeClose) {
                const bbcodeOpts = typeof bbcodeOpt !== "undefined" ? bbcodeOpt.split(":") : [];
                switch (bbcodeOpen) {
                    case "steamdb": {
                        str = str.replace(bbcode, self.steamDB[bbcodeVal]);
                        break;
                    }
                    case "dlcs": {
                        str = str.replace(bbcode, self.bbcodeDLCS(bbcodeVal, bbcodeOpts[0] == "true", bbcodeOpts[1] || 0, withDLCSUnknowns));
                        break;
                    }
                }
            }
        }
        return str;
    }
}

const intervalCheck = window.setInterval(() => {
    const userscript = window.getdlcinfofromsteamdb;
    if (typeof userscript != "undefined") {
        const run = new m().run();
        $(".pageloader").removeClass("is-active");
        window.clearInterval(intervalCheck);
    }
}, 500);
