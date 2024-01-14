import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const AddProject = () => {
    const rowStyle = {
        display: 'flex',
        alignItems: 'center',
        minHeight: '70vh',
    };

    const [projectName, setProjectName] = useState('');
    const [projectDetails, setProjectDetails] = useState('');
    const [projectStack, setProjectStack] = useState('');
    
    const [validationError, setValidationError] = useState({
        projectName: '',
        projectStack: '',
        projectDetails: '',
    });
    const MIN_CHAR_LIMIT = 5;
    const MAX_NAME_LIMIT = 20;
    const MAX_STACK_LIMIT = 100;
    const MAX_DETAILS_LIMIT = 500;

    const handleSubmit = async (e) => {
        e.preventDefault();

        setValidationError({
            projectName: '',
            projectStack: '',
            projectDetails: '',
        });

        if (!isValidField(projectName, MIN_CHAR_LIMIT, MAX_NAME_LIMIT)) {
            setValidationError(prevState => ({
                ...prevState,
                projectName: `Project Name must be between ${MIN_CHAR_LIMIT} and ${MAX_NAME_LIMIT} characters`,
            }));
            return;
        }

        if (!isValidField(projectStack, MIN_CHAR_LIMIT, MAX_STACK_LIMIT)) {
            setValidationError(prevState => ({
                ...prevState,
                projectStack: `Project Stack must be between ${MIN_CHAR_LIMIT} and ${MAX_STACK_LIMIT} characters`,
            }));
            return;
        }

        if (!isValidField(projectDetails, MIN_CHAR_LIMIT, MAX_DETAILS_LIMIT)) {
            setValidationError({
                projectName: validationError.projectName,
                projectStack: validationError.projectStack,
                projectDetails: `Project Details must be between ${MIN_CHAR_LIMIT} and ${MAX_DETAILS_LIMIT} characters`,
            });
            return;
        }

        // Perform API request to add the project
        try {
            const response = await fetch('http://localhost:3000/api/addProject', {
                method: 'POST',
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
                setValidationError({
                    projectName: '',
                    projectStack: '',
                    projectDetails: '',
                });
                alert(data.message);
            } else {
                console.error('Error adding project:', data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const isValidField = (value, min, max) => {
        return value.length >= min && value.length <= max;
    };

    return (
        <Row className="justify-content-center" style={rowStyle}>
            <Col md={7}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="projectName">
                        <Form.Label>Project Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter project name"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                            isInvalid={!!validationError.projectName}
                        />
                        <Form.Control.Feedback type="invalid">{validationError.projectName}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="projectStack">
                        <Form.Label>Project Stack</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter project stack"
                            value={projectStack}
                            onChange={(e) => setProjectStack(e.target.value)}
                            isInvalid={!!validationError.projectStack}
                        />
                        <Form.Control.Feedback type="invalid">{validationError.projectStack}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="projectDetails">
                        <Form.Label>Project Details</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Enter project details"
                            value={projectDetails}
                            onChange={(e) => setProjectDetails(e.target.value)}
                            isInvalid={!!validationError.projectDetails}
                        />
                        <Form.Control.Feedback type="invalid">{validationError.projectDetails}</Form.Control.Feedback>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Add Project
                    </Button>
                </Form>
            </Col>
        </Row>
    );
};

export default AddProject;

