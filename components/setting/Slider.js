import { SliderArrow } from "../Home/FeatureTokenSlider";
export const settings = {
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  initialSlide: 0,
  adaptiveHeight: 300,
  responsive: [
    {
      breakpoint: 1900,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 1600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
      },
    },
  ],
};

export const carouselCollection = {
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1900,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 1600,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
      },
    },
  ],
};

export const carouselCollectionSingle = {
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  initialSlide: 0,
  adaptiveHeight: 300,
  responsive: [
    {
      breakpoint: 1900,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 1600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
      },
    },
  ],
};

export const carouselNew = {
  // speed: 500,
  // adaptiveHeight: 400,
  // slidesToShow: 1,
  // slidesToScroll: 1,
  // rows: 2,
  // slidesPerRow: 5,
  // initialSlide: 0,
  // responsive: [
  //   {
  //     breakpoint: 1900,
  //     settings: {
  //       slidesToShow: 1,
  //       slidesToScroll: 1,
  //       initialSlide: 0,
  //       rows: 2,
  //       slidesPerRow: 5,
  //       infinite: true,
  //     },
  //   },
  //   {
  //     breakpoint: 1400,
  //     settings: {
  //       slidesToShow: 1,
  //       slidesToScroll: 1,
  //       rows: 2,
  //       slidesPerRow: 4,
  //       infinite: true,
  //     },
  //   },
  //   {
  //     breakpoint: 1200,
  //     settings: {
  //       slidesToShow: 1,
  //       slidesToScroll: 1,
  //       rows: 2,
  //       slidesPerRow: 3,
  //       infinite: true,
  //     },
  //   },
  //   {
  //     breakpoint: 992,
  //     settings: {
  //       slidesToShow: 1,
  //       slidesToScroll: 1,
  //       rows: 1,
  //       slidesPerRow: 2,
  //       initialSlide: 2,
  //     },
  //   },
  //   {
  //     breakpoint: 480,
  //     settings: {
  //       slidesToShow: 1,
  //       slidesToScroll: 1,
  //       rows: 1,
  //       slidesPerRow: 1,
  //     },
  //   },
  // ],
  // dots: false,
  // // infinite: false,
  // speed: 500,
  // slidesToShow: 3,
  // slidesToScroll: 3,
  // initialSlide: 0,
  // responsive: [
  //   {
  //     breakpoint: 1024,
  //     settings: {
  //       slidesToShow: 2,
  //       slidesToScroll: 2,
  //       initialSlide: 2,
  //     },
  //   },
  // ],

  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 5,

  rows: 2,
  centerMode: false,
  initialSlide: 0,
  nextArrow: <SliderArrow arrow="left" />,
  prevArrow: <SliderArrow arrow="right" />,
  responsive: [
    // 601 to 1024
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
        infinite: false,
        dots: false,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
  ],
};
