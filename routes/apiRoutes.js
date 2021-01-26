const fs = require("fs");
var data = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"));
const router = require("express").Router();



    router.get("/api/notes", function(req, res) {
       
        res.json(data);

    });

    router.get("/api/notes/:id", function(req, res) {

        res.json(data[Number(req.params.id)]);

    });


    router.post("/api/notes", function(req, res) {

        let newNote = req.body;
        let newId = (data.length).toString();
        console.log(newId);
        newNote.id = newId;
        data.push(newNote);
        
        fs.writeFileSync("./db/db.json", JSON.stringify(data), function(err) {
            if (err) throw (err);        
        }); 

        res.json(data);    

    });

    
    router.delete("/api/notes/:id", function(req, res) {

        let noteId = req.params.id;
        let newId = 0;
        console.log(`Deleting note with id ${noteId}`);
        data = data.filter(currentNote => {
           return currentNote.id != noteId;
        });
        for (currentNote of data) {
            currentNote.id = newId.toString();
            newId++;
        }
        fs.writeFileSync("./db/db.json", JSON.stringify(data));
        res.json(data);
    }); 

module.exports = router;