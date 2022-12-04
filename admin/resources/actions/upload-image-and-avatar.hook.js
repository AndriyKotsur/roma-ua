const path = require('path');
const fs = require('fs');
const moment = require('moment');
const sharp = require('sharp');

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
    const { uploadImage, uploadAvatar, ...otherParams } = request.payload;
    context.uploadImage = uploadImage
    if (!otherParams.url)
      otherParams.url = Date.now();
    if (!otherParams.date)
      otherParams.date = moment().locale('uk').format('LLL')

    if (uploadImage) {
      if (otherParams.image && uploadImage)
        fs.unlinkSync(`.${otherParams.image}`)

      const image = sharp(uploadImage.path)
        .resize({
          fit: sharp.fit.cover,
          kernel: sharp.kernel.nearest
        })
        .jpeg({
          quality: 70
        })

      const filePath = path.join(
        'public/images',
        otherParams.url.toString(),
        'image-' + otherParams.url.toString() + '.' + uploadImage.name.split('.').pop()
      )
      await fs.promises.mkdir(path.dirname(filePath), { recursive: true })
      // await fs.promises.rename(uploadImage.path, filePath)

      otherParams.image = `/${filePath}`
      image.toFile(filePath)
    }

    if (uploadAvatar) {
      if (otherParams.avatar && uploadAvatar)
        fs.unlinkSync(`.${otherParams.avatar}`)

      const image = sharp(uploadAvatar.path)
      image.resize(1200, 800)

      const avatarPath = path.join(
        'public/images',
        otherParams.url.toString(),
        'avatar-' + otherParams.url.toString() + '.' + uploadAvatar.name.split('.').pop()
      )
      await fs.promises.mkdir(path.dirname(avatarPath), { recursive: true })

      otherParams.avatar = `/${avatarPath}`
      image.toFile(avatarPath)
    }

    return {
      ...request,
      payload: otherParams,
    };
  }
  return request;
};

module.exports = { before };
