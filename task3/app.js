const fs = require('fs');
const path = require('path');


// 3. Створіть папку (можете вручну) напишіть скріпт який створить в ній якись дані (можуть бути нові папки і файли(в файли запишіть якусь дату) )
// і напишіть функцію яка буде зчитувати папку і перевіряти якщо дані які в ній лежать - це файли тоді вам потрібно їх очистити, але не видаляти, якщо дані - це папки, вам потрібно їх перейменувати і додати до назви префікс _new




fs.mkdir(path.join(__dirname, 'main', 'someDir'), (err) => {
    if (err) {
        console.log(err);
    }
})

fs.writeFile(path.join(__dirname, 'main', 'file.txt'), 'some data', (err) => {
    if (err) {
        console.log(err);
    }
})

const checkAndChangeItem = (itemName) => {
    fs.stat(path.join(__dirname, 'main', itemName.toString()), (err, stat) => {
        if(err){
            console.log(err);
        }
        if(stat.isFile()){
            fs.truncate(path.join(__dirname, 'main', itemName.toString()), (err)=>{
                if(err){
                    console.log(err);
                }
            })
        }
        if(!stat.isFile()){
        fs.rename(path.join(__dirname, 'main', itemName.toString()), path.join(__dirname, 'main', `_new${itemName.toString()}`), (err) => {
            if(err){
                console.log(err);
            }
        })
        }
    })
}

checkAndChangeItem('file.txt')
