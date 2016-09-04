// REVOLT
GetDLCInfofromSteamDB.format.revolt = {
    name: "REVOLT",
    ini: "REVOLT.ini",
    options: {},
    data: "[DLC]\n" +
    "DLCEnumBase = [steamdb]appID[/steamdb]\n" +
    "DLCEnumCount = [steamdb]dlcsTot[/steamdb]\n" +
    "Default = false\n\n" +
    "[dlcEach]; {dlc_name}\n{dlc_index} = {dlc_id}\n[/dlcEach]\n" +
    "[Subscriptions]\n" +
    "Default = false\n\n" +
    "[dlcEach]; {dlc_name}\n{dlc_index} = true\n[/dlcEach]"
};