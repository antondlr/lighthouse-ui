#!/bin/ash

# if no .env found, dump the default to stdout and exit
if [ ! -f /app/.env ]
then
  printf "No \`/.env\` file found at the expected location (\`/app/.env\`). \n\
Please adapt this default file to your needs and mount it within the container: \n\
----------------\n"
  cat /app/.env.example
  printf "----------------\n"
  exit 1
fi

# load .env 
set -a; \
. /app/.env; \
set +a

if [ $SSL_ENABLED = true ] ; then
  ## generate cert if not present
  if [ ! -f /certs/cert.pem ] ; then
    mkdir -p /certs
    openssl req -x509 -newkey rsa:4096 -keyout /certs/key.pem -out /certs/cert.pem -days 365 -passout pass:'sigmaprime' -subj "/C=AU/CN=siren/emailAddress=noreply@sigmaprime.io"
    echo 'sigmaprime' > /certs/key.pass
  fi
  ln -s /app/docker-assets/siren-https.conf /etc/nginx/http.d/siren-https.conf
fi


# test config, start nginx 
nginx -t && nginx &

# start backend
cd /app/backend
PM2_HOME='~/.pm2-backend' pm2-runtime yarn --interpreter sh -- start:prod &

# start frontend
cd /app
PM2_HOME='~/.pm2-frontend' pm2-runtime yarn --interpreter sh -- start 
