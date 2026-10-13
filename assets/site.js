(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const h1 = document.getElementById('name');
  // Yayındaki sitede kutular HTML'de hazır gelir; yoksa burada oluştur
  if (!h1.querySelector('.tile')) h1.innerHTML = h1.textContent.toLocaleUpperCase('tr').split(' ').map(w =>
    `<span class="word" aria-hidden="true">${[...w].map(c => `<span class="tile" data-c="${c}">${c}</span>`).join('')}</span>`).join('');
  // Tabela animasyonu sadece ana sayfada ve oturum başına bir kez
  const onHome = document.getElementById('home') && !location.hash.slice(1);
  let seen = false;
  try { seen = sessionStorage.getItem('flapSeen') === '1'; } catch (e) {}
  if (!reduce && onHome && !seen) {
    try { sessionStorage.setItem('flapSeen', '1'); } catch (e) {}
    const pool = 'ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ0123456789';
    h1.querySelectorAll('.tile').forEach((el, i) => {
      let n = 6 + i * 2;
      el.textContent = pool[(i * 7) % pool.length];
      const tick = () => {
        el.classList.remove('flip'); void el.offsetWidth; el.classList.add('flip');
        el.textContent = --n <= 0 ? el.dataset.c : pool[Math.floor(Math.random() * pool.length)];
        if (n > 0) setTimeout(tick, 55);
        else setTimeout(() => el.classList.remove('flip'), 120);
      };
      setTimeout(tick, 150);
    });
  }
  const now = document.getElementById('now');
  const clock = () => { now.textContent = '41.01°K 28.97°D · ' + new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }); };
  clock(); setInterval(clock, 10000);
})();

// Bilim trivia
(() => {
  const C = { bilim: '--c-bilim', teknoloji: '--c-teknoloji', uzay: '--c-uzay', havacilik: '--c-havacilik', mitoloji: '--c-mitoloji' };
  const L = { bilim: 'Bilim', teknoloji: 'Teknoloji', uzay: 'Uzay', havacilik: 'Havacılık', mitoloji: 'Mitoloji' };
  const Q = [
    ['bilim', 'Güneş ışığı Dünya\'ya yaklaşık ne kadar sürede ulaşır?', ['8 saniye', '8 dakika', '8 saat'], 1, 'Yaklaşık 8 dakika 20 saniye. Yani Güneş\'e baktığında onun 8 dakika önceki halini görüyorsun.'],
    ['uzay', 'Venüs\'te hangisi daha uzun sürer?', ['Bir gün', 'Bir yıl', 'İkisi eşit'], 0, 'Venüs kendi ekseni etrafında 243 Dünya gününde döner, Güneş\'in etrafını ise 225 günde dolaşır. Günü yılından uzundur.'],
    ['havacilik', 'Uçaklardaki "kara kutular" hangi renge boyanır?', ['Siyah', 'Turuncu', 'Sarı'], 1, 'Parlak turuncu. Enkaz arasında kolayca seçilebilsinler diye.'],
    ['teknoloji', 'İlk transistör Bell Labs\'ta hangi yıl yapıldı?', ['1937', '1947', '1957'], 1, '1947. Bugün tek bir telefon çipinde on milyarlarca transistör var.'],
    ['mitoloji', 'Gılgamış Destanı\'nda tufandan gemiyle kurtulan kişi kimdir?', ['Enkidu', 'Utnapiştim', 'Humbaba'], 1, 'Utnapiştim. Hikâye 11. tablette anlatılır; gemi Nimuş Dağı\'na oturur.'],
    ['bilim', 'Gökyüzünün mavi görünmesinin nedeni nedir?', ['Okyanusların yansıması', 'Rayleigh saçılması', 'Ozon tabakası'], 1, 'Kısa dalga boylu mavi ışık atmosferde çok daha fazla saçılır (şiddet ∝ 1/λ⁴).'],
    ['uzay', 'ISS Dünya\'nın etrafını yaklaşık kaç dakikada döner?', ['45', '92', '180'], 1, 'Yaklaşık 92 dakika. Astronotlar günde 16 kez gün doğumu görür.'],
    ['bilim', 'İnsan vücudunda kütlece en çok bulunan element hangisidir?', ['Karbon', 'Oksijen', 'Hidrojen'], 1, 'Oksijen, kütlenin yaklaşık %65\'i. Sayıca en çok olan atom ise hidrojen.'],
    ['havacilik', 'Concorde\'un seyir hızı yaklaşık kaçtı?', ['Mach 1,2', 'Mach 2', 'Mach 3'], 1, 'Yaklaşık Mach 2. Londra–New York uçuşu 3,5 saat kadar sürerdi.'],
    ['teknoloji', 'Dünyanın ilk web sitesi hangi kurumda yayına girdi?', ['MIT', 'CERN', 'NASA'], 1, 'CERN, 1991. Tim Berners-Lee\'nin projesiydi.'],
    ['mitoloji', 'Prometheus tanrılardan neyi çalıp insanlara verdi?', ['Ateşi', 'Yazıyı', 'Buğdayı'], 0, 'Ateşi. Cezası da bir kayaya zincirlenmek oldu.'],
    ['uzay', 'Güneş Sistemi\'nin bilinen en büyük volkanı nerededir?', ['Venüs', 'Mars', 'Io'], 1, 'Mars\'taki Olympus Mons; yüksekliği Everest\'in yaklaşık 2,5 katı.'],
    ['bilim', 'Işık boşlukta saniyede yaklaşık ne kadar yol alır?', ['30.000 km', '300.000 km', '3 milyon km'], 1, 'Yaklaşık 300.000 km; tam değeri saniyede 299.792.458 metre.'],
    ['bilim', 'Elmas hangi elementten oluşur?', ['Karbon', 'Silisyum', 'Bor'], 0, 'Saf karbondan. Kurşun kalemdeki grafit de karbon; fark atomların diziliminde.'],
    ['bilim', 'Ses hangisinde en hızlı yayılır?', ['Hava', 'Su', 'Çelik'], 2, 'Çelikte saniyede yaklaşık 5.900 m. Suda yaklaşık 1.480 m, havada ise 343 m.'],
    ['bilim', 'DNA\'nın çift sarmal yapısı hangi yıl yayımlandı?', ['1933', '1953', '1973'], 1, '1953\'te Watson ve Crick yayımladı. Rosalind Franklin\'in X-ışını görüntüleri keşifte kilit rol oynadı.'],
    ['bilim', 'Mutlak sıfır kaç santigrat derecedir?', ['−100 °C', '−273,15 °C', '−459,67 °C'], 1, '−273,15 °C, yani 0 kelvin. −459,67 ise aynı sıcaklığın Fahrenhayt karşılığı.'],
    ['bilim', 'Yetişkin bir insanın iskeletinde kaç kemik vardır?', ['186', '206', '226'], 1, 'Genellikle 206. Bebekler 300\'e yakın kemikle doğar; büyüdükçe bazıları kaynaşır.'],
    ['bilim', 'Muzu çok hafif radyoaktif yapan element hangisidir?', ['Potasyum', 'Kalsiyum', 'Magnezyum'], 0, 'Potasyum. İçindeki potasyumun küçük bir kısmı radyoaktif potasyum-40; miktarı zararsız düzeyde.'],
    ['uzay', 'Güneş Sistemi\'nin en sıcak gezegeni hangisidir?', ['Merkür', 'Venüs', 'Mars'], 1, 'Venüs, yaklaşık 465 °C. Güneş\'e daha yakın olan Merkür\'den bile sıcak; sebebi kalın karbondioksit atmosferinin sera etkisi.'],
    ['uzay', 'Ay\'a ilk ayak basan insan kimdir?', ['Buzz Aldrin', 'Neil Armstrong', 'Yuri Gagarin'], 1, 'Neil Armstrong, 20 Temmuz 1969, Apollo 11. Gagarin ise 1961\'de uzaya çıkan ilk insandı.'],
    ['uzay', 'Güneş\'ten sonra bize en yakın yıldız hangisidir?', ['Sirius', 'Proxima Centauri', 'Betelgeuse'], 1, 'Proxima Centauri, yaklaşık 4,24 ışık yılı uzakta.'],
    ['uzay', 'Satürn\'ün halkaları büyük ölçüde neden oluşur?', ['Buz', 'Gaz', 'Demir tozu'], 0, 'Çoğunlukla su buzundan. Parçaların boyu toz tanesinden ev büyüklüğüne kadar değişir.'],
    ['uzay', 'Voyager 1 hangi yıl fırlatıldı?', ['1967', '1977', '1987'], 1, '1977. Bugün insan yapımı en uzak cisim ve yıldızlararası uzayda yol alıyor.'],
    ['uzay', 'Ay\'dan yansıyan ışık Dünya\'ya ne kadar sürede ulaşır?', ['1,3 saniye', '13 saniye', '1,3 dakika'], 0, 'Yaklaşık 1,3 saniye. Ay ortalama 384.400 km uzakta.'],
    ['uzay', 'Bilinen en çok uyduya sahip gezegen hangisidir?', ['Jüpiter', 'Satürn', 'Uranüs'], 1, 'Satürn. 2025\'te duyurulan keşiflerle bilinen uydu sayısı 270\'i geçti.'],
    ['havacilik', 'Wright kardeşlerin ilk motorlu uçuşu ne kadar sürdü?', ['12 saniye', '2 dakika', '12 dakika'], 0, '12 saniye. 17 Aralık 1903\'te Kitty Hawk\'ta yaklaşık 37 metre yol aldılar.'],
    ['havacilik', 'Yolcu kapasitesi en yüksek yolcu uçağı hangisidir?', ['Boeing 747', 'Airbus A380', 'Boeing 777'], 1, 'Airbus A380. Tek sınıf düzende 850\'yi aşkın yolcu için sertifikalı.'],
    ['havacilik', 'Telsizdeki "Mayday" çağrısı nereden gelir?', ['İngilizce "may day"', 'Fransızca "m\'aidez"', 'Almanca "Maitag"'], 1, 'Fransızca "m\'aidez", yani "bana yardım edin". 1920\'lerde Londra\'daki Croydon Havalimanı\'nda önerildi.'],
    ['havacilik', 'Pistlerin başındaki numaralar neyi gösterir?', ['Pistin uzunluğunu', 'Pistin yönünü', 'Açılış sırasını'], 1, 'Manyetik yönün onda birini. 27 numaralı pist yaklaşık 270°, yani batıya bakar.'],
    ['havacilik', 'Ses hızını resmen ilk aşan pilot kimdir?', ['Chuck Yeager', 'Amelia Earhart', 'Charles Lindbergh'], 0, 'Chuck Yeager, 1947\'de Bell X-1 ile.'],
    ['havacilik', 'Türkiye\'nin ilk kadın askeri pilotu kimdir?', ['Sabiha Gökçen', 'Bedriye Tahir', 'Leman Bozkurt'], 0, 'Sabiha Gökçen; dünyanın ilk kadın savaş pilotlarından biri sayılır. Bedriye Tahir ise ilk Türk kadın sivil pilottu.'],
    ['havacilik', 'Yolcu uçakları genellikle hangi irtifada seyreder?', ['3.000 m', '11.000 m', '20.000 m'], 1, 'Genellikle 10–12 km, yani 35.000 ft civarı. İnce havada sürtünme azalır, yakıt tasarrufu sağlanır.'],
    ['havacilik', 'Kanat uçlarındaki yukarı kalkık parçalara ne denir?', ['Flap', 'Winglet', 'Aileron'], 1, 'Winglet. Kanat ucundaki girdabı azaltarak yakıt tüketimini düşürür.'],
    ['teknoloji', 'İlk iPhone hangi yıl tanıtıldı?', ['2005', '2007', '2009'], 1, '2007. Ocak\'ta tanıtıldı, Haziran\'da satışa çıktı.'],
    ['teknoloji', 'Bilgisayar tarihine geçen ilk "bug" neydi?', ['Bir güve', 'Bir yazım hatası', 'Bir kısa devre'], 0, 'Bir güve. 1947\'de Harvard Mark II\'nin rölesine sıkıştı ve deftere bantlanarak saklandı.'],
    ['teknoloji', 'Python programlama dili adını nereden alır?', ['Bir yılan türünden', 'Monty Python\'dan', 'Bir Yunan mitinden'], 1, 'Guido van Rossum adı İngiliz komedi grubu Monty Python\'dan aldı.'],
    ['teknoloji', 'Moore Yasası neyi öngörür?', ['Transistörlerin 2 yılda ikiye katlanması', 'Pil ömrünün her yıl uzaması', 'İnternetin her yıl hızlanması'], 0, 'Gordon Moore 1965\'te her yıl dedi, 1975\'te bunu iki yıla güncelledi.'],
    ['teknoloji', 'QWERTY klavye düzeni ilk olarak ne için tasarlandı?', ['Daktilolar', 'Telgraf makineleri', 'İlk bilgisayarlar'], 0, '1870\'lerde Christopher Latham Sholes\'un daktiloları için. Türkçeye özgü F klavye ise 1955\'te İhsan Sıtkı Yener\'in çalışmasıyla doğdu.'],
    ['teknoloji', 'Adreslerde @ işaretini kullanan ilk e-postayı kim gönderdi?', ['Ray Tomlinson', 'Bill Gates', 'Vint Cerf'], 0, 'Ray Tomlinson, 1971\'de ARPANET üzerinde.'],
    ['teknoloji', 'GPS ile konum bulmak için en az kaç uydu gerekir?', ['2', '4', '8'], 1, 'Dört. Üçü konum için, dördüncüsü alıcının saat hatasını düzeltmek için.'],
    ['teknoloji', 'JavaScript\'in ilk sürümü yaklaşık ne kadar sürede yazıldı?', ['10 gün', '6 ay', '3 yıl'], 0, 'Yaklaşık 10 gün. Brendan Eich 1995\'te Netscape için yazdı.'],
    ['mitoloji', 'Medusa\'nın başını kesen kahraman kimdir?', ['Herakles', 'Perseus', 'Theseus'], 1, 'Perseus. Medusa\'ya doğrudan bakmamak için Athena\'nın verdiği cilalı kalkanı ayna gibi kullandı.'],
    ['mitoloji', 'İskandinav mitolojisinde Thor\'un çekicinin adı nedir?', ['Gungnir', 'Mjölnir', 'Gram'], 1, 'Mjölnir. Gungnir ise Odin\'in mızrağıdır.'],
    ['mitoloji', 'Truva Savaşı kimin kaçırılmasıyla başladı?', ['Helen', 'Penelope', 'Andromakhe'], 0, 'Spartalı Helen\'in, Truva prensi Paris tarafından götürülmesiyle.'],
    ['mitoloji', 'Akhilleus\'un tek zayıf noktası neresiydi?', ['Topuğu', 'Omzu', 'Boynu'], 0, 'Topuğu. Annesi Thetis onu Styx Irmağı\'na batırırken topuğundan tutmuştu.'],
    ['mitoloji', 'Ergenekon Destanı\'nda Türklere yol gösteren hayvan hangisidir?', ['Kartal', 'Bozkurt', 'Geyik'], 1, 'Bozkurt. Demir dağ eritilerek açılan yoldan halkı dışarı çıkardığı anlatılır.'],
    ['mitoloji', 'Mısır mitolojisinde ölünün kalbi neyle tartılırdı?', ['Altın bir ağırlıkla', 'Maat\'ın tüyüyle', 'Kutsal bir taşla'], 1, 'Doğruluk tanrıçası Maat\'ın tüyüyle. Kalp tüyden ağır gelirse Ammit tarafından yutulurdu.'],
    ['mitoloji', 'Hangi gezegen adını Roma\'nın savaş tanrısından alır?', ['Jüpiter', 'Mars', 'Merkür'], 1, 'Mars. Yunan mitolojisindeki karşılığı Ares; kızıl rengi kan ve savaşla ilişkilendirilmişti.'],
    ['mitoloji', 'Pandora\'nın kutusu kapandığında içinde ne kalmıştı?', ['Umut', 'Hastalık', 'Ölüm'], 0, 'Umut. Bütün kötülükler dünyaya yayılmış, yalnızca umut içeride kalmıştı.']
  ];
  // Sorular karışık gelir; hepsi gösterilmeden aynı soru tekrar gelmez
  let deck = [], idx = -1, asked = 0, right = 0;
  const draw = () => {
    if (!deck.length) {
      deck = Q.map((_, i) => i);
      for (let i = deck.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [deck[i], deck[j]] = [deck[j], deck[i]]; }
      if (deck[deck.length - 1] === idx) [deck[0], deck[deck.length - 1]] = [deck[deck.length - 1], deck[0]];
    }
    return deck.pop();
  };
  idx = draw();
  const $ = id => document.getElementById(id);
  const quiz = $('trivia');
  if (!quiz) return;
  function show() {
    const [t, q, opts, ans, ex] = Q[idx];
    quiz.style.setProperty('--c', `var(${C[t]})`);
    $('qTopic').textContent = L[t];
    $('qText').textContent = q;
    $('qExplain').hidden = true;
    $('qOpts').innerHTML = '';
    opts.forEach((o, i) => {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'opt'; b.textContent = o;
      b.addEventListener('click', () => {
        asked++; if (i === ans) right++;
        [...$('qOpts').children].forEach((x, j) => { x.disabled = true; if (j === ans) x.classList.add('right'); else if (j === i) x.classList.add('wrong'); });
        $('qExplain').textContent = (i === ans ? 'Doğru! ' : 'Cevap: ' + opts[ans] + '. ') + ex;
        $('qExplain').hidden = false;
        $('qScore').textContent = `${right} / ${asked} doğru`;
      });
      $('qOpts').appendChild(b);
    });
  }
  $('qNext').addEventListener('click', () => { idx = draw(); show(); });
  show();
})();




// Proje görünümü
(() => {
  const list = document.getElementById('projList');
  if (!list) return;
  const btns = document.querySelectorAll('.view-sw button');
  const set = n => {
    list.dataset.cols = n;
    btns.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.cols === n)));
  };
  try { const saved = localStorage.getItem('projCols'); if (saved === '1' || saved === '2') set(saved); } catch (e) {}
  btns.forEach(b => b.addEventListener('click', () => {
    set(b.dataset.cols);
    try { localStorage.setItem('projCols', b.dataset.cols); } catch (e) {}
  }));
})();
