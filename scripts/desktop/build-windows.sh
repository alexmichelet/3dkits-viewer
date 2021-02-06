sudo rm -rf dist

export ELECTRON_ENV=windows

yarn vue-build-for-electron

sudo docker run --rm -ti \
 --env ELECTRON_CACHE="/root/.cache/electron" \
 --env ELECTRON_BUILDER_CACHE="/root/.cache/electron-builder" \
 -v ${PWD}:/project \
 -v ${PWD##*/}-node-modules:/project/node_modules \
 -v ~/.cache/electron:/root/.cache/electron \
 -v ~/.cache/electron-builder:/root/.cache/electron-builder \
 electronuserland/builder:wine \
 /bin/bash -c "yarn && yarn electron-build-windows"

sudo rm dist/builder-effective-config.yaml
sudo rm -rf dist/win-unpacked

mkdir -p builds

cd dist
mkdir src
mv css src/
mv js src/
mv model src/
mv index.html src/
rm favicon.ico
rm ../builds/windows.zip
zip -r ../builds/windows.zip *
cd ..
