import './style.css';
import reviewsFunc from './templates/reviews.hbs';
import { dateWrite } from './helper';

const popup = document.getElementById('popup'),
    popupCloze = document.getElementById('popup_close'),
    // записать отзывы
    reviewsWrite = document.getElementById('reviews'),
    // форма
    inputName = document.getElementById('name'),
    inputPlace = document.getElementById('place'),
    inputImpression = document.getElementById('impression'),
    save = document.getElementById('button-save');

var formatDate = dateWrite();

console.log(formatDate);
// добавление карты
ymaps.ready(init);

var myMap,
    myPlacemark;

function init() {
    myMap = new ymaps.Map("map", {
        center: [50.45, 30.52],
        zoom: 5,
    }, 
    {
        searchControlProvider: 'yandex#search'
    });

    clusterer = new ymaps.Clusterer({
        preset: 'islands#invertedVioletClusterIcons',
        clusterDisableClickZoom: true, // запрет на увеличение
        openBalloonOnClick: false
    });

    myMap.geoObjects.add(clusterer);
    //myMap.geoObjects.add(myPlacemark);

    myMap.controls.remove('trafficControl'); // не показывать пробки
}

// создание метки
function createPlacemark(coords) {
    return new ymaps.Placemark([50.45, 30.52],
        { preset: 'islands#invertedVioletClusterIcons',
        clusterDisableClickZoom: true, // запрет на увеличение
        openBalloonOnClick: false
});
}

// открыть окно с отзывами
window.addEventListener('click', function () {
    popup.style.top = event.clientY + 'px';
    popup.style.left = event.clientX + 'px';
    popup.classList.remove('hidden');
    
});

// закрыть окно с отзывами
window.addEventListener('click', (e) => {
    if (e.target.id === 'popup_close') {
        popup.classList.add('hidden');
    }
});

// Слушаем клик на карте.
myMap.events.add('click', function (e) {
    var coords = e.get('coords');

    createPlacemark(coords);
});

// очистка инпутов
function clearInput() {
    inputName.value = '';
    inputPlace.value = '';
    inputImpression.value = '';
}
