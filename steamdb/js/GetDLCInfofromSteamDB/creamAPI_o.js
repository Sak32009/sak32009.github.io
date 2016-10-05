// CREAMAPI (ONLY DLC LIST)
GetDLCInfofromSteamDB.format.creamAPI_o = {
    name: "CREAMAPI v2.0.0.6 HOTFIX (ONLY DLC LIST)",
    ini: "CREAMAPI_O.ini",
    options: {},
    data: "[dlc_subscription]\r\n" +
    "[dlcEach]; {dlc_name}\r\n{dlc_id} = true\r\n[/dlcEach]\r\n" +
    "[dlc_index]\r\n" +
    "[dlcEach]{dlc_index} = {dlc_id}\r\n[/dlcEach]\r\n" +
    "[dlc_names]\r\n" +
    "[dlcEach]{dlc_index} = \"{dlc_name}\"\r\n[/dlcEach]"
};