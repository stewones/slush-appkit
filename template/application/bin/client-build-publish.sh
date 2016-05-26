cd ../
rm -rfv .client.build
mkdir .client.build
cd .client.build
git init
heroku git:remote -a <%= nameDashed %>-client