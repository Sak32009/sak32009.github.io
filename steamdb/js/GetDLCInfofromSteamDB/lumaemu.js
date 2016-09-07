// LUMAEMU (FULL INI)
GetDLCInfofromSteamDB.format.lumaemu = {
    name: "LUMAEMU v1.9.7 (FULL INI)",
    ini: "LUMAEMU.ini",
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
    data: "[SteamStatus]\n" +
    "Offline = [option=0]lumaemu_offline[/option]\n\n" +
    "[Player]\n" +
    "PlayerName = [option=LumaEmu]username[/option]\n" +
    "PlayerNickname = [option=LumaEmu]username[/option]\n" +
    "ClanName = [option=LumaEmu]username[/option]\n" +
    "ClanTag = [option=LumaEmu]username[/option]\n" +
    "OpenNameChanger = [option=0]lumaemu_opennamechanger[/option]\n\n" +
    "[Minidumps]\n" +
    "WriteMinidumps = 1\n\n" +
    "[Language]\n" +
    "GameLanguage = [option=english]game_language[/option]\n\n" +
    "[Cache]\n" +
    "UseCacheFiles = 0\n" +
    "CachePath = C:\\Program Files (x86)\\Steam\\steamapps\\\n\n" +
    "[Log]\n" +
    "LogFile = [option=1]lumaemu_logfile[/option]\n\n" +
    "[MasterServer]\n" +
    "Master = 1\n\n" +
    "[DLC]\n" +
    "UnlockDLC = 3\n\n" +
    "[dlcEach]; {dlc_name}\nDLC_{dlc_id} = 1\n[/dlcEach]\n" +
    "[Overlay]\n" +
    "EnableOverlay = [option=1]lumaemu_enableoverlay[/option]\n\n" +
    "[StatsAndAchievements]\n" +
    "Save = [option=1]lumaemu_save[/option]\n\n" +
    "[SourceEngine]\n" +
    "FocusPatch = 0\n\n" +
    "[ServerAuthorization]\n" +
    "BlockLumaEmu = [option=0]lumaemu_blocklumaemu[/option]\n" +
    "BlockLegitSteam = [option=0]lumaemu_blocklegitsteam[/option]\n" +
    "BlockSmartSteamEmu = [option=0]lumaemu_blocksmartsteamemu[/option]\n" +
    "BlockVACBannedAccounts = [option=1]lumaemu_blockVACbannedaccounts[/option]\n" +
    "BlockUnknownClient = [option=1]lumaemu_blockunknownclient[/option]\n\n" +
    "[VR]\n" +
    "EnableVR = 0\n\n" +
    "[RemoteStorage]\n" +
    "SaveInCustomPath = [option=0]lumaemu_saveincustompath[/option]\n" +
    "Path = [option=\0]lumaemu_path[/option]\n\n" +
    "[LumaGameLauncher]\n" +
    "GameExe = [steamdb]configEXE[/steamdb] -appid [steamdb]appID[/steamdb] [steamdb]configARG[/steamdb]\n" +
    "LoadLumaCEG = 0\n" +
    "AppIDSetByLauncher = 1\n\n" +
    "[SteamClient]\n" +
    "LumaEmuClientDll = [option=steamclient.dll]lumaemu_lumaemuclientDll[/option]\n" +
    "LumaEmuClientDll64 = [option=steamclient64.dll]lumaemu_lumaemuclientDll64[/option]\n"
};
