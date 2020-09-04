'use strict';

document.addEventListener('DOMContentLoaded', () => {
    
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };

    const poster = document.querySelector('.promo__bg'),
        genre = poster.querySelector('.promo__genre'),
        moviesList = document.querySelector('.promo__interactive-list');

    // ADD FILM TO THE LIST 

    const input = document.querySelector('.adding__input'),
          addForm = document.querySelector('form.add'),
          checkbox = addForm.querySelector('[type="checkbox"]')

    addForm.addEventListener('submit', function (e) {
        e.preventDefault();
        
        let newFilm = input.value;
        const favourite = checkbox.checked; 

        if (newFilm) {

            if (newFilm.length > 21) {
                newFilm = `${newFilm.substring(0, 22)}...`;
            }

            if (favourite) {
                console.log('Добавляем любимый фильм');
            }

            movieDB.movies.push(newFilm);
            sortArray(movieDB.movies);

            createMovieList(movieDB.movies, moviesList);
        }

        e.target.reset();
    });

    const makeChanges = () => {
        genre.textContent = 'драма';
        poster.style.backgroundImage = "url('../img/bg.jpg')";
    };

    const removeAds = (elements) => {
        const advImages = document.querySelectorAll(elements);
        advImages.forEach( item => item.remove());
    };

    const sortArray = (arr) => {
        arr.sort();
    };   

    function createMovieList(films, parent) {
        parent.innerHTML = '';
        sortArray(films);

        films.forEach( (film, i) => {
            parent.innerHTML += `
                <li class="promo__interactive-item">${i + 1} ${film}
                    <div class="delete"></div>
                </li>`;
        });

        document.querySelectorAll('.delete').forEach( (btn, i) => {
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                movieDB.movies.splice(i, 1);

                createMovieList(films, parent);  // - рекурсия функции
            });
        });

    }

    makeChanges();
    removeAds('.promo__adv img');
    createMovieList(movieDB.movies, moviesList);
    
});