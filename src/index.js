import './style.css';
import reviewsFunc from './templates/reviews.hbs';
import { dateWrite } from './helper';

const popup = document.getElementById('popup');
const popupCloze = document.getElementById('popup_close');
// записать отзывы
const reviewsWrite = document.getElementById('reviews');
// форма
const inputName = document.getElementById('name');
const inputPlace = document.getElementById('place');
const inputImpression = document.getElementById('impression');
const save = document.getElementById('button-save');
const comments = localStorage.getItem('comments') ? JSON.parse(localStorage.getItem('comments')) : [];
const addressInput = document.getElementById('address');
const coordsInput = document.getElementById('coords');
const popupTitle = document.querySelector('.popup_title');
const form = document.querySelector('.form');
const inputsForValidation = [inputName, inputPlace, inputImpression];

// добавление карты
ymaps.ready(init);

let myMap;
    
function init() {
    myMap = new ymaps.Map("map", {
        center: [50.45, 30.52],
        zoom: 12,
        behaviors: ['default', 'scrollZoom']
    }, 
    {
        searchControlProvider: 'yandex#search'
    });

    var objectManager = new ymaps.ObjectManager({
        clusterize: true,
        clusterDisableClickZoom: true,
        clusterBalloonContentLayout: "cluster#balloonCarousel",
        preset: 'islands#darkOrangeClusterIcons',
        clusterBalloonContentLayoutWidth: 300,
        clusterBalloonContentLayoutHeight: 150
    });

    objectManager.options.set('geoObjectOpenBalloonOnClick', false);
    myMap.geoObjects.add(objectManager);

    objectManager.objects.events.add('click', (e) => {
        let objectId = e.get('objectId');
        let { address, coords } = comments[objectId];

        getComments(address);
        togglePopup({ address, coords, isVisible: true });
    })
    
    objectManager.clusters.events.add('balloonopen', (e) => {
        togglePopup({ isVisible: false });
    })

    function setMap() {
        comments.forEach((comment, i) => {
            objectManager.objects.add({
                type: 'Feature',
                id: i,
                geometry: {
                    type: 'Point',
                    coordinates: comment.coords
                },
                properties: {
                    balloonContentHeader: `<b> ${comment.place}</b>`,
                    balloonContentBody: `<a href="#" class="address_link" data-id="${i}">${comment.address}</a><br/>
                                        <p><b>${comment.impression}</b></p>`,
                    balloonContentFooter: `<div style="float: right">${comment.date}</div>`
                }
            })
        })
    }
    
    // по клику на адрес в карусели открыть окно с отзывами
    document.addEventListener('click', (e) => {
        let target = e.target;

        if ( target.className === 'address_link' ) {
            let id = target.dataset.id;
            let { address, coords } = comments[id];

            getComments(address);
            togglePopup({ address, coords, isVisible: true });
            objectManager.clusters.balloon.close();
        }
    });

    save.addEventListener('click', (e) => {
        e.preventDefault();
        let isValid = validateForm();
    
        if ( isValid ) {
            const address = addressInput.value;
            const coords = coordsInput.value;
            const name = inputName.value;
            const place = inputPlace.value;
            const text = inputImpression.value;
    
            setComment({ address, coords, name, place, text });
            togglePopup({isVisible: false});
            setMap();
        }
    });
    
    // Создаем клик на карте
    myMap.events.add('click', function (e) {
        let coords = e.get('coords');

        ymaps.geocode(coords).then((result) => {
            let geoInfo = result.geoObjects.get(0);
            let address = geoInfo.properties.get('text');

            for (let comment of comments) {
                if (comment.address === address) {
                    coords = comment.coords;    
                }
            }

            togglePopup({ address, coords, isVisible: true });
            getComments(address);
        })
    });

    // закрыть окно с отзывами
    popupCloze.addEventListener('click', () => {
        togglePopup({ isVisible: false });
    });

    // открытие окна с отзывами
    function togglePopup({address, coords, isVisible}) {
        if (isVisible) {
            addressInput.value = address;
            coordsInput.value = coords;
            popupTitle.innerText = address;
        
            popup.classList.remove('hidden');
            
            return;
        }
        
        popup.classList.add('hidden');
    }

    function getComments(address) {
        const filteredComments = comments.filter((comment) => {
            
            return comment.address === address;
        });
        
        reviewsWrite.innerHTML = '';

        if (!filteredComments.length) {
            reviewsWrite.innerText = 'Комментариев пока нет';

            return;
        }

        let templatedComments = reviewsFunc({ list: filteredComments });

        reviewsWrite.innerHTML = templatedComments;
    }

    function validateForm() {
        let isValid = true;
    
        for ( let elem of inputsForValidation ) {

            if ( elem.value === '' ) {
                elem.style.border='1px solid red';
                isValid = false;
            } else {
                elem.style.border='1px solid #c4c4c4';
            }
        }

        return isValid;   
    }

    function setComment({ address, coords, name, place, text }) {
        let comment = {
            address,
            coords: coords.split(',').map(parseFloat),
            name,
            place,
            impression: text,
            date: dateWrite()
        }

        comments.push(comment);
        localStorage.setItem('comments', JSON.stringify(comments));
        form.reset();
    }
    setMap();
}