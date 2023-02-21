let load = () => {

    let firstSectionToRender = document.querySelector('.firstSection');
    let ratingsArray = [];
    let top4 = [];
    let minimalRatingValueFromTop4;
    let searchGenreField = document.querySelector('#genreSearch');
    let genreValue;
    let searchButton = document.querySelector('.searchBtn');
    let match;
    let filteredByGenreArray = [];
    let reviewsArray = [];
    let top4ReviewsArray = [];
    let minimalReviewValueFromTop4;
    let mostReviewedByGenreArray = [];
    let secondSectionToRender = document.querySelector('.secondSection');
    let checkbox = document.querySelector('#adult_checker');

    const removeEventListenerOnClick = () => {
        window.removeEventListener('load', l);
    }

    const l = () => {
        const f = async () => {
            const response = await fetch('https://api.jsonbin.io/v3/b/63a0e753dfc68e59d56c71ec/latest', {
                method: 'GET',
                headers: {
                    'X-Master-Key': '$2b$10$viPOiL/.5Te1ctsEnmquLuBHKGeK09Vp0SxT2m7wkH68/e1537nUK'
                }
            })
            
            const data = await response.json();

            sessionStorage.setItem('dataObject', JSON.stringify(data));
    
            console.log(data);
    
            // THE BEST RATED BOOKS
    
            data.record.results.forEach(book => {
                ratingsArray.push(book.rating);
            })
            
            ratingsArray.sort((a, b) => b - a);
    
            top4 = ratingsArray.slice(0, 4);
    
            minimalRatingValueFromTop4 = Math.min.apply(null, top4);
            
            const bestRated = (data.record.results.filter(book => book.rating >= minimalRatingValueFromTop4)).slice(0, 4);
    
            bestRated.sort((a, b) => {
                return a.rating - b.rating;
            })
    
            bestRated.forEach(book => {
                firstSectionToRender.insertAdjacentHTML('afterbegin', `
            <div class="card" id="${book.title}">
                <img src="${book.img}">
                <h2>${book.title}</h2>
                <h3>Rating: ${book.rating}</h3>
            </div>`)
            })

            const firstSectionNodeList = document.querySelectorAll('.card');

            firstSectionNodeList.forEach(card => {
                card.addEventListener('click', () => {
                    let connection = card.id;
                    sessionStorage.setItem('titleOfClickedBook', connection);
                    window.open('book.html', '_blank');
                })
            })

    
            // INITIALY RANDOM RENDER SECOND SECTION
    
            let randomArrayOfBooks = [];
    
            for(let z = 0; z < 4; z++) {
                let randomNumber = Math.floor(Math.random() * 66);
                randomArrayOfBooks.push(data.record.results[randomNumber]);
            }
    
            randomArrayOfBooks.forEach(book => {
                secondSectionToRender.insertAdjacentHTML('afterbegin', `
                <div class="card" id="${book.title}">
                    <img src="${book.img}">
                    <h2>${book.title}</h2>
                    <h3>Rating: ${book.rating}</h3>
                    <h3>Reviews: ${book.reviews}</h3>
                </div>`)
            })

            const secondSectionNodeList = document.querySelectorAll('.card');

            secondSectionNodeList.forEach(card => {
                card.addEventListener('click', () => {
                    let connection = card.id;
                    sessionStorage.setItem('titleOfClickedBook', connection);
                    window.open('book.html', '_blank');
                })
            })
    
            // THE MOST REVIEWED BOOKS BY GENRE

            const removeEventListenerOnClick2 = () => {
                searchButton.removeEventListener('click', k);
            }

            const k = () => {
                genreValue = searchGenreField.value;
                searchGenreField.value = '';
                filteredByGenreArray.length = 0;
                reviewsArray.length = 0;
                top4ReviewsArray.length = 0;
                mostReviewedByGenreArray.length = 0;
                secondSectionToRender.innerHTML = '';
    
                console.log(genreValue);
    
                data.record.results.forEach(book => {
                    match = book.genre.search(`${genreValue}`);
                    if (match === -1) {
                        return;
                    }
                    else {
                        filteredByGenreArray.push(book);
                    }
                })
    
                filteredByGenreArray.forEach(book => {
                    reviewsArray.push(book.reviews);
                })
    
                reviewsArray.sort((a, b) => b - a);
                
                top4ReviewsArray = reviewsArray.slice(0, 4);
    
                minimalReviewValueFromTop4 = Math.min.apply(null, top4ReviewsArray);
    
                mostReviewedByGenreArray = (filteredByGenreArray.filter(book => book.reviews >= minimalReviewValueFromTop4)).slice(0, 4);
                
                mostReviewedByGenreArray.sort((a, b) => {
                    return a.reviews - b.reviews;
                })
    
                mostReviewedByGenreArray.forEach(book => {
                    secondSectionToRender.insertAdjacentHTML('afterbegin', `
                    <div class="card" id="${book.title}">
                        <img src="${book.img}">
                        <h2>${book.title}</h2>
                        <h3>Rating: ${book.rating}</h3>
                        <h3>Reviews: ${book.reviews}</h3>
                    </div>`)
                })

                const secondSectionNodeList = document.querySelectorAll('.card');

                secondSectionNodeList.forEach(card => {
                card.addEventListener('click', () => {
                    let connection = card.id;
                    sessionStorage.setItem('titleOfClickedBook', connection);
                    window.open('book.html', '_blank');
                })
            })
            }
    
            searchButton.addEventListener('click', k);
            checkbox.addEventListener('click', removeEventListenerOnClick2);
        }

        f();
    }

    window.addEventListener('load', l);
    checkbox.addEventListener('click', removeEventListenerOnClick);
}

load();
