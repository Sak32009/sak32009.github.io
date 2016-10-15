// STORAGE
var Storage = {

    // PREFIX
    prefix: "",

    // GET
    get: function (name) {

        return window.localStorage.getItem(this.prefix + name);

    },

    // GET (IF NOT EXISTS RETURN DEFAULT VALUE)
    getDef: function (name, def) {

        var item = Storage.get(name);

        return Storage.check(item) ? item : def;

    },

    // SET
    set: function (name, val) {

        return window.localStorage.setItem(this.prefix + name, val);

    },

    // REMOVE
    remove: function (name) {

        return window.localStorage.removeItem(this.prefix + name);

    },

    // CLEAR
    clear: function () {

        window.localStorage.clear();

    },

    // CHECK
    check: function (item) {

        return item !== null && item.length;

    }

};
