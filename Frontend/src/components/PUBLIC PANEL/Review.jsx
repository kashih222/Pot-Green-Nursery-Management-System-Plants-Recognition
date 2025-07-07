
import React from 'react'
import { FaQuoteRight } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";



const Review = () => {
  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

    let data=[
        {
          "id": 1,
          "Name": "Muhammad Kashaf",
          "Passion": "Student",
          "Review": "Muhammad Kashaf Student of BSIT in Govt Islamis College Civil Line Lahore.",
          "Image": "src/assets/img/KashafProfile.jpeg"
        },
        {
          "id": 2,
          "Name": "Sheharyar",
          "Passion": "Student",
          "Review": "Shaharyar Student of BSIT in Govt Islamis College Civil Line Lahore.",
          "Image": "src/assets/img/Sheharyar.jpeg"
        },
        {
          "id": 3,
          "Name": "Ammar Shoukat",
          "Passion": "Student",
          "Review": "Ammar Shoukat urf Penda Student of BSIT in Govt Islamis College Civil Line Lahore.",
          "Image": "src/assets/img/Ammar.jpeg"
        },
        {
          "id": 4,
          "Name": "Sohail Khan",
          "Passion": "Wireless Operator",
          "Review": "Sohail Khan on duty as Wireless Operator in Narowal central jail.",
          "Image": "src/assets/img/Sohail.jpeg"
        }
      ]
      

  return (
    <div>
      <section id='review' className='bg-green-950 relative overflow-hidden'>
        <div className='absolute -top-8 -left-16 opacity-50 '>
          <img src="src/assets/img/leaf-4.png" alt="leaf_4" className='w-40 md:w-52 xl:w-64 ' />
        </div>
         <div className='flex flex-col items-center gap-3 text-center mb-10 md:mb-20 font-Jost'>
             <h2 className='tittle'>Customer Review</h2>
             <p className='max-w-2xl '>Follow instruction for more</p>
         </div>

            <div className='container '>
                <div className='py-12'>
                  <Slider {...settings}>
                    {data.map((d)=>(
                       <div key={d.id}>
                         <ul>
                            <li>
                                <div className='flex flex-col gap-5 bg-green-900 rounded-md py-6 px-6 '>
                                    <p className='font-Abel '>
                                        {d.Review}
                                    </p>
                        
                                    <div className='flex items-center '>
                                        <img src={d.Image} alt="review_image" className='w-12 h-12 rounded-full' />
                                        <div className='ml-2 '>
                                            <p className=' text-yellow-500 uppercase '>{d.Name}</p>
                                            <p>{d.Passion}</p>
                                        </div>
                                        <FaQuoteRight className='text-4xl ml-auto '/>
                                    </div>
                        
                                </div>
                            </li>
                        </ul>
                       </div>
                    ))}
                  </Slider>
                </div>
            </div>
      </section>

    </div>
  )
}

  

export default Review
