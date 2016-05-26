cd ..
rm -rfv .server.build
mkdir .server.build
cd .server.build
git init
heroku git:remote -a <%= nameDashed %>-server