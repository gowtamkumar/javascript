## introducetion to web server(nginx)
nginx: default port: 80
mysql: default port: 3306
postgresql: default port: 5432
mongodb: default port: 27017
server start: 
  commond: sudo systemctl start nginx.service
server stop: 
  commond: sudo systemctl stop nginx.service
find ip server address: ip a
commond: lsof -i -t:80
find ip address for all commond: netstat -tulpn