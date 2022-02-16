const fs = require('fs');
const path = require('path');



// 2. Створіть файл ( можете вручну ) заповніть його якимись даними
// Прочитайте його, скопіюйте всі дані з нього і перенесіть їх в нову папку та файл в ній, старий файл видаліть після того як все завершиться. Також вийде callback hell

fs.readFile(path.join(__dirname, 'someFile.txt'), 'utf8', (err, data) => {

    if(err){
        console.log(err);
    }

    if(data){

        fs.mkdir(path.join(__dirname, 'main'), (err)=>{
            if(err){
                console.log(err);
            }

            fs.writeFile(path.join(__dirname, 'main', 'anotherFile.txt'), data.toString(), (err) => {
                if(err){
                    console.log(err);
                }

                fs.unlink(path.join(__dirname, 'someFile.txt'), (err)=>{
                    if (err) {
                        console.log(err);
                    }
                })
            })

        })




    }
})
