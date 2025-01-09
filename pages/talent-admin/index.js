import { useState, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';
import Image from 'next/image';
import FOURAB from '../../public/images/fourabtsld.jpg';
import Draggallery from '../../components/adminview/gallerydragdrop';
import playicoimg from "../../public/images/playicov2.png";

export async function getStaticProps(){
   let  talentfeed = await fetch('https://tejrdev.github.io/api/talentadmin.json');
    talentfeed = await talentfeed.json();

   return {
      props: {talentfeed},
      revalidate : 10
      };
}


const talentadmin = ({talentfeed}) => {
   /*{console.log(talentfeed)}*/


/*const handleimgSubmit = async () => {
   try {
   const postData = {
   "page": 2,
};
      let axiosConfig = {
       headers: {
         'Content-Type': 'application/json;charset=UTF-8',
         "Access-Control-Allow-Origin": "*",
      }
   };
      //axios.post("https://tejrdev.github.io/api/talentadmin.json", { name: 'John Doe' }).then((res) => {
      await axios.post("https://staging.project-progress.net/projects/screendollars/zapi/testlogin.json", postData, axiosConfig)
      .then((res) => {
         console.log(res.data);
      });
       // Handle the API response
    //console.log( response);
  } catch (error) {
    // Handle any errors that occurred during the request
    console.error('Error:', error);
  }
   };
*/
   const handleimgSubmit = async () => {
  try {
    const url = 'https://jsonplaceholder.typicode.com/users'; // Replace with your API endpoint URL

    const postData = {
      name: 'John Doe',
      email: 'johndoe@example.com',
    };

    const response = await axios.post(url, postData);

    // Handle the API response
    console.log(url , response);
  } catch (error) {
    // Handle any errors that occurred during the request
    console.error('Error:', error);
  }
};

  /* const postData = async () => {
  try {
    const url = 'https://jsonplaceholder.typicode.com/users'; // Replace with your API endpoint URL

    const postData = {
      name: 'John Doe',
      email: 'johndoe@example.com',
    };

    const response = await axios.post(url, postData);

    // Handle the API response
    console.log(url , response);
  } catch (error) {
    // Handle any errors that occurred during the request
    console.error('Error:', error);
  }
};*/



  const handlePostData = async () => {
    //await postData();
    await handleimgSubmit();
  };

   useEffect(()=> {
/*
   function handleimgSubmit(){
      alert("Hello! I am an alert box!!");
   }

   handleimgSubmit();*/

      /*axios.post('https://tejrdev.github.io/api/talentadmin.json' , galleryimages , {
            "id",
            "link",
            "title"
      })*/




   }, []);
    return (
         <div className="talentadmininfo">
           	<section className="infoadmintop">
           		<div className="container">
           			<div className="infoadmintop_wrap df fww just-between">
           				<div className="top_title">
                           <div className="h4">Manage Media For</div>
                           {talentfeed.profilename.map((item , index)=>
                              <h1 key={index}>{item.name}</h1>
                           )}
                     </div>
                     <div className="btnbox">
                        <span className="ghostbtn goldbtn uppercase">view listing</span>
                        {/*<a href="#" className="ghostbtn goldbtn uppercase">save</a>*/}
                     </div>
           			</div>
           		</div>
           	</section>
            <section className="adminprofileimg toplinesec">
               <div className="container">
                  <div className="top_txt">
                     <h2 className="h3 m-0">Profile Image</h2>
                     </div>
                  <div className="proimgbox df fww">
                     <figure className="pvr">
                     {talentfeed.profilename.map((item , index)=>
                       <Image src={item.personimageurl} width="190" height="275" priority={true} alt="" className="objctimg_box" key={index}/>
                       )}
                     </figure>
                     <form className="proimginfo">
                        <label className="greytxt">Image url</label>
                        <input type="text" placeholder="Add Image Url" className="dblock"/>
                        <input type='submit' className="ghostbtn goldbtn uppercase" value="upload image"/ >
                        <span className="imgsizing greytxt"><small>(Image Size Should Be
                           Less Then 2mb )</small></span>
                        <span className="redtxt removeimg dblock">Remove Image <i className="fas fa-trash"></i></span>
                     </form>
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
                       <Image src={FOURAB} alt="" className="objctimg_box" />
                     </figure>
                     <div className="imginputsinfo proimginfo">
                        <from className="imginurl">
                           <label htmlFor="" className="greytxt">Image URL</label>
                           <input type="text" placeholder="Add Image URL" className="dblock"/>
                           <input type='submit'  className="ghostbtn goldbtn uppercase"  onClick={handlePostData} value="upload image"/ >
                           <span className="imgsizing greytxt"><small>(Image Size Should Be
                              Less Then 2mb )</small></span>
                        </from>
                        <from className="imgincaption">
                           <label htmlFor="" className="greytxt">Image Caption</label>
                           <input type="text" placeholder="Add Image Caption" className="dblock"/>
                           <input type='submit'  className="ghostbtn goldbtn uppercase" value="add image to gallery"/ >
                        </from>
                     </div>
                  </div>
               </div>
            </section>
            <section className="admingallery toplinesec">
               <div className="container">
                  <div className="top_txt">
                     <h2 className="h3 m-0">Gallery Videos <small>(Drag & Drop Media To Change The Order...)</small></h2>
                  </div>
                  <Draggallery gallery={'videogallery'} data={talentfeed.galleryvideos}/>
               </div>
            </section>
            <section className="videoaddblock toplinesec">
               <div className="container">
                  <div className="top_txt">
                     <h2 className="h3 m-0">Add Video</h2>
                  </div>
                  <div className="adminimginputs df fww">
                     <figure className="pvr">
                     <a href={'https://www.youtube.com/watch?v=wDchsz8nmbo'} className="popvid">
                       <Image src={FOURAB} alt="" className="objctimg_box" />
                       <Image className='playico' src={playicoimg} width='5' alt='play icon' />
                       </a>
                     </figure>
                     <div className="imginputsinfo proimginfo">
                           <label htmlFor="" className="greytxt">Video URL</label>
                           <input type="text" placeholder="Add Video URL" className="dblock"/>
                           <label htmlFor="" className="greytxt">Video Caption</label>
                           <input type="text" placeholder="Add Video Caption" className="dblock"/>
                           <label htmlFor="" className="greytxt">Video Thumbnail URL</label>
                           <input type="text" placeholder="Add Video Thumbnail URL" className="dblock"/>

                           <span className="ghostbtn goldbtn uppercase">upload Thumbnail image</span>
                           <span className="imgsizing greytxt"><small>(Image Size Should Be
                              Less Then 2mb )</small></span>



                           <span className="ghostbtn goldbtn uppercase">add Video to gallery</span>

                     </div>
                  </div>
                  <div className="viewlistingbtn">
                     <span className="ghostbtn goldbtn uppercase">view listing</span>
                  </div>
               </div>
            </section>
        </div>
    );
};


export default talentadmin;
