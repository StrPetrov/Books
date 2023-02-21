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

        bookToDisplay = data.record.results.filter(book => book.title === `${titleOfBookToDisplay}`);

        console.log(bookToDisplay[0]);

        data.record.results.forEach(book => {
            allRatingsArray.push(book.rating);
        })

        const average = allRatingsArray.reduce((a, b) => a + b, 0) / allRatingsArray.length;

        console.log(allRatingsArray);
        console.log(average);

        imgContToRender.insertAdjacentHTML('afterbegin', `
        <img src="${bookToDisplay[0].img}" alt="img">`)

        dataContToRender.insertAdjacentHTML('afterbegin', `
        <h1>${bookToDisplay[0].title}</h1>
        <hr>
        <p>Author: <span>${bookToDisplay[0].author}</span></p>
        <p>Genre: <span>${bookToDisplay[0].genre}</span></p>
        <p>Book format: <span>${bookToDisplay[0].bookformat}</span></p>
        <p>Pages: <span>${bookToDisplay[0].pages}</span></p>
        <p>Rating: <span>${bookToDisplay[0].rating}</span></p>
        <p>Total ratings: <span>${bookToDisplay[0].totalratings}</span></p>
        <p>Reviews: <span>${bookToDisplay[0].reviews}</span></p>
        <p id="block"></p>`)

        if (bookToDisplay[0].rating > average) {
            let p = document.querySelector('#block');
            p.style.backgroundColor = 'green';
            p.insertAdjacentText('afterbegin', 'Above average rating!');
        }
        else {
            let p = document.querySelector('#block');
            p.style.backgroundColor = 'red';
            p.insertAdjacentText('afterbegin', 'Beyond average rating!');
        }

        desc.insertAdjacentHTML('afterbegin', `${bookToDisplay[0].desc}`)
    
}

getData();
