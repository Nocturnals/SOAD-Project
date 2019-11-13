const express = require("express");
const { verifyToken, verifyUserWithToken } = require("./../auth/helper");
const CompetiitonsModel = require("./../../models/Competititons");



const router = express.Router();


router.get("/allcompetitions"  , (req,res) => {

    var title = CompetiitonsModel.find().select("title");
    
    return res.status(200).json({title});

})


router.post("/register/:id" , verifyToken , verifyUserWithToken , (req,res,next)=>{

    try{
    var comp = await  CompetiitonsModel.findById({
        _id : req.params.id
    })

    
     comp.participants.append({
         id : req.loggedUser._id,
         username : req.loggedUser.username,
         profileurl : req.loggedUser.profileurl
     })

     comp.noofparticipants = comp.nooofparticipants + 1;
    
    
     return res.json({message : "sucessfully registered"})
    }
    catch(error){
        return res.status(500).json({ message: "Competiiton not found" });
    }
    
})




router.post("/createcompetition" , verifyToken , verifyUserWithToken , (req,res,next) =>{
        
        user =  req.loggedUser,
        comp.participants.append({
            id : user._id,
            username : user.username,
            profileurl : user.profileurl
        })

        const comp = new CompetiitonsModel({
            title : req.body.title,
            description : req.body.description,
            starttime : req.body.starttime,
            endtime : req.body.endtime,
            host : host.append(user)

        })


        try {
            const savedcomp = await comp.save();
            res.json(savedcomp);
        } catch (err){
            res.json({message : err});
        }
    
        
    })



// retrieve a comp

router.post("/competition/:id" , verifyToken , verifyUserWithToken , (req,res,next) =>{

    try{
        const comp = await  CompetiitonsModel.findById({
        _id : req.params.id
    })
    return comp
    }
    catch(error){
        return res.status(500).json({ message: "Competiiton not found" });
    }
})




// delete a competition

router.delete("/competition/:id" , verifyToken , verifyUserWithToken , (req,res,next) => {
    
    try{
        var comp = await  CompetiitonsModel.findByIdAndRemove({
        _id : req.params.id
    })
    return res.json(comp)
}
catch(error){
    return res.status(500).json({ message: "Competiiton not found" });
}
})



// update a competition

router.patch("/competition/edit/:id" , verifyToken , verifyUserWithToken , (req,res,next) => {
  
    const comp = await  CompetiitonsModel.findById({
        _id : req.params.id
    })


    var flag =0;

    comp.hosts.forEach(i => {
        if(i._id == req.loggedUser._id){
            flag = 1;
            break;
        }
        
    });

    if(flag)    
    {
  
    try{
        comp.updateone(
            {id : req.params.id},
        {
            $set : {title : req.body.title}
        });
        
        res.json(comp);

}
catch(error){
    res.json({ message :" failed  to update competitiion"})
}
    }
})

// how to add a host


router.post("/addhost" , verifyToken , verifyUserWithToken , (req,res,next)=>{

    var ishost = false;

    
    const comp = await  CompetiitonsModel.findById({
        _id : req.body.compid
    })

    comp.hosts.forEach(i => {
        if(i._id == req.loggedUser._id){
            ishost = true;
            break;
        }   
    });
    
    if(ishost){
        res.send()
    }

})







// router.post("/fetchtop10/:id" , verifyToken , verifyUserWithToken , (req,res,next) => {
//     try{
//         var comp = await  CompetiitonsModel.findById({
//         _id : req.params.id,
        
//         comp.top10 = 
//     }
// })

// function top10(){
//     results.find().sort().limit(10)
// }


// function remaining_time(){
//     return starttime - now
// }