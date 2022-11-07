const yapilacaklarGiris = document.getElementById('yapilacaklarGiris'),
      yapilacaklaraEkleButon = document.getElementById('yapilacaklaraEkle'),
      clear = document.getElementById('clear'),
      alertPlaceholder = document.getElementById('anan'),
      yapilacaklarUl = document.getElementById('yapilacaklar');



const yapilacaklar = localStorage.getItem('yapilacaklar');

if (!yapilacaklar) localStorage.setItem('yapilacaklar', '[]');

yapilacaklarUlOlustur();

yapilacaklaraEkleButon.onclick = () => {
  const giris = yapilacaklarGiris;

  if (!giris.value.length) {
    alert('Boş bir iş ekleyemezsiniz!. Mola olarak düzeltilmiştir.','warning','Warning')
    giris.value = "Mola"
  } else if(giris.value.length){
    alert('Listeye Eklendi, daha fazla iş yapıp kendini geliştirmeye devam et!','success','Success')
  }


  yapilacaklaraEkle(giris.value);
  yapilacaklarUlOlustur();

  giris.value = '';
  giris.focus();
};
function yapilacaklarUlOlustur() {
  yapilacaklarUl.innerHTML = ''; // her olusturmada hali hazirda olanlarin uzerine eklememesi icin ul icerisini bosaltiyoruz.

  const yapilacaklar = localStorage.getItem('yapilacaklar'); // localstorage'den yapilacaklar array'ini aliyoruz, ve;
  JSON.parse(yapilacaklar).forEach(element => { // each dongusunden gecirerek eger yapilacak varsa elementleri olusturuyoruz
    const li = document.createElement('li'),
      silButon = document.createElement('span'),
      lidiv = document.createElement('div');
      silButon.classList.add("close");


    lidiv.addEventListener('click',function(element){
      complatetodo(element)
      yapilacaklarUlOlustur()
    });
    if(element.Complate == true){
      lidiv.classList.add("checked")
    } else {
      lidiv.classList.remove("checked")
    }

    li.className = element.elementId; // silme isleminin daha basit olmasi icin olduklari div'e essiz olusturulan class'i veriyoruz
    silButon.onclick = (el) => { // yapilacaklari teker teker silmek icin on
      yapilacakSil(el.target.parentElement.parentElement) // el.target butonu isaret ederken bize class'a sahip olan div gerekiyor.
                                            // parentElement buton elementinden onceki elementi veriyor ve silme islemini gerceklestirebiliyoruz
      yapilacaklarUlOlustur() // degisikliklerin hemen uygulanmasi icin yapilacaklari tekrar olusturuyorum.
    };
    lidiv.textContent = element.yapilacak; // li'nin icerigini yapilacak metin olarak ayarliyoruz

    
    silButon.textContent = ''; // silme butonuna bosluk ekliyorum
    lidiv.appendChild(silButon)
    li.appendChild(lidiv); // div'e hem li hem de silButon elementini ekliyorum
    yapilacaklarUl.appendChild(li); // tamamlanmis olan div'i ul'e ekliyorum.
  });
};

// arguman olarak yapilacak metni aliyoruz
function yapilacaklaraEkle(yapilacak) {
  const yapilacaklar = localStorage.getItem('yapilacaklar'), // su anki yapilacaklar listesini degiskene atayip;
    yapilacaklarDizi = JSON.parse(yapilacaklar), // array'i manipule edebilmek icin string'den obje'ye ceviriyorum ve degiskene atiyorum
    essizId = essizIdOlustur(); // bu fonksiyon ile zahmet olmadan essiz bir element idsi olusturuyorum

  yapilacaklarDizi.push({
    yapilacak: yapilacak,
    elementId: essizId,
    Complate: false
  }); // yapilacaklarDizi bir array, ve bu array icine yapilacagi ve olusacak olan elementin essiz bir idsini obje olarak gonderiyorum

  localStorage.setItem('yapilacaklar', JSON.stringify(yapilacaklarDizi)) // localstorage'deki yapilacaklar anahtarini yeni ekledigimiz yapilacak sey olan array ile degisiyorum
};


 // yapilacaklardan birini silmek icin. elementi arguman olarak aliyoruz cunku bize silecegimiz elementin class'i lazim
function yapilacakSil(element) {
  const yapilacaklar = localStorage.getItem('yapilacaklar'), // su anki yapilacaklar listesini degiskene atayip;
    yapilacaklarDizi = JSON.parse(yapilacaklar), // array'i manipule edebilmek icin string'den obje'ye ceviriyorum ve degiskene atiyorum
    yeniDizi = yapilacaklarDizi.filter(el => el.elementId !== element.className); 

  localStorage.setItem('yapilacaklar', JSON.stringify(yeniDizi)); // degisiklik yapilmis diziyi JSON.stringify ile string haline getirip yapilacaklar listesini yeni dizi ile degisiyorum.
};

  // essiz bir id olusturmak icin. her calismada farkli bir id verecek.
function essizIdOlustur() {
  return (Math.random() + 1).toString(36).substring(7);
}


function complatetodo(element){
  const yapilacaklar = localStorage.getItem('yapilacaklar'),
    yapilacaklarDizi = JSON.parse(yapilacaklar),
    liclasselement = element.target.parentElement,
    bireksikdizi = yapilacaklarDizi.filter(el => el.elementId !== liclasselement.className),
    tekdizi = yapilacaklarDizi.filter(el => el.elementId === liclasselement.className);
  
  if(tekdizi[0].Complate == false){
    tekdizi[0].Complate = true
  } else {
    tekdizi[0].Complate = false
  }
  
  var tamdizi = bireksikdizi.concat(tekdizi);
  

  localStorage.setItem('yapilacaklar', JSON.stringify(tamdizi));
};


const alert = (message, type, Type) => {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <svg class="bi flex-shrink-0 me-2" role="img" aria-label="${Type}:"><use xlink:href="#${type}"/></svg>`,
    `   <p class="alert-text">${message}</p>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')

  alertPlaceholder.append(wrapper)
};
