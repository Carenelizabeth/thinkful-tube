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
  return`
    <div class="each-result">
      <a class="lightboxHandler" onclick="handleLightbox('${results.id.videoId}'); return false;" href="#">${results.snippet.title}
        <img src=${results.snippet.thumbnails.medium.url} alt=${results.snippet.description} class="js-thumb">    
      </a>
      <a class="channel-link" href="https://www.youtube.com/channel/${results.snippet.channelId}" target="_blank">More from this channel</a>
     </div>`;
}

function displayThumbnails(data){
  const results = data.items.map((item, index) =>
  renderThumbnails(item));
  $('.search-title').html(`<h2>Top 5 Results</h2>`);
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

function handleLightbox(videoId){
    console.log("Handle lightbox ran");
    $('.lightbox-video').attr('src', `https://www.youtube.com/embed/${videoId}`);
    showLightbox();
}


function showLightbox(){
  console.log("show lightbox ran")
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

function escKeyHandler(){
  $(document).on('keyup', function(event){
    if (event.keyCode == 27){
      hideLightbox();
    }
  });
}


//lightboxHandler();
escKeyHandler();
handleSubmit();
handleCloseLightbox();

//https://www.youtube.com/watch?v=${results.id.videoId}