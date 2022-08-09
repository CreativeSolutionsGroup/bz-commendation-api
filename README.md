# Commendations Backend

## Index

- Development `@/docs/development.md`
- Deployment `@/docs/deployment.md`
- Learn about
  - This program `@/docs/deployment.md`
  - Resources/REST endpoints `@/docs/resources.md`

### Obtain access key for AWS

Ask your exec.

### .env

```toml
# @/.env

PORT=3000

DB_HOST=
DB_PORT=
DB_USER=
DB_PASS=
DB_DATA=

EMAIL=
EMAIL_PASSWORD=
OAUTH_CLIENTID=
OAUTH_CLIENT_SECRET=
OAUTH_REFRESH_TOKEN=

TWILIO_NUMBER=
TWILIO_SID=
TWILIO_AUTH=
```

Setup Nodemailer OAUTH: https://www.freecodecamp.org/news/use-nodemailer-to-send-emails-from-your-node-js-server/

### How to deploy via Docker

Must have `docker`, and `docker-compose` installed.

`sudo /usr/local/bin/docker-compose up --detach`

### How to update the dist image

Create a new Github release and wait for the action.
