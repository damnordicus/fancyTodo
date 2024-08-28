const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex')(require('./knexfile')['development']);
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/login', async (req, res) => {
    const {username, password} = req.body;
   
    try{
        const user = await knex('users').select('*')
                        .where({username});
        if(user && user[0].password === password){
            res.status(200).send(user);
        }else {
            res.status(401).json({ message: 'Invalid username or password'});
        }
        
    } catch(error){
        console.error(error);
        res.status(500).json({ message: 'Internal server error...or something like that'});        
    }
});

app.get('/users', async (req, res) => {
    const users = await knex('users').select('*').where({is_admin: false});
    if(users){
        res.status(200).send(users);
    }else{
        res.status(404).json({message: "Could not find users"});
    }
})

app.post('/users', async (req, res) => {
    const {username: name, password: pass, is_admin: isAdmin} = req.body;
    console.log(req.body);
    const users = await knex('users').insert({ username: name, password: pass, is_admin: isAdmin});
    if(users){
        res.status(200).json({ message: "Successfull"});
    }else{
        res.status(404).json({message: "Could not add user"});
    }
})

app.get('/tasks', async (req, res) => {
    const tasks = await knex('tasks').select('*').join("users", "users.id", "=", "tasks.creator_id");
    if(tasks){
        res.status(200).send(tasks);
    }else{
        res.status(404).json({message: "Could not find any tasks"});
    }
})
app.get('/tasks/creator/:id', async (req, res) => {
    const id  = parseInt(req.params.id);
    const tasks = await knex('tasks').select('*').where({creator_id: id});
    
    if(tasks){
        res.status(200).send(tasks);
    }else{
        res.status(404).json({message: "Could not find any tasks"});
    }
})
app.post('/tasks/creator/:id', async (req, res) => {
    const id  = parseInt(req.params.id);
    const { title, creator_id, group_id } = req.body;
    let temp = 0;
    if(creator_id === -1){
        temp = id;
    }else{
        temp = creator_id;
    }

    try {
        await knex('tasks').insert({title: title, is_complete: false, creator_id: temp, group_id: group_id});
        res.status(200).json({message: "Added new task!"});
       
    }catch(error){
        console.error(error);
    }
    
})
app.patch('/tasks/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const { value, comments } = req.body;
    try {
        await knex('tasks').where({ id: id }).update({ title: value, comments: comments });

        res.status(200).json({ message: "Updated" });

    } catch (error) {
        console.error(error);
    }
})
app.patch('/tasks/:id/checked', async (req, res) => {
    const id = parseInt(req.params.id);
    const { is_complete } = req.body;
    try {
        await knex('tasks').where({ id: id }).update({ is_complete: is_complete });

        res.status(200).json({ message: "Updated" });

    } catch (error) {
        console.error(error);
    }
})

app.delete('/tasks/:id', async (req, res) => {
    const id  = parseInt(req.params.id);
   try {
        await knex('tasks').where({id: id}).del();
       
        res.status(200).json({message: "Deleted"});
      
   }catch(error){
    console.error(error);
   }
})

app.patch('/group/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const { posX, posY } = req.body;
    try{
        await knex('group').where({group_id: id}).update({ posX: posX, posY: posY});

        res.status(200).json({ message: "Updated"});
    } catch(error){
        console.error(error);
    }
})

app.get('/group/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const positions = await knex('group').select('*').where({ group_id: id});

    if(positions){
        res.status(200).send(positions);
    }else{
        res.status(404).json({message: "Could not find any positions"});
    }
})

app.listen(8080, () => {
    console.log("Server running.");
})