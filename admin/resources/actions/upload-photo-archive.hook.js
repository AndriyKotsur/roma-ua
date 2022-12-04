const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const removeFolder = async (folderPath) => {
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
    const { ...otherParams } = request.payload
    const imageLength = Object.keys(request.payload).length - 1

    if (!otherParams.url)
      otherParams.url = Date.now()

    let images = []
    for (let i = 0; i < imageLength; i++) {
      if (request.payload[`uploadImages.${i}`]) {
        const file = request.payload[`uploadImages.${i}`]
        const image = sharp(file.path)
          .resize({
            fit: sharp.fit.cover,
            kernel: sharp.kernel.nearest
          })
          .jpeg({
            quality: 70
          })

        const filePath = path.join(
          'public/archives',
          otherParams.url.toString(),
          'image-' + otherParams.url.toString() + '-' + i + '.' + file.name.split('.').pop()
        )
        await fs.promises.mkdir(path.dirname(filePath), { recursive: true })

        images.push(`/${filePath}`)
        image.toFile(filePath)
      } else {
        break
      }
    }
    otherParams.images = images

    return {
      ...request,
      payload: otherParams,
    };
  }
  return request;
};

module.exports = { before };
