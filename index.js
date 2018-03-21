const YOUTUBE_SEARCH_URL = "https://www.googleapis.com/youtube/v3/search";
const KEY = "AIzaSyADCacCtTB9ncoZOLEYN48LsUoMktKHgRQ";

function retrieveDataFromApi(searchTerm, callback){
  //console.log("Retrieve data from api ran");
  $.ajax({
    url: YOUTUBE_SEARCH_URL,
    data: {
      q: `${searchTerm}`,
      key: KEY,
      part: 'snippet',
      //fields: 'snippet/title',
      per_page: 5
    },
    type: "GET",
    dataType: "json",
    success: callback
  });
}

function renderThumbnails(results){
  //console.log("Display thumbnails ran");
  return`
    <div class="each-result">
      <p class="lightboxHandler" data-title="${results.snippet.title}" data-videoid="${results.id.videoId}">${results.snippet.title}

        <img src=${results.snippet.thumbnails.medium.url} alt=${results.snippet.description} class="js-thumb">
      
      </p>
      <a class="channel-link" href="https://www.youtube.com/channel/${results.snippet.channelId}" target="_blank">More from this channel</a>
     </div>`;
}

function displayThumbnails(data){
  const results = data.items.map((item, index) =>
  renderThumbnails(item));
  $('.search-title').html(`<h2>Results</h2>`);
  $('.search-thumbnails').html(results);
}

function handleSubmit(){
  $('.js-search-form').submit(event => {
    event.preventDefault();
    let searchTerm = $(event.currentTarget).find('.js-query').val();
    $(event.currentTarget).find('.js-query').val("");
    retrieveDataFromApi(searchTerm, displayThumbnails);
  });
}

function handleLightbox(){
  $('.js-search-results').on('click', '.lightboxHandler', function(event) {
    let videoId = $(event.currentTarget).data("videoid");
    $('.lightbox-video').attr('src', `https://www.youtube.com/embed/${videoId}`);
    showLightbox();
  });
}


function showLightbox(){
  $('.lightbox').addClass('active');
  $('.overlay').addClass('active');
}

function handleCloseLightbox(){
  $('.overlay').on('click', function() {
    hideLightbox();
  })
}

function hideLightbox(){
  $('.lightbox').removeClass('active');
  $('.overlay').removeClass('active');
  $('.lightbox-video').attr('src', '');
}

//lightboxHandler();
handleSubmit();
handleLightbox();
handleCloseLightbox();