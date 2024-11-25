# Mongoose Demo: CRUD Application with Express and MongoDB

## **Overview**

This project helps you build a basic **CRUD** application using **Mongoose**, **Express**, and **MongoDB**. You'll learn to:

1. Create and manage a MongoDB database.
2. Use Mongoose to define schemas and interact with the database.
3. Develop RESTful API routes for CRUD operations.
4. Test API routes using **Postman** and explore them through a minimal front-end.

---

## **Features**

- **CRUD Operations**:
  - **Create**: Add plants to the database.
  - **Read**: Fetch plant details.
  - **Update**: Modify plant attributes.
  - **Delete**: Remove plants from the database.
- **Mongoose Schema**:
  - Enforces structure on plant data with validation and constraints.
- **Error Handling**:
  - Gracefully handles issues like duplicates or missing fields.
- **Initial Database Load**:
  - Loads your database with 10 starter documents. 

---

## **File Structure**

```plaintext
├── controllers
│   └── PlantController.js    # CRUD logic and middleware
├── models
│   └── PlantModel.js         # Defines the schema for plants
├── routes
│   └── plantRoutes.js        # Routes and their corresponding controller methods
├── public
│   └── index.html            # Minimal UI for interacting with the API
├── main.js                   # Entry point for the application
├── .env                      # Environment variables (MongoDB URI) - must be created by the user, used by the `dotenv` library
├── package.json              # Dependencies and scripts
└── README.md                 # Documentation
```

---

## **Getting Started**

### **Requirements**

- **Node.js** (v14+ recommended)
- **MongoDB** (local or cloud-based instance)

### **Setup Instructions**

1. Fork and clone the repository:
   ```bash
   git clone <repo-url>
   cd mongoose_demo
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up a MongoDB database (see the section below for details).

4. Create a `.env` file in the project root:
   ```plaintext
   MONGO_URI=<your-mongo-db-uri>
   ```

5. Start the server:
   ```bash
   npm start
   ```
   The server runs on [http://localhost:3000](http://localhost:3000). The front-end is served at the root route. 

---

## **Setting Up a MongoDB Database**

### **Option 1: MongoDB Atlas (Cloud)**

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas) and create a free account.

2. Create a cluster:
   - Choose your cloud provider and region.
   - Click "Create Cluster."

3. Configure a database user:
   - Go to **Database Access** and click "Add New Database User."
   - Set a username and password. Copy the password for later.

4. Whitelist your IP:
   - Go to **Network Access** and click "Add IP Address."
   - Add your current IP or allow access from anywhere with `0.0.0.0/0`.

5. Get your connection string:
   - Go to **Clusters** and click "Connect."
   - Choose **Connect your application** and copy the connection string.

6. Update your `.env` file:
   Replace `<password>` with your database user's password and `<database-name>` with the name of your database:
   ```plaintext
   MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority
   ```

   **Important:** Pay special attention to `<database-name>`. If you don't specify a database name here, MongoDB will create a default database called **"test"** and store your collection in it. It's a good practice to explicitly name your database to keep your collections organized and easy to identify.

7. Alternatively, replace the argument of `mongoose.connect` in `main.js` with your connection string. Uploading this to GitHub is a security risk. 

### **Understanding the Connection String**

- `mongodb+srv`: Indicates the use of the SRV protocol.
- `<username>` and `<password>`: Your database credentials.
- `<cluster-url>`: The cluster's unique URL.
- `<database-name>`: The database name where your collections will be stored.
- Query parameters like `retryWrites=true` configure connection behavior.

### **Option 2: Local MongoDB**

1. Download and install [MongoDB Community Server](https://www.mongodb.com/try/download/community).

2. Start the MongoDB server:
   ```bash
   mongod
   ```

3. Use this connection string in your `.env` file:
   ```plaintext
   MONGO_URI=mongodb://localhost:27017/<database-name>
   ```
   
4. Alternatively, replace the argument of `mongoose.connect` in `main.js` with your connection string.


---

## **Testing the API**

### **Postman**

Use Postman to test the following endpoints:

1. **Create a Plant**  
   **POST** `/plants`  
   **Body**:
   ```json
   {
     "name": "POMEGRANATE",
     "type": "Fruit",
     "price": 30
   }
   ```

2. **Read a Plant**  
   **GET** `/plants/:name`
   - `plants/ROSE`

4. **Update a Plant**  
   **PATCH** `/plants/:name`  
   **Body**:
   ```json
   {
     "price": 20
   }
   ```

5. **Delete a Plant**  
   **DELETE** `/plants/:name`
   - `plants/ROSE`

### **Front-end**

Open `index.html` in your browser by going to the root route at [http://localhost:3000](http://localhost:3000) to interact with the API. Use the forms provided to make requests and view responses.

---

## **Learning Goals**

- Learn how to:
  1. Define Mongoose schemas and models.
  2. Create middleware for CRUD operations.
  3. Build RESTful API routes in Express.
  4. Test APIs with Postman.
- Explore error handling and debugging techniques.
- Understand the flow of data between the front end, back end, and database.

---

## **Additional Resources**

- [Mongoose Documentation](https://mongoosejs.com/docs/guide.html)
- [MongoDB Atlas Guide](https://www.mongodb.com/docs/atlas/)
- [Postman Guide](https://learning.postman.com/)


## **Code Overview**

### **1. Mongoose Schema and Model**
File: `models/PlantModel.js`  
Defines a `Plant` schema with `name`, `type`, and `price`, and `family` fields. The `name` field has a unique constraint to prevent duplicates. The `family` field is optional.

### **2. Controller Logic**
File: `controllers/PlantController.js`  
Implements:
- `createPlant`: Adds a new plant.
- `getPlant`: Retrieves a plant by name.
- `updatePlant`: Updates a plant's details.
- `deletePlant`: Removes a plant.
- `loadInitialPlants`: Preloads the database with predefined plants.

### **3. Routes**
File: `routes/plantRoutes.js`  
Defines the API endpoints and links them to controller methods.

---

## **Useful Tips for Students**

1. **Focus on API Testing**:
   - Use **Postman** or **cURL** to send requests and inspect responses.
   - Experiment with different inputs to understand how the API behaves.

2. **Understand Mongoose Queries**:
   - Refer to the [Mongoose documentation](https://mongoosejs.com/docs/queries.html) to learn more about methods like `create`, `findOne`, `findOneAndUpdate`, etc.

3. **Debugging**:
   - Use `console.log` in the controller and model files to trace the flow of data.

4. **Handling Errors**:
   - Observe how errors (e.g., duplicate keys, missing fields) are managed in the `PlantController`.

---

Feel free to modify the code and experiment to solidify your understanding of Express and Mongoose!
