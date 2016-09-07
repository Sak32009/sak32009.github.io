// CREAMAPI (ONLY DLC LIST)
GetDLCInfofromSteamDB.format.creamAPI_o = {
    name: "CREAMAPI v2.0.0.6 HOTFIX (ONLY DLC LIST)",
    ini: "CREAMAPI_O.ini",
    options: {},
    data: "[dlc_subscription]\n" +
    "[dlcEach]; {dlc_name}\n{dlc_id} = true\n[/dlcEach]\n" +
    "[dlc_index]\n" +
    "[dlcEach]{dlc_index} = {dlc_id}\n[/dlcEach]\n" +
    "[dlc_names]\n" +
    "[dlcEach]{dlc_index} = \"{dlc_name}\"\n[/dlcEach]"
};