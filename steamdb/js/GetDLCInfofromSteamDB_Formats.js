// CREAMAPI (FULL INI)
GetDLCInfofromSteamDB.format.creamAPI = {
    name: "CREAMAPI v2.0.0.7 (FULL INI)",
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
    "unlockall = [option=false]creamapi_unlock_all[/option]\r\n" +
    "orgapi = [option=steam_api_o.dll]creamapi_orgapi[/option]\r\n" +
    "orgapi64 = [option=steam_api64_o.dll]creamapi_orgapi64[/option]\r\n" +
    "extraprotection = [option=false]creamapi_extraprotection[/option]\r\n" +
    "extraprotectionlevel = [option=0]creamapi_extraprotectionlevel[/option]\r\n" +
    "wrappermode = [option=false]creamapi_wrappermode[/option]\r\n" +
    "; Force the usage of specific language.\r\n" +
    ";language = [option=english]gameLanguage[/option]\r\n" +
    "; If you use log_build, uncomment line.\r\n" +
    ";log = [option=false]creamapi_log[/option]\r\n\r\n" +
    "[steam_wrapper]\r\n" +
    "newappid = [option=0]creamapi_newappid[/option]\r\n" +
    "loademu = [option=false]creamapi_loademu[/option]\r\n" +
    "emudll = [option=emu.dll]creamapi_emudll[/option]\r\n" +
    "wrapperremotestorage = [option=false]creamapi_wrapperremotestorage[/option]\r\n" +
    "wrapperuserstats = [option=false]creamapi_wrapperuserstats[/option]\r\n" +
    "wrapperutils = [option=false]creamapi_wrapperutils[/option]\r\n" +
    "wrappercallbacks = [option=false]creamapi_wrappercallbacks[/option]\r\n\r\n" +
    "[dlc_subscription]\r\n" +
    "[dlcEach]{dlc_id} = true\r\n[/dlcEach]\r\n" +
    "[dlc_index]\r\n" +
    "[dlcEach]{dlc_index} = {dlc_id}\r\n[/dlcEach]\r\n" +
    "[dlc_names]\r\n" +
    "[dlcEach]{dlc_index} = {dlc_name}\r\n[/dlcEach]\r\n" +
    "[dlc_timestamp]\r\n" +
    "; The installation date is setted to:\r\n" +
    "; [env]datetime[/env]\r\n" +
    "[dlcEach]{dlc_id} = {dlc_timestamp}\r\n[/dlcEach]"
};

// CREAMAPI (ONLY DLC LIST)
GetDLCInfofromSteamDB.format.creamAPI_o = {
    name: "CREAMAPI v2.0.0.7 (ONLY DLC LIST)",
    ini: "cream_api_dlcs.ini",
    options: {},
    data: "[dlc_subscription]\r\n" +
    "[dlcEach]{dlc_id} = true\r\n[/dlcEach]\r\n" +
    "[dlc_index]\r\n" +
    "[dlcEach]{dlc_index} = {dlc_id}\r\n[/dlcEach]\r\n" +
    "[dlc_names]\r\n" +
    "[dlcEach]{dlc_index} = {dlc_name}\r\n[/dlcEach]\r\n" +
    "[dlc_timestamp]\r\n" +
    "; The installation date is setted to:\r\n" +
    "; [env]datetime[/env]\r\n" +
    "[dlcEach]{dlc_id} = {dlc_timestamp}\r\n[/dlcEach]"
};

// LUMAEMU (FULL INI)
GetDLCInfofromSteamDB.format.lumaemu = {
    name: "LUMAEMU v1.9.7 (FULL INI)",
    ini: "LumaEmu.ini",
    options: {
        lumaemu_offline: {
            title: "Offline",
            type: "select",
            options: {
                0: "Online (Default)",
                1: "Offline"
            },
            default: 0
        },
        lumaemu_opennamechanger: {
            title: "OpenNameChanger",
            type: "select",
            options: {
                0: "Disabled (Default)",
                1: "Activated"
            },
            default: 0
        },
        lumaemu_logfile: {
            title: "LogFile",
            type: "select",
            options: {
                0: "Disabled",
                1: "Activated (Default)"
            },
            default: 1
        },
        lumaemu_enableoverlay: {
            title: "EnableOverlay",
            type: "select",
            options: {
                0: "Disabled",
                1: "Activated (Default)"
            },
            default: 1
        },
        lumaemu_save: {
            title: "Save",
            type: "select",
            options: {
                1: "Will save both (Default)",
                2: "Will save both, achievements",
                3: "Will save both, achievements, stats"
            },
            default: 1
        },
        lumaemu_blocklumaemu: {
            title: "BlockLumaEmu",
            type: "select",
            options: {
                0: "Disabled (Default)",
                1: "Activated"
            },
            default: 0
        },
        lumaemu_blocklegitsteam: {
            title: "BlockLegitSteam",
            type: "select",
            options: {
                0: "Disabled (Default)",
                1: "Activated"
            },
            default: 0
        },
        lumaemu_blocksmartsteamemu: {
            title: "BlockSmartSteamEmu",
            type: "select",
            options: {
                0: "Disabled (Default)",
                1: "Activated"
            },
            default: 0
        },
        lumaemu_blockVACbannedaccounts: {
            title: "BlockVACBannedAccounts",
            type: "select",
            options: {
                0: "Disabled",
                1: "Activated (Default)"
            },
            default: 1
        },
        lumaemu_blockunknownclient: {
            title: "BlockUnknownClient",
            type: "select",
            options: {
                0: "Disabled",
                1: "Activated (Default)"
            },
            default: 1
        },
        lumaemu_saveincustompath: {
            title: "SaveInCustomPath",
            type: "select",
            options: {
                0: "Disabled (Default)",
                1: "Activated"
            },
            default: 0
        },
        lumaemu_path: {
            title: "Path",
            type: "text",
            placeholder: "..."
        },
        lumaemu_lumaemuclientDll: {
            title: "LumaEmuClientDll",
            type: "text",
            placeholder: "steamclient.dll"
        },
        lumaemu_lumaemuclientDll64: {
            title: "LumaEmuClientDll64",
            type: "text",
            placeholder: "steamclient64.dll"
        }
    },
    data: "[SteamStatus]\r\n" +
    "Offline = [option=0]lumaemu_offline[/option]\r\n\r\n" +
    "[Player]\r\n" +
    "PlayerName = [option=LumaEmu]username[/option]\r\n" +
    "PlayerNickname = [option=LumaEmu]username[/option]\r\n" +
    "ClanName = [option=LumaEmu]username[/option]\r\n" +
    "ClanTag = [option=LumaEmu]username[/option]\r\n" +
    "OpenNameChanger = [option=0]lumaemu_opennamechanger[/option]\r\n\r\n" +
    "[Minidumps]\r\n" +
    "WriteMinidumps = 1\r\n\r\n" +
    "[Language]\r\n" +
    "GameLanguage = [option=english]gameLanguage[/option]\r\n\r\n" +
    "[Cache]\r\n" +
    "UseCacheFiles = 0\r\n" +
    "CachePath = C:\\Program Files (x86)\\Steam\\steamapps\\\r\n\r\n" +
    "[Log]\r\n" +
    "LogFile = [option=1]lumaemu_logfile[/option]\r\n\r\n" +
    "[MasterServer]\r\n" +
    "Master = 1\r\n\r\n" +
    "[DLC]\r\n" +
    "UnlockDLC = 3\r\n\r\n" +
    "[dlcEach]; {dlc_name}\r\nDLC_{dlc_id} = 1\r\n[/dlcEach]\r\n" +
    "[Overlay]\r\n" +
    "EnableOverlay = [option=1]lumaemu_enableoverlay[/option]\r\n\r\n" +
    "[StatsAndAchievements]\r\n" +
    "Save = [option=1]lumaemu_save[/option]\r\n\r\n" +
    "[SourceEngine]\r\n" +
    "FocusPatch = 0\r\n\r\n" +
    "[ServerAuthorization]\r\n" +
    "BlockLumaEmu = [option=0]lumaemu_blocklumaemu[/option]\r\n" +
    "BlockLegitSteam = [option=0]lumaemu_blocklegitsteam[/option]\r\n" +
    "BlockSmartSteamEmu = [option=0]lumaemu_blocksmartsteamemu[/option]\r\n" +
    "BlockVACBannedAccounts = [option=1]lumaemu_blockVACbannedaccounts[/option]\r\n" +
    "BlockUnknownClient = [option=1]lumaemu_blockunknownclient[/option]\r\n\r\n" +
    "[VR]\r\n" +
    "EnableVR = 0\r\n\r\n" +
    "[RemoteStorage]\r\n" +
    "SaveInCustomPath = [option=0]lumaemu_saveincustompath[/option]\r\n" +
    "Path = [option=]lumaemu_path[/option]\r\n\r\n" +
    "[LumaGameLauncher]\r\n" +
    "GameExe = [steamdb]configEXE[/steamdb] -appid [steamdb]appID[/steamdb] [steamdb]configARG[/steamdb]\r\n" +
    "LoadLumaCEG = 0\r\n" +
    "AppIDSetByLauncher = 1\r\n\r\n" +
    "[SteamClient]\r\n" +
    "LumaEmuClientDll = [option=steamclient.dll]lumaemu_lumaemuclientDll[/option]\r\n" +
    "LumaEmuClientDll64 = [option=steamclient64.dll]lumaemu_lumaemuclientDll64[/option]\r\n"
};

// LUMAEMU (ONLY DLC LIST)
GetDLCInfofromSteamDB.format.lumaemu_o = {
    name: "LUMAEMU v1.9.7 (ONLY DLC LIST)",
    ini: "LumaEmu_dlcs.ini",
    options: {},
    data: "[dlcEach]; {dlc_name}\r\nDLC_{dlc_id} = 1\r\n[/dlcEach]"
};

// SMARTSTEAMEMU (ONLY DLC LIST)
GetDLCInfofromSteamDB.format.smartsteamemu_o = {
    name: "SMARTSTEAMEMU (ONLY DLC LIST)",
    ini: "SmartSteamEmu_dlcs.ini",
    options: {},
    data: "[dlcEach]{dlc_id} = {dlc_name}\r\n[/dlcEach]"
};

// 3DMGAME
GetDLCInfofromSteamDB.format["3dmgame"] = {
    name: "3DMGAME",
    ini: "3DMGAME.ini",
    options: {},
    data: "[dlcEach=true:true:3]; {dlc_name}\r\nDLC{dlc_index} = {dlc_id}\r\n[/dlcEach]"
};

// ALI213
GetDLCInfofromSteamDB.format.ali213 = {
    name: "ALI213",
    ini: "ALI213.ini",
    options: {},
    data: "[dlcEach]{dlc_id} = {dlc_name}\r\n[/dlcEach]"
};

// CODEX (ID = NAME)
GetDLCInfofromSteamDB.format.codex = {
    name: "CODEX (ID = NAME)",
    ini: "steam_emu.ini",
    options: {},
    data: "[dlcEach]{dlc_id} = {dlc_name}\r\n[/dlcEach]"
};

// CODEX (DLC00000, DLCName)
GetDLCInfofromSteamDB.format.codex_t = {
    name: "CODEX (DLC00000, DLCName)",
    ini: "steam_emu.ini",
    options: {},
    data: "[dlcEach=false:true:5]DLC{dlc_index} = {dlc_id}\r\nDLCName{dlc_index} = {dlc_name}\r\n[/dlcEach]"
};

// RELOADED
GetDLCInfofromSteamDB.format.reloaded = {
    name: "RELOADED",
    ini: "steam_api.ini",
    options: {},
    data: "AppName = [steamdb]appIDName[/steamdb]\r\n" +
    "[dlcEach=true:true:3]DLC{dlc_index} = {dlc_id}\r\nDLCName{dlc_index} = {dlc_name}\r\n[/dlcEach]" +
    "DLCCount = [steamdb]dlcsTot[/steamdb]\r\n"
};

// REVOLT
GetDLCInfofromSteamDB.format.revolt = {
    name: "REVOLT",
    ini: "REVOLT.ini",
    options: {},
    data: "[DLC]\r\n" +
    "DLCEnumBase = [steamdb]appID[/steamdb]\r\n" +
    "DLCEnumCount = [steamdb]dlcsTot[/steamdb]\r\n" +
    "Default = false\r\n\r\n" +
    "[dlcEach]; {dlc_name}\r\n{dlc_index} = {dlc_id}\r\n[/dlcEach]\r\n" +
    "[Subscriptions]\r\n" +
    "Default = false\r\n\r\n" +
    "[dlcEach]{dlc_index} = true\r\n[/dlcEach]"
};

// SKIDROW
GetDLCInfofromSteamDB.format.skidrow = {
    name: "SKIDROW",
    ini: "steam_api.ini",
    options: {},
    data: "[dlcEach]; {dlc_name}\r\n{dlc_id}\r\n[/dlcEach]"
};
