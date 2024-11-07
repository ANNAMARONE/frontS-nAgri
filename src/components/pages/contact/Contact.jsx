/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Babafrom from '/src/assets/images/baba.jpg'
import config from '/src/config';
import axios from 'axios';
import './Contact.css';
import Swal from 'sweetalert2'
const Contact = () => {
const [formData,setFormData]=useState({
	name:'',
	email:'',
	subject:'',
	message:''
});

const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
}

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch(`${config.apiBaseUrl}/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();
       
		Swal.fire({
			icon: 'success',
			title: 'Succès',
			text: (data.message),
		});
    } catch (error) {
        console.error("Erreur lors de l'envoi du message :", error);
    }
};


  return (
    <div>
      <section className="ftco-section">
		<div className="container">
			<div className="row justify-content-center">
				<div className="col-md-6 text-center mb-5">
					<h2 className="heading-section">Formulaire de Contact</h2>
				</div>
			</div>
			<div className="row justify-content-center">
				<div className="col-md-12">
					<div className="wrapper">
						<div className="row no-gutters mb-5">
							<div className="col-md-7">
								<div className="contact-wrap w-100 p-md-5 p-4">
									<h3 className="mb-4">Contactez-nous</h3>
									<div id="form-message-warning" className="mb-4"></div> 
				      		<div id="form-message-success" className="mb-4">
				      		</div>
									<form method="POST" id="contactForm" name="contactForm" className="contactForm"  onSubmit={handleSubmit}>
										<div className="row">
											<div className="col-md-6">
												<div className="form-group">
													<label className="label" >Nom compléte</label>
													<input type="text" className="form-control" name="name" id="name" placeholder="Prenom et nom"  onChange={handleChange}/>
												</div>
											</div>
											<div className="col-md-6"> 
												<div className="form-group">
													<label className="label" >Address Email </label>
													<input type="email" className="form-control" name="email" id="email" placeholder="Email" onChange={handleChange}/>
												</div>
											</div>
											<div className="col-md-12">
												<div className="form-group">
													<label className="label" >Subjet</label>
													<input type="text" className="form-control" name="subjet" id="subject" placeholder="Subject" onChange={handleChange}/>
												</div>
											</div>
											<div className="col-md-12">
												<div className="form-group">
													<label className="label" >Message</label>
													<textarea name="message" className="form-control1" id="message" cols="3" rows="4" placeholder="Message"  onChange={handleChange}></textarea>
												</div>
											</div>
											<div className="col-md-12">
												<div className="form-group">
													<input type="submit" value="envoyer" className="btn btn-primary"/>
													<div className="submitting"></div>
												</div>
											</div>
										</div>
									</form>
								</div>
							</div>
							<div className="col-md-5 d-flex align-items-stretch">
								<div id="map">
                                <img src={Babafrom} alt="" className='imageForm'/>
			          </div>
							</div>
						</div>
						<div className="row">
							<div className="col-md-3">
								<div className="dbox w-100 text-center">
			        		<div className="icon d-flex align-items-center justify-content-center">
			        			<span className="fa fa-map-marker"></span>
			        		</div>
			        		<div className="text">
				            <p><span>Address:</span> Niary tally,sénégal</p>
				          </div>
			          </div>
							</div>
							<div className="col-md-3">
								<div className="dbox w-100 text-center">
			        		<div className="icon d-flex align-items-center justify-content-center">
			        			<span className="fa fa-phone"></span>
			        		</div>
			        		<div className="text">
				            <p><span>Téléphone:</span> <a href="tel://1234567920">+221 78 461 58 47</a></p>
				          </div>
			          </div>
							</div>
							<div className="col-md-3">
								<div className="dbox w-100 text-center">
			        		<div className="icon d-flex align-items-center justify-content-center">
			        			<span className="fa fa-paper-plane"></span>
			        		</div>
			        		<div className="text">
				            <p><span>Email:</span> <a href="mailto:info@yoursite.com">annamarone72@gmail.com</a></p>
				          </div>
			          </div>
							</div>
							<div className="col-md-3">
								<div className="dbox w-100 text-center">
			        		<div className="icon d-flex align-items-center justify-content-center">
			        			<span className="fa fa-globe"></span>
			        		</div>
			        		<div className="text">
				            <p><span>Website</span> <a href="#">yoursite.com</a></p>
				          </div>
			          </div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

    </div>
  )
}

export default Contact
