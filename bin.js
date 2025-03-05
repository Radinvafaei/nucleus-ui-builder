#!/usr/bin/env node

import(`./dist/esm/lib/index.js`).catch(() =>
  require(`./dist/cjs/lib/index.js`),
);
