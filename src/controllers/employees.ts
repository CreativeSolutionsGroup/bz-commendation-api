import { getUsers } from './../services/users';
import { Request, Response } from "express";
import axios from "axios";

const getEmployeePhotos = async (req: Request, res: Response) => {
  const users = await getUsers();
  let employeeData = {};

  let resourceNames = '';
  users.forEach((user) => {
    resourceNames += "&resourceNames=people/" + user.googleId;
    employeeData[user.id] = user.email;
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
  res.status(200).json({
    message: employeePhotos
  });
}

export { getEmployeePhotos }