const { describe, argv } = require("yargs")
const yargs = require("yargs")
const {simpanContact, listContacts, detailContacts, deleteContacts} = require("./contact")

yargs.command({
    command: "add",
    describe: "Menambahkan contact baru",
    builder: {
        nama: {
            describe: "Nama lengkap",
            demandOption: true,
            type: "string"
        },
        telephon: {
            describe: "Nomor Telephon",
            demandOption: true,
            type: "string"
        }, email: {
            describe: "Email",
            demandOption: false,
            type: "string"
        }
    },
    handler: (argv) => {
        simpanContact(argv.nama, argv.telephon, argv.email)
    }
}).demandCommand()

yargs.command({
    command: "list",
    describe: "Menampilkan data",
    handler: () => {
        listContacts()
    }
})

yargs.command({
    command: "detail",
    describe: "Menampilkan detail sebuah contact",
    builder: {
        nama: {
            describe: "Nama Lengkap",
            demandOption: true,
            type: "string"
        }

    },
    handler: (argv) => {
        detailContacts(argv.nama)
    }
})

// Menghapus Contacts berdasarkan nama
yargs.command({
    command: "delete",
    describe: "Menhapus Contacts berdasarkan nama",
    builder: {
        nama: {
            describe: "Nama Lengkap",
            demandOption: true,
            type: "string"
        }

    },
    handler: (argv) => {
        deleteContacts(argv.nama)
    }
})



yargs.parse()
