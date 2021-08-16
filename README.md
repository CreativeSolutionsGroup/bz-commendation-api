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

### How to deploy (Lambda)

First, ensure that you have the `credentials` file present (`~/aws/credentials`). If you don't, create it and put the following content:

```toml
[default]
AWS_ACCESS_KEY_ID=#Fill in
AWS_SECRET_ACCESS_KEY=#Fill in
```

`yarn global add serverless`

Create a file in the root directory of the project called `.env` and put the following content into it:

```toml
PORT=3000
AWS_ACCESS_KEY_ID=#Fill in
AWS_SECRET_ACCESS_KEY=#Fill in
```

Then, run

`serverless deploy`.

### How to deploy (EC2)

Must have `docker`, and `docker-compose` installed.

`sudo /usr/local/bin/docker-compose up --detach`

### How to update the dist image

Create a new Github release and wait for the action.


