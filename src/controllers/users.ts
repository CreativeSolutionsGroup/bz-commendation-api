import { getUserRole, getUsers } from './../services/users';
import axios from "axios";
import { Request, Response } from "express"
import jwtDecode from "jwt-decode";
import { userExistsByEmail } from "../services/users";

const getEmployeesRet = async (req: Request, res: Response) => {
  const emp = await getUsers();

  res.status(200).json({
    message: emp
  });
}

/**
 * Specialized profile image endpoint for translating a bearer token in to a profile picture.
 * 
 * @author Spencer Bills
 */
export const getUserProfileImage = async (req: Request, res: Response) => {
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
    res.status(200).json({
      message: photoURL
    })
  }
}

/**
 * 
 * @param user The users UUID.
 * @returns 
 */
export const isAdmin = async (user: string) => {
  let r = await getUserRole(user);
  return r.role === "admin";
}

const getEmployeeName = async (email: string) => {
  let employees = await getUsers();

  let foundEmployee = employees.find(employee => employee.email === email);
  if (typeof foundEmployee !== "undefined") {
    return foundEmployee.name;
  }
  return email;
}

/**
 * A simple interface to so that we don't have to have a token variable on User.
 */
interface LocalUser {
  token: string
}

/**
 * Logs in a user using JWT.
 * 
 * @author Alec Mathisen
 */
const login = (req: Request, res: Response) => {
  let user = req.body as LocalUser;
  let decodedUser = jwtDecode(user.token) as any;
  let email = decodedUser.email;

  if (userExistsByEmail(email)) {
    res.status(200).json({
      message: "Successfully logged in."
    })
  } else {
    res.status(403).json({
      message: "Verification failed because the user does not exist in the sheet."
    })
  }
}

export { login, getEmployeeName, getEmployeesRet }
