chmod 764 node.sh
chmod 764 start-dev.sh
docker-compose up -d
docker cp node.sh nodejschatbot_node_1:/
docker cp app.js nodejschatbot_node_1:/
docker cp router/ nodejschatbot_node_1:/
docker cp start-dev.sh nodejschatbot_node_1:/
sleep 3s
docker exec nodejschatbot_node_1 /bin/bash ./start-dev.sh
