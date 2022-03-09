const elementById = (id) => {
  return document.getElementById(id);
};

const defaultPic = "https://www.salisburyut.com/wp-content/uploads/2020/09/avatar-1-1536x1536.jpeg"
const keyword = elementById("keyword");
const handleSearch = () => {
  if (keyword.value) {

    const url = `https://theaudiodb.com/api/v1/json/2/search.php?s=${keyword.value}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => showArtists(data));
  }

};

const showArtists = (data) => {
  keyword.value = ''
  const artistContainer = elementById("artists");
  if (data.artists === null) {
    artistContainer.innerHTML = `<h1 style="color: red;"> No data found </h1>`
    return
  } else {
    artistContainer.textContent = ''
    data?.artists?.forEach((artist) => {
      const div = document.createElement("div");
      div.classList.add("artist-card");
      div.innerHTML = `<div class="image-container">
      <div class="image-container-inner">
        <img
          src="${artist.strArtistThumb ? artist.strArtistThumb : defaultPic}"
          alt=""
        />
      </div>
    </div>
    <div class="info-container">
      <h1>${artist.strArtist}</h1>
      <p>Country: ${artist.strCountry ? artist.strCountry : "<i> No data found </i>"}</p>
      <p>Style: ${artist.strGenre ? artist.strGenre : "<i> No data found </i>"}</p>
    </div>
    <button class="album-button">
      <i class="fa-solid fa-compact-disc"></i>
      <p onclick="fetchAlbums('${artist.idArtist}')" class="button-title">Albums</p>
    </button>`;
      artistContainer.appendChild(div);
    });
  }

};

const fetchAlbums = (id) => {
  const url = `https://www.theaudiodb.com/api/v1/json/2/album.php?i=${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showAlbum(data));
  const artistContainer = elementById("artists");
  artistContainer.innerHTML = "";
};

const showAlbum = ({ album }) => {
  const albumContainer = elementById("albums");
  album.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("album");
    div.innerHTML = `
        <div class="album-image-container">
          <img
            src="${item.strAlbumThumb ? item.strAlbumThumb : defaultPic}"
            alt=""
          />
        </div>
        <div class="album-name">
          <h3>${item.strAlbum}</h3>
        </div>
      `;

    albumContainer.appendChild(div);
  });
};


function changeDir(params) {
  location.pathname = '/'
}