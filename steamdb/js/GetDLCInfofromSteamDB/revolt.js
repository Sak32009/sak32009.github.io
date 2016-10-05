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
    "[dlcEach]; {dlc_name}\r\n{dlc_index} = true\r\n[/dlcEach]"
};