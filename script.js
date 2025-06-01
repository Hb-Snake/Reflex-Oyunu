
function modSeçildi(){
    const oyunModu = document.getElementById("oyunModu").value
    if(oyunModu == "oyunModu1"){
        oyunModu1()
        document.getElementById("oyunModuSeçimi").style.display = "none"
        document.getElementById("temaSeçimi").style.display = "block"
        document.getElementById("zorlukSeçimi").style.display = "block"
    }else if(oyunModu =="oyunModu2"){
        oyunModu2()
        document.getElementById("oyunModuSeçimi").style.display = "none"
        document.getElementById("temaSeçimi").style.display = "block"
        document.getElementById("zorlukSeçimi").style.display = "block"
    }else if (oyunModu =="oyunModu3") {
        oyunModu3()
        document.getElementById("oyunModuSeçimi").style.display = "none"
        document.getElementById("temaSeçimi").style.display = "block"
        document.getElementById("zorlukSeçimi").style.display = "block"
    }
}

function oyunModu1() {
    document.getElementById("skorGöster").style.display = "inline"
    const kutu = document.getElementById("kutu");
    const bilgi = document.getElementById("bilgi");
    const oyunAlanı = document.getElementById("oyunAlanı");
    const oyunSonu = document.getElementById("oyunSonu");
    const skorTablosu = document.getElementById("skorTabloMod1");
    var zorluk;
    let hak = 10;

    let başlamaZamanı;

    window.tekSeferlikSkor = function(tepkiZamanı){
        zorluk = document.getElementById("zorluk").value;
        mod = document.getElementById("oyunModu").value;

        let a = localStorage.getItem("tekSeferlik_" + zorluk + mod, tepkiZamanı);

        let dataArray;

        try {
            dataArray = a ? JSON.parse(a) : [];
        } catch (e) {
            dataArray = [];
        }

        if (!Array.isArray(dataArray)) {
            dataArray = [];
        }

        dataArray.push(tepkiZamanı);

        localStorage.setItem("tekSeferlik_" + zorluk + mod, JSON.stringify(dataArray));
    }

    window.hesapla = function() {
        const mod = document.getElementById("oyunModu").value;

        function skorlarGetir(zorluk) {
            const skorStr = localStorage.getItem("tekSeferlik_" + zorluk + mod);
            let skorDizisi = [];
            try {
                skorDizisi = skorStr ? JSON.parse(skorStr) : [];
            } catch {
                skorDizisi = [];
            }
            return skorDizisi.map(s => parseFloat(s)).filter(s => !isNaN(s));
        }


        const kolaySkorlar = skorlarGetir("kolay");
        const ortaSkorlar = skorlarGetir("orta");
        const zorSkorlar = skorlarGetir("zor");

        function ortalamaHesapla(skorlar) {
            if (skorlar.length === 0) return Infinity;
            const toplam = skorlar.reduce((a,b) => a+b, 0);
            return toplam / skorlar.length;
        }

        function enIyiSkorBul(skorlar) {
            if (skorlar.length === 0) return Infinity;
            return Math.min(...skorlar);
        }

        const kolayEnIyi = enIyiSkorBul(kolaySkorlar);
        const kolayOrtalama = ortalamaHesapla(kolaySkorlar);

        const ortaEnIyi = enIyiSkorBul(ortaSkorlar);
        const ortaOrtalama = ortalamaHesapla(ortaSkorlar);

        const zorEnIyi = enIyiSkorBul(zorSkorlar);
        const zorOrtalama = ortalamaHesapla(zorSkorlar);

        const enIyiSkorlar = [
            { zorluk: "kolay", enIyi: kolayEnIyi, ortalama: kolayOrtalama },
            { zorluk: "orta", enIyi: ortaEnIyi, ortalama: ortaOrtalama },
            { zorluk: "zor", enIyi: zorEnIyi, ortalama: zorOrtalama }
        ];

        let enIyi = enIyiSkorlar.reduce((acc, curr) => {
            return curr.enIyi < acc.enIyi ? curr : acc;
        }, { zorluk: "", enIyi: Infinity, ortalama: Infinity });

        if (enIyi.enIyi === Infinity) {
            console.log("Hiç skor bulunamadı.");
            return;
        }

        document.getElementById("skorlar").textContent =
            "En iyi skor: " + enIyi.enIyi.toFixed(2) + " saniye - " +
            " | Ortalama Skorunuz: " + enIyi.ortalama.toFixed(2) + " saniye ";

        document.getElementById("skorTabloMod1").style.display = "block";

        localStorage.removeItem("tekSeferlik_" + enIyi.zorluk + mod);
    }




    window.skorTut = function (tepkiZamanı) {
        let zorluk = document.getElementById("zorluk").value;
        let mod = document.getElementById("oyunModu").value;

        let normalSkorlar = JSON.parse(localStorage.getItem(zorluk + mod + "_normal")) || [];
        normalSkorlar.push(tepkiZamanı.toFixed(2));
        localStorage.setItem(zorluk + mod + "_normal", JSON.stringify(normalSkorlar));

        let enİyiSkorlar = JSON.parse(localStorage.getItem(zorluk + mod + "_eniyiler")) || [];
        enİyiSkorlar.push(tepkiZamanı.toFixed(2));
        enİyiSkorlar.sort((a, b) => a - b);
        if (enİyiSkorlar.length > 5) {
            enİyiSkorlar = enİyiSkorlar.slice(0, 5);
        }
        localStorage.setItem(zorluk + mod + "_eniyiler", JSON.stringify(enİyiSkorlar));
    }

    window.kutuyuGösterme = function(){
        zorluk = document.getElementById("zorluk").value;
        if(zorluk === "kolay"){
            const boyut = 120 + Math.random() * 70;
            const top = Math.random() * (window.innerHeight - boyut);
            const left = Math.random() * (window.innerWidth - boyut);

            kutu.style.width = boyut + "px";
            kutu.style.height = boyut + "px";
            kutu.style.top = top + "px";
            kutu.style.left = left + "px";

            kutu.style.backgroundColor = "red";

            kutu.style.display = "block";
            başlamaZamanı = Date.now();
        }else if(zorluk === "orta"){
            const boyut = 85 + Math.random() * 45;
            const top = Math.random() * (window.innerHeight - boyut);
            const left = Math.random() * (window.innerWidth - boyut);

            kutu.style.width = boyut + "px";
            kutu.style.height = boyut + "px";
            kutu.style.top = top + "px";
            kutu.style.left = left + "px";

            kutu.style.backgroundColor =   "red";

            kutu.style.display = "block";
            başlamaZamanı = Date.now();
        }else if(zorluk === "zor"){
            const boyut = 40 + Math.random() * 30;
            const top = Math.random() * (window.innerHeight - boyut);
            const left = Math.random() * (window.innerWidth - boyut);

            kutu.style.width = boyut + "px";
            kutu.style.height = boyut + "px";
            kutu.style.top = top + "px";
            kutu.style.left = left + "px";

            kutu.style.backgroundColor = "red";

            kutu.style.display = "block";
            başlamaZamanı = Date.now();
        }
    };


    window.oyunBaşlat = function(){
        let tema = document.getElementById("tema").value
        if(tema === "gündüz"){
        oyunAlanı.style.backgroundImage = "url('gündüz.jpg')"
        bilgi.style.color = "black"
        document.getElementById("hak").style.color = "black"
        }else if(tema === "gece"){
        oyunAlanı.style.backgroundImage = "url('gece.jpg')"
        bilgi.style.color = "white"
        document.getElementById("hak").style.color = "white"
        }else if(tema === "uzay"){
        oyunAlanı.style.backgroundImage = "url('uzay.jpg')"
        bilgi.style.color = "white"
        document.getElementById("hak").style.color = "white"
        }else if(tema === "ay"){
        oyunAlanı.style.backgroundImage = "url('ay1.jpg')"
        bilgi.style.color = "black"
        document.getElementById("hak").style.color = "black"
        }
        document.getElementById("oyunBitir").style.display = "none";
        document.getElementById("geriDön1").style.display = "none";
        document.getElementById("istatistik1").style.display = "none"
        document.getElementById("temaSeçimi").style.display = "none"
        document.getElementById("zorlukSeçimi").style.display = "none"
        document.getElementById("başaDön1").style.display = "none";
        oyunAlanı.style.display = "block"
        skorTablosu.style.display = "none"
        document.getElementById("skorGöster").style.display = "none"
        kutu.style.display = "none";
        document.getElementById("başla1").style.display = "none";
        document.getElementById("skorSil").style.display = "none";

        zorluk = document.getElementById("zorluk").value;
        if(zorluk === "kolay"){
            const geçikme = 700 + Math.random() * 1500;
        setTimeout(kutuyuGösterme, geçikme);
        }else if(zorluk === "orta"){
            const geçikme = 300 + Math.random() * 700;
        setTimeout(kutuyuGösterme, geçikme);
        }else if(zorluk === "zor"){
            const geçikme = 150 + Math.random() * 300;
        setTimeout(kutuyuGösterme, geçikme);
        }
    }

    kutu.addEventListener("click", () => {
        const tepkiZamanı = (Date.now() - başlamaZamanı) / 1000;
        bilgi.textContent = `Tepki Süresi: ${tepkiZamanı.toFixed(2)} saniye`;
        document.getElementById("patlama").play();
        skorTut(tepkiZamanı);
        hak--
        document.getElementById("hak").textContent = "Kalan Hakkınız: " + hak
        if (hak == 0) {
            bilgi.style.color = "black"
            document.body.style.backgroundImage = "url('gpt.jpg')"
            oyunSonu.style.display = "block";
            oyunAlanı.style.display = "none";
            document.getElementById("tekrar").style.display = "inline";
            skorTablosu.style.display = "none";
            document.getElementById("bitiş").play();
            hesapla()
            localStorage.removeItem("tekSeferlik_" + zorluk);
        }else{
            oyunBaşlat();
        };
        tekSeferlikSkor(tepkiZamanı)
    });

    window.tekrarBaşlat = function(){
    let tema = document.getElementById("tema").value
        if(tema === "gündüz"){
        oyunAlanı.style.backgroundImage = "url('gündüz.jpg')"
        bilgi.style.color = "black"
        document.getElementById("hak").style.color = "black"
        }else if(tema === "gece"){
        oyunAlanı.style.backgroundImage = "url('gece.jpg')"
        bilgi.style.color = "white"
        document.getElementById("hak").style.color = "white"
        }else if(tema === "uzay"){
        oyunAlanı.style.backgroundImage = "url('uzay.jpg')"
        bilgi.style.color = "white"
        document.getElementById("hak").style.color = "white"
        }else if(tema === "ay"){
        oyunAlanı.style.backgroundImage = "url('ay1.jpg')"
        bilgi.style.color = "black"
        document.getElementById("hak").style.color = "black"
        }
        document.getElementById("istatistik1").style.display = "none"
        oyunSonu.style.display = "none";
        oyunAlanı.style.display = "block";
        document.getElementById("başla1").style.display = "inline";
        document.getElementById("skorGöster").style.display = "inline";
        document.getElementById("başaDön1").style.display = "inline";
        kutu.style.display = "none";
        skorTablosu.style.display = "none";
        bilgi.textContent = "Hazır mısın? Hazırsan Başla!"
        hak = 10;
        document.getElementById("hak").textContent = "Kalan Hakkınız: " + hak
    }

    window.skorGöster = function() {
        let zorluk = document.getElementById("zorluk").value;
        let mod = document.getElementById("oyunModu").value;
        let skorTablosu = document.getElementById("skorTabloMod1");

        let normalSkorlar = JSON.parse(localStorage.getItem(zorluk + mod + "_normal")) || [];
        let enİyiSkorlar = JSON.parse(localStorage.getItem(zorluk + mod + "_eniyiler")) || [];

        let tabloHTML = `<h2>${zorluk.charAt(0).toUpperCase() + zorluk.slice(1)} Zorluğunun Skorları</h2>`;

        if (normalSkorlar.length === 0) {
            tabloHTML += "<p>Henüz normal skor yok.</p>";
        } else {
            tabloHTML += "<h3>Normal Skorlar</h3><ol>";
            normalSkorlar.forEach((skor) => {
                tabloHTML += `<li>${skor} saniye</li>`;
            });
            tabloHTML += "</ol>";
        }

        if (enİyiSkorlar.length === 0) {
            tabloHTML += "<p>Henüz en iyi skor yok.</p>";
        } else {
            tabloHTML += "<h3>En İyi 5 Skor</h3><ol>";
            enİyiSkorlar.forEach((skor) => {
                tabloHTML += `<li>${skor} saniye</li>`;
            });
            tabloHTML += "</ol>";
        }
        let tema = document.getElementById("tema").value
        if(tema === "gündüz"){
        oyunAlanı.style.backgroundImage = "url('gündüz.jpg')"
        skorTablosu.style.color = "black"
        }else if(tema === "gece"){
        oyunAlanı.style.backgroundImage = "url('gece.jpg')"
        skorTablosu.style.color = "white"
        }else if(tema === "uzay"){
        oyunAlanı.style.backgroundImage = "url('uzay.jpg')"
        skorTablosu.style.color = "white"
        }else if(tema === "ay"){
        oyunAlanı.style.backgroundImage = "url('ay1.jpg')"
        skorTablosu.style.color = "black"
        }
        skorTablosu.innerHTML = tabloHTML;
        skorTablosu.style.display = "block";
        document.getElementById("skorSil").style.display = "inline";
    }

    window.skorSil = function(){
    localStorage.removeItem(zorluk + mod + "_normal");
    skorGöster();
    document.getElementById("skorSil").style.display = "none";
    }

    window.başaDön = function(){
        bilgi.textContent = "Hazır mısın? Hazırsan Başla!"
        document.body.style.backgroundColor = "purple";
        document.getElementById("temaSeçimi").style.display = "block"
        document.getElementById("zorlukSeçimi").style.display = "block"
        document.getElementById("başla").style.display = "block";
        document.getElementById("başla").style.margin = "0 auto";
        document.getElementById("skorTabloMod1").style.display = "none"
        oyunAlanı.style.display = "none"
        oyunSonu.style.display = "none"
        hak = 10;
        document.getElementById("hak").textContent = "Kalan Hakkınız: " + hak
    }

    window.geriDön = function(){
        document.getElementById("oyunModuSeçimi").style.display = "block"
        document.getElementById("temaSeçimi").style.display = "none"
        document.getElementById("zorlukSeçimi").style.display = "none"
        document.getElementById("başla").style.display = "block";
        document.getElementById("başla").style.margin = "0 auto";
        document.getElementById("skorTabloMod2").style.display = "none"
        document.getElementById("oyunSonu").style.display = "none"
        oyunAlanı.style.display = "none"
    }
}

function oyunModu2(){
    document.getElementById("skorGöster").style.display = "none"
    const kutu = document.getElementById("kutu");
    const bilgi = document.getElementById("bilgi");
    const oyunAlanı = document.getElementById("oyunAlanı");
    const oyunSonu = document.getElementById("oyunSonu");
    const skorTablosu = document.getElementById("skorTabloMod2");
    var zorluk;
    let kalanSüre = 30;
    let zamanlayıcı;
    let skor = 0

    let başlamaZamanı;

    window.süreyiBaşlat = function(){
    document.getElementById("hak").textContent = "Kalan Süre: " + kalanSüre + " saniye";
    zamanlayıcı = setInterval(() => {
        kalanSüre--;
        document.getElementById("hak").textContent = "Kalan Süre: " + kalanSüre + " saniye";
        if (kalanSüre == 0) {
        clearInterval(zamanlayıcı);
        oyunuBitir();
        }
    }, 1000);
    }

    window.tekSeferlikSkor = function(tepkiZamanı){
        zorluk = document.getElementById("zorluk").value;
        mod = document.getElementById("oyunModu").value;

        let a = localStorage.getItem("tekSeferlik_" + zorluk + mod, tepkiZamanı);

        let dataArray;

        try {
            dataArray = a ? JSON.parse(a) : [];
        } catch (e) {
            dataArray = [];
        }

        if (!Array.isArray(dataArray)) {
            dataArray = [];
        }

        dataArray.push(tepkiZamanı);

        localStorage.setItem("tekSeferlik_" + zorluk + mod, JSON.stringify(dataArray));
    }

    window.hesapla = function() {
        const mod = document.getElementById("oyunModu").value;

        function skorlarGetir(zorluk) {
            const skorStr = localStorage.getItem("tekSeferlik_" + zorluk + mod);
            let skorDizisi = [];
            try {
                skorDizisi = skorStr ? JSON.parse(skorStr) : [];
            } catch {
                skorDizisi = [];
            }
            return skorDizisi.map(s => parseFloat(s)).filter(s => !isNaN(s));
        }

        const kolaySkorlar = skorlarGetir("kolay");
        const ortaSkorlar = skorlarGetir("orta");
        const zorSkorlar = skorlarGetir("zor");

        function ortalamaHesapla(skorlar) {
            if (skorlar.length === 0) return Infinity;
            const toplam = skorlar.reduce((a,b) => a+b, 0);
            return toplam / skorlar.length;
        }

        function enIyiSkorBul(skorlar) {
            if (skorlar.length === 0) return Infinity;
            return Math.min(...skorlar);
        }

        const kolayEnIyi = enIyiSkorBul(kolaySkorlar);
        const kolayOrtalama = ortalamaHesapla(kolaySkorlar);

        const ortaEnIyi = enIyiSkorBul(ortaSkorlar);
        const ortaOrtalama = ortalamaHesapla(ortaSkorlar);

        const zorEnIyi = enIyiSkorBul(zorSkorlar);
        const zorOrtalama = ortalamaHesapla(zorSkorlar);

        const enIyiSkorlar = [
            { zorluk: "kolay", enIyi: kolayEnIyi, ortalama: kolayOrtalama },
            { zorluk: "orta", enIyi: ortaEnIyi, ortalama: ortaOrtalama },
            { zorluk: "zor", enIyi: zorEnIyi, ortalama: zorOrtalama }
        ];

        let enIyi = enIyiSkorlar.reduce((acc, curr) => {
            return curr.enIyi < acc.enIyi ? curr : acc;
        }, { zorluk: "", enIyi: Infinity, ortalama: Infinity });

        if (enIyi.enIyi === Infinity) {
            console.log("Hiç skor bulunamadı.");
            return;
        }

        document.getElementById("skorlar").textContent =
            `En iyi skor:  ${enIyi.enIyi.toFixed(2)} saniye - 
            | Ortalama Skorunuz:  ${enIyi.ortalama.toFixed(2)}   saniye - 
            | Bu Tur Patlattığın Balon Sayısı: ${skor}`;

        document.getElementById("skorTabloMod1").style.display = "block";

        localStorage.removeItem("tekSeferlik_" + enIyi.zorluk + mod);
    }

    window.balonGöster = function(){
        zorluk = document.getElementById("zorluk").value;
        if (zorluk == "kolay") {
            window.göster = function(){
            if (kalanSüre <= 0) return;
            kutuyuGösterme();
            const rastgeleSüre = 1200 + Math.random() * 1600;
            setTimeout(göster, rastgeleSüre);
        }
        göster();
        }else if (zorluk == "orta") {
            window.göster = function(){
            if (kalanSüre <= 0) return;
            kutuyuGösterme();
            const rastgeleSüre = 1000 + Math.random() * 1400;
            setTimeout(göster, rastgeleSüre);
        }
        göster();
        }else if (zorluk == "zor") {
            window.göster = function(){
            if (kalanSüre <= 0) return;
            kutuyuGösterme();
            const rastgeleSüre = 600 + Math.random() * 1000;
            setTimeout(göster, rastgeleSüre);
        }
        göster();
        }
    }

    window.kutuyuGösterme = function(){
        zorluk = document.getElementById("zorluk").value;
        if(zorluk === "kolay"){
            const boyut = 120 + Math.random() * 70;
            const top = Math.random() * (window.innerHeight - boyut);
            const left = Math.random() * (window.innerWidth - boyut);

            kutu.style.width = boyut + "px";
            kutu.style.height = boyut + "px";
            kutu.style.top = top + "px";
            kutu.style.left = left + "px";

            kutu.style.backgroundColor = "red";

            kutu.style.display = "block";
            başlamaZamanı = Date.now();
        }else if(zorluk === "orta"){
            const boyut = 85 + Math.random() * 45;
            const top = Math.random() * (window.innerHeight - boyut);
            const left = Math.random() * (window.innerWidth - boyut);

            kutu.style.width = boyut + "px";
            kutu.style.height = boyut + "px";
            kutu.style.top = top + "px";
            kutu.style.left = left + "px";

            kutu.style.backgroundColor =   "red";

            kutu.style.display = "block";
            başlamaZamanı = Date.now();
        }else if(zorluk === "zor"){
            const boyut = 40 + Math.random() * 30;
            const top = Math.random() * (window.innerHeight - boyut);
            const left = Math.random() * (window.innerWidth - boyut);

            kutu.style.width = boyut + "px";
            kutu.style.height = boyut + "px";
            kutu.style.top = top + "px";
            kutu.style.left = left + "px";

            kutu.style.backgroundColor = "red";

            kutu.style.display = "block";
            başlamaZamanı = Date.now();
        }
    };

    kutu.onclick = function() {
        const bitisZamani = Date.now();
        const tepkiSüresi = (bitisZamani - başlamaZamanı) / 1000;

        bilgi.textContent = "Tepki süresi: " + tepkiSüresi.toFixed(2) + " saniye";

        kutu.style.display = "none";

        let patlama = document.getElementById("patlama");
        patlama.currentTime = 0;
        patlama.play();
    };

    window.oyunBaşlat = function(){
        let tema = document.getElementById("tema").value
        if(tema === "gündüz"){
        oyunAlanı.style.backgroundImage = "url('gündüz.jpg')"
        bilgi.style.color = "black"
        document.getElementById("hak").style.color = "black"
        }else if(tema === "gece"){
        oyunAlanı.style.backgroundImage = "url('gece.jpg')"
        bilgi.style.color = "white"
        document.getElementById("hak").style.color = "white"
        }else if(tema === "uzay"){
        oyunAlanı.style.backgroundImage = "url('uzay.jpg')"
        bilgi.style.color = "white"
        document.getElementById("hak").style.color = "white"
        }else if(tema === "ay"){
        oyunAlanı.style.backgroundImage = "url('ay1.jpg')"
        bilgi.style.color = "black"
        document.getElementById("hak").style.color = "black"
        }
        document.getElementById("oyunBitir").style.display = "none";
        document.getElementById("geriDön1").style.display = "none";
        document.getElementById("zorlukSeçimi").style.display = "none";
        document.getElementById("temaSeçimi").style.display = "none";
        document.getElementById("başla1").style.display = "none";
        document.getElementById("başaDön1").style.display = "none";
        oyunAlanı.style.display = "block";

        if(tema === "gündüz"){
            oyunAlanı.style.backgroundImage = "url('gündüz.jpg')";
            bilgi.style.color = "black";
            document.getElementById("hak").style.color = "black";
        } else if(tema === "gece"){
            oyunAlanı.style.backgroundImage = "url('gece.jpg')";
            bilgi.style.color = "white";
            document.getElementById("hak").style.color = "white";
        } else if(tema === "uzay"){
            oyunAlanı.style.backgroundImage = "url('uzay.jpg')";
            bilgi.style.color = "white";
            document.getElementById("hak").style.color = "white";
        } else if(tema === "ay"){
            oyunAlanı.style.backgroundImage = "url('ay.jpg')";
            bilgi.style.color = "white";
            document.getElementById("hak").style.color = "white";
        }

        bilgi.textContent = "Hızlı ol!";
        kalanSüre = 30;
        süreyiBaşlat();
        balonGöster();
    }

    kutu.addEventListener("click", () => {
        const tepkiZamanı = (Date.now() - başlamaZamanı) / 1000;
        bilgi.textContent = `Tepki Süresi: ${tepkiZamanı.toFixed(2)} saniye`;
        document.getElementById("patlama").play();
        document.getElementById("hak").textContent = "Kalan Süre: " + kalanSüre + " saniye";
        skor++
        tekSeferlikSkor(tepkiZamanı)
    });

    window.oyunuBitir = function(){
        kutu.style.display = "none";
        oyunAlanı.style.display = "none";
        oyunSonu.style.display = "block";
        document.getElementById("tekrar").style.display = "inline-block";
        document.getElementById("başaDön").style.display = "inline-block";
        document.getElementById("skorTabloMod2").style.display = "block"

        document.getElementById("bitiş").play();
        hesapla()
    }


    window.tekrarBaşlat = function(){
    let tema = document.getElementById("tema").value
        if(tema === "gündüz"){
        oyunAlanı.style.backgroundImage = "url('gündüz.jpg')"
        bilgi.style.color = "black"
        document.getElementById("hak").style.color = "black"
        }else if(tema === "gece"){
        oyunAlanı.style.backgroundImage = "url('gece.jpg')"
        bilgi.style.color = "white"
        document.getElementById("hak").style.color = "white"
        }else if(tema === "uzay"){
        oyunAlanı.style.backgroundImage = "url('uzay.jpg')"
        bilgi.style.color = "white"
        document.getElementById("hak").style.color = "white"
        }else if(tema === "ay"){
        oyunAlanı.style.backgroundImage = "url('ay1.jpg')"
        bilgi.style.color = "black"
        document.getElementById("hak").style.color = "black"
        }
        oyunSonu.style.display = "none";
        oyunAlanı.style.display = "block";
        document.getElementById("başla1").style.display = "inline";
        document.getElementById("başaDön1").style.display = "inline";
        kutu.style.display = "none";
        skorTablosu.style.display = "none";
        bilgi.textContent = "Hazır mısın? Hazırsan Başla!"
        clearInterval(zamanlayıcı);
        kalanSüre = 30;
        skor = 0
    }

    window.başaDön = function(){
        document.getElementById("temaSeçimi").style.display = "block"
        document.getElementById("zorlukSeçimi").style.display = "block"
        document.getElementById("başla").style.display = "block";
        document.getElementById("başla").style.margin = "0 auto";
        document.getElementById("skorTabloMod2").style.display = "none"
        oyunAlanı.style.display = "none"
        oyunSonu.style.display = "none"
        kalanSüre = 30;
        skor = 0
    }

    window.geriDön = function(){
        document.getElementById("oyunModuSeçimi").style.display = "block"
        document.getElementById("temaSeçimi").style.display = "none"
        document.getElementById("zorlukSeçimi").style.display = "none"
        document.getElementById("başla").style.display = "block";
        document.getElementById("başla").style.margin = "0 auto";
        document.getElementById("skorTabloMod2").style.display = "none"
        document.getElementById("oyunSonu").style.display = "none"
        oyunAlanı.style.display = "none"
    }
}

function oyunModu3() {
    document.getElementById("skorGöster").style.display = "inline"
    const kutu = document.getElementById("kutu");
    const bilgi = document.getElementById("bilgi");
    const oyunAlanı = document.getElementById("oyunAlanı");
    const oyunSonu = document.getElementById("oyunSonu");
    const skorTablosu = document.getElementById("skorTabloMod1");
    var zorluk;

    let başlamaZamanı;

    window.tekSeferlikSkor = function(tepkiZamanı){
        zorluk = document.getElementById("zorluk").value;
        mod = document.getElementById("oyunModu").value;

        let a = localStorage.getItem("tekSeferlik_" + zorluk + mod, tepkiZamanı);

        let dataArray;

        try {
            dataArray = a ? JSON.parse(a) : [];
        } catch (e) {
            dataArray = [];
        }

        if (!Array.isArray(dataArray)) {
            dataArray = [];
        }

        dataArray.push(tepkiZamanı);

        localStorage.setItem("tekSeferlik_" + zorluk + mod, JSON.stringify(dataArray));
    }

    window.hesapla = function() {
        const mod = document.getElementById("oyunModu").value;

        function skorlarGetir(zorluk) {
            const skorStr = localStorage.getItem("tekSeferlik_" + zorluk + mod);
            let skorDizisi = [];
            try {
                skorDizisi = skorStr ? JSON.parse(skorStr) : [];
            } catch {
                skorDizisi = [];
            }
            return skorDizisi.map(s => parseFloat(s)).filter(s => !isNaN(s));
        }


        const kolaySkorlar = skorlarGetir("kolay");
        const ortaSkorlar = skorlarGetir("orta");
        const zorSkorlar = skorlarGetir("zor");

        function ortalamaHesapla(skorlar) {
            if (skorlar.length === 0) return Infinity;
            const toplam = skorlar.reduce((a,b) => a+b, 0);
            return toplam / skorlar.length;
        }

        function enIyiSkorBul(skorlar) {
            if (skorlar.length === 0) return Infinity;
            return Math.min(...skorlar);
        }

        const kolayEnIyi = enIyiSkorBul(kolaySkorlar);
        const kolayOrtalama = ortalamaHesapla(kolaySkorlar);

        const ortaEnIyi = enIyiSkorBul(ortaSkorlar);
        const ortaOrtalama = ortalamaHesapla(ortaSkorlar);

        const zorEnIyi = enIyiSkorBul(zorSkorlar);
        const zorOrtalama = ortalamaHesapla(zorSkorlar);

        const enIyiSkorlar = [
            { zorluk: "kolay", enIyi: kolayEnIyi, ortalama: kolayOrtalama },
            { zorluk: "orta", enIyi: ortaEnIyi, ortalama: ortaOrtalama },
            { zorluk: "zor", enIyi: zorEnIyi, ortalama: zorOrtalama }
        ];

        let enIyi = enIyiSkorlar.reduce((acc, curr) => {
            return curr.enIyi < acc.enIyi ? curr : acc;
        }, { zorluk: "", enIyi: Infinity, ortalama: Infinity });

        if (enIyi.enIyi === Infinity) {
            console.log("Hiç skor bulunamadı.");
            return;
        }

        document.getElementById("skorlar").textContent =
            "En iyi skor: " + enIyi.enIyi.toFixed(2) + " saniye - " +
            " | Ortalama Skorunuz: " + enIyi.ortalama.toFixed(2) + " saniye ";

        document.getElementById("skorTabloMod1").style.display = "block";

        localStorage.removeItem("tekSeferlik_" + enIyi.zorluk + mod);
    }




    window.skorTut = function (tepkiZamanı) {
        let zorluk = document.getElementById("zorluk").value;
        let mod = document.getElementById("oyunModu").value;

        let normalSkorlar = JSON.parse(localStorage.getItem(zorluk + mod + "_normal")) || [];
        normalSkorlar.push(tepkiZamanı.toFixed(2));
        localStorage.setItem(zorluk + mod + "_normal", JSON.stringify(normalSkorlar));

        let enİyiSkorlar = JSON.parse(localStorage.getItem(zorluk + mod + "_eniyiler")) || [];
        enİyiSkorlar.push(tepkiZamanı.toFixed(2));
        enİyiSkorlar.sort((a, b) => a - b);
        if (enİyiSkorlar.length > 5) {
            enİyiSkorlar = enİyiSkorlar.slice(0, 5);
        }
        localStorage.setItem(zorluk + mod + "_eniyiler", JSON.stringify(enİyiSkorlar));
    }

    window.kutuyuGösterme = function(){
        zorluk = document.getElementById("zorluk").value;
        if(zorluk === "kolay"){
            const boyut = 120 + Math.random() * 70;
            const top = Math.random() * (window.innerHeight - boyut);
            const left = Math.random() * (window.innerWidth - boyut);

            kutu.style.width = boyut + "px";
            kutu.style.height = boyut + "px";
            kutu.style.top = top + "px";
            kutu.style.left = left + "px";

            kutu.style.backgroundColor = "red";

            kutu.style.display = "block";
            başlamaZamanı = Date.now();
        }else if(zorluk === "orta"){
            const boyut = 85 + Math.random() * 45;
            const top = Math.random() * (window.innerHeight - boyut);
            const left = Math.random() * (window.innerWidth - boyut);

            kutu.style.width = boyut + "px";
            kutu.style.height = boyut + "px";
            kutu.style.top = top + "px";
            kutu.style.left = left + "px";

            kutu.style.backgroundColor =   "red";

            kutu.style.display = "block";
            başlamaZamanı = Date.now();
        }else if(zorluk === "zor"){
            const boyut = 40 + Math.random() * 30;
            const top = Math.random() * (window.innerHeight - boyut);
            const left = Math.random() * (window.innerWidth - boyut);

            kutu.style.width = boyut + "px";
            kutu.style.height = boyut + "px";
            kutu.style.top = top + "px";
            kutu.style.left = left + "px";

            kutu.style.backgroundColor = "red";

            kutu.style.display = "block";
            başlamaZamanı = Date.now();
        }
    };


    window.oyunBaşlat = function(){
        let tema = document.getElementById("tema").value
        if(tema === "gündüz"){
        oyunAlanı.style.backgroundImage = "url('gündüz.jpg')"
        bilgi.style.color = "black"
        document.getElementById("hak").style.color = "black"
        }else if(tema === "gece"){
        oyunAlanı.style.backgroundImage = "url('gece.jpg')"
        bilgi.style.color = "white"
        document.getElementById("hak").style.color = "white"
        }else if(tema === "uzay"){
        oyunAlanı.style.backgroundImage = "url('uzay.jpg')"
        bilgi.style.color = "white"
        document.getElementById("hak").style.color = "white"
        }else if(tema === "ay"){
        oyunAlanı.style.backgroundImage = "url('ay1.jpg')"
        bilgi.style.color = "black"
        document.getElementById("hak").style.color = "black"
        }
        document.getElementById("oyunBitir").style.display = "inline";
        document.getElementById("hak").style.display = "none";
        document.getElementById("geriDön1").style.display = "none";
        document.getElementById("istatistik1").style.display = "none"
        document.getElementById("temaSeçimi").style.display = "none"
        document.getElementById("zorlukSeçimi").style.display = "none"
        document.getElementById("başaDön1").style.display = "none";
        oyunAlanı.style.display = "block"
        skorTablosu.style.display = "none"
        document.getElementById("skorGöster").style.display = "none"
        kutu.style.display = "none";
        document.getElementById("başla1").style.display = "none";
        document.getElementById("skorSil").style.display = "none";

        zorluk = document.getElementById("zorluk").value;
        if(zorluk === "kolay"){
            const geçikme = 700 + Math.random() * 1500;
        setTimeout(kutuyuGösterme, geçikme);
        }else if(zorluk === "orta"){
            const geçikme = 300 + Math.random() * 700;
        setTimeout(kutuyuGösterme, geçikme);
        }else if(zorluk === "zor"){
            const geçikme = 150 + Math.random() * 300;
        setTimeout(kutuyuGösterme, geçikme);
        }
    }

    kutu.addEventListener("click", () => {
        const tepkiZamanı = (Date.now() - başlamaZamanı) / 1000;
        bilgi.textContent = `Tepki Süresi: ${tepkiZamanı.toFixed(2)} saniye`;
        document.getElementById("patlama").play();
        skorTut(tepkiZamanı);
        oyunBaşlat();
        tekSeferlikSkor(tepkiZamanı)
    });

    window.tekrarBaşlat = function(){
    let tema = document.getElementById("tema").value
        if(tema === "gündüz"){
        oyunAlanı.style.backgroundImage = "url('gündüz.jpg')"
        bilgi.style.color = "black"
        document.getElementById("hak").style.color = "black"
        }else if(tema === "gece"){
        oyunAlanı.style.backgroundImage = "url('gece.jpg')"
        bilgi.style.color = "white"
        document.getElementById("hak").style.color = "white"
        }else if(tema === "uzay"){
        oyunAlanı.style.backgroundImage = "url('uzay.jpg')"
        bilgi.style.color = "white"
        document.getElementById("hak").style.color = "white"
        }else if(tema === "ay"){
        oyunAlanı.style.backgroundImage = "url('ay1.jpg')"
        bilgi.style.color = "black"
        document.getElementById("hak").style.color = "black"
        }
        document.getElementById("istatistik1").style.display = "none"
        document.getElementById("oyunBitir").style.display = "none";
        oyunSonu.style.display = "none";
        oyunAlanı.style.display = "block";
        document.getElementById("başla1").style.display = "inline";
        document.getElementById("skorGöster").style.display = "inline";
        document.getElementById("başaDön1").style.display = "inline";
        kutu.style.display = "none";
        skorTablosu.style.display = "none";
        bilgi.textContent = "Hazır mısın? Hazırsan Başla!"
        hak = 10;
        document.getElementById("hak").textContent = "Kalan Hakkınız: " + hak
    }

    window.skorGöster = function() {
        let zorluk = document.getElementById("zorluk").value;
        let mod = document.getElementById("oyunModu").value;
        let skorTablosu = document.getElementById("skorTabloMod1");

        let normalSkorlar = JSON.parse(localStorage.getItem(zorluk + mod + "_normal")) || [];
        let enİyiSkorlar = JSON.parse(localStorage.getItem(zorluk + mod + "_eniyiler")) || [];

        let tabloHTML = `<h2>${zorluk.charAt(0).toUpperCase() + zorluk.slice(1)} Zorluğunun Skorları</h2>`;

        if (normalSkorlar.length === 0) {
            tabloHTML += "<p>Henüz normal skor yok.</p>";
        } else {
            tabloHTML += "<h3>Normal Skorlar</h3><ol>";
            normalSkorlar.forEach((skor) => {
                tabloHTML += `<li>${skor} saniye</li>`;
            });
            tabloHTML += "</ol>";
        }

        if (enİyiSkorlar.length === 0) {
            tabloHTML += "<p>Henüz en iyi skor yok.</p>";
        } else {
            tabloHTML += "<h3>En İyi 5 Skor</h3><ol>";
            enİyiSkorlar.forEach((skor) => {
                tabloHTML += `<li>${skor} saniye</li>`;
            });
            tabloHTML += "</ol>";
        }

        let tema = document.getElementById("tema").value
        if(tema === "gündüz"){
        oyunAlanı.style.backgroundImage = "url('gündüz.jpg')"
        skorTablosu.style.color = "black"
        }else if(tema === "gece"){
        oyunAlanı.style.backgroundImage = "url('gece.jpg')"
        skorTablosu.style.color = "white"
        }else if(tema === "uzay"){
        oyunAlanı.style.backgroundImage = "url('uzay.jpg')"
        skorTablosu.style.color = "white"
        }else if(tema === "ay"){
        oyunAlanı.style.backgroundImage = "url('ay1.jpg')"
        skorTablosu.style.color = "black"
        }

        skorTablosu.innerHTML = tabloHTML;
        skorTablosu.style.display = "block";
        document.getElementById("skorSil").style.display = "inline";
    }

    window.skorSil = function(){
    localStorage.removeItem(zorluk + mod + "_normal");
    skorGöster();
    document.getElementById("skorSil").style.display = "none";
    }

    window.başaDön = function(){
        bilgi.textContent = "Hazır mısın? Hazırsan Başla!"
        document.body.style.backgroundColor = "purple";
        document.getElementById("temaSeçimi").style.display = "block"
        document.getElementById("zorlukSeçimi").style.display = "block"
        document.getElementById("başla").style.display = "block";
        document.getElementById("başla").style.margin = "0 auto";
        document.getElementById("skorTabloMod1").style.display = "none"
        oyunAlanı.style.display = "none"
        oyunSonu.style.display = "none"
        hak = 10;
        document.getElementById("hak").textContent = "Kalan Hakkınız: " + hak
    }

    window.geriDön = function(){
        document.getElementById("oyunModuSeçimi").style.display = "block"
        document.getElementById("temaSeçimi").style.display = "none"
        document.getElementById("zorlukSeçimi").style.display = "none"
        document.getElementById("başla").style.display = "block";
        document.getElementById("başla").style.margin = "0 auto";
        document.getElementById("skorTabloMod2").style.display = "none"
        document.getElementById("oyunSonu").style.display = "none"
        oyunAlanı.style.display = "none"
    }

    window.oyunBitir = function(){
            bilgi.style.color = "black"
            document.body.style.backgroundImage = "url('gpt.jpg')"
            oyunSonu.style.display = "block";
            oyunAlanı.style.display = "none";
            document.getElementById("tekrar").style.display = "inline";
            skorTablosu.style.display = "none";
            document.getElementById("bitiş").play();
            hesapla()
            localStorage.removeItem("tekSeferlik_" + zorluk);
    }
}