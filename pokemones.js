const fetchPokemon = () => { //fetch es el hacer una consulta a una API
    let pokeName = document.getElementById("pokemon").value;//Leer el docu de HTML y buscar el ID y guardarlo en la variable (todo el elemento)
    pokeName = pokeName.toLowerCase();  //Pasarlo a minusculas para enviarlo con el formato de la API
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
    
    
    //Las consultas a APIS o demás es programación asíncronas ya que "espera" lo que recibirá
    fetch(url).then((res) => {//Fetch=Funcion para consultar la API - El reusltado es una PROMESA para eso se usa ".then" y se "almacena" en "res"
        if (res.status != "200") {
            console.log(res);
            pokeImage("https://th.bing.com/th/id/OIP.J_v061r_f_Nh3aokyn4EeAHaHa?pid=ImgDet&rs=1")
            pokeTitle("No encontrado")
        }
        else {
            return res.json();//al almacenarse en res, enviamos el JSON entero
        }
    }).then((data) => { //Para ahora extraer los datos de la respuesta del JOSN se sigue llamandoa  la promesa y se guarda en "data"
        if (data) {
            let pokeImg = data.sprites.front_default;//estraer el valor del JSON de la data especifico
           
            let pokeType = forTypes(data);
            let pokeStats=forStatitics(data);
            let pokeMoves=forMoves(data);
            pokeImage(pokeImg);//mandarle a la funcion la nueva url
            pokeTitle(pokeName);
            pokeTyp(pokeType);
            pokeStatistics(pokeStats);
            pokeMovs(pokeMoves);
        }
    });
}

const forTypes = (link) => {

    let types="/";
    for(i=0;i<link.types.length;i++){
        types+=` ${link.types[i].type.name} /`
    }
    return types
}

const forStatitics = (link) => {
    let stat="";
    for(i=0;i<link.stats.length;i++){
        stat+=`${link.stats[i].stat.name}: ${link.stats[i].base_stat} | `
    }
    return stat
}

const forMoves = (link) =>{
    let move="";
    for(i=0;i</*link.moves.length*/ 20;i++){
        move+=`${link.moves[i].move.name} | `
    }

    return move
}


//Cambiar la imagen
const pokeImage = (url) => {
    const pokePhoto = document.getElementById("pokeImg");//buscamos la imagen en el HTML
    pokePhoto.src = url;//Cmbiamos la propiedad (source) de la iamgen, asignandole otro
}

//Cambiar el nombre
const pokeTitle = (name) => {
    const pokeTitle = document.getElementById("title");//buscamos la imagen en el HTML
    pokeTitle.innerHTML= name;//Cmbiamos la propiedad (source) de la iamgen, asignandole otro
}

//Cambiar el tipo
const pokeTyp = (type) => {
    const pokeTyp = document.getElementById("type");//buscamos la imagen en el HTML
    pokeTyp.innerHTML= type;//Cmbiamos la propiedad (source) de la iamgen, asignandole otro
}

//Cambiar estadisticas
const pokeStatistics = (sts) => {
    const pokeSts = document.getElementById("statistics");//buscamos la imagen en el HTML
    pokeSts.innerHTML= sts;//Cmbiamos la propiedad (source) de la iamgen, asignandole otro
}

//Cambiar movimientos
const pokeMovs = (moves) => {
    const pokeMovs = document.getElementById("moves");//buscamos la imagen en el HTML
    pokeMovs.innerHTML= moves;//Cmbiamos la propiedad (source) de la iamgen, asignandole otro
}