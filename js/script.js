// scrolling animation
var scroll = window.requestAnimationFrame ||
      function(callback){ window.setTimeout(callback, 1000/60)};

function loop() {
  let largeHeading = document.getElementsByTagName("h1")[0];
  let smallHeading = document.getElementsByTagName("h2")[0];
  let festLogo = document.getElementsByClassName("capstone-fest-logo")[0];
  if (window.scrollY > window.innerWidth*.3) {
    smallHeading.style.opacity = 2*(window.scrollY-window.innerWidth*.3)/window.innerWidth/.3;
    festLogo.className = "capstone-fest-logo hidden";
    largeHeading.className = "hidden";
    smallHeading.className = "";
  } else {
    festLogo.style.opacity = (window.innerWidth*.3-window.scrollY)/window.innerWidth/.3;
    festLogo.className = "capstone-fest-logo";
    largeHeading.className = "";
    smallHeading.className = "hidden";
    largeHeading.style.opacity = (window.innerWidth*.3-window.scrollY)/window.innerWidth/.3;
  }
  scroll(loop);
}

loop();

class Tile {
  constructor(type, order, title, subtitle, description, link, image, tags) {
    this.type = type;
    this.order = order;
    this.title = title;
    this.subtitle = subtitle;
    this.description = description;
    this.link = link;
    this.image = image;
    this.tags = tags;
    this.status = "";
  }
}

var app = new Vue({
  el: '#app',
  data: {
    search: '',
    searchInputVisible: false,
    tiles: [],
    tilesFilteredByTag: [],
    majors: [],
    activeTag: '',
    isSignedIn: null
  },
  methods: {
    filterTilesByTag: function(selectedTag) {
      this.activeTag = selectedTag;
      this.tilesFilteredByTag = this.tiles.filter(function (tile) {
        if (selectedTag) {
          if (tile.tags) {
            for (tag of tile.tags) {
              if (tag.toLowerCase() === selectedTag.toLowerCase()) {
                return true;
              }
            }
          }
          return false;
        } else {
          return true;
        }
      });
      window.scrollTo(0, window.innerWidth*.48);
    },
    onSearchEnter: function(el) {
      window.scrollTo(0, window.innerWidth*.48);
      el.children[0].focus();
    },
    removeFilters: function() {
      this.search = '';
      this.tilesFilteredByTag = this.tiles;
      this.activeTag = '';
    }
  },
  computed: {
    filteredVideoTiles: function() {
      return this.tilesFilteredByTag.filter(tile => {
        if (tile.type === "video") {
          if (tile.title.toLowerCase().includes(this.search.toLowerCase()) ||
              tile.subtitle.toLowerCase().includes(this.search.toLowerCase()) ||
              tile.type.toLowerCase().includes(this.search.toLowerCase()) ||
              tile.description.toLowerCase().includes(this.search.toLowerCase())) {
            return true;
          } else if (tile.tags) {
            for (tag of tile.tags) {
              if (tag.toLowerCase().includes(this.search.toLowerCase())) {
                return true;
              }
            }
          }
        }
        return false;
      });
    },
    filteredLiveTiles: function() {
      return this.tilesFilteredByTag.filter(tile => {
        if (tile.type === "live") {
          if (tile.title.toLowerCase().includes(this.search.toLowerCase()) ||
              tile.subtitle.toLowerCase().includes(this.search.toLowerCase()) ||
              tile.type.toLowerCase().includes(this.search.toLowerCase()) ||
              tile.description.toLowerCase().includes(this.search.toLowerCase())) {
            return true;
          } else if (tile.tags) {
            for (tag of tile.tags) {
              if (tag.toLowerCase().includes(this.search.toLowerCase())) {
                return true;
              }
            }
          }
        }
        return false;
      });
    },
    filteredRecordedTiles: function() {
      return this.tilesFilteredByTag.filter(tile => {
        if (tile.type === "recorded") {
          if (tile.title.toLowerCase().includes(this.search.toLowerCase()) ||
              tile.subtitle.toLowerCase().includes(this.search.toLowerCase()) ||
              tile.type.toLowerCase().includes(this.search.toLowerCase()) ||
              tile.description.toLowerCase().includes(this.search.toLowerCase())) {
            return true;
          } else if (tile.tags) {
            for (tag of tile.tags) {
              if (tag.toLowerCase().includes(this.search.toLowerCase())) {
                return true;
              }
            }
          }
        }
        return false;
      });
    },
    filteredBookTiles: function() {
      return this.tilesFilteredByTag.filter(tile => {
        if (tile.type === "book") {
          if (tile.title.toLowerCase().includes(this.search.toLowerCase()) ||
              tile.subtitle.toLowerCase().includes(this.search.toLowerCase()) ||
              tile.type.toLowerCase().includes(this.search.toLowerCase()) ||
              tile.description.toLowerCase().includes(this.search.toLowerCase())) {
            return true;
          } else if (tile.tags) {
            for (tag of tile.tags) {
              if (tag.toLowerCase().includes(this.search.toLowerCase())) {
                return true;
              }
            }
          }
        }
        return false;
      });
    },
    filteredProjectTiles: function() {
      if (this.searchInputVisible) {
        window.scrollTo(0, window.innerWidth*.48);
      }
      return this.tilesFilteredByTag.filter(tile => {
        if (tile.type === "project") {
          if (tile.title.toLowerCase().includes(this.search.toLowerCase()) ||
              tile.subtitle.toLowerCase().includes(this.search.toLowerCase()) ||
              tile.type.toLowerCase().includes(this.search.toLowerCase()) ||
              tile.description.toLowerCase().includes(this.search.toLowerCase())) {
            return true;
          } else if (tile.tags) {
            for (tag of tile.tags) {
              if (tag.toLowerCase().includes(this.search.toLowerCase())) {
                return true;
              }
            }
          }
        }
        return false;
      });
    }
  }
})

// Client ID and API key from the Developer Console
var CLIENT_ID = '872432590149-9njmctf5n0dqarh2d8b53suggj50rnvg.apps.googleusercontent.com';
var API_KEY = 'AIzaSyDMDqqNf2u8kLYubDhJ_rNYV1Qai_FWZPU';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/userinfo.profile";

var authorizeButton = document.getElementById('login');
var signoutButton = document.getElementById('logout');
var loginPage = document.getElementById('signin-page');
var mainPage = document.getElementById('app');

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
  gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
  }).then(function () {
    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state.
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
  }, function(error) {
    appendPre(JSON.stringify(error, null, 2));
  });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    app.isSignedIn = true;
    loadData();
  } else {
    app.isSignedIn = false;
    removeData();
  }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}

/**
 * Append a pre element to the body containing the given message
 * as its text node. Used to display the results of the API call.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message) {
  console.log("Google API: "+message);
}

/**
 * Print the names and majors of students in a sample spreadsheet:
 * https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 */

function removeData() {
  app.tiles = [];
  app.tilesFilteredByTag = [];
  app.majors = []
}

function updateCountdown(tile) {
  var goal = new Date(tile.subtitle);
  var timezone = 4;
  var now = new Date();
  var timediff = goal - now - timezone * 60 * 60 * 1000 - now.getTimezoneOffset() * 60 * 1000;
  var duration = tile.image;
  var a = duration.split(':');
  var durationInMillis = 0;
  if (a.length === 3) {
     durationInMillis = 1000 * ((+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]));
  }
  if (timediff > 0) {
    tile.status = "Starts in " + millis2time(timediff);
  } else if (-timediff > durationInMillis) {
    tile.status = "Ended";
    tile.order = (app.tiles.length+tile.order).toString();
  } else {
    tile.status = "Live Now";
    tile.order = '-1';
  }
  setTimeout(updateCountdown, 1000, tile);
}

function millis2time(timeInMillis) {
  var pad = function(num, size) { return ('000' + num).slice(size * -1); };
  var time = parseInt(timeInMillis);
  var hours = Math.floor(time / 60 / 60 / 1000);
  var minutes = Math.floor(time / 60 / 1000) % 60;
  var seconds = Math.floor(time / 1000 % 60);
  return hours + ':' + pad(minutes, 2) + ':' + pad(seconds, 2);
}

function loadData() {
  Tabletop.init( {
    key: 'https://docs.google.com/spreadsheets/d/1x0_wAVJ86WC1WAQOYweKGUDwWJuMe9q0P7zHRvbpVRA/edit?usp=sharing',
    simpleSheet: false }
  ).then(function(data, tabletop) {

    const sheetNames = ["Projects", "Videos", "Live Events", "Recorded Events", "Archival Book"];
    let tiles = [];

    // loading projects
    let majors = [];
    let projectsData = data[sheetNames[0]].elements;
    for (let i = 0; i < projectsData.length; i++) {
      tiles.push(new Tile('project',
        projectsData[i]['Order'] ? projectsData[i]['Order'] : "",
        projectsData[i]['Title'] ? projectsData[i]['Title'] : "",
        projectsData[i]['Preferred Name'] ? projectsData[i]['Preferred Name'] : (projectsData[i]['First Name'] ? projectsData[i]['First Name'] + " ": "")+(projectsData[i]['Last Name'] ? projectsData[i]['Last Name'] : ""),
        projectsData[i]['Description'] ? projectsData[i]['Description'] : "",
        projectsData[i]['Link'] ? projectsData[i]['Link'] : "",
        projectsData[i]['Image Link'] ? projectsData[i]['Image Link'] : "",
        projectsData[i]['Tags'] ? projectsData[i]['Tags'].split(', ') : []));
      if (!majors.some(major => major.name === projectsData[i]['Major'])) {
        majors.push({ name: projectsData[i]['Major'] });
      }
    }
    app.majors = majors;

    // loading live events
    let liveEventsData = data[sheetNames[2]].elements;
    for (let i = 0; i < liveEventsData.length; i++) {
      tiles.push(new Tile('live',
        liveEventsData[i]['Order'] ? liveEventsData[i]['Order'] : '',
        liveEventsData[i]['Title'] ? liveEventsData[i]['Title'] : '',
        liveEventsData[i]['Time'] ? liveEventsData[i]['Time'] : '',
        liveEventsData[i]['Description'] ? liveEventsData[i]['Description'] : '',
        liveEventsData[i]['Link'] ? liveEventsData[i]['Link'] : '',
        liveEventsData[i]['Duration'] ? liveEventsData[i]['Duration'] : '',
        liveEventsData[i]['Tags'] ? liveEventsData[i]['Tags'].split(', ') : []));
    }

    // loading recorded events
    let recordedEventsData = data[sheetNames[3]].elements;
    for (let i = 0; i < recordedEventsData.length; i++) {
      tiles.push(new Tile('recorded',
        recordedEventsData[i]['Order'] ? recordedEventsData[i]['Order'] : '',
        recordedEventsData[i]['Title'] ? recordedEventsData[i]['Title'] : '',
        recordedEventsData[i]['Time'] ? recordedEventsData[i]['Time'] : '',
        recordedEventsData[i]['Description'] ? recordedEventsData[i]['Description'] : '',
        recordedEventsData[i]['Link'] ? recordedEventsData[i]['Link'] : '',
        '',
        recordedEventsData[i]['Tags'] ? recordedEventsData[i]['Tags'].split(', ') : []));
    }

    // loading videos
    let videoData = data[sheetNames[1]].elements;
    for (let i = 0; i < videoData.length; i++) {
      tiles.push(new Tile('video',
        videoData[i]['Order'] ? videoData[i]['Order'] : '',
        videoData[i]['Title'] ? videoData[i]['Title'] : '',
        '',
        videoData[i]['Description'] ? videoData[i]['Description'] : '',
        videoData[i]['Video Link'] ? videoData[i]['Video Link'] : '',
        videoData[i]['Cover Link'] ? videoData[i]['Cover Link'] : '',
        videoData[i]['Tags'] ? videoData[i]['Tags'].split(', ') : []));
    }

    // loading archival book
    let bookData = data[sheetNames[4]].elements;
    for (let i = 0; i < bookData.length; i++) {
      tiles.push(new Tile('book',
        bookData[i]['Order'] ? bookData[i]['Order'] : '',
        bookData[i]['Title'] ? bookData[i]['Title'] : '',
        '',
        '',
        bookData[i]['Book Link'] ? bookData[i]['Book Link'] : '',
        bookData[i]['Image Link'] ? bookData[i]['Image Link'] : '',
        bookData[i]['Tags'] ? bookData[i]['Tags'].split(', ') : []));
    }

    app.tiles = tiles;
    app.tilesFilteredByTag = tiles;
    window.scrollTo(0,0);

    for (tile of app.tiles) {
      if (tile.type === "live") {
        updateCountdown(tile);
      }
    }
  })
}
