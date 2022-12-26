const cmd = require("readline")
const fs = require("fs")
const chalk = require("chalk")
const validator = require("validator")

// const perintah = cmd.createInterface({
//     input: process.stdin,
//     output: process.stdout
// })

const tulispertanyaan1 = (pertanyaan1) => {
    return new Promise((resolve, reject) => {
        perintah.question(pertanyaan1, (nama) => {
            resolve(nama)
        })
    })
}

const tulispertanyaan2 = (pertanyaan2) => {
    return new Promise((resolve, reject) => {
        perintah.question(pertanyaan2, (nomor) => {
            resolve(nomor)
        })
    })
}


// Menyimpan Data Contacts
const simpanContact = (nama, telephon, email) => {
    let data = { nama, telephon, email }

    fs.readFile(`./data/contact.json`, (err, data2) => {
        const contact = JSON.parse(data2)
        // console.log(students)

        // Cek Duplikat
        const duplikat = contact.find((data) => data.nama === nama)
        if (duplikat) {
            console.log(chalk.red.inverse.bold("Contact Sudah Terdaftar, gunakan nama lain"))
            return false
        }

        // Cek Email
        if (email) {
            if (!validator.isEmail(email)) {
                console.log(chalk.red.inverse.bold("Email tidak valid"))
                return false
            }
        }

        // Cek Telephon
        if (!validator.isMobilePhone(telephon, 'id-ID')) {
            console.log(chalk.red.inverse.bold("Nomor Telephon tidak valid"))
            return false
        }

        contact.push(data)
        fs.writeFile(`./data/contact.json`, JSON.stringify(contact), (err) => {
            console.log("data berhasil dimasukan")
        })

    })
    // perintah.close()

}



// Menampilkan Data Contacts
const listContacts = () => {
    fs.readFile("./data/contact.json",(err, contact) => {
        const contacts = JSON.parse(contact)
        contacts.forEach((data, i) => {
            console.log(`${i + 1}. ${data.nama} - ${data.telephon}`)
        }) 
    })
}
// listContacts()

const loadContact = () => {
    fs.readFile("./data/contact.json", (err, contact) => {
        const contacts = JSON.parse(contact)
        return contacts
    })
}

// Menampilan secara Detail data
const detailContacts = (nama) => {
    fs.readFile("./data/contact.json", (err, contact) => {
        const contacts = JSON.parse(contact)

        // Cek not found
        const found = contacts.find((data) => data.nama.toLowerCase() === nama.toLowerCase()) 

        if (!found) {
            console.log(chalk.red.inverse.bold(`${nama} tidak di temukan`))
            return false
        }
        console.log(found.nama)
        console.log(found.telephon)
        if (found.email) {
            console.log(found.email)
        }
    })

}

// Menghapus Cotacts berdasarkan nama
const deleteContacts = (nama) => {
    fs.readFile("./data/contact.json", (err, contact) => {
        const contacts = JSON.parse(contact)

        const newContact = contacts.filter((data) => data.nama.toLowerCase() !== nama.toLowerCase())

        if (contacts.length === newContact.length) {
            console.log(chalk.red.inverse.bold(`${nama} tidak di temukan`))
            return false
        }

        fs.writeFile("./data/contact.json", JSON.stringify(newContact), (err) => {
            if (err) throw err
            console.log(chalk.red.inverse.bold(`${nama} berhasil dihapus`))
        })

    })
}

module.exports = {
    tulispertanyaan1,
    tulispertanyaan2,
    simpanContact,
    listContacts,
    detailContacts,
    deleteContacts
}