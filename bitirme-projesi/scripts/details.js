
let detailsId = document.URL.split("=")[1]
console.log(detailsId)
console.log(document)

function createHTML(data) {
    let main = document.getElementById("ekle")
    let div = document.createElement("div")
    div.className = "card-body"
    let template = `

    <div class="row">
        <div class="col-lg-5 col-md-5 col-sm-6">
            <div class="white-box text-center"><img src="${data.KucukAfis}" class="img-responsive"></div>
        </div>
        <div class="col-lg-7 col-md-7 col-sm-6">
            <h4 class="box-title mt-5">${data.Adi}</h4>
            <p>${data.KisaAciklama}</p>
            <h3 class="box-title mt-5">Etkinlik Detaylari</h3>
            <ul class="list-unstyled">
                <li><i class="fa fa-map-marker-alt text-success"></i> Konum: ${data.EtkinlikMerkezi}</li>
                <li><i class="fa fa-calendar text-success"></i> Baslangic Tarihi: ${data.EtkinlikBaslamaTarihi}</li>
                <li><i class="fa fa-calendar-times text-success"></i> Bitis Tarihi: ${data.EtkinlikBitisTarihi}</li>
            </ul>

     
            <a href="homepage.html" class="btn btn-secondary btn-rounded mr-1" data-toggle="tooltip" title="" data-original-title="Add to cart">
                <i class="fa fa-arrow-left"></i> Geri Don
            </a>
            <button class="btn btn-dark btn-rounded">Bilet Satin Al</button>
            
        </div>
    </div>
`
    div.innerHTML = template;
    main.appendChild(div)
}



function getAllData(id) {
    return new Promise(resolve => {
        $.get(
            "https://openapi.izmir.bel.tr/api/ibb/kultursanat/etkinlikler",
            (data) => {
                data.forEach(element => {
                    if (element.Id == id) {
                        resolve(element)
                    }
                });
            })
    })
}

let etkinlik;
getAllData(detailsId)
    .then(x => {
        console.log("bulunan etkinlik", x)
        etkinlik = x;
        // createTempleate(x)
        createHTML(x)
    })


function createTempleate(data) {
    let container = document.getElementById("hadi");
    document.body.style.backgroundImage = `url('${data.KucukAfis}')`;
}

console.log(Date.parse("2023-08-16T09:30:00").toLocaleString())



$.get(
    "http://localhost:8080/v1/advert/1",
    {},
    (data) => {
        console.log(data)
        console.log(data.allOffers)
        console.log(JSON.parse( data.allOffers[3].productsList))
    }
)


