sudo rm -rf dist

export ELECTRON_ENV=dev

yarn vue-build-for-electron

electron .