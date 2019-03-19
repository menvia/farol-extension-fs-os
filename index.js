module.exports = (extension) => {
  const controller = {};

  const fs = require('fs').promises;
  const path = require('path');

  const getFilePath = (filePath) =>
    `${extension.settings.basePath}/${filePath}`;

  controller.write = async (filePath, data) => {
    const fullFilePath = getFilePath(filePath);

    // Create directory tree if does not exists
    const params = {
      recursive: true,
    };
    fs.mkdir(path.dirname(fullFilePath), params);

    return fs.writeFile(fullFilePath, data);
  };

  controller.read = async (filePath) => fs.readFile(getFilePath(filePath));

  controller.exists = async (filePath) => fs.stat(getFilePath(filePath));

  return controller;
};
