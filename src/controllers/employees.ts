import { Request, Response } from "express";
import axios from "axios";
import getGoogleSheetJSON from "../utils/sheets";

const getProfileImage = async (req: Request, res: Response) => {
  let json = await axios.get('https://people.googleapis.com/v1/people/me?personFields=photos', {
    headers: {
      'Authorization': `Bearer ${req.query.access}`
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
      'Authorization': `Bearer ${req.query.access}`
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

const getTeamLogo = async (teamName) => {
  let json = await getGoogleSheetJSON("1zt-TIdmnloixDiXmDWSPKgGcpI8ABaHfouT_jBu-wBI", 'Teams');
  let rows = json.rows;

  let teamImageURL = "";
  rows.shift();//Remove top row
  await rows.forEach((row) => {
    let name = row.c[0].v;
    let emails = row.c[1].v;
    let image = (row.c[2] === null || row.c[2] === undefined) ? undefined : row.c[2].v;
    if(name === teamName){
      teamImageURL = image;
    }
  });
  return teamImageURL;
}

export { getProfileImage, getEmployeePhotos, getTeams, getTeamLogo}