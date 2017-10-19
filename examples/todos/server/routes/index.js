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
	console.log("addtodo post req got");
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

//===
router.post('/todos/', (req, res) => {
	console.log("updatetodos, post req got, todos: ");
	const todos = req.body.todos; //assume req.body={ todos: [doc1, doc2, doc3, ...] } --> [doc1, doc2, ...]
	if(todos) console.log(JSON.stringify(todos));
	else console.log("empty body???");

	//	db.collection('todos').updateOne({"completed": {$ne: item.completed}}, 

	var bulktodos = todos.map(function (item, index, array) {

		return { "updateOne" : 
			{ "filter" : { "id": {$eq: item.id} ,"completed" : {$ne:item.completed } }, 
				"update" : { 
					$set : { "completed" : item.completed } ,
					$currentDate: { lastModified: true }
				}
			}
		} 

	});
	console.log("bulktodos==> " + JSON.stringify(bulktodos));

	try { db.collection('todos').bulkWrite( bulktodos ); } 
	catch (e) { console.log("error occurred in router.post('/todos'): " + e); }


});


//===
router.put('/update_item/', (req, res) => {
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

router.delete('/delete_item/:id', (req, res) => {
	const id_todel = parseInt(req.params.id);
	console.log(typeof(id_todel));
	console.log("id_todel=" + id_todel);

	db.collection('todos')
		.remove({ id: id_todel }, (err, result) => {
			if (err) {
				console.log('error ', err);
			} else {
				res.json({id: id_todel, data:result});
			}
		});
});

module.exports = router;
