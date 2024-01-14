import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';


const EditProject = () => {
    const { projectId } = useParams();

    const [projectName, setProjectName] = useState('');
    const [projectDetails, setProjectDetails] = useState('');
    const [projectStack, setProjectStack] = useState('');

    const navigate = useNavigate();


    const fetchProject = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/getProject/${projectId}`);
            const data = await response.json();

            if (data.success) {
                setProjectName(data.project.projectName);
                setProjectDetails(data.project.projectDetails);
                setProjectStack(data.project.projectStack);
            } else {
                console.error('Error getting project by ID:', data.message);
                // Handle error (e.g., display an error message)
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Call fetchProject when the component mounts
    useEffect(() => {
        fetchProject();
    }, [projectId]);


    const handleEditSkill = async (e) => {
        e.preventDefault();

        // Perform API request to update the skill
        try {
            const response = await fetch(`http://localhost:3000/api/updateProject/${projectId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    projectName,
                    projectDetails,
                    projectStack,
                }),
            });

            const data = await response.json();

            if (data.success) {
                setProjectName('');
                setProjectDetails('');
                setProjectStack('');
                alert('Project updated successfully!');
                navigate('/admin');
            } else {
                console.error('Error updating skill:', data.message);
                alert('Error updating skill. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Row className="justify-content-center">
            <Col md={7}>
                <Form onSubmit={handleEditSkill}>
                    <Form.Group controlId="projectName">
                        <Form.Label>Project Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="projectDetails" className="mt-3">
                        <Form.Label>Project Stack</Form.Label>
                        <Form.Control
                            type="text"
                            value={projectStack}
                            onChange={(e) => setProjectStack(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="projectDetails" className="mt-3">
                        <Form.Label>Project Details</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={projectDetails}
                            onChange={(e) => setProjectDetails(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="mt-3">
                        Update Skill
                    </Button>
                </Form>
            </Col>
        </Row>
    );
};

export default EditProject;
