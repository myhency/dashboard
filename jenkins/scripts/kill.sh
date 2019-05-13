#!/usr/bin/env sh

echo 'The following command terminates the "npm start" process using its PID'
echo '(written to ".pidfile"), all of which were conducted when "deliver.sh"'
echo 'was executed.'
set -x
# kill $(cat .pidfile)
docker stop bass-portal-front-end
docker rm bass-portal-front-end

