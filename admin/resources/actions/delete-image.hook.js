const fs = require('fs');

const removeFolder = (folderPath) => {
  if (fs.existsSync(folderPath)) {
    fs.readdirSync(folderPath).forEach(file => {
      const currentPath = folderPath + '/' + file;
      if (fs.lstatSync(currentPath).isDirectory()) {
        removeFolder(currentPath);
      } else {
        fs.unlinkSync(currentPath);
      }
    });
    fs.rmdirSync(folderPath);
  };
};

const before = async (request, context) => {
  removeFolder(`./public/images/${context.record.params.url}`)
  return request;
};

module.exports = { before };
