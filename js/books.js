const goBack = () => {
    let backBtn = document.querySelector('.backBtn');

    backBtn.addEventListener('click', () => {
        window.history.back();
    })
}

const provide = () => {

    let allGenresString = '';
    let allGenresArray;
    let sectionToRender = document.querySelector('.main_content_right');
    let allBooks = document.querySelector('#allBooks');
    let genreBtn = document.querySelector('#genres');
    let genreDropdown = document.querySelector('#genreDropdown');
    let oneGenreFiltered = [];

        const stringifyedDataObject = localStorage.getItem('dataObject2');

        const data = JSON.parse(stringifyedDataObject);

        // MAKING ARRAY OF ALL GENRES WITH NO DUPLICATING

        data.record.results.forEach(book => {
            allGenresString += book.genre.split(',') + ',';
        })

        allGenresArray = allGenresString.split(',');

        const setOfGenres = new Set(allGenresArray);

        const allGenresArrayWithNoDuplicating = Array.from(setOfGenres);

        allGenresArrayWithNoDuplicating.sort();
        allGenresArrayWithNoDuplicating.reverse();
        allGenresArrayWithNoDuplicating.pop();

        //console.log(allGenresArrayWithNoDuplicating);

        // MAKING GENRE DROPDOWN

        genreBtn.addEventListener('click', () => {
            genreDropdown.style.visibility = 'visible';
        })

        allGenresArrayWithNoDuplicating.forEach(genre => {
            genreBtn.addEventListener('click', () => {
                genreDropdown.insertAdjacentHTML('afterbegin', `
                <p class="opt" id="${genre}">${genre}</p>`)
            })
        })

        genreBtn.addEventListener('click', function() {
            const allGenresNodeList = document.querySelectorAll('.opt')

            allGenresNodeList.forEach(option => {
                option.addEventListener('click', function() {
                    window.scrollTo(0, 0);
                    sectionToRender.innerHTML = '';
                    oneGenreFiltered.length = 0;

                    data.record.results.forEach(book => {
                        let match = book.genre.search(`${this.id}`);

                        if (match === -1) {
                            return;
                        }
                        else {
                            oneGenreFiltered.push(book);
                        }
                    })

                    oneGenreFiltered.forEach(book => {
                        sectionToRender.insertAdjacentHTML('afterbegin', `
                        <div class="card" id="${book.title}">
                            <img src="${book.img}">
                            <h2>${book.title}</h2>
                            <h3>Rating: ${book.rating}</h3>
                        </div>`)
                    })

                    const nodeList = document.querySelectorAll('.card');

                    nodeList.forEach(card => {
                        card.addEventListener('click', () => {
                            let connection = card.id;
                            sessionStorage.setItem('titleOfClickedBook', connection);
                            window.open('book.html', '_blank');
                        })
                    })
                })
            })
        })

        // RENDERING ALL BOOKS ON ClICK

        allBooks.addEventListener('click', () => {
            sectionToRender.innerHTML = '';

            data.record.results.forEach(book => {
                sectionToRender.insertAdjacentHTML('afterbegin', `
                <div class="card" id="${book.title}">
                    <img src="${book.img}">
                    <h2>${book.title}</h2>
                    <h3>Rating: ${book.rating}</h3>
                </div>`)
            })

            const nodeList = document.querySelectorAll('.card');

            nodeList.forEach(card => {
                card.addEventListener('click', () => {
                    let connection = card.id;
                    sessionStorage.setItem('titleOfClickedBook', connection);
                    window.open('book.html', '_blank');
                })
            })
        })
}

goBack();
provide();
