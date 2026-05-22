'use strict';

// Ozark-trimmed entry point. Upstream's full re-export surface (Type,
// Schema, FAILSAFE_SCHEMA, JSON_SCHEMA, CORE_SCHEMA, dump, custom-type
// registry, safeLoad/safeLoadAll/safeDump shims) was reduced to only what
// the deterministic-deps consumer uses: load, loadAll, DEFAULT_SCHEMA,
// YAMLException. See OZARK-NOTES.md.

var loader = require('./lib/loader');


module.exports.load           = loader.load;
module.exports.loadAll        = loader.loadAll;
module.exports.DEFAULT_SCHEMA = require('./lib/schema/default');
module.exports.YAMLException  = require('./lib/exception');
