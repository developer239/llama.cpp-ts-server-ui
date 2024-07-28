#!/bin/sh

# Inject runtime config
echo "window.ENV = {" > /usr/share/nginx/html/config.js
echo "  VITE_SERVER_URI: '${VITE_GRAPHQL_URI}'," >> /usr/share/nginx/html/config.js
echo "};" >> /usr/share/nginx/html/config.js

# Start Nginx
nginx -g 'daemon off;'
