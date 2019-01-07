# FoodsUp 2.0

### Dependencies
1. Meteor
2. Node / NPM
    A. Babel CLI
3. Mongo DB


```
#install global dependencies
curl https://install.meteor.com/ | sh
npm i -g babel-cli
brew install mongodb

git clone protocol://user/app
cd ~/path/to/app
npm i

#run app
npm start

#import data when app is running
mongoimport -h localhost:3001 --db meteor --collection FoodItem --type json --file FoodItem.json
```

Connect to local MongoDB
```
mongo --port 3001
show dbs
```
