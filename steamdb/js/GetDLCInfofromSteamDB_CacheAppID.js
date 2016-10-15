// CACHE APPID
var CacheAppID = {

    // STORAGE KEY
    storageKey: "cacheAppID",

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
    get: function (appID) {

        var data = this.getAll();

        return data[appID];

    },

    // SET
    set: function (appID, val) {

        var data = this.getAll();

        data[appID] = val;

        this.save(data);

    }

};
