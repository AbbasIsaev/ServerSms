export class Enam {
  static ERROR_UNKNOWN = 'Неизвестная ошибка';
  static ERROR_CONNECT = 'Нет подключения с сервером';
  static SAVE = 'Сохранено';

  static Error(error) {
    return error && error.response && error.response.data.message ? error.response.data.message : Enam.ERROR_UNKNOWN
  }

}

