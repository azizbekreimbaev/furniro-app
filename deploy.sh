# !/bin/bash

# production

git reset --hard

git checkout master

git pull origin master

npm i yarn -g

# `serve` is already installed locally from package.json.

yarn

yarn run build 


pm2 delete FURNIRO-REACT 2>/dev/null || true
pm2 start node \
  --name FURNIRO-REACT \
  --cwd "$(pwd)" \
  -- node_modules/serve/build/main.js -s dist -l 80
pm2 save
