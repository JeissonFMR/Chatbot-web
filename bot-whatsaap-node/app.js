const venom = require('venom-bot');
const { Client } = require("pg");

//BACKUP 
const date = new Date();
const currentDate = `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}.${date.getHours()}.${date.getMinutes()}`;
const fileName = `./backup/database-backup-${currentDate}.sql`;
const { execute } = require('@getvim/execute');

const backup = () => {
    execute(`PGPASSWORD="postgres" pg_dump -U postgres -h localhost -d bot-proyectme -f ${fileName} -F t`,).then(async () => {
        console.log("LISTO BACKUP");
    }).catch(err => {
        console.log(err);
    })
}

venom
    .create({
        session: 'session-name', //name of session
        multidevice: true // for version not multidevice use false.(default: true)
    })
    .then((client) => start(client))
    .catch((erro) => {
        console.log(erro);
    });

const cliente = new Client({
    user: "postgres",
    host: "localhost",
    database: "bot-proyectme",// opciones = clave respuest
    password: "postgres",
    port: 5432,
});



cliente.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});


function start(client) {
    client.onMessage(async (message) => {
        console.clear()
        const menu = async () => {
            const clave1 = await cliente.query("select clave from opciones")
            const resultClave1 = clave1.rows
            const respuest1 = await cliente.query("select descripcion from opciones")
            const resultRespuesta1 = respuest1.rows

            const numerOpciones = clave1.rowCount

            console.log(numerOpciones + " numeroooooooooooo de opt");
            let mp = resultClave1.map((q) =>
                q.clave
            )


            let mp2 = resultRespuesta1.map((q) =>
                q.descripcion
            )
            client
                .sendText(message.from, 'A continuación te muestro mis opciones ⬇️⬇️')
            for (let i = 0; i <= numerOpciones - 1; i++) {

                let menu = `✅  *${mp[i]}* ➡️ ${mp2[i]}`
                setTimeout(() => {
                    client
                        .sendText(message.from, menu)
                }, 1000);

                console.log(menu);
            }


        }
        console.log(message);
        var msjwp = message.body;
        var number = message.from

        var name = message.notifyName

        var idmsj = message.id

        console.log(name + " nimbreeeeeee");
        console.log(idmsj + "id del msjjjjj");
        console.log(number + "numeroooo");


        //BANDERAS VERIFICAR
        const banderaInicio = await cliente.query("SELECT bandera FROM banderas where numero = '" + number + "'")
        const resultConsulta = banderaInicio.rows
        const conteoBandera = banderaInicio.rowCount

        let mp = resultConsulta.map((q) =>
            q.bandera
        )
        let bandera = mp[0] //esta en string la bandera

        if (conteoBandera === 0) {
            setTimeout(() => {
                cliente.query("INSERT INTO banderas(id, numero, bandera) VALUES (default,'" + number + "' , 'inicio')")

                client
                    .sendText(message.from, `Hola ${name} soy un Chatbot que te ayudará a resolver un problema. Mi nombre es *CODEJM* un gusto! ❤️`)
                menu()
            }, 3000);
        }
        if (bandera === 'inicio') {
            setTimeout(() => {
                menu()
            }, 3000);
        }

        const opciones = await cliente.query("select clave from opciones where clave='" + msjwp + "'")
        const busquedaOpciones = opciones.rows
        console.log(busquedaOpciones);
        let mapOpciones = busquedaOpciones.map((q) => q.clave)
        console.log(mapOpciones);

        if (message.type === 'chat') {
            if (message.body === 'backup_db' && message.isGroupMsg === false) {
                client
                    .sendText(message.from, `Escribiste una palabra clave *${name}* voy a trabajar en ello`)
                setTimeout(() => {
                    backup()
                    client
                        .sendText(message.from, 'Tu backup ha sido creado!')
                }, 2000);

            } else {
                if (mapOpciones[0]) {
                    cliente.query("UPDATE banderas SET bandera='otra' WHERE numero='" + number + "'")
                    const respuesta = await cliente.query("select respuest from opciones where clave='" + mapOpciones[0] + "'")
                    const busquedaRespuesta = respuesta.rows
                    console.log(busquedaRespuesta);
                    let mapBusqueda = busquedaRespuesta.map((q) => q.respuest)
                    if (message.body === mapOpciones[0] && message.isGroupMsg === false) {
                        client
                            .sendText(message.from, mapBusqueda[0])
                            .then((result) => {
                                console.log('Result: ', result); //return object success
                            })
                            .catch((erro) => {
                                console.error('Error when sending: ', erro); //return object error
                            });
                        cliente.query("UPDATE banderas SET bandera='inicio' WHERE numero='" + number + "'")
                    }
                } else {
                    setTimeout(async () => {
                        await client.reply(
                            number,
                            `Lo siento no tengo integrada esa opción ${name}`,
                            idmsj
                        ).then((result) => {
                            chat.lastReceivedKey._serialized
                            console.log('Result: ', result); //return object success
                        }).catch((erro) => {
                            console.error('Error when sending: ', erro); //return object error
                        });

                        // menu()
                    }, 3000);
                }
            }

        } else {
            client
                .sendText(message.from, 'No te comprendo')
        }

    });
}

