(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const h1 = document.getElementById('name');
  h1.innerHTML = h1.textContent.toLocaleUpperCase('tr').split(' ').map(w =>
    `<span class="word" aria-hidden="true">${[...w].map(c => `<span class="tile" data-c="${c}">${c}</span>`).join('')}</span>`).join('');
  // Tabela animasyonu sadece ana sayfada
  const onHome = document.getElementById('home') && !location.hash.slice(1);
  if (!reduce && onHome) {
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
    ['uzay', 'Güneş Sistemi\'nin bilinen en büyük volkanı nerededir?', ['Venüs', 'Mars', 'Io'], 1, 'Mars\'taki Olympus Mons; yüksekliği Everest\'in yaklaşık 2,5 katı.']
  ];
  const day = Math.floor(Date.now() / 86400000);
  let idx = day % Q.length, asked = 0, right = 0, first = true;
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
    quiz.querySelector('.quiz-head span:last-child').textContent = first ? 'Günün sorusu' : 'Soru';
  }
  $('qNext').addEventListener('click', () => { first = false; idx = (idx + 1) % Q.length; show(); });
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
