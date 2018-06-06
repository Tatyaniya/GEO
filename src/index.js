import './style.css';

ymaps.ready(init);
    var myMap;
        myPlacemark;

    function init(){
        myMap = new ymaps.Map("map", {
            center: [50.45, 30.52],
            zoom: 5
        });

        myPlacemark = new ymaps.Placemark([50.45, 30.52],
            { preset: 'islands#blueHomeCircleIcon' });

        myMap.geoObjects.add(myPlacemark);
    }

