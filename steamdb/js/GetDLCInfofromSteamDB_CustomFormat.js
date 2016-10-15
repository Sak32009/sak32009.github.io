// CUSTOM FORMAT
var CustomFormat = {

    // STORAGE KEY
    storageKey: "customFormat",

    // SAVE
    save: function (data) {

        Storage.set(this.storageKey, JSON.stringify(data));

    },

    // GET ALL
    getAll: function () {

        var item = Storage.get(this.storageKey);

        return Storage.check(item) ? JSON.parse(item) : {};

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

        this.save(data);

    },

    // EDIT
    edit: function (uniqueid, val) {

        var data = this.getAll();

        if (uniqueid in data) {

            data[uniqueid].format = val;

            this.save(data);

        }

    },

    // REMOVE
    remove: function (uniqueid) {

        var data = this.getAll();

        if (uniqueid in data) {

            delete data[uniqueid];

            this.save(data);

        }

    }

};
