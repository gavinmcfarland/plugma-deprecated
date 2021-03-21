1. Move actual source code to `src` folder DONE
2. Publish on `npm`
3. Move `build.js` into `src/` and configure to check users working directory. Make sure it only happens after code has been compiled and not on code which has already had versions added to it.
4. Create CLI to add versions to version file
5. Add way to prevent plugin from being published using `build` property of manifest

**use cases**

1. Want to show changes every major version
2. Want to show certain features available with certain releases
3. Want to patch or upgrade from certain versions