
import React from 'react';
if (typeof window !== 'undefined') {
     var LOGGED_USER =localStorage.getItem('email');
    // var LOGGED_USER ='Developer';
    }
const Intro = () =>{
    return(<>
    <section className="page_intro">
	<div className="container">
		<div className="favpagetitle">
			<h1>{LOGGED_USER ? LOGGED_USER :''} Favorites</h1>
			<p>Note: Filled <span className="redtxt">
				<i className="fas fa-heart"></i></span> A     heart indicates that you have marked the item as a favorite, while a  <span><i className="far fa-heart"></i></span>means that it is not yet one of your favorites but has been recommended for you to consider. </p>
		</div>
	</div>
</section>

    </>)
}
export default Intro;