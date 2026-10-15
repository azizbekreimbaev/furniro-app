# !/bin/bash

# production

git reset --hard

git checkout master

git pull origin master

npm i yarn -g

# `serve` is already installed locally from package.json.

yarn

yarn run build 


pm2 start node.exe \
  --name FURNIRO-REACT \
  --cwd "C:\Users\Aziz\Desktop\furniro-app" \
  -- node_modules/serve/build/main.js -s dist -l 80
pm2 save
