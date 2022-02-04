# Resources

This is a guide on to how to create a new "resource".

***"Rest Resources are data points on which we want to perform operation(s)."***

## Step 1
Create a router in `@/src/routers`

`<resource name>.ts`

Then, copy paste this code:

```typescript
// @/src/routers/myResource.ts
import { Express } from "express";

import { checkLoggedIn, checkAdmin } from "../utils/auth";

const resourceRoutes = (app: Express): void => {
    console.log(`Registering resource routes.`)

    app.route(`/suggestion`)
        .post(checkLoggedIn, createResource);
}

export default resourceRoutes;
```

createResource will be undefined. Anywhere you see "resource," replace it with the name of your resource.

## Step 2
Create a controller in `@/src/controllers`

`<resource name>.ts`

Then, copy paste this code:

```typescript
// @/src/controllers/myResource.ts
import { Request, Response } from "express";
import AWS from "aws-sdk";
import jwt_decode from "jwt-decode";
import { email, emailOthers, emailSuggestionTeam } from "../utils/email";

const createResource = async (req: Request, res: Response) => {
    let auth = req.headers.authorization;
    let decodedToken = jwt_decode(auth.split(" ")[1]) as any;

    // Do your logic here.

    try {
       return res.json("Finished.");
    } catch (e) {
        return res.json({ response: "Failed", reason: e });
    }
}

export { createResource };
```

Remember, all auth is already handled for you in `@/src/utils/auth` because we added checkLoggedIn before this path in the router.

I have left some imported nice tools for you to use from the utils and AWS.

Now, go back to your `@/src/routers/myResource.ts` and `import { createResource } from "../controllers/myResource.ts"`

```typescript
// @/src/routers/myResource.ts
import { Express } from "express";
// ...
import { createResource } from "../controllers/myResource.ts";
// ...
```

## Step 3

Now, we will register this router in the app.

```typescript
// @/src/app.ts
// ...
import commendationsRouter from "./routers/commendations";
import userRouter from "./routers/users";
import employeeRouter from "./routers/employees";
import suggestionsRouter from "./routers/suggestions";
import myResourceRouter from "./routers/myResource";

// ...

commendationsRouter(app);
employeeRouter(app);
userRouter(app);
suggestionsRouter(app);
myResourceRouter(app);

// ...
```

## Step 4

Congratulations! You made a new resource. Remember these simple guidelines:

```
POST    - Create
PUT     - Update
GET     - Fetch/retrieve
DELETE  - Delete
```

And if you have any questions, check out the other routers.