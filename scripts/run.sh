gulp
docker build -t dcr.buyme360.com/plu-capstone/blockscape-explorer:latest ..
TAG=latest docker-compose down
TAG=latest docker-compose up
