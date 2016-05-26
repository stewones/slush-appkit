rm -rfv ../.server.build/*

cd ../server

cp package.json ../.server.build
cp -rfv .gitignore ../.server.build

cp -rfv api ../.server.build
cp -rfv auth ../.server.build
cp -rfv components ../.server.build
cp -rfv config ../.server.build
cp -rfv libs ../.server.build
cp -rfv public ../.server.build
cp -rfv views ../.server.build
cp server.js ../.server.build
cp routes.js ../.server.build

cd ..
cp -rfv data ./.server.build
cd ./.server.build
git add -A
git commit -am "new server build"
git push --force heroku master