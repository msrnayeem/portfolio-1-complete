const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { client, connect, close, ObjectId } = require('./js/db');
const app = express();
const port = process.env.PORT || 3000;

const path = require('path');


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.redirect('/ejs/projects');
});

app.get('/ejs/projects/add', (req, res) => {
    res.render('addProject');
});


app.post('/ejs/projects/add', async (req, res) => {
    try {
        await connect();
        const db = client.db('portfolio');
        const projectsCollection = db.collection('projects');

        await projectsCollection.insertOne({
            projectName: req.body.projectName,
            projectStack: req.body.projectStack,
            projectDetails: req.body.projectDetails,
        });

        res.redirect('/ejs/projects');
    } catch (error) {
        console.error('Error adding project:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    } finally {
        await close();
    }
});



app.get('/ejs/projects', async (req, res) => {
    try {
        await connect();

        const db = client.db('portfolio');
        const projectsCollection = db.collection('projects');

        const projects = await projectsCollection.find({}).toArray();
        res.render('projects', { projects });
    } catch (error) {
        console.error('Error getting projects:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    } finally {
        await close();
    }
});


app.get('/ejs/projects/edit/:id', async (req, res) => {
    try {

        await connect();

        const db = client.db('portfolio');
        const projectsCollection = db.collection('projects');
        const projectId = new ObjectId(req.params.id);

        const project = await projectsCollection.findOne({ _id: projectId });

        res.render('editProject', { project });
    } catch (error) {
        console.error('Error getting project for edit:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    } finally {

        await close();
    }
});


app.post('/ejs/projects/update/:id', async (req, res) => {
    try {
        await connect();

        const db = client.db('portfolio');
        const projectsCollection = db.collection('projects');

        const projectId = new ObjectId(req.params.id);

        await projectsCollection.updateOne(
            { _id: projectId },
            { $set: { projectName: req.body.projectName, projectStack: req.body.projectStack, projectDetails: req.body.projectDetails } }
        );

        res.redirect('/ejs/projects');
    } catch (error) {
        console.error('Error updating project:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    } finally {
        await close();
    }
});



app.post('/ejs/projects/delete/:id', async (req, res) => {
    try {
        await connect();

        const db = client.db('portfolio');
        const projectsCollection = db.collection('projects');

        const projectId = new ObjectId(req.params.id);

        await projectsCollection.deleteOne({ _id: projectId });

        res.redirect('/ejs/projects');
    } catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    } finally {
        // Close the MongoDB connection
        await close();
    }
});


app.get('/ejs/skills/add', (req, res) => {
    res.render('addSkill');
});
app.post('/ejs/skills/add', async (req, res) => {
    try {
        await connect();
        const db = client.db('portfolio');
        const skillsCollection = db.collection('skills');
        const { skillName, skillDetails } = req.body;

        await skillsCollection.insertOne({ skillName, skillDetails });
        res.redirect('/ejs/getSkills');
    } catch (error) {
        console.error('Error adding skill:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    } finally {
        await close();
    }
});

app.get('/ejs/getSkills', async (req, res) => {
    try {
        // Connect to MongoDB
        await connect();

        // Access the 'skills' collection in the database
        const db = client.db('portfolio');
        const skillsCollection = db.collection('skills');

        // Fetch all skills from MongoDB
        const skills = await skillsCollection.find({}).toArray();

        // Render the EJS view and pass the skills data to it
        res.render('skills', { skills });
    } catch (error) {
        console.error('Error getting skills:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    } finally {
        // Close the MongoDB connection
        await close();
    }
});



app.get('/ejs/skills/edit/:id', async (req, res) => {
    try {
        // Connect to MongoDB
        await connect();

        // Access the 'skills' collection in the database
        const db = client.db('portfolio');
        const skillsCollection = db.collection('skills');

        // Fetch the skill with the provided ID
        const skill = await skillsCollection.findOne({ _id: new ObjectId(req.params.id) });

        // Render the EJS edit view and pass the skill data to it
        res.render('editSkill', { skill });
    } catch (error) {
        console.error('Error getting skill for edit:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    } finally {
        // Close the MongoDB connection
        await close();
    }
});


app.post('/ejs/skills/update/:id', async (req, res) => {
    try {
        // Connect to MongoDB
        await connect();

        // Access the 'skills' collection in the database
        const db = client.db('portfolio');
        const skillsCollection = db.collection('skills');

        // Update the skill with the provided ID
        await skillsCollection.updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: { skillName: req.body.skillName, skillDetails: req.body.skillDetails } }
        );

        // Redirect to the skills page or another appropriate route
        res.redirect('/ejs/getSkills');
    } catch (error) {
        console.error('Error updating skill:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    } finally {
        // Close the MongoDB connection
        await close();
    }
});


app.post('/ejs/skills/delete/:id', async (req, res) => {
    try {
        // Connect to MongoDB
        await connect();

        // Access the 'skills' collection in the database
        const db = client.db('portfolio');
        const skillsCollection = db.collection('skills');

        // Delete the skill with the provided ID
        await skillsCollection.deleteOne({ _id: new ObjectId(req.params.id) });

        // Redirect to the skills page or another appropriate route
        res.redirect('/ejs/getSkills');
    } catch (error) {
        console.error('Error deleting skill:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    } finally {
        // Close the MongoDB connection
        await close();
    }
});



app.get('/api/getSkills', async (req, res) => {
    try {
        // Connect to MongoDB
        await connect();

        // Access the 'skills' collection in the database
        const db = client.db('portfolio');
        const skillsCollection = db.collection('skills');

        // Fetch all skills from MongoDB
        const skills = await skillsCollection.find({}).toArray();

        res.json({ success: true, skills });
    } catch (error) {
        console.error('Error getting skills:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    } finally {
        // Close the MongoDB connection
        await close();
    }
});



app.post('/api/addSkill', async (req, res) => {
    try {
        // Extract skill data from the request body
        const { skillName, skillDetails } = req.body;

        // Connect to MongoDB
        await connect();

        // Access the 'skills' collection in the database
        const db = client.db('portfolio');
        const skillsCollection = db.collection('skills');

        // Insert the skill data into MongoDB
        const result = await skillsCollection.insertOne({
            skillName,
            skillDetails,
        });

        res.json({ success: true, message: 'Skill added successfully', skillId: result.insertedId });
    } catch (error) {
        console.error('Error adding skill:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    } finally {
        // Close the MongoDB connection
        await close();
    }
});


app.get('/api/getSkill/:skillId', async (req, res) => {
    try {
        // Extract skill ID from the request parameters
        const skillId = req.params.skillId;

        // Connect to MongoDB
        await connect();

        // Access the 'skills' collection in the database
        const db = client.db('portfolio');
        const skillsCollection = db.collection('skills');

        // Fetch the skill by ID from MongoDB
        const skill = await skillsCollection.findOne({ _id: new ObjectId(skillId) });

        if (skill) {
            res.json({ success: true, skill });
        } else {
            res.status(404).json({ success: false, message: 'Skill not found' });
        }
    } catch (error) {
        console.error('Error getting skill by ID:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    } finally {
        // Close the MongoDB connection
        await close();
    }
});


app.put('/api/updateSkill/:skillId', async (req, res) => {
    try {
        // Extract skill ID from the request parameters
        const skillId = req.params.skillId;

        // Extract skill data from the request body
        const { skillName, skillDetails } = req.body;

        // Connect to MongoDB
        await connect();

        // Access the 'skills' collection in the database
        const db = client.db('portfolio');
        const skillsCollection = db.collection('skills');

        // Update the skill by ID
        const result = await skillsCollection.updateOne(
            { _id: new ObjectId(skillId) },
            { $set: { skillName, skillDetails } }
        );

        if (result.modifiedCount === 1) {
            res.json({ success: true, message: 'Skill updated successfully' });
        } else {
            res.status(404).json({ success: false, message: 'Skill not found' });
        }
    } catch (error) {
        console.error('Error updating skill:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    } finally {
        // Close the MongoDB connection
        await close();
    }
});


app.post('/api/addProject', async (req, res) => {
    try {
        // Extract project data from the request body
        const { projectName, projectDetails, projectStack } = req.body;

        // Connect to MongoDB
        await connect();

        // Access the 'projects' collection in the database
        const db = client.db('portfolio');
        const projectsCollection = db.collection('projects');

        // Insert the project data into MongoDB
        const result = await projectsCollection.insertOne({
            projectName,
            projectDetails,
            projectStack,
        });

        res.json({ success: true, message: 'Project added successfully', projectId: result.insertedId });
    } catch (error) {
        console.error('Error adding project:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    } finally {
        // Close the MongoDB connection
        await close();
    }
});


app.get('/api/getProjects', async (req, res) => {
    try {
        await connect();
        const db = client.db('portfolio');
        const projectsCollection = db.collection('projects');

        const projects = await projectsCollection.find({}).toArray();

        res.json({ success: true, projects });
    } catch (error) {
        console.error('Error getting projects:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    } finally {
        await close();
    }
});

app.get('/api/getProject/:projectId', async (req, res) => {
    try {
        const projectId = req.params.projectId;
        await connect();

        const db = client.db('portfolio');
        const projectsCollection = db.collection('projects');
        const project = await projectsCollection.findOne({ _id: new ObjectId(projectId) });

        if (project) {
            res.json({ success: true, project });
        } else {
            res.status(404).json({ success: false, message: 'Project not found' });
        }
    } catch (error) {
        console.error('Error getting Project by ID:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    } finally {
        await close();
    }
});

app.put('/api/updateProject/:projectId', async (req, res) => {
    try {
        const projectId = req.params.projectId;
        const { projectName, projectStack, projectDetails } = req.body;
        await connect();

        const db = client.db('portfolio');
        const projectsCollection = db.collection('projects');

        const result = await projectsCollection.updateOne(
            { _id: new ObjectId(projectId) },
            { $set: { projectName, projectStack, projectDetails } }
        );

        if (result.modifiedCount === 1) {
            res.json({ success: true, message: 'projects updated successfully' });
        } else {
            res.status(404).json({ success: false, message: 'projects not found' });
        }
    } catch (error) {
        console.error('Error updating projects:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    } finally {
        await close();
    }
});

app.delete('/api/deleteProject/:projectId', async (req, res) => {
    try {
        const projectId = req.params.projectId;
        await connect();
        const db = client.db('portfolio');
        const projectsCollection = db.collection('projects');
        const result = await projectsCollection.deleteOne({ _id: new ObjectId(projectId) });

        if (result.deletedCount === 1) {
            res.json({ success: true, message: 'Project deleted successfully' });
        } else {
            res.status(404).json({ success: false, message: 'Project not found' });
        }
    } catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    } finally {
        await close();
    }
});

app.delete('/api/deleteSkill/:skillId', async (req, res) => {
    try {
        const skillId = req.params.skillId;
        await connect();
        const db = client.db('portfolio');
        const skillsCollection = db.collection('skills');

        const result = await skillsCollection.deleteOne({ _id: new ObjectId(skillId) });

        if (result.deletedCount === 1) {
            res.json({ success: true, message: 'Skill deleted successfully' });
        } else {
            res.status(404).json({ success: false, message: 'Skill not found' });
        }
    } catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    } finally {
        await close();
    }
});


app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
