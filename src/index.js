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

    myPlacemark = new ymaps.Placemark([50.45, 30.52],
        { preset: 'islands#blueHomeCircleIcon' });

    myMap.geoObjects.add(myPlacemark); // добавить метку
    myMap.controls.remove('trafficControl'); // не показывать пробки
}    

// очистка инпутов
function clearInput() {
    inputName.value = '';
    inputPlace.value = '';
    inputImpression.value = '';
}

window.addEventListener('click', function () {
    let target = e.target;

    popup.style.top = target.pageX + 'px';
    popup.style.left = target.pageY + 'px';
    popup.classList.remove('hidden');
    //popup.style.display='flex';
    
});

// закрыть окно с отзывами
popupCloze.addEventListener('click', () => {
    popup.classList.add('hidden');
    //popup.style.display='none';
    //clearInput();
});