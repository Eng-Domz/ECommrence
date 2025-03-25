import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import S1 from "../assets/S1.jpeg"
import S2 from "../assets/S2.jpeg"
import S3 from "../assets/S4.jpeg"
import G1 from "../assets/G1.png"
import G2 from "../assets/G2.jpeg"

export default function MainSlider() {
    var settings = {
        dots: false,
        infinite: true,
        arrows: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: true,
        autoplaySpeed: 1300,
        cssEase: "cubic-bezier(0.600, -0.280, 0.735, 0.045)",
        // responsive: [
        //   {
        //     breakpoint: 1024,
        //     settings: {
        //       slidesToShow: 3,
        //       slidesToScroll: 3,
        //     }
        //   },
        //   {
        //     breakpoint: 600,
        //     settings: {
        //       slidesToShow: 2,
        //       slidesToScroll: 2,
        //       initialSlide: 2
        //     }
        //   },
        //   {
        //     breakpoint: 480,
        //     settings: {
        //       slidesToShow: 1,
        //       slidesToScroll: 1
        //     }
        //   }
        // ]
      }


    return (
    <div className="flex w-full overflow-hidden ">
        <div className="w-2/3">
        <Slider {...settings}>
        <div>
            <img className="object-cover w-full max-w-full h-[400px] " src={S1} alt="" />
        </div>
        <div>
            <img className="object-cover w-full max-w-full h-[400px] " src={S2} alt="" />
        </div>
        <div>
            <img className="object-cover w-full max-w-full h-[400px] " src={S3} alt="" />
        </div>
        </Slider>
        </div>
        <div className="w-1/3 flex flex-col">
            <img className="object-cover h-[200px] w-full max-w-full" src={G1} alt="" />
            <img className="object-cover h-[200px] w-full max-w-full" src={G2} alt="" />
        </div>


    </div>
  )
}
