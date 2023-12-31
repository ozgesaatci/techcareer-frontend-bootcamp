let tumEtkinlikler = []
let seciliEtkinlikArray = []


    /**
     * api'den gelen degerleri listelemek icin hmtl yapisini icermektedir.
     * api ile gelen dizideki her bir elamani dataya parametre vererek 
     * etkinligin olusuturlmasi saglanir.
     */
    function createCardTepmlate(data){

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


    /**
     * api icin bir ajax ile 'get' isteginde bulundugumuz fonksiyon
     * burada kullanilan 'Promise' yontemi apiden gelen istegi gelene kadar 
     * bekler degeri sonra dondurur.
     */
    function getAllData(){
        return new Promise(resolve => {
            $.get(
            "https://openapi.izmir.bel.tr/api/ibb/kultursanat/etkinlikler",
            (data) => {
                resolve(data)
            })
        })
    }



    /**
     * createCardTepmlate fonksiyonunu kullaranarak 
     * sayfa icerisinde belirttigimiz id'yi iceren divin icinde
     * tum etkinlikleri yerlestiriz
     */
    function listEtkinlik(data){
        let sayfa =  document.getElementById("add-etkinlik");
        sayfa.innerHTML = ""
        data.forEach(element => {
            sayfa.appendChild(createCardTepmlate(element))
        });
    }


    /**
     * Sayfa acildiginda acilan fonskiyon budur.
     * Bu fonksiyon sayeside apiden degerler cekilir ve global bir degisken
     * olan tumEtkinlikler diziisne atilir.
     */
    getAllData()
        .then(veriler => {
            tumEtkinlikler = veriler;
            console.log("degerler", tumEtkinlikler)
            listEtkinlik(veriler)
        })



    /**
     * Etkinlikler icersinde kategoriye gore filtreleme yapmak icin kullanilan yontem
     * 'select' elementinn event izlenir eger bir secenek degistirilirse 
     * 'selectEtkinlik fonksiyonu kullanilir.
     */
    document.getElementById("cate-select").addEventListener("change", e => {
        console.log("etkinlik degisti ")
        let secim = e.target.value;
        console.log("s ", secim)
        selectEtlinlik(secim)
    })


    /**
     * TumEtkinlikler dizisinden secilen etkinligin turudeki eslesmeye
     * bakkilir eslesen deger seciliEtkinlikArray dizisine aktarillir.
     * ve bu dizi 'listEtkinlik' fonksiyonu verilierek degerleri terkar anasayfaya yazdirir.
     */
    function selectEtlinlik(val){
        seciliEtkinlikArray = []
        let val1 = val.toUpperCase()
        tumEtkinlikler.forEach(x => {
            if(x.Tur == val1)
            seciliEtkinlikArray.push(x)
        })
        listEtkinlik(seciliEtkinlikArray)
    }



    /**
     * 
     * Arama cubuguna girilen degerin yakalanip 
     * TumEkinlikler dizisinde eslesen etklinlik adi, regex ve String macth ozelligi yardimiyla
     * yapilarak eslesene degerlei tekrardan ana sayfada yazdirilmasi saglanir.
     * 
     */
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
