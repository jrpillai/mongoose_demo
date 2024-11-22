# # Mongoose Demo: CRUD Application with Express and MongoDB

## **Overview**

This repository is a simple demonstration of using **Mongoose** with **Express** to interact with a **MongoDB** database. It provides a basic backend implementation for a plant store with full CRUD operations, allowing students to practice database interactions and explore RESTful APIs.

The front end is minimal and exists solely for testing API requests and responses through the browser console. Students are encouraged to also use **Postman** or similar tools for testing.

---

## **Features**

1. **CRUD Operations:**
   - **Create**: Add new plants to the database.
   - **Read**: Retrieve plant details by name.
   - **Update**: Modify plant attributes by name.
   - **Delete**: Remove plants from the database by name.

2. **Preloaded Data**:
   - When the server starts, it populates the database with a predefined list of plants.

3. **Error Handling**:
   - Handles common errors like duplicates or missing data with appropriate responses.

4. **Frontend Console Logging**:
   - Provides feedback in the browser for API requests and responses.

---

## **File Structure**

```plaintext
├── controllers
│   └── PlantController.js    # Handles the business logic for CRUD operations
├── models
│   └── PlantModel.js         # Mongoose schema and model definition
├── public
│   └── index.html            # Minimal front end for testing API requests
├── routes
│   └── plantRoutes.js        # Express routes for plant-related endpoints
├── main.js                   # Entry point for the Express application
├── .env                      # Environment variables (e.g., MongoDB URI)
├── package.json              # Project metadata and dependencies
├── package-lock.json         # Dependency lock file
└── README.md                 # Project documentation
```

---

## **Getting Started**

### **1. Prerequisites**

Ensure you have the following installed:
- **Node.js** (v14+ recommended)
- **MongoDB** (local instance or cloud database)

### **2. Installation**

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd mongoose_demo
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```plaintext
   MONGO_URI=<your-mongo-db-connection-string>
   ```

4. Start the application:
   ```bash
   npm start
   ```

   The server will run on `http://localhost:3000`.

---

## **Testing the API**

### **Frontend**
Open `index.html` in the browser:
- The front end includes forms for creating, reading, updating, and deleting plants.
- Request and response details will be displayed on the page and logged in the browser console.

### **Postman or Similar Tools**
Use the following endpoints:

1. **Create a Plant**  
   **POST** `/plants`  
   Request Body:
   ```json
   {
     "name": "Rose",
     "type": "Flower",
     "price": 10
   }
   ```

2. **Get a Plant by Name**  
   **GET** `/plants/:name`

3. **Update a Plant by Name**  
   **PATCH** `/plants/:name`  
   Request Body:
   ```json
   {
     "type": "Shrub",
     "price": 12
   }
   ```

4. **Delete a Plant by Name**  
   **DELETE** `/plants/:name`

---

## **Code Overview**

### **1. Mongoose Schema and Model**
File: `models/PlantModel.js`  
Defines a `Plant` schema with `name`, `type`, and `price` fields. The `name` field has a unique constraint to prevent duplicates.

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

## **Future Improvements**
This project can be extended to include:
- Validation for user inputs.
- Enhanced front-end interface.
- Pagination for `GET` requests to list multiple plants.

---

Feel free to modify the code and experiment to solidify your understanding of Express and Mongoose!
