# run
## !docker, dev, prod  
https://mherman.org/blog/dockerizing-a-react-app/  
cd ~/reps/sites/kytxa.ru  
docker context ls  
## dev
### !docker
if you like: delete node modules & delete package.json & npm install
npm start  
http://localhost:3000  
http://172.17.0.1:3000 - from host  
http://192.168.1.72:3000 - enp0s25  
http://192.168.1.73:3000 - wlp3s0  
^C - stop  
### docker
docker build -f Dockerfile.dev -t sample:dev .  
docker run --name site1_cra_dev_docker_run --rm -i -v ${PWD}:/app -v /app/node_modules -p 3001:3000 -e CHOKIDAR_USEPOLLING=true sample:dev  
http://localhost:3001  
http://172.17.0.2:3000 - from host  
http://192.168.1.72:3001 - enp0s25  
http://192.168.1.73:3001 - wlp3s0  
^C - stop  
### docker-compose
docker context use default  
docker-compose -f docker-compose.dev.yml up --build --remove-orphans  
http://localhost:3001  
http://172.17.0.1:3001 - from host  
http://172.21.0.2:3000 - from host  
http://172.22.0.2:3000 - from host  
http://192.168.224.2:3000 - from host  
http://192.168.1.72:3001 - enp0s25  
http://192.168.1.73:3001 - wlp3s0  
docker-compose -f docker-compose.dev.yml down  
## prod
### docker-compose
docker context use remote  
docker-compose -f docker-compose.prod.yml up -d --build --remove-orphans  
https://tabata.kytxa.ru/  
docker-compose -f docker-compose.prod.yml down  