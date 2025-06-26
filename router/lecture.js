const express = require('express');

const router = express.Router();
const joi = require('joi');
router.use(express.json());

const lectures = [
    {
    "id" : 1,
     "name" : "Flutter",
     "major" : "it",
    },
    {
    "id" : 3,
     "name" : "CS 301",
     "major" : "it"
    }
]

//get
router.get('/hi',(req,res)=>{
    res.send('Hello from Get ')
})
//get lecture

router.get('/',(req,res)=> {
    res.json(lectures)
})

router.get('/:id',(req,res)=> {
    const lecture = lectures.find((lec) => lec.id === parseInt(req.params.id)) //true // false
    if(lecture){
        res.status(200).json(lecture)
    }
    else{
        res.status(404).json({"message" : "Not found"})
    }
})

//post 
router.post('/',(req,res) => {
    //condition

const {error}=validateToPost(req.body);
if(error){
    res.status(400).json(error.details[0].message);
}

   const lecture =
   { 
    id : lectures.length + 1,
    name : req.body.name,
    major : req.body.major}

    lectures.push(lecture);
    res.status(201).json(lecture);
})

//put

router.put('/:id',(req,res) => {
const {error} = validateToUpdate(req.body);
if(error) {
    return res.status(400).json(error.details[0].message);
}

const lecture = lectures.find(hashem => hashem.id === parseInt(req.params.id));
if(lecture){
    res.status(200).json({'msg' : 'updated'});
}
else{
    res.status(404).json({'msg' : 'not found'});
}
})

//delete 
router.delete('/:id',(req,res) => {
    const lec = lectures.find(lec => lec.id === parseInt(req.params.id));
    if(lec){
        res.status(200).json({'msg' : 'Deleted'});
    }
    else{
    res.status(404).json({'msg' : 'not found'});
    }
}
)
function validateToPost(body){
    const scm =joi.object({
    name : joi.string().trim().min(6).required(),
    major : joi.string().trim().min(6).required()})

   return scm.validate(body);

}

function validateToUpdate(body){
    const scm =joi.object({
    name : joi.string().trim().min(6),
    major : joi.string().trim().min(6)})

   return scm.validate(body);
}

module.exports = router;