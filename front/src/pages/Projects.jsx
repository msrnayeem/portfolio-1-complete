import React, { useState, useEffect } from 'react';

const Projects = () => {

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        // Fetch data from the API when the component mounts
        fetch('http://localhost:3000/api/getProjects')
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // If successful, update the projects state
                    setProjects(data.projects);
                } else {
                    console.error('Error fetching projects:', data.message);
                }
            })
            .catch(error => console.error('Error:', error));
    }, []); // Empty dependency array ensures that the effect runs only once, equivalent to componentDidMount


    return (
        <section className="py-5">
            <div className="container px-5 mb-5">
                <div className="text-center mb-5">
                    <h1 className="display-5 fw-bolder mb-0">
                        <span className="text-gradient d-inline">Projects</span>
                    </h1>
                </div>
                <div className="row gx-5 justify-content-center">
                    <div className="col-lg-11 col-xl-9 col-xxl-8">
                        {projects.map(project => (
                            // Map through the projects and create a card for each
                            <div key={project._id} className="card overflow-hidden shadow rounded-4 border-0 mb-5">
                                <div className="card-body p-0">
                                    <div className="d-flex align-items-center">
                                        <div className="p-5">
                                            <h2 className="fw-bolder">{project.projectName}</h2>
                                            <p>{project.projectStack}</p>
                                            <p>{project.projectDetails}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Projects;
