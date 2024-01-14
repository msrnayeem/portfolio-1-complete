import React, { useState, useEffect } from 'react';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AdminPanel = () => {
    const [skills, setSkills] = useState([]);
    const [projects, setProjects] = useState([]);
    const [resultMessage, setResultMessage] = useState('');

    useEffect(() => {
        fetchSkill();
    }, []);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/getProjects');
            const data = await response.json();

            if (data.success) {
                setProjects(data.projects);
            } else {
                console.error('Error fetching projects:', data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const fetchSkill = async () => {
        try {
            const response = await fetch('http://localhost:3005/api/getSkills');
            const data = await response.json();

            if (data.success) {
                setSkills(data.skills);
            } else {
                console.error('Error fetching skills:', data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleDeleteProject = async (projectId) => {
        try {
            const response = await fetch(`http://localhost:3005/api/deleteProject/${projectId}`, {
                method: 'DELETE',
            });
            const data = await response.json();

            if (data.success) {
                setResultMessage('Project deleted successfully.');
                fetchProjects();
            } else {
                setResultMessage('Failed to delete Project');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleDeleteSkill = async (skillId) => {
        try {
            const response = await fetch(`http://localhost:3005/api/deleteSkill/${skillId}`, {
                method: 'DELETE',
            });
            const data = await response.json();

            if (data.success) {
                setResultMessage('Delete Skill successfully.');
                fetchSkill();
            } else {
                setResultMessage('Failed to delete Skill');
                console.error('Error deleting project:', data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    return (
        <Row className="justify-content-center">
            <Col md={7}>
                <div className='result'>
                    {resultMessage && (
                        <div className={`alert ${resultMessage.includes('Error') ? 'alert-danger' : 'alert-success'}`} role='alert'>
                            {resultMessage}
                        </div>
                    )}
                </div>
                <div className="mt-5">
                    <h2>Skills</h2>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Skill Name</th>
                                <th>Skill Details</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {skills.map((skill) => (
                                <tr key={skill._id}>
                                    <td>{skill.skillName}</td>
                                    <td>{skill.skillDetails}</td>
                                    <td>
                                        <Button variant="danger" size="sm" onClick={() => handleDeleteSkill(skill._id)}>
                                            Delete
                                        </Button>
                                        <Link to={`/editkill/${skill._id}`} className="btn btn-primary btn-sm mx-2">
                                            Edit
                                        </Link>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </Table>

                    <h2 className="mt-5">Projects</h2>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Project Name</th>
                                <th>Project Details</th>
                                <th>Project Stack</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map((project) => (
                                <tr key={project._id}>
                                    <td>{project.projectName}</td>
                                    <td>{project.projectDetails}</td>
                                    <td>{project.projectStack}</td>
                                    <td>
                                        <Button variant="danger" size="sm" onClick={() => handleDeleteProject(project._id)}>
                                            Delete
                                        </Button>
                                        <Link to={`/editProject/${project._id}`} className="btn btn-primary btn-sm mx-2">
                                            Edit
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>

            </Col >
        </Row >
    );
};

export default AdminPanel;
