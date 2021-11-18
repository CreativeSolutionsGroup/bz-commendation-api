import axios from "axios";
import { Request, Response } from "express"
import jwtDecode from "jwt-decode";
import { TemplateInstance } from "twilio/lib/rest/verify/v2/template";
import User from "../models/user";

const getGoogleSheetJSON = async (sheetId, tab) => {
  let res = await axios.get(`https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=${tab}`);
  const json = JSON.parse(res.data.substr(47).slice(0, -2))
  return json.table;
}

const getEmployees = async () => {
  let json = await getGoogleSheetJSON("1zt-TIdmnloixDiXmDWSPKgGcpI8ABaHfouT_jBu-wBI", "Members");
  let employeeData = [];

  let rows = json.rows;
  rows.shift();//Remove top row
  rows.forEach((row) => {
    let email = row.c[0].v;
    let name = row.c[1].v;
    let team = row.c[2].v;
    employeeData.push({ email: email, name: name, team: team })
  });

  employeeData.sort((a, b) => ('' + a.name).localeCompare(b.name));

  return employeeData;
}

const getAdminUsers = async () => {
  let json = await getGoogleSheetJSON("1zt-TIdmnloixDiXmDWSPKgGcpI8ABaHfouT_jBu-wBI", "Admins");
  let adminList = [];

  let rows = json.rows;
  rows.forEach((row) => {
    let email = row.c[0].v;
    adminList.push(email)
  });

  return adminList;
}

const getExecUsers = async () => {
  let json = await getGoogleSheetJSON("1zt-TIdmnloixDiXmDWSPKgGcpI8ABaHfouT_jBu-wBI", "Execs");
  let execList = [];

  let rows = json.rows;
  rows.forEach((row) => {
    let email = row.c[0].v;
    execList.push(email)
  });

  return execList;
}

export const getSuggestionTeam = async () => {
  let json = await getGoogleSheetJSON("1zt-TIdmnloixDiXmDWSPKgGcpI8ABaHfouT_jBu-wBI", "Suggestion Team");
  let suggestionTeam = [];

  let rows = json.rows;
  rows.forEach((row) => {
    let email = row.c[0].v;
    suggestionTeam.push(email)
  });

  return suggestionTeam;
}

// used to determine team given exec email
export const determineTeam = async (email) => {
  let json = await getGoogleSheetJSON("1zt-TIdmnloixDiXmDWSPKgGcpI8ABaHfouT_jBu-wBI", "Execs");
  
  let team = "";
  let rows = json.rows;
  rows.forEach((row) => {
    let emailInSheet = row.c[0].v;
    console.log(emailInSheet)
    if(email == emailInSheet) {
      team = row.c[1].v;
      console.log("team: " + team)
    }
  });

  return team;
}

const getExecTeam = async (req: Request, res: Response) => {
  let bearer = req.headers.authorization;

    try {

        // get token
        let splitBearer = bearer.split(" ")[1];
        let tokenRes = await axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${splitBearer}`);

        // pull email out of token
        const email = tokenRes.data["email"];
        if(email === undefined){
            throw "Invalid User";
        }
        
        // check which team the exec is over
        const team = await determineTeam(email);
        console.log("after determine team: " + team);

        if (tokenRes.status !== 200) {
            throw "bad auth";
        }

        // this line added
        return res.status(200).json({
            message: team
        });

    } catch (e) {
      return res.json({ response: "Failed", reason: e });
    }
}

export const existsInSheet = async (user: string) => {
  let employees = await getEmployees();
  return employees.find(employee => employee.email === user) !== undefined;
}

export const isAdmin = async (user: string) => {
  let adminList = await getAdminUsers();
  return adminList.find(admin => admin === user) !== undefined;
}

export const isExec = async (user: string) => {
  let execList = await getExecUsers();
  return execList.find(exec => exec === user) !== undefined;
}

const getEmployeeName = async (user: string) => {
  let employees = await getEmployees();

  let foundEmployee = employees.find(employee => employee.email === user);
  if(foundEmployee !== undefined){
    return foundEmployee.name;
  }
  return user;
}

const login = (req: Request, res: Response) => {
  let user = req.body as User;
  let decodedUser = jwtDecode(user.token) as any;
  let username = decodedUser.email;

  if (existsInSheet(username)) {
    res.json({
      message: "Successfully logged in."
    })
  } else {
    res.status(403).json({
      message: "Did not verify."
    })
  }
}

export { login, getEmployeeName, getExecTeam }
