module.exports = (res) => {
  res.json({
    message: 'Запись удалена'
  })
};

module.exports.file = (res) => {
  res.json({
    message: 'Файл удален'
  })
};
