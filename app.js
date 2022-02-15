const path = require("path")
const fs = require("fs");


const onlineUsers = [
    {
        name: 'Mykola', age: 27, city: 'Lviv'
    },
    {
        name: 'Andriy', age: 18, city: 'Kyiv'
    },
    {
        name: 'Sergiy', age: 32, city: 'Odessa'
    }
]

const inPersonUsers = [
    {
        name: 'Igor', age: 24, city: 'Ternopil'
    },
    {
        name: 'Vasya', age: 22, city: 'Uzgorod'
    },
    {
        name: 'Stepan', age: 30, city: 'Rivne'
    }
]


fs.mkdir(path.join(__dirname, 'main', 'online'), {recursive: true}, (err) => {
    if (err) {
        console.log(err)
    }
})

fs.mkdir(path.join(__dirname, 'main', 'inPerson'),
    {recursive: true},
    (err) => {
        if (err) {
            console.log(err)
        }
    })

fs.writeFile(path.join(__dirname, 'main', 'online', 'online.txt'),
    "",
    (err) => {
        if (err) {
            console.log(err)
        }
    })

fs.writeFile(path.join(__dirname, 'main', 'inPerson', 'inPerson.txt'),
    "",
    (err) => {
        if (err) {
            console.log(err)
        }
    })


onlineUsers.map(user => {
    fs.appendFile(path.join(__dirname, 'main', 'online', 'online.txt'),
        `\nNAME: ${user.name}; \nAGE: ${user.age}; \nCITY: ${user.city}`,
        (err) => {
            if (err) {
                console.log(err)
            }
        })
})


inPersonUsers.map(user => {
    fs.appendFile(path.join(__dirname, 'main', 'inPerson', 'inPerson.txt'),
        `\nNAME: ${user.name}; \nAGE: ${user.age}; \nCITY: ${user.city}`,
        (err) => {
            if (err) {
                console.log(err)
            }
        })
})

const replaceUsers = (dir, file, arr) => {
    fs.truncate(path.join(__dirname, 'main', dir, file),
        (err) => {
            if (err) {
                console.log(err);
            }
        })

    arr.map(user => {
        fs.appendFile(path.join(__dirname, 'main', dir, file),
            `\nNAME: ${user.name}; \nAGE: ${user.age}; \nCITY: ${user.city}`,
            (err) => {
                if (err) {
                    console.log(err)
                }
            })
    })


}

//
// replaceUsers('online', 'online.txt', inPersonUsers)
// replaceUsers('inPerson', 'inPerson.txt', onlineUsers)
