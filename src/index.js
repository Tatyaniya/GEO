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
    save = document.getElementById('button-save'),
    address = [];

var formatDate = dateWrite();

console.log(formatDate);
// добавление карты
ymaps.ready(init);

var myMap,
    clusterer,
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
        openBalloonOnClick: true
    });

    myMap.geoObjects.add(clusterer);
    //myMap.geoObjects.add(myPlacemark);

    myMap.controls.remove('trafficControl'); // не показывать пробки

    return clusterer;
}

// создание метки
function createPlacemark(coords) {
    return new ymaps.Placemark([50.45, 30.52],
        { preset: 'islands#invertedRedClusterIcons' });
}

// закрыть окно с отзывами
popupCloze.addEventListener('click', () => {
    /*if (e.target.id === 'popup_close') {
        popup.classList.add('hidden');
    }*/
    popup.classList.add('hidden');
});

// Слушаем клик на карте.
myMap.events.add('click', function (e) {
    console.log(e);
    var coords = e.get('coords');
    console.log(coords);
    openPopup();

    createPlacemark(coords);
    
});

// открытие окна с отзывами
function openPopup() {
    popup.style.top = event.clientY + 'px';
    popup.style.left = event.clientX + 'px';
    popup.classList.remove('hidden');
}

// очистка инпутов
function clearInput() {
    inputName.value = '';
    inputPlace.value = '';
    inputImpression.value = '';
}
