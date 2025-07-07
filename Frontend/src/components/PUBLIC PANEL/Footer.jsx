import React from 'react'
import { CiPaperplane } from "react-icons/ci";
import { FaFacebook ,FaTwitter, FaInstagram, FaLinkedin, FaLeaf } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <div>
      <section id='footer' className='bg-yellow-100 text-green-950 pt-20 pb-10 md:pt-28 relative border-t-2 border-yellow-500'> 
         {/* newsleter */}
         <div className='container top-0 left-0 right-0 -translate-y-1/4'>
             <div className='bg-green-950 px-10 pt-5 pb-10 space-y-5 rounded-md'>
                 <h3 className='text-slate-200'>
                     <span className="text-yellow-500">Subscribe</span> to our newsletter
                      Subscribe
                 </h3>
                 <div className='flex flex-col md:flex-row gap-1 '>
                     <input type="email"placeholder='Enter Your Email Adress...' className='w-full px-5 py-3 text-green-900 rounded-md outline-none ' />
                     <button className='flex items-cente justify-center gap-1 bg-green-900 px-5 py-3 rounded-md hover:opacity-80 duration-300 text-white'><span>Subscribe</span>   <CiPaperplane className='mt-1'/></button>
                  

                 </div>
             </div>
         </div>

         {/* social-icons */}
         <div className='container mt-16 mb-10'>
                <div className='border-b border-green-500 relative'>
                    <div className='absolute top-0 transform -translate-y-1/2 left-0 right-0 max-w-36 mx-auto'>
                        <div className='bg-yellow-100 text-lg text-center space-x-2 flex items-center justify-center'>
                            <FaFacebook className='text-green-950 hover:text-yellow-500 duration-300 cursor-pointer' />
                            <FaTwitter  className='text-green-950 hover:text-yellow-500 duration-300 cursor-pointer text-base'/>
                            <FaInstagram  className='text-green-950 hover:text-yellow-500 duration-300 cursor-pointer'/>
                            <FaLinkedin  className='text-green-950 hover:text-yellow-500 duration-300 cursor-pointer'/>
                        </div>
                    </div>
                </div>
         </div>
        {/* content */}
        <div className='container grid grid-col1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 text-center md:text-start '>
            {/* item-1 */}
            <div>
                <div className='text-7xl text-green-700 text-center inline-block '>
                <FaLeaf />
                <p className='font-Jost text-xl sm:text-2xl '>IndorePlants.</p>

                </div>
            </div>
            {/* item-2 */}
            <div>
                <p className='mb-5 font-bold text-xl '>Quick Links</p>
                <div className=' flex flex-col gap-1 '>
                    <Link to="/plants">Plants</Link>
                    <Link to="/plants">Flowers</Link>
                    <Link to="/services">Gardening</Link>
                    <a href="#">Shipping</a>
                    <a href="#">Seeds</a>
                </div>
            </div>
            
            {/* item-3 */}
            <div>
                <p className='mb-5 font-bold text-xl '>Quick Links</p>
                <div className=' flex flex-col gap-1 '>
                    <Link to="/services">Popular Services</Link>
                    <a href="#">Tree Planting</a>
                    <Link to="/services">Grass Cutting</Link>
                    <Link to="/services">Weeds Control</Link>
                    <Link to="/">Project</Link>
                </div>
            </div>
            
            {/* item-4 */}
            <div>
                 <p className='mb-5 font-bold text-xl '>Contact Us</p>
                 <div className=' flex flex-col gap-1 '>
                     <a href="tel:+923117747393">+923117747393</a>
                     <a href="mailto:2021i0346@gmail.com">2021i0346@gmail.com</a>
                     
                     <p>Govt Islamia College Civil Lines Lahore.</p>
                 </div>
             </div>

            {/* floral-image */}
            <div className='absolute bottom-0 left-0 opacity-20 pointer-events-none '>
                <img src="src/assets/img/floral-1.png" alt="Footer_image" className='w-full lg:w-1/2 ' />
            </div>


        </div>
        {/* copyright */}
        <div className='container w-full '>
            <p className='text-center mt-10 opacity-60 '>Copyright &copy; 2024 Pot Green Nursery . All rights reserved.</p>
            <p className='text-center opacity-60 '>Developed by Muhammad Kashaf,Ammar Shoukat,Sheharyar Shah</p>
        </div>

      </section>
    </div>
  )
}

export default Footer
