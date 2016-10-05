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
    "GameLanguage = [option=english]game_language[/option]\r\n\r\n" +
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
