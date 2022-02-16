const fs = require('fs');
const path = require('path');

// 1. Спробуйте створити якийсь файл txt, прочитайте з нього дані і одразу, дані які ви отримали запишіть їх в інший файл, в вас вийде невеликий callback hell, пізніше я вам покажу
// як можна це обійти, але поки зробіть так

fs.writeFile(path.join(__dirname, 'text.txt'), 'some text', (err) => {
    if (err) {
        console.log(err);
    }
    fs.readFile(path.join(__dirname, 'text.txt'), 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        }
        if (data) {
            fs.writeFile(path.join(__dirname, 'text2.txt'), data.toString(), (err) => {
                if (err) {
                    console.log(err);
                }
            })
        }

    })
})






