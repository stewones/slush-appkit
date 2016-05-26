cd ../client
gulp build --env=production
rm -rfv ../.client.build/*
cd client
cp -rfv dist ../.client.build
cp server.js ../.client.build
cp package.json ../.client.build
cp robots.txt ../.client.build/dist
cd ../.client.build
git add -A
git commit -am "new client build"
git push --force heroku master