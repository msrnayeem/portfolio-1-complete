import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';


const EditSkill = () => {
    const { skillId } = useParams();
    const [skillName, setSkillName] = useState('');
    const [skillDetails, setSkillDetails] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        // Fetch the skill data by ID when the component mounts
        const fetchSkill = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/getSkill/${skillId}`);
                const data = await response.json();

                if (data.success) {
                    const { skill } = data;
                    setSkillName(skill.skillName);
                    setSkillDetails(skill.skillDetails);
                } else {
                    console.error('Error fetching skill:', data.message);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchSkill();
    }, [skillId]);

    const handleEditSkill = async (e) => {
        e.preventDefault();

        // Perform API request to update the skill
        try {
            const response = await fetch(`http://localhost:3000/api/updateSkill/${skillId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    skillName,
                    skillDetails,
                }),
            });

            const data = await response.json();

            if (data.success) {
                setSkillName('');
                setSkillDetails('');
                alert('Skill updated successfully!');
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
                    <Form.Group controlId="skillName">
                        <Form.Label>Skill Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={skillName}
                            onChange={(e) => setSkillName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="skillDetails" className="mt-3">
                        <Form.Label>Skill Details</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={skillDetails}
                            onChange={(e) => setSkillDetails(e.target.value)}
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

export default EditSkill;
