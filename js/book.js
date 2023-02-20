const getData = () => {
    let titleOfBookToDisplay = sessionStorage.getItem('titleOfClickedBook');
    let bookToDisplay;
    let imgContToRender = document.querySelector('.img_cont');
    let dataContToRender = document.querySelector('.data_cont');
    let allRatingsArray = [];
    let desc = document.querySelector('#description');
    
        const stringifyedDataObject = sessionStorage.getItem('dataObject');

        const data = JSON.parse(stringifyedDataObject);

        console.log(data);
        console.log(titleOfBookToDisplay);

        data.record.results.forEach(book => {
            let match = book.title.search(`${titleOfBookToDisplay }`)

            if (match === -1) {
                return;
            }
            else {
                bookToDisplay = book;
            }
        })

        console.log(bookToDisplay);

        data.record.results.forEach(book => {
            allRatingsArray.push(book.rating);
        })

        const average = allRatingsArray.reduce((a, b) => a + b, 0) / allRatingsArray.length;

        console.log(allRatingsArray);
        console.log(average);

        imgContToRender.insertAdjacentHTML('afterbegin', `
        <img src="${bookToDisplay.img}" alt="img">`)

        dataContToRender.insertAdjacentHTML('afterbegin', `
        <h1>${bookToDisplay.title}</h1>
        <hr>
        <p>Author: <span>${bookToDisplay.author}</span></p>
        <p>Genre: <span>${bookToDisplay.genre}</span></p>
        <p>Book format: <span>${bookToDisplay.bookformat}</span></p>
        <p>Pages: <span>${bookToDisplay.pages}</span></p>
        <p>Rating: <span>${bookToDisplay.rating}</span></p>
        <p>Total ratings: <span>${bookToDisplay.totalratings}</span></p>
        <p>Reviews: <span>${bookToDisplay.reviews}</span></p>
        <p id="block"></p>`)

        if (bookToDisplay.rating > average) {
            let p = document.querySelector('#block');
            p.style.backgroundColor = 'green';
            p.insertAdjacentText('afterbegin', 'Above average rating!');
        }
        else {
            let p = document.querySelector('#block');
            p.style.backgroundColor = 'red';
            p.insertAdjacentText('afterbegin', 'Beyond average rating!');
        }

        desc.insertAdjacentHTML('afterbegin', `${bookToDisplay.desc}`)
    
}

getData();