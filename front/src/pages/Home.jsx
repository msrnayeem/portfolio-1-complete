import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <>
            <header className="py-5">
                <div className="container px-5 pb-5">
                    <div className="row gx-5 align-items-center">
                        <div className="col-xxl-5">
                            <div className="text-center text-xxl-start">
                                <div className="badge bg-gradient-primary-to-secondary text-white mb-4">
                                    <div className="text-uppercase">Web Dev</div>
                                </div>
                                <div className="fs-3 fw-light text-muted">Crafting online experiences to</div>
                                <h1 className="display-3 fw-bolder mb-5">
                                    <span className="text-gradient d-inline">Elevate your digital presence</span>
                                </h1>


                                <div className="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xxl-start mb-3">

                                    <Link to="/skills" className="btn btn-primary btn-lg px-5 py-3 me-sm-3 fs-6 fw-bolder">Skills</Link>

                                    <Link to="/projects" className="btn btn-outline-dark btn-lg px-5 py-3 fs-6 fw-bolder">Projects</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-xxl-7">
                            <div className="d-flex justify-content-center mt-5 mt-xxl-0">
                                <div className="profile">
                                    <img className="profile-img" src="pic.jpg" alt="..." />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <section className="bg-light py-5">
                <div className="container px-5">
                    <div className="row gx-5 justify-content-center">
                        <div className="col-xxl-8">
                            <div className="text-center my-5">
                                <h2 className="display-5 fw-bolder">
                                    <span className="text-gradient d-inline">About Me</span>
                                </h2>
                                <p className="lead fw-light mb-4">
                                    Hello! I am Md. Siduzzaman, a passionate and dedicated professional currently pursuing a Master's in Computer Science at the University of South Wales. With a solid foundation in Computer Science and Engineering, I graduated from the American International University-Bangladesh in 2019.
                                </p>
                                <p className="text-muted">
                                    I am a Microsoft Certified Solutions Associate (MCSA) in Web Applications, with certifications in ASP.NET MVC, C#, and Azure. Additionally, I've completed courses in Android Software Development, basic and advanced WordPress development, and a Cisco Network Academy program.
                                </p>
                                <div className="d-flex justify-content-center fs-2 gap-4">
                                    <a className="text-gradient" href="mailto:md.siduzzaman@gmail.com">
                                        md.siduzzaman@gmail.com
                                    </a>

                                    <a className="text-gradient" href="tel:+447424029458">
                                        447424029458
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>

    );
};

export default Home;



