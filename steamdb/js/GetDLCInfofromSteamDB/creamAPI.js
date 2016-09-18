// CREAMAPI (FULL INI)
GetDLCInfofromSteamDB.format.creamAPI = {
    name: "CREAMAPI v2.0.0.6 HOTFIX (FULL INI)",
    ini: "cream_api.ini",
    options: {
        creamapi_unlock_all: {
            title: "Enable/disable automatic DLC unlock",
            type: "checkbox"
        },
        creamapi_orgapi: {
            title: "Original Valve's steam_api.dll",
            type: "text",
            placeholder: "steam_api_o.dll"
        },
        creamapi_orgapi64: {
            title: "Original Valve's steam_api64.dll",
            type: "text",
            placeholder: "steam_api64_o.dll"
        },
        creamapi_extraprotection: {
            title: "Enable/disable extra protection bypasser",
            type: "checkbox"
        },
        creamapi_extraprotectionlevel: {
            title: "ExtraProtection level",
            type: "select",
            options: {
                0: "Minimum (Default)",
                1: "Medium",
                2: "Maximum"
            },
            default: 0
        },
        creamapi_wrappermode: {
            title: "Turn on the \"light\" wrapper mode",
            type: "checkbox"
        },
        creamapi_log: {
            title: "Enable/disable logging of the DLC functions",
            type: "checkbox"
        },
        creamapi_newappid: {
            title: "Application ID to override (used when the wrapper mode is on)",
            type: "text",
            placeholder: "0"
        },
        creamapi_loademu: {
            title: "Load steam emulator library",
            type: "checkbox"
        },
        creamapi_emudll: {
            title: "Emulator library that is used for the stats and storage handling.",
            type: "text",
            placeholder: "emu.dll"
        },
        creamapi_wrapperremotestorage: {
            title: "Use the emulator storage system",
            type: "checkbox"
        },
        creamapi_wrapperuserstats: {
            title: "Use the emulator stats/achievements system",
            type: "checkbox"
        },
        creamapi_wrapperutils: {
            title: "Use the emulator utils system",
            type: "checkbox"
        },
        creamapi_wrappercallbacks: {
            title: "User the emulator callbacks system",
            type: "checkbox"
        }
    },
    data: "[steam]\n" +
    "appid = [steamdb]appID[/steamdb]\n" +
    "language = [option=english]game_language[/option]\n" +
    "unlockall = [option=false]creamapi_unlock_all[/option]\n" +
    "orgapi = [option=steam_api_o.dll]creamapi_orgapi[/option]\n" +
    "orgapi64 = [option=steam_api64_o.dll]creamapi_orgapi64[/option]\n" +
    "extraprotection = [option=false]creamapi_extraprotection[/option]\n" +
    "extraprotectionlevel = [option=0]creamapi_extraprotectionlevel[/option]\n" +
    "wrappermode = [option=false]creamapi_wrappermode[/option]\n" +
    "log = [option=false]creamapi_log[/option]\n\n" +
    "[steam_wrapper]\n" +
    "newappid = [option=0]creamapi_newappid[/option]\n" +
    "loademu = [option=false]creamapi_loademu[/option]\n" +
    "emudll = [option=emu.dll]creamapi_emudll[/option]\n" +
    "wrapperremotestorage = [option=false]creamapi_wrapperremotestorage[/option]\n" +
    "wrapperuserstats = [option=false]creamapi_wrapperuserstats[/option]\n" +
    "wrapperutils = [option=false]creamapi_wrapperutils[/option]\n" +
    "wrappercallbacks = [option=false]creamapi_wrappercallbacks[/option]\n\n" +
    "[dlc_subscription]\n" +
    "[dlcEach]; {dlc_name}\n{dlc_id} = true\n[/dlcEach]\n" +
    "[dlc_index]\n" +
    "[dlcEach]{dlc_index} = {dlc_id}\n[/dlcEach]\n" +
    "[dlc_names]\n" +
    "[dlcEach]{dlc_index} = \"{dlc_name}\"\n[/dlcEach]"
};
