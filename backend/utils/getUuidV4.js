const { v4: uuidv4 } = require("uuid");

function getUuidV4() {
  return uuidv4();
}

module.exports = getUuidV4;
