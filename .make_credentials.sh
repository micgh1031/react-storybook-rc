#!/usr/bin/env bash

mkdir ~/.aws

cat > ~/.aws/credentials << EOL
[production]
aws_access_key_id = ${PROD_ACCESS_KEY}
aws_secret_access_key = ${PROD_SECRET}
[dev]
aws_access_key_id = ${DEV_ACCESS_KEY}
aws_secret_access_key = ${DEV_SECRET}
EOL
