module.exports = (res, error) => {
    console.log('ERROR->', error);
    res.status(500).json({
        success: false,
        message: 'Внутренняя ошибка сервера'
    })
};

module.exports.file = (res) => {
    res.status(500).json({
        success: false,
        message: 'Неверное расширение файла'
    })
};

module.exports.fileNotFound = (res, error) => {
    console.log('ERROR->', error);
    res.status(500).json({
        success: false,
        message: 'Файл не найден'
    })
};
