const express     = require('express');
const bodyParser  = require('body-parser');
const cors        = require('cors');
const MongoClient = require('mongodb').MongoClient;

const router = express.Router();

router.use(cors());

var db;

// MongoDB Connector
MongoClient.connect('mongodb://localhost/tododb', (err, dbConnection) => {
	if (err) {
		console.log('mongodb  connect error!');
	} else {
		db = dbConnection;
	}
});


//=== router.get('/todos?s=', (req, res) => {
//=== the filtering operation is usually done in client side rather than in server side
router.get('/todos', (req, res) => {
	var s= req.query.s;
	var qryObj={};

	if(!s) qryObj={};
	else qryObj={$text: { $search: s }}; 
	console.log("search= "+ s + ", qryObj=" + JSON.stringify(qryObj));

	db.collection('todos')
		.find(qryObj)
		.sort({ id: -1 })
		.toArray((err, docs) => {
			if (err) {
				console.log('error on /api/todos', err)
			} else {
				res.json(docs);
			}
		});
});
router.get('/todo/:id', (req, res) => {
	db.collection('todos')
		.find({id:parseInt(req.params.id)})
		.next((err, doc) => {
			if (err) {
				console.log('error ', err)
			} else {
				res.json(doc);
			}
		});
});



//===

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/addtodo/', (req, res) => {
	console.log("post req got");
	const newNoteData = req.body;
	console.log("newNoteData: ");
	if(newNoteData) console.log(JSON.stringify(newNoteData));
	else console.log("empty body???");


	// Get Latest ID
	db.collection('todos').find()
		.sort({ id: -1 })
		.limit(1)
		.next((err, doc) => {
			if (err) {
				console.log('error ', err);
			} else {
				newNoteData.id = doc.id + 1;
				newNoteData.date= new Date();
				// Store newNoteData to DB
				db.collection('todos').insertOne(newNoteData, (errInsert, result) => {
					if (err) {
						console.log('error ', err);
					} else {
						const newId = result.insertedId ;
						//console.log("insert result: " + JSON.stringify(result));

						db.collection('todos').find({_id: newId }).next((errInner, docInsert) => {
							if (errInner) {
								console.log('error ', errInner);
							} else {
								console.log("addtodo resp:" + JSON.stringify(docInsert));
								res.json(docInsert);
							}
						});
					}
				});
			}
		});
});

router.put('/update/', (req, res) => {
	const updatedNoteData = req.body;

	// Update updatedNoteData to DB
	db.collection('todos')
		.update({ id: updatedNoteData.id }, { $set: updatedNoteData }, (err) => {
			if (err) {
				console.log(err);
			} else {
				db.collection('todos')
					.find({ id: updatedNoteData.id })
					.next((errInner, doc) => {
						if (errInner) {
							console.log('error ', errInner);
						} else {
							res.json(doc);
						}
					})
			}
		})
});

router.delete('/delete/', (req, res) => {
	const deletedNoteDataId = req.body.id;
	db.collection('todos')
		.remove({ id: deletedNoteDataId }, (err, result) => {
			if (err) {
				console.log('error ', err);
			} else {
				res.json(result);
			}
		});
});

module.exports = router;
