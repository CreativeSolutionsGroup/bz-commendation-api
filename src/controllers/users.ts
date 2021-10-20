import axios from "axios";
import { Request, Response } from "express"
import jwtDecode from "jwt-decode";
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

const getAllEmployees = async (req: Request, res: Response) => {

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

export const existsInSheet = async (user: string) => {
  let employees = await getEmployees();
  return employees.find(employee => employee.email === user) !== undefined;
}

export const isAdmin = async (user: string) => {
  let adminList = await getAdminUsers();
  return adminList.find(admin => admin === user) !== undefined;
}

const getEmployeeName = async (user: string) => {
  let employees = await getEmployees();

  let foundEmployee = employees.find(employee => employee.email === user);
  if (typeof foundEmployee !== "undefined") {
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

const getProfileImage = async (req: Request, res: Response) => {
  let json = await axios.get('https://people.googleapis.com/v1/people/me?personFields=photos', {
    headers: {
      'Authorization': req.headers.authorization
    }
  });
  let photos = json.data.photos;
  if (typeof photos !== "undefined") {
    let photoURL = '';
    photos.forEach(photo => {
      if (photo.metadata.primary) {
        photoURL = photo.url;
      }
    })
    res.json({
      message: photoURL
    })
  }
}

const getEmployeePhotos = async (req: Request, res: Response) => {
  let json = await getGoogleSheetJSON("1zt-TIdmnloixDiXmDWSPKgGcpI8ABaHfouT_jBu-wBI", 'GoogleIDs');
  let employeeData = {};

  let rows = json.rows;
  rows.shift();//Remove top row

  let resourceNames = '';
  rows.forEach((row) => {
    let email = row.c[0].v;
    let id = row.c[1].v;

    resourceNames += "&resourceNames=people/" + id;
    employeeData[id] = email;
  });

  const photoJson = await axios.get(`https://people.googleapis.com/v1/people:batchGet?sources=READ_SOURCE_TYPE_DOMAIN_CONTACT&sources=READ_SOURCE_TYPE_PROFILE&personFields=photos` + resourceNames, {
    headers: {
      'Authorization': req.headers.authorization
    }
  })
  let responses = photoJson.data.responses;
  let employeePhotos = {};

  // TODO: Create an interface/type for this.
  responses.forEach(employeeJsonRes => {
    let person = employeeJsonRes.person;
    if (typeof person !== "undefined") {
      if (typeof person.photos !== "undefined") {
        let photo = person.photos[0];
        let id = photo.metadata.source.id;
        let email = employeeData[id];
        let photoURL = photo.url;
        employeePhotos[email] = photoURL;
      }
    }
  });
  res.json({
    message: employeePhotos
  })
}

const getTeams = async (req: Request, res: Response) => {
  let json = await getGoogleSheetJSON("1zt-TIdmnloixDiXmDWSPKgGcpI8ABaHfouT_jBu-wBI", 'Teams');
  let teamData = [];

  let rows = json.rows;
  rows.shift();//Remove top row
  rows.forEach((row) => {
    let name = row.c[0].v;
    let emails = row.c[1].v;
    let image = (row.c[2] === null || row.c[2] === undefined) ? undefined : row.c[2].v;

    teamData.push({ name, emails, image });
  });

  teamData.sort((a, b) => ('' + a.name).localeCompare(b.name));
  res.json({message: teamData});
}

export { login, getEmployeeName, getEmployeePhotos, getTeams, getEmployees }
