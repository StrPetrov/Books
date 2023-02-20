const provide2 = () => {

    let sectionToRender = document.querySelector('.main_content_right');
    let genreBtn = document.querySelector('#genres');

    const remove = () => {
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

            sessionStorage.setItem('dataObject2', JSON.stringify(data));

            // RENDERING ALL BOOKS ON LOAD

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
        }
        f();
    }

    window.addEventListener('load', l);
    genreBtn.addEventListener('click', remove);

}

provide2();