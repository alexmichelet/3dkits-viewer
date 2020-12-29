#!/usr/bin/env sh

sudo rm -rf dist

# abort on errors
set -e

# build
yarn vue-build

# navigate into the build output directory
cd dist

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:alexmichelet/3dkits-viewer.git master:gh-pages

cd -