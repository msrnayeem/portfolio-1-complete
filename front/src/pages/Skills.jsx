import React, { useState, useEffect } from 'react';

const Projects = () => {

    const [skills, setSkills] = useState([]);

    useEffect(() => {
        // Fetch data from the API when the component mounts
        fetch('http://localhost:3000/api/getSkills')
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setSkills(data.skills);
                } else {
                    console.error('Error fetching skills:', data.message);
                }
            })
            .catch(error => console.error('Error:', error));
    }, []);


    return (
        <section className="py-5">
            <div className="container px-5 mb-5">
                <div className="text-center mb-5">
                    <h1 className="display-5 fw-bolder mb-0">
                        <span className="text-gradient d-inline">Skills</span>
                    </h1>
                </div>
                <div className="row gx-5 justify-content-center">

                    {skills.map(skills => (
                        <div className="col-5">
                            <div key={skills._id} className="card overflow-hidden shadow rounded-4 border-0 mb-5">
                                <div className="card-body p-0">
                                    <div className="d-flex align-items-center">
                                        <div className="p-5">
                                            <h2 className="fw-bolder">{skills.skillName}</h2>
                                            <p>{skills.skillDetails}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Projects;
