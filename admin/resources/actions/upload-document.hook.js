const path = require('path');
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
  }
};

const before = async (request, context) => {
  if (request.method === 'post') {
    const { uploadDocument, ...otherParams } = request.payload;
    context.uploadDocument = uploadDocument
    if (!otherParams.url)
      otherParams.url = Date.now();

    if (uploadDocument) {
      if (otherParams.document && uploadDocument)
        fs.unlinkSync(`.${otherParams.document}`)

      const filePath = path.join('public/archives', otherParams.url.toString(), uploadDocument.name)
      await fs.promises.mkdir(path.dirname(filePath), { recursive: true })
      await fs.promises.rename(uploadDocument.path, filePath)
      otherParams.document = `/${filePath}`
    }

    return {
      ...request,
      payload: otherParams,
    };
  }
  return request;
};

module.exports = { before };
