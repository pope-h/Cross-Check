const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3001;

const allowedOrigins = ["http://localhost:3000", "http://localhost:5173/"];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // Allow requests with no origin
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);
app.use(express.json());

const mongoURI = process.env.MONGO_URI;

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

mongoose.set("strictQuery", true);

const studentSchema = new mongoose.Schema({
  studentAddress: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  course: { type: String, required: true },
  graduationDate: { type: String, required: true },
  certificationApproved: { type: Boolean, default: false },
  certId: { type: String },
});

const Student = mongoose.model("Student", studentSchema);

function errorResponse(res, status, message) {
  return res.status(status).json({ success: false, error: message });
}

app.post("/approve-certification", async (req, res) => {
  try {
    const { studentAddress } = req.body;

    if (!studentAddress) {
      return errorResponse(res, 400, "Student address is required");
    }

    const student = await Student.findOne({ studentAddress });

    if (!student) {
      return errorResponse(res, 404, "Student not found in database");
    }

    const certId = crypto.randomBytes(16).toString("hex");

    student.certId = certId;
    student.certificationApproved = true;
    await student.save();

    res.json({ success: true, message: "Certification approved", certId });
  } catch (error) {
    console.error("Error:", error.message);
    errorResponse(res, 500, error.message);
  }
});

app.get("/certificate", async (req, res) => {
  try {
    const { studentAddress } = req.query;

    if (!studentAddress) {
      return errorResponse(res, 400, "Student address is required");
    }

    const student = await Student.findOne({ studentAddress });

    // if (!student || !student.certificationApproved) {
    //   return errorResponse(res, 404, "Student not approved for certification");
    // }

    res.json({
      success: true,
      certId: student.certId,
      studentName: student.name,
      course: student.course,
      graduationDate: student.graduationDate,
      schoolName: "Your School Name",
      message: "Certificate is ready to be minted",
    });
  } catch (error) {
    console.error("Error:", error.message);
    errorResponse(res, 500, error.message);
  }
});

app.post("/add-student", async (req, res) => {
  try {
    const { studentAddress, name, course, graduationDate } = req.body;

    if (!studentAddress || !name || !course || !graduationDate) {
      return errorResponse(res, 400, "All fields are required");
    }

    const newStudent = new Student({
      studentAddress,
      name,
      course,
      graduationDate,
    });

    await newStudent.save();
    res.json({ success: true, message: "Student added to database" });
  } catch (error) {
    if (error.code === 11000) {
      // MongoDB duplicate key error code
      errorResponse(res, 409, "Student address already exists in the database");
    } else {
      console.error("Error:", error.message);
      errorResponse(res, 500, error.message);
    }
  }
});

app.get("/", (req, res) => {
  res.send("Welcome to Cross Check Application Programming Interface");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});