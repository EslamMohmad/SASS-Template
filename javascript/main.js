//count the slider height
function sliderHeight() {
    const headerTop = $("header .top").innerHeight(),
      headerNavBar = $("header .nav-bar").innerHeight(),
      winHeight = $(window).innerHeight();
    const result = winHeight - (headerNavBar + headerTop);

    $("header .slider").css("height",result)
}
sliderHeight()
$(window).resize(function () {
    sliderHeight()
})

//click on search icon 
$(".fa-search.click").on("click", function () {
  $(".search-bar").fadeIn().css("display","flex")
})
//close search-bar
$(".fa-times").on("click", function () {
  $(".search-bar").fadeOut()
})

//click on menu icon
$(".float-menu .fa-bars").on("click", function () {
  $("header .hidden-nav-bar").animate({
    right: 0
  })
})

//when scroll 
$(window).on("scroll", function () {
  if ($(this).scrollTop() > $("header .top").innerHeight()) {
    $("header .nav-bar").attr("class","nav-bar active")
  } else {
    $("header .nav-bar").removeClass("active")
  }
})

function scrollTo(ele) {
  $(ele).on("click", function () {
    $(this).attr("class","active").siblings("li").removeAttr("class")
    let sectionPosition = $("." + $(this).text()).offset().top;
    $("html, body").animate({
      scrollTop: sectionPosition
    })
    if ($(ele).parent().hasClass("slideRight")) {
      $(this).parents(".hidden-nav-bar").animate({right:-$("header .hidden-nav-bar").innerWidth()})
    }
  })
}

scrollTo("header .hidden-nav-bar ul li")
scrollTo("header .nav-bar ul li:not(:last-child)")


$("header .hidden-nav-bar .fa-times").on("click", function () {
  $(this).parent().animate({
    right: 0
  })
})

$(window).on("click", function () {
  $(".search-bar").fadeOut()

  $("header .hidden-nav-bar").animate({
    right: -$("header .hidden-nav-bar").innerWidth()
  })
})

//stop propagation
function stopPropa(ele) {
  $(ele).on("click", function (e) {
    e.stopPropagation()
  })
}
stopPropa(".nav-bar .list")
stopPropa(".float-menu .fa-bars, header .hidden-nav-bar .list")

//slick slider
$("header .slider").slick({
  dots: true,
  infinite: true,
  speed: 700,
  slidesToShow: 1,
  arrows:false,
  autoplay:true
})