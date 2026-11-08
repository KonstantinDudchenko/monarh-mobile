const attributeNames = {
    // Общие характеристики
    brand: "Бренд",
    model: "Модель",
    type: "Тип устройства",
    color: "Цвет",
    compatibility: "Совместимость",
    connection: "Подключение",
    packageContents: "Комплектация",
    numberOfGames: "Количество игр",

    // Материалы и защита
    covering: "Покрытие",
    material: "Материал",
    protection: "Защита",
    housingMaterial: "Материал корпуса",
    cutouts: "Вырезы",
    surfaceProtection: "Защита поверхности",
    "surface protection": "Защита поверхности",
    waterProtection: "Защита от воды",

    // Преимущества и назначение
    advantages: "Преимущества",
    purpose: "Назначение",
    peculiarities: "Особенности",

    // Память и передача данных
    memoryCapacity: "Объём памяти",
    dataTransferTate: "Скорость передачи данных",
    dataTransferRate: "Скорость передачи данных",
    memoryCard: "Карта памяти",

    // Камеры и видеосъёмка
    videoResolution: "Разрешение видео",
    photoResolution: "Разрешение фото",
    viewingAngle: "Угол обзора",
    stabilization: "Стабилизация",
    screen: "Экран",
    timeOfRecording: "Время записи",

    // Чехлы и MagSafe
    MagSafe: "MagSafe",

    // Держатели
    fastening: "Тип крепления",
    magnets: "Магниты",
    turning: "Угол поворота",
    control: "Регулировка положения",
    weight: "Максимальный вес",
    mountingType: "Тип установки",
    securingThePhone: "Фиксация смартфона",
    "vehicle compatibility": "Совместимость с автомобилями",
    "position adjustment": "Регулировка положения",

    // Наушники
    construction: "Конструкция",
    microphone: "Микрофон",
    animationWhenOpeningACase: "Анимация при открытии кейса",

    // Зарядные устройства
    power: "Мощность",
    numberOfChargingZones: "Количество зон зарядки",
    "number of charging zones": "Количество зон зарядки",
    chargingDevices: "Заряжаемые устройства",
    "wireless charging standard": "Стандарт беспроводной зарядки",
    coolingSystem: "Система охлаждения",
    backlighting: "Подсветка",

    // Автомобильные аксессуары
    soundTransmission: "Передача звука",
    "device support": "Поддержка устройств",
    "additional modes": "Дополнительные режимы",
    display: "Дисплей",
    cableLength: "Длина кабеля",

    // Русскоязычные ключи из JSON
    "общая выходная мощность": "Общая выходная мощность",
    "быстрая зарядка": "Быстрая зарядка",
    "подключение": "Подключение",
    "передача звука": "Передача звука",
    "порты": "Порты",
    "воспроизведение музыки": "Воспроизведение музыки",
    "дисплей": "Дисплей",
    "подсветка": "Подсветка",
    "питание": "Питание",
    "основные преимущества": "Основные преимущества"
};

/**
 * Возвращает русское название характеристики.
 * Неизвестные ключи автоматически преобразуются
 * из camelCase в читаемый текст.
 *//*

*/
export function getAttributeName(key) {
    if (attributeNames[key]) {
        return attributeNames[key];
    }

    return key
        .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
        .replace(/^./, char => char.toUpperCase());
}/*


export function getAttributeName(key) {
    if (attributeNames[key]) {
        return attributeNames[key];
    }

    console.warn("Нет перевода для атрибута:", key);

    return key
        .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
        .replace(/^./, char => char.toUpperCase());
}*/
