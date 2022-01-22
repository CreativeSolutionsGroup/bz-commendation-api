# Commendations Backend

### Obtain access key for AWS

https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/getting-your-credentials.html

### .env

```toml
# @/.env

PORT=3000
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=

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

### How to deploy (Lambda)

First, ensure that you have the `credentials` file present (`~/aws/credentials`). If you don't, create it and put the following content:

```toml
[default]
AWS_ACCESS_KEY_ID=#Fill in
AWS_SECRET_ACCESS_KEY=#Fill in
```

`yarn global add serverless`

Create a file in the root directory of the project called `.env` and put the above .env file contents into it.

Then, follow [this](https://aws.amazon.com/blogs/security/how-to-create-an-aws-iam-policy-to-grant-aws-lambda-access-to-an-amazon-dynamodb-table/) tutorial until the end

In the `serverless.yml`, change

`role: arn:aws:iam::069536840885:role/lambda-dynamo-acess`

to this:

`role: arn:aws:iam::{YOUR AWS USER ID}:role/{YOUR LAMBDA IAM POLICY ID}`

Then, run

`serverless deploy`.

### How to deploy (EC2)

Must have `docker`, and `docker-compose` installed.

`sudo /usr/local/bin/docker-compose up --detach`

### How to update the dist image

Create a new Github release and wait for the action.

