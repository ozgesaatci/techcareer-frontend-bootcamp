let tumEtkinlikler = []
let seciliEtkinlikArray = []
let documentTitle = matchCategory( document.title)
console.log(documentTitle)

function matchCategory(title) {
    switch (title) {
        case "Tiyatro":
            return "TİYATRO"
        case "Sinema":
            return "SİNEMA"
        case "Konser":
            return "KONSER"
    }
}



function createCardTepmlate(data) {

    let div = document.createElement("div")
    div.setAttribute("class", "card movie_card")
    let newDesing = `
        <img src="${data.KucukAfis}" class="card-img-top" alt="...">
        <div class="card-body d-flex">
          
          <h5 class="card-title">${data.Adi}</h5>
          <a href="details.html?id=${data.Id}">
          <i class="fas fa-arrow-right play_button" data-toggle="tooltip" data-placement="bottom" title="Play Trailer">
          </i>
          </a>
        </div>

            `
    div.innerHTML = newDesing
    return div;
}

function getAllData() {
    let tempArray = new Array;
    return new Promise(resolve => {
        $.get(
            "https://openapi.izmir.bel.tr/api/ibb/kultursanat/etkinlikler",
            (data) => {
                data.forEach(x => {
                    if (x.Tur == documentTitle) {
                        console.log("deger: ", x)
                        tempArray.push(x)
                    }
                })
                resolve(tempArray)
            })
    })
}



function listEtkinlik(data) {
    let sayfa = document.getElementById("add-etkinlik");
    sayfa.innerHTML = ""
    data.forEach(element => {
        sayfa.appendChild(createCardTepmlate(element))
    });
}

getAllData()
    .then(veriler => {
        tumEtkinlikler = veriler;
        console.log("degerler", tumEtkinlikler)
        listEtkinlik(veriler)
    })


    document.getElementById("cate-select").addEventListener("change", e => {
        console.log("etkinlik degisti ")
        let secim = e.target.value;
        console.log("s ", secim)
        selectEtlinlik(secim)
    })

    function selectEtlinlik(val){
        seciliEtkinlikArray = []
        let val1 = val.toUpperCase()
        tumEtkinlikler.forEach(x => {
            if(x.Tur == val1)
            seciliEtkinlikArray.push(x)
        })
        listEtkinlik(seciliEtkinlikArray)
    }



    function searchEtlinlik(){
        let value = document.querySelector("#etkin-ara").value
        seciliEtkinlikArray = []
        console.log(value)
        let regex_ = new RegExp(`\\b${value}\\b`, 'gi');

    tumEtkinlikler.forEach(x => {
          let   found  = null;
          found = x.Adi.match(regex_)
          if(found != null){
            seciliEtkinlikArray.push(x)
          }
        })
        console.log(seciliEtkinlikArray)
        listEtkinlik(seciliEtkinlikArray)



    }