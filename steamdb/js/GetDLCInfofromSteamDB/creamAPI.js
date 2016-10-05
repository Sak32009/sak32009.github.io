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
    data: "[steam]\r\n" +
    "appid = [steamdb]appID[/steamdb]\r\n" +
    "language = [option=english]game_language[/option]\r\n" +
    "unlockall = [option=false]creamapi_unlock_all[/option]\r\n" +
    "orgapi = [option=steam_api_o.dll]creamapi_orgapi[/option]\r\n" +
    "orgapi64 = [option=steam_api64_o.dll]creamapi_orgapi64[/option]\r\n" +
    "extraprotection = [option=false]creamapi_extraprotection[/option]\r\n" +
    "extraprotectionlevel = [option=0]creamapi_extraprotectionlevel[/option]\r\n" +
    "wrappermode = [option=false]creamapi_wrappermode[/option]\r\n" +
    "log = [option=false]creamapi_log[/option]\r\n\r\n" +
    "[steam_wrapper]\r\n" +
    "newappid = [option=0]creamapi_newappid[/option]\r\n" +
    "loademu = [option=false]creamapi_loademu[/option]\r\n" +
    "emudll = [option=emu.dll]creamapi_emudll[/option]\r\n" +
    "wrapperremotestorage = [option=false]creamapi_wrapperremotestorage[/option]\r\n" +
    "wrapperuserstats = [option=false]creamapi_wrapperuserstats[/option]\r\n" +
    "wrapperutils = [option=false]creamapi_wrapperutils[/option]\r\n" +
    "wrappercallbacks = [option=false]creamapi_wrappercallbacks[/option]\r\n\r\n" +
    "[dlc_subscription]\r\n" +
    "[dlcEach]; {dlc_name}\r\n{dlc_id} = true\r\n[/dlcEach]\r\n" +
    "[dlc_index]\r\n" +
    "[dlcEach]{dlc_index} = {dlc_id}\r\n[/dlcEach]\r\n" +
    "[dlc_names]\r\n" +
    "[dlcEach]{dlc_index} = \"{dlc_name}\"\r\n[/dlcEach]"
};
