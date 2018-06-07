import './style.css';
import reviewsFunc from './templates/reviews.hbs';

const popup = document.getElementById('popup'),
    popupCloze = document.getElementById('popup_close');

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

// закрыть окно с отзывами
popupCloze.addEventListener('click', () => {
    popup.classList.add('hidden');
})

/*const date = new Date(),
    now = date.toLocaleString();*/

function dateWrite() {
    var date = new Date();

    var day = date.getDate();

    if(day < 10) day = '0' + day;

    var month = date.getMonth() + 1;

    if(month < 10) month = '0' + month;

    var year = date.getFullYear();
    
    var d = day + '.' + month + '.' + year;
   
    return d;
}

var dd = dateWrite();
console.log(dd);
