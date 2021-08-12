# Commendations Backend

### Obtain access key for AWS

https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/getting-your-credentials.html

### .env

```toml
# @/.env

PORT=3000
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=

```

### How to update the dist image

Create a new Github release and wait for the action.

### How to deploy (EC2)

Must have `docker`, and `docker-compose` installed.

`sudo /usr/local/bin/docker-compose up --detach`