import { useState, useEffect, useRef  } from 'react';
import CustomSelect from '../../components/Header/CustomSelect';
import Draggallery from '@/components/adminview/gallerydragdrop';
import Head from 'next/head';
import Image from 'next/image';

export async function getStaticProps(){
   let  talentfeed = await fetch('https://tejrdev.github.io/api/talentadmin.json');
    talentfeed = await talentfeed.json();

   return {
      props: {talentfeed},
      revalidate : 10
      };
}

function Managelisting({talentfeed}) {
   const socialnameref = useRef();
   const socialurlref = useRef();
   const socialsitelistref = useRef();
   const [socialsitelist , setSocialsitelist] = useState([`YouTube - www.youtube.com`]);
   const test_options = [
      { "name": "AMC Theatres", "value": "AMC Theatres" },
      { "name": "one", "value": "one" },
      { "name": "two", "value": "two" },
      { "name": "three", "value": "three" }
   ]

   const socialLinkadd = (e) => {
      e.preventDefault();
      setSocialsitelist([...socialsitelist , socialnameref.current.value +' - ' + socialurlref.current.value]);
      console.log(socialsitelist);
   }

   useEffect(() => {
      $('.closebtn').click(function () {
         $(this).parents('.listingupgrad').slideUp();
      });
   }, []);

   return (
      <main>
         <section className="listingtop">
            <div className="container">
               <h3>Welcome Tom !</h3>
               <div className="listingfilterbox df fww">
                  <h1>Manage Your Listing For</h1>
                  <div className="filterviewsave df fww">
                     <div className="select_filters selectbox">
                        <div className="custom-select-wrapper">
                           <CustomSelect custom_options={test_options} Default_val={'AMC Theatres '} />
                        </div>
                     </div>
                     <span className="ghostbtn goldbtn uppercase">View Listing</span>
                  </div>
               </div>
            </div>
         </section>
         <section className="listingupgrad ">
            <div className="container pvr">
               <span className="closebtn">+</span>
               <h5><strong>Your listing is basic, want to upgrade to featured?</strong></h5>
               <p>You might be interested in what we offer to featured lisitngs, to learn more <span className='goldtxt'><u>click here</u></span></p>
               <span className="btn uppercase">become a featured listing</span>
            </div>
         </section>
         <section className="listingfeed toplinesec">
            <div className="container">
               <div className="top_txt"></div>
               <form action='' className="profileinfobox grid mb-0">
                  <div className="profile_field">
                     <label htmlFor="" className='labeltxt'>Theatre Name</label>
                     <div className="from_fieldbox">
                        <input type="text" placeholder='Enter Theatre Name' className='proinputfield' />
                     </div>
                  </div>
                  <div className="profile_field">
                     <label htmlFor="" className='labeltxt'>Street Address</label>
                     <div className="from_fieldbox">
                        <input type="text" placeholder='Enter Street Address' className='proinputfield' />
                     </div>
                  </div>
                  <div className="profile_field">
                     <p className="labeltxt">City</p>
                     <select name="city" className='selectin'>
                        <option value="city 1" selected="">city 1</option>
                        <option value="city 2">city 2</option>
                     </select>
                  </div>
                  <div className="profile_field">
                     <p className="labeltxt">State / Province</p>
                     <select name="state" className='selectin'>
                        <option value="state 1" selected="">state 1</option>
                        <option value="state 2">state 2</option>
                     </select>
                  </div>
                  <div className="profile_field">
                     <label htmlFor="" className='labeltxt'>Zip / Postal Code</label>
                     <div className="from_fieldbox">
                        <input type="text" placeholder='Enter Zip / Postal Code' className='proinputfield' />
                     </div>
                  </div>
                  <div className="profile_field">
                     <p className="labeltxt">Country</p>
                     <select name="country">
                        <option value="USA" selected="">USA</option>
                        <option value="Canada">Canada</option>
                     </select>
                  </div>
                  <div class="profile_field">
                     <p class="labeltxt">Phone</p>
                     <div class="phonebox pvr">
                        <select class="countrycode" placeholder="+1" name="countryCode">
                           <option value="+1" selected="">+1</option>
                           <option value="+2">+2</option>
                           <option value="+3">+3</option>
                           <option value="+4">+4</option>
                        </select>
                        <input type="text" class="proinputfield" name="phone" placeholder="e.g. (800) 555-1212" value="" />
                     </div>
                  </div>
                  <div className="profile_field">
                     <label htmlFor="" className='labeltxt'>Email</label>
                     <div className="from_fieldbox">
                        <input type="text" placeholder='Enter Email Address' className='proinputfield' />
                     </div>
                  </div>
                  <div className="profile_field">
                     <label htmlFor="" className='labeltxt'>Official Website</label>
                     <div className="from_fieldbox">
                        <input type="text" placeholder='Enter Website' className='proinputfield' />
                     </div>
                  </div>
                  <div className="profile_field fullgrid extlinkfield">
                     <label htmlFor="" className='labeltxt'>External Links</label>
                     <ul className="sociallinkname" ref={socialsitelistref}>
                        {socialsitelist.map((item , index) => 
                           <li key={index}>{item}</li>
                        )}
                     </ul>
                     <div className="from_fieldbox df fww item-center">
                        <select class="sociallinks" placeholder="select" name="sociallinks" ref={socialnameref}>
                           <option value="YouTube" selected="">YouTube</option>
                           <option value="Instagram">Instagram</option>
                           <option value="Facebook">Facebook</option>
                        </select>
                        <input type="text" placeholder='Enter Website' className='proinputfield' ref={socialurlref}/>
                        <span className="ghostbtn goldbtn uppercase" onClick={socialLinkadd}>add link</span>
                     </div>
                  </div>
                  <div className="profile_field fullgrid">
                     <label htmlFor="" className='labeltxt'>Description (280/300 Character)</label>
                     <div className="from_fieldbox">
                        <textarea name="" id="" cols="30" rows="5" className='proinputfield' placeholder='Enter Description'></textarea>
                     </div>
                  </div>
                  <div className="profile_field fullgrid">
                     <label htmlFor="" className='labeltxt'>Amenities </label>
                     <div className="from_fieldbox checkoptions">
                        <ul>
                           <li><input type="checkbox" name="ameniti1" id="ameniti1" /><label htmlFor="ameniti1">Drive-In</label> </li>
                           <li><input type="checkbox" name="ameniti2" id="ameniti2" /><label htmlFor="ameniti2">IMAX</label> </li>
                           <li><input type="checkbox" name="ameniti3" id="ameniti3" /><label htmlFor="ameniti3">3D</label> </li>
                           <li><input type="checkbox" name="ameniti4" id="ameniti4" /><label htmlFor="ameniti4">4DX</label> </li>
                           <li><input type="checkbox" name="ameniti5" id="ameniti5" /><label htmlFor="ameniti5">Parking</label> </li>
                        </ul>
                     </div>
                  </div>
                  <div className="profile_field fullgrid">
                     <input type="submit" className="submitbtn btn" value="Save" />
                  </div>


               </form>
            </div>
         </section>
         <section className="keycontactfeed toplinesec">
            <div className="container">
               <div className="top_txt">
                  <h2 className="h3 m-0">Key Contacts</h2>
               </div>
               <ul className="cntinfo df fww">
                  <li>
                     <i class="fal fa-user"></i>
                     <p>Adam Aron</p>
                     <p>Chairman & CEO</p>
                     <p>+1 (205) 621-8884</p>
                     <p>aaron@amctheatres.com</p>
                  </li>
                  <li>
                     <i class="fal fa-user"></i>
                     <p>Adam Aron</p>
                     <p>Chairman & CEO</p>
                     <p>+1 (205) 621-8884</p>
                     <p>aaron@amctheatres.com</p>
                  </li>
               </ul>

               <form action="" className="profileinfobox grid mb-0">
                  <div className="profile_field">
                     <label htmlFor="" className='labeltxt'>Contact Name</label>
                     <div className="from_fieldbox">
                        <input type="text" placeholder='Enter Name' className='proinputfield' />
                     </div>
                  </div>
                  <div className="profile_field">
                     <label htmlFor="" className='labeltxt'>Position</label>
                     <div className="from_fieldbox">
                        <input type="text" placeholder='Enter Position' className='proinputfield' />
                     </div>
                  </div>
                  <div class="profile_field">
                     <p class="labeltxt">Phone</p>
                     <div class="phonebox pvr">
                        <select class="countrycode" placeholder="+1" name="countryCode">
                           <option value="+1" selected="">+1</option>
                           <option value="+2">+2</option>
                           <option value="+3">+3</option>
                           <option value="+4">+4</option>
                        </select>
                        <input type="text" class="proinputfield" name="phone" placeholder="e.g. (800) 555-1212" value="" />
                     </div>
                  </div>
                  <div className="profile_field">
                     <label htmlFor="" className='labeltxt'>Email</label>
                     <div className="from_fieldbox">
                        <input type="text" placeholder='Enter Email' className='proinputfield' />
                     </div>
                  </div>
                  <div className="profile_field fullgrid">
                     <input type="submit" className="submitbtn btn uppercase" value="add key contact" />
                  </div>
               </form>
            </div>
         </section>
         <section className="adminprofileimg toplinesec">
            <div className="container">
               <div className="top_txt">
                  <h2 className="h3 m-0">Profile Image</h2>
               </div>
               <div className="proimgbox df fww potrate">
                  <figure className="pvr ">
                     <Image src={'https://tejrdev.github.io/api/apisrc/fourabtsld.jpg'} width="190" height="275" priority={true} alt="" className="objctimg_box" />
                  </figure>
                  <div className="proimginfo">
                     <label className="greytxt">Image url</label>
                     <input type="text" placeholder="Add Image Url" className="dblock" />
                     <span className="ghostbtn goldbtn uppercase">upload image</span>
                     <span className="imgsizing greytxt"><small>(Image Size Should Be
                        Less Then 2mb )</small></span>
                     <span className="redtxt removeimg dblock">Remove Image <i className="fas fa-trash"></i></span>
                  </div>
               </div>
            </div>
         </section>
         <section className="admingallery toplinesec">
            <div className="container">
               <div className="top_txt">
                  <h2 className="h3 m-0">Gallery Images <small>(Drag & Drop Media To Change The Order...)</small></h2>
               </div>
               <Draggallery gallery={'imagegallery'} data={talentfeed.galleryimages}/>
            </div>
         </section>
         <section className="imageaddblock toplinesec">
            <div className="container">
               <div className="top_txt">
                  <h2 className="h3 m-0">Add Image </h2>
               </div>
               <div className="adminimginputs df fww">
                  <figure className="pvr">
                     <Image src={'https://tejrdev.github.io/api/apisrc/fourabtsld.jpg'} width="190" height="275" alt="" className="objctimg_box" />
                  </figure>
                  <div className="imginputsinfo proimginfo">
                     <div className="imginurl">
                        <label htmlFor="" className="greytxt">Image URL</label>
                        <input type="text" placeholder="Add Image URL" className="dblock" />

                        <span className="ghostbtn goldbtn uppercase" >upload image</span>
                        <span className="imgsizing greytxt"><small>(Image Size Should Be
                           Less Then 2mb )</small></span>
                     </div>
                     <div className="imgincaption">
                        <label htmlFor="" className="greytxt">Image Caption</label>
                        <input type="text" placeholder="Add Image Caption" className="dblock" />

                        <span className="ghostbtn goldbtn uppercase">add image to gallery</span>
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </main>
   )
}

export default Managelisting;