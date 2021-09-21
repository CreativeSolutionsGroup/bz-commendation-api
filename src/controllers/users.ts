import axios from "axios";
import { Request, Response } from "express"
import jwtDecode from "jwt-decode";
import User from "../models/user";

const getGoogleSheetJSON = async (sheetId) => {
  let res = await axios.get(`https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json`);
  const json = JSON.parse(res.data.substr(47).slice(0, -2))
  return json.table;
}

const getEmployees = async () => {
  let json = await getGoogleSheetJSON("1zt-TIdmnloixDiXmDWSPKgGcpI8ABaHfouT_jBu-wBI");
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

export const existsInSheet = async (user: string) => {
  let employees = await getEmployees();

  return employees.find(employee => employee.email === user) !== -1;
}

const getEmployeeName = async (user: string) => {
  let employees = await getEmployees();

  let foundEmployee = employees.find(employee => employee.email === user);
  if(foundEmployee !== -1){
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

export { login, getEmployeeName }
