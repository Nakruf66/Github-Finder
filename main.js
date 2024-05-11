var form = document.querySelector("form");
var main = document.querySelector("main");
console.log(main);
function renderProfile(data) {
  console.log(data);
  main.innerHTML = `
    <section id="left">
        <img
            src="${data.avatar_url}"
            alt=""
        />
        <a href="${data.html_url}">Profili Göster</a>
    </section>
    <section id="right">
        <div>
            <span>Açık Repolar:${data.public_repos}</span>
            <span>Açık Gistler:${data.public_gists}</span>
            <span>Takipçiler:${data.followers}</span>
            <span>Takip Edilenler:${data.following}</span>
        </div>
        <ul>
            <li>Hakkında: ${data.bio}</li>
            <li>Şirket:${data.company}</li>
            <li>Website:${data.blog}</li>
            <li>Konum: ${data.location}</li>
            <li>Hesap Oluşturma: ${new Date(
              data.created_at
            ).toLocaleDateString()}</li>
        </ul>
    </section>
  
  `;
}

function getUserData(olay) {
  olay.preventDefault(); // sayfanın yenilenmesini engeller
  var username = olay.target[0].value;

  // veritabanından kullanıcı bilgilerini alacağımız isteği dinamik bir şekilde gönderdik
  fetch(`https://api.github.com/users/${username}`)
    // istek başarılı olursa cevabı işle
    .then(function (res) {
      return res.json();
    })
    // veri js formatına çevrilirse
    .then(function (data) {
      renderProfile(data); // arayüzü ekrana bas
    });
}
/*
 * Forma gönderilme olayını izle ve
 * gönderildiğinde getUserData fonksiyonunu çalıştır.
 */
form.addEventListener("submit", getUserData);