import axios from "axios";

const getGoogleSheetJSON = async (sheetId, tab) => {
  let res = await axios.get(`https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=${tab}`);
  const json = JSON.parse(res.data.substr(47).slice(0, -2))
  return json.table;
}

export default getGoogleSheetJSON;

