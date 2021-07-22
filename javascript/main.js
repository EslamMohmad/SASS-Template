//count the slider height
function sliderHeight() {
    const headerTop = $(".top").innerHeight(),
      headerNavBar = $(".nav-bar").innerHeight(),
      winHeight = $(window).innerHeight();
    const result = winHeight - (headerNavBar + headerTop);

    $(".slider-one").css("height", result)
}
sliderHeight()
$(window).resize(function () {
    sliderHeight()
})

//click on search icon 
$(".nav-bar .fa-search.click").on("click", function () {
  $(".nav-bar .search-bar").fadeIn().css("display","flex")
})
//close search-bar
$(".nav-bar .fa-times").on("click", function () {
  $(".search-bar").fadeOut()
})

//click on menu icon
$(".nav-bar .float-menu .fa-bars").on("click", function () {
  $(".hidden-nav-bar").animate({
    right: 0
  })
})

//nav-bar section
function scrollTo(ele) {
  $(ele).on("click", function () {
    $(this).attr("class","active").siblings("li").removeAttr("class")
    let sectionPosition = $("." + $(this).text()).offset().top;
    $("html, body").animate({
      scrollTop: sectionPosition - $(".nav-bar").innerHeight()
    })
    if ($(ele).parent().hasClass("slideRight")) {
      $(this).parents(".hidden-nav-bar").animate({right:-$(".hidden-nav-bar").innerWidth()})
    }
  })  
}
scrollTo(".hidden-nav-bar ul li")
scrollTo(".nav-bar ul li:not(:last-child)")

//close nav-bar
$(".hidden-nav-bar .fa-times").on("click", function () {
  $(this).parent().animate({
    right: -$(this).parent().innerWidth()
  })
})

//when click on screen
$(window).on("click", function () {
  $(".search-bar").fadeOut()

  $(".hidden-nav-bar").animate({
    right: -$(".hidden-nav-bar").innerWidth()
  })
})

//coloring nav-bar items when scroll
$(window).on("scroll", function () {
  let element = $(".nav-bar .list li:not(:last-child)");
  $(".parent-section").each(function () {
    if ($(window).scrollTop() > $(this).offset().top - 200) {
      let eleId = $(this).attr("id");
      function navList(target) {
        $(target + " .list li[data-scroll='" + eleId +"']:not(:last-child)")
        .attr("class","active")
      .siblings().removeAttr("class")
      }
      navList(".nav-bar")
      navList(".hidden-nav-bar")
    }
  })
})

//stop propagation
function stopPropa(ele) {
  $(ele).on("click", function (e) {
    e.stopPropagation()
  })
}
stopPropa(".nav-bar .list")
stopPropa(".nav-bar .float-menu .fa-bars, .hidden-nav-bar .list")

//slick-one slider
$(".slider-one").slick({
  dots: true,
  infinite: true,
  speed: 700,
  slidesToShow: 1,
  arrows:false,
  autoplay:true
})

$(".slider-two").slick({
  slidesToShow: 3,
  arrows:true,
  appendArrows:$(".team"),
  nextArrow:"<i class='fas fa-angle-right'></i>",
  prevArrow:"<i class='fas fa-angle-left'></i>",
  autoplay:true,
  centerMode: true,
  centerPadding: '0px',
  focusOnSelect:true,
  responsive: [
    {
      breakpoint:992,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint:660,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
})
$(".slider-two .slick-active").eq("1").attr("data-hover","hover")
.siblings().removeAttr("data-hover")
//get data from json file
const myData = new XMLHttpRequest();
myData.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    const obj = JSON.parse(this.response);
    let htmlContnet = "";
    const comment = "<!--content created by {js, ajax, json}-->";
    for (let i = 0; i < obj.length; i++) {
      htmlContnet += 
      `<div class="bord">
        <img src="${obj[i].src}">
        <h3>${obj[i].h3}</h3>
        <p>${obj[i].p}</p>
      </div>`
      $(".services .grid").html(comment + htmlContnet)
    }
  }
}
myData.open("GET","javascript/myData.json")
myData.send()

//slide up/down FAQ section
$(".FAQ .slide-down .bord").on("click", function () {
    $(this).find(".fas").toggleClass("fa-plus fa-minus")
    .parents(".bord").siblings().find(".fas").attr("class","fas fa-plus")
    $(this).find(".slide-txt").slideToggle()
    .parents(".bord").siblings().find(".slide-txt").slideUp()
})