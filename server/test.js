
const image = { rows : [
	{
		"post_id": 2,
		"user_id": 1,
		"post_description": "qwerty Karl naunsa naka?",
		"photos_id": null,
		"price": 100,
		"tree_id": null,
		"date_posted": "2016-06-22T11:10:25.000Z",
		"date_post_edited": null
	},
	{
		"post_id": 3,
		"user_id": 1,
		"post_description": "qwerty Karl naunsa naka?",
		"photos_id": null,
		"price": 100,
		"tree_id": null,
		"date_posted": "2016-06-22T11:10:25.000Z",
		"date_post_edited": null
	},
	{
		"post_id": 4,
		"user_id": 1,
		"post_description": "qwerty Karl naunsa naka?",
		"photos_id": null,
		"price": 100,
		"tree_id": null,
		"date_posted": "2022-11-23T13:37:03.000Z",
		"date_post_edited": null
	},
	{
		"post_id": 5,
		"user_id": 1,
		"post_description": "qwerty Karl naunsa naka?",
		"photos_id": null,
		"price": 100,
		"tree_id": null,
		"date_posted": "2022-11-23T13:49:30.554Z",
		"date_post_edited": null
	},
	{
		"post_id": 6,
		"user_id": 1,
		"post_description": "qwerty Karl naunsa naka?",
		"photos_id": null,
		"price": 100,
		"tree_id": null,
		"date_posted": "2022-11-23T13:49:45.556Z",
		"date_post_edited": null
	}
]}

// console.log(image.rows[])

// const ids = image.rows.map((obj) => obj);
// console.log(ids)


//   // if (image.rows.length === 0) {
//   //    console.log("Array is empty!") 
//   //   }
//   // else if (image.rows.length === 1) {
//   //   console.log(image.rows[0]) 
//   // }


// const convo = {
//   "conversation_id": 2,
//   "members": [
//       "3",
//       "4"
//   ],
//   "createdat": "2016-06-22T03:10:25.000Z",
//   "updatedat": null
// }

// console.log(convo.members)
// const friendId = convo.members.map(Number).find((m) => m !== 3)
// // const friendId = convo.members.map(Number)
// console.log(friendId)

// let photos = [
// 	{
// 	  fieldname: 'photos',
// 	  originalname: '1-Ash_Tree.jpg',
// 	  encoding: '7bit',
// 	  mimetype: 'image/jpeg',
// 	  destination: './public/images',
// 	  filename: '1670233998720--1-Ash_Tree.jpg',
// 	  path: 'public\\images\\1670233998720--1-Ash_Tree.jpg',
// 	  size: 62796
// 	},
// 	{
// 	  fieldname: 'photos',
// 	  originalname: '27_Maple_Tree.jpg',
// 	  encoding: '7bit',
// 	  mimetype: 'image/jpeg',
// 	  destination: './public/images',
// 	  filename: '1670233998721--27_Maple_Tree.jpg',
// 	  path: 'public\\images\\1670233998721--27_Maple_Tree.jpg',
// 	  size: 367069
// 	}
//   ]
//   let filename = photos.map((obj) => obj.filename);
//   console.log(filename.map())

// {
// 	revealForm? (<form onSubmit={onSubmitForm}>
// 		<button type="button" className="btn-close" aria-label="Close" onClick={handleClick}></button>
		
// 		<div className="form-floating mb-4">
// 			<input
// 				type="text"
// 				id="postContent"
// 				name="tree_name"
// 				className="form-control"
// 				placeholder="Optional"
// 				value={tree_name}
// 				onChange={e => onChange(e)} />
// 			<label className="form-label" htmlFor="form2Example1">Tree Name</label>
// 		</div>
// 		<div className="form-floating mb-4">
// 			<input
// 				type="text"
// 				id="postContent"
// 				name="tree_descr"
// 				className="form-control"
// 				value={tree_descr}
// 				onChange={e => onChange(e)} />
// 			<label className="form-label" htmlFor="form2Example1">Tree Description</label>
// 		</div>
// 		{/* <div className="form-floating mb-4">
// 			<input
// 				type="text"
// 				id="postContent"
// 				name="price"
// 				className="form-control"
// 				value={price}
// 				onChange={e => onChange(e)} />
// 			<label className="form-label" htmlFor="form2Example1">Price</label>
// 		</div> */}
// 		<div className="form-floating mb-4">
// 			<input
// 				type="text"
// 				id="postContent"
// 				name="note"
// 				className="form-control"
// 				value={note}
// 				onChange={e => onChange(e)} />
// 			<label className="form-label" htmlFor="form2Example1">Note</label>
// 		</div>
// 		<div className="mb-3">
// 			<label htmlFor="formFileMultiple" className="form-label">Upload Image/s</label>
// 			<input className="form-control" type="file" id="formFileMultiple" onChange={fileOnChange} multiple />
// 		</div>
// 		<button type="submit" className="btn btn-primary btn-block mb-4">Post</button>
// 	</form>):
// 	(<button className="btn btn-primary btn-block mb-4" onClick={handleClick}>Post Something</button>)
// }

// const empty = {1234:1234};

// /* -------------------------
//   Plain JS for Newer Browser
// ----------------------------*/
// Object.keys(empty).length === 0 && empty.constructor === Object
// // true
// console.log(Object.keys(empty).length === 0 && empty.constructor === Object)

let str = "We'll could've";
let rep = str.replace(/'/g, "''");
console.log(rep)