import catNameGenerator from './catlist.js';

let catnames = {};

function init() {
  document.getElementById('btnSearch').addEventListener('click', handleSearch);

  // you need to check in localstorage for the cat name object
  const storage = localStorage.getItem('catnames-pace0033');
  if (storage) {
    catnames = JSON.parse(storage);
  }
}

function handleSearch(ev) {
  ev.preventDefault();

  const url =
    'https://api.thecatapi.com/v1/images/search?api_key=live_X3Ve6rPvnTm0lGEnp1Zr3quzx6ajb97T9hb2cRkelhmKXlpsUliB8OuEwr1aPFzJ&limit=10';

  // fetch data from the Cat API
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      generateNames(data);
    })
    .catch((err) => console.error(err));
}

function generateNames(catsArr) {
  catsArr.forEach((cat) => {
    // for each cat entry, generate a random name
    // store that pairing in localstorage
    const id = cat.id;
    const name = catNameGenerator();

    // assign the id and name into catnames object
    catnames[id] = name;
  });
  console.log(catnames);
  saveToLocalStorage();
}

function saveToLocalStorage() {
  // store this object in localstorage
  // with key name catnames-pace0033
  localStorage.setItem('catnames-pace0033', JSON.stringify(catnames));
}

/* DATA SHAPE FOR LOCALSTORAGE 
let catnames = {
  ab12: 'Muffin',
  df34: 'Willow',
  e766: 'Mr Boots',
};
*/

document.addEventListener('DOMContentLoaded', init);
