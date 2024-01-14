import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const MIN_CHAR_LIMIT = 3;
const MAX_NAME_LIMIT = 50;
const MAX_DETAILS_LIMIT = 500;

const AddSkill = () => {
    const [skillName, setSkillName] = useState('');
    const [skillDetails, setSkillDetails] = useState('');
    const [validationError, setValidationError] = useState({
        skillName: '',
        skillDetails: '',
    });

    const rowStyle = {
        display: 'flex',
        alignItems: 'center',
        minHeight: '70vh',  // Adjust the value as needed
    };

    const isValidField = (value, minLimit, maxLimit) => {
        return value.trim().length >= minLimit && value.trim().length <= maxLimit;
    };

    const handleAddSkill = () => {
        // Reset validation errors
        setValidationError({
            skillName: '',
            skillDetails: '',
        });

        // Perform API request to add skill using fetch or your preferred method
        try {
            // Your validation logic here...

            if (!isValidField(skillName, MIN_CHAR_LIMIT, MAX_NAME_LIMIT)) {
                setValidationError(prevState => ({
                    ...prevState,
                    skillName: `Skill Name must be between ${MIN_CHAR_LIMIT} and ${MAX_NAME_LIMIT} characters`,
                }));
                return;
            }

            if (!isValidField(skillDetails, MIN_CHAR_LIMIT, MAX_DETAILS_LIMIT)) {
                setValidationError(prevState => ({
                    ...prevState,
                    skillDetails: `Skill Details must be between ${MIN_CHAR_LIMIT} and ${MAX_DETAILS_LIMIT} characters`,
                }));
                return;
            }

            // If all fields are valid, proceed with API request
            fetch('http://localhost:3000/api/addSkill', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    skillName,
                    skillDetails,
                }),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        // Reset form fields or perform any other actions after successful skill addition
                        setSkillName('');
                        setSkillDetails('');

                        // Display success message
                        alert('Skill added successfully!');
                    } else {
                        console.error('Error adding skill:', data.message);

                        // Display error message
                        alert('Error adding skill. Please try again.');
                    }
                })
                .catch(error => console.error('Error:', error));
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Row className="justify-content-center" style={rowStyle}>
            <Col md={7}>
                <Form>
                    <Form.Group controlId="skillName">
                        <Form.Label>Skill Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={skillName}
                            onChange={(e) => setSkillName(e.target.value)}
                            isInvalid={!!validationError.skillName}
                        />
                        <Form.Control.Feedback type="invalid">
                            {validationError.skillName}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="skillDetails" className="mt-3">
                        <Form.Label>Skill Details</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={skillDetails}
                            onChange={(e) => setSkillDetails(e.target.value)}
                            isInvalid={!!validationError.skillDetails}
                        />
                        <Form.Control.Feedback type="invalid">
                            {validationError.skillDetails}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button
                        variant="primary"
                        type="button"
                        onClick={handleAddSkill}
                        className="mt-3"
                    >
                        Add Skill
                    </Button>
                </Form>
            </Col>
        </Row>
    );
};

export default AddSkill;
