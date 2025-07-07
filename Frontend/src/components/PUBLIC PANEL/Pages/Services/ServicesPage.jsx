import React from 'react'
import { FaTruck, FaHeadphones } from "react-icons/fa";
import { PiPottedPlantBold } from "react-icons/pi";
import { GrMoney } from "react-icons/gr";
import { FaTree } from "react-icons/fa6";
import { FaCut } from "react-icons/fa";
import { GiTumbleweed } from "react-icons/gi";
import { GiCactusPot } from "react-icons/gi";

const ServicesPage = () => {
  return (
   <div className='bg-white text-green-900 py-40'>
           <div className='container w-full grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 '>
               {/* card1 */}
               <div className='border border-green-900 p-5  cursor-pointer rounded-md hover:shadow-2xl
                hover:-translate-y-1 duration-300 space-y-5'>
                   <div className='flex items-center gap-5 '>
                       <FaTruck className='text-3xl md:text-4xl xl:text-5xl ' />
                       <p className='md:text-lg font-bold '>Fast <br/>
                       Delivery</p>
                   </div>
                   <p className='font-Jost'>At Pot Green, we ensure quick and reliable delivery so you can enjoy fresh, healthy plants without any delays. Our efficient logistics guarantee that your plants arrive in perfect condition, ready to brighten your space. Order now and experience hassle-free, fast delivery! 🌱✨</p>
               </div>
                 {/* card2 */}
                 <div className='border border-green-900 p-5  cursor-pointer rounded-md hover:shadow-2xl
                  hover:-translate-y-1 duration-300 space-y-5'>
                     <div className='flex items-center gap-5 '>
                         <FaHeadphones className='text-3xl md:text-4xl xl:text-5xl ' />
                         <p className='md:text-lg font-bold '>Great Customer <br/>
                         Service</p>
                     </div>
                     <p className='font-Jost'>At Pot Green, we are committed to providing exceptional customer service. Whether you need plant care advice, order assistance, or product recommendations, our friendly team is always ready to help. Your happiness is our priority—because every plant and every customer matters! 🌿😊</p>
                 </div>
   
                   {/* card3 */}
                   <div className='border border-green-900 p-5  cursor-pointer rounded-md hover:shadow-2xl
                  hover:-translate-y-1 duration-300 space-y-5'>
                     <div className='flex items-center gap-5 '>
                         <PiPottedPlantBold  className='text-3xl md:text-4xl xl:text-5xl ' />
                         <p className='md:text-lg font-bold '>Original <br/>
                         Plants</p>
                     </div>
                     <p className='font-Jost'>At Pot Green, we take pride in offering only authentic, high-quality plants sourced from trusted growers. Our plants are carefully nurtured to ensure they thrive in your home or garden. Shop with confidence and bring home the best, naturally! 🌱✨</p>
                 </div>
   
                   {/* card4 */}
                   <div className='border border-green-900 p-5  cursor-pointer rounded-md hover:shadow-2xl
                  hover:-translate-y-1 duration-300 space-y-5'>
                     <div className='flex items-center gap-5 '>
                         <GrMoney className='text-3xl md:text-4xl xl:text-5xl ' />
                         <p className='md:text-lg font-bold '>Affordable <br/>
                         Price</p>
                     </div>
                     <p className='font-Jost'>At Pot Green, we believe that everyone should have access to beautiful, healthy plants without breaking the bank. Our wide range of plants comes at budget-friendly prices, ensuring you get the best quality at the best value. Start your green journey today—affordably! 🌱✨</p>
                 </div>

                  {/* card5 */}
                  <div className='border border-green-900 p-5  cursor-pointer rounded-md hover:shadow-2xl
                  hover:-translate-y-1 duration-300 space-y-5'>
                     <div className='flex items-center gap-5 '>
                         <FaTree className='text-3xl md:text-4xl xl:text-5xl ' />
                         <p className='md:text-lg font-bold '>Tree Planting</p>
                     </div>
                     <p className='font-Jost'>Planting trees is one of the best ways to protect the environment and create a healthier planet. Trees provide oxygen, improve air quality, support wildlife, and combat climate change. At Pot Green, we encourage tree planting to build a sustainable future. Join us in making the world greener—one tree at a time! 🌱🌍✨</p>
                 </div>

                  {/* card6 */}
                  <div className='border border-green-900 p-5  cursor-pointer rounded-md hover:shadow-2xl
                  hover:-translate-y-1 duration-300 space-y-5'>
                     <div className='flex items-center gap-5 '>
                         <FaCut className='text-3xl md:text-4xl xl:text-5xl ' />
                         <p className='md:text-lg font-bold '>Grass Cutting</p>
                     </div>
                     <p className='font-Jost'>A well-maintained lawn enhances the beauty of any space. Regular grass cutting promotes healthy growth, prevents weed invasion, and keeps your garden looking lush and tidy. At Pot Green, we provide expert tips and tools to help you achieve the perfect green lawn effortlessly. Keep your outdoor space fresh and vibrant with proper grass care! 🌱✨</p>
                 </div>

                  {/* card7 */}
                  <div className='border border-green-900 p-5  cursor-pointer rounded-md hover:shadow-2xl
                  hover:-translate-y-1 duration-300 space-y-5'>
                     <div className='flex items-center gap-5 '>
                         <GiTumbleweed className='text-3xl md:text-4xl xl:text-5xl ' />
                         <p className='md:text-lg font-bold '>Weeds Control</p>
                     </div>
                     <p className='font-Jost'>Unwanted weeds compete with your plants for nutrients, water, and sunlight, affecting their growth. Effective weed control helps maintain a healthy and thriving garden. At Pot Green, we offer expert tips and eco-friendly solutions to keep your plants safe from invasive weeds. Say goodbye to weeds and hello to a flourishing garden! 🌱✨</p>
                 </div>

                   {/* card8 */}
                   <div className='border border-green-900 p-5  cursor-pointer rounded-md hover:shadow-2xl
                  hover:-translate-y-1 duration-300 space-y-5'>
                     <div className='flex items-center gap-5 '>
                         <GiCactusPot className='text-3xl md:text-4xl xl:text-5xl ' />
                         <p className='md:text-lg font-bold '>Pots</p>
                     </div>
                     <p className='font-Jost'>At Pot Green, we offer a wide variety of high-quality pots to suit every plant and space. Whether you need ceramic, clay, plastic, or decorative pots, we have the perfect options to complement your garden or indoor setup. Give your plants the best home with our stylish and durable pots! 🌱✨</p>
                 </div>
   
   
   
   
           </div>
       </div>
  )
}

export default ServicesPage
