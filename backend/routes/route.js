const router = require("express").Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });  // General file upload config

// Import controllers
const {
  adminRegister,
  adminLogIn,
  getAdminDetail,
} = require("../controllers/admin-controller.js");

const {
  sclassCreate,
  sclassList,
  deleteSclass,
  deleteSclasses,
  getSclassDetail,
  getSclassStudents,
} = require("../controllers/class-controller.js");

const {
  complainCreate,
  complainList,
} = require("../controllers/complain-controller.js");

const {
  noticeCreate,
  noticeList,
  deleteNotices,
  deleteNotice,
  updateNotice,
} = require("../controllers/notice-controller.js");

const {
  studentRegister,
  studentLogIn,
  getStudents,
  getStudentDetail,
  deleteStudents,
  deleteStudent,
  updateStudent,
  studentAttendance,
  deleteStudentsByClass,
  updateExamResult,
  clearAllStudentsAttendanceBySubject,
  clearAllStudentsAttendance,
  removeStudentAttendanceBySubject,
  removeStudentAttendance,
} = require("../controllers/student_controller.js");

const {
  subjectCreate,
  classSubjects,
  deleteSubjectsByClass,
  getSubjectDetail,
  deleteSubject,
  freeSubjectList,
  allSubjects,
  deleteSubjects,
} = require("../controllers/subject-controller.js");

const {
  teacherRegister,
  teacherLogIn,
  getTeachers,
  getTeacherDetail,
  deleteTeachers,
  deleteTeachersByClass,
  deleteTeacher,
  updateTeacherSubject,
  teacherAttendance,
} = require("../controllers/teacher-controller.js");

const { 
  createAssignment,
  getAssignments,
  submitAnswer,
} = require('../controllers/assignment-controller');

const { createNote, getNotes, downloadNote } = require('../controllers/note-controller');

// Home Route
router.get("/", (req, res) => {
  res.send("Welcome To Edumaster360");
});

// Admin Routes
router.post("/AdminReg", adminRegister);
router.post("/AdminLogin", adminLogIn);
router.get("/Admin/:id", getAdminDetail);

// Student Routes
router.post("/StudentReg", studentRegister);
router.post("/StudentLogin", studentLogIn);
router.get("/Students/:id", getStudents);
router.get("/Student/:id", getStudentDetail);
router.delete("/Students/:id", deleteStudents);
router.delete("/StudentsClass/:id", deleteStudentsByClass);
router.delete("/Student/:id", deleteStudent);
router.put("/Student/:id", updateStudent);
router.put("/UpdateExamResult/:id", updateExamResult);
router.put("/StudentAttendance/:id", studentAttendance);
router.put("/RemoveAllStudentsSubAtten/:id", clearAllStudentsAttendanceBySubject);
router.put("/RemoveAllStudentsAtten/:id", clearAllStudentsAttendance);
router.put("/RemoveStudentSubAtten/:id", removeStudentAttendanceBySubject);
router.put("/RemoveStudentAtten/:id", removeStudentAttendance);

// Teacher Routes
router.post("/TeacherReg", teacherRegister);
router.post("/TeacherLogin", teacherLogIn);
router.get("/Teachers/:id", getTeachers);
router.get("/Teacher/:id", getTeacherDetail);
router.delete("/Teachers/:id", deleteTeachers);
router.delete("/TeachersClass/:id", deleteTeachersByClass);
router.delete("/Teacher/:id", deleteTeacher);
router.put("/TeacherSubject", updateTeacherSubject);
router.post("/TeacherAttendance/:id", teacherAttendance);

// Assignment Routes
router.post('/Teacher/AssignmentCreate', upload.single('file'), createAssignment);
router.get('/Assignments', getAssignments);
router.post('/Assignments/SubmitAnswer', upload.single('answerFile'), submitAnswer);

// Note Routes
router.post('/Teacher/NoteCreate', upload.single('file'), createNote);
router.get('/Notes', getNotes);
router.get('/Notes/:id/download', downloadNote);
//router.get('/download/:fileName', downloadNote);
// router.post('/Teacher/NoteCreate', upload.single('file'), createNote);  // Create note
// router.get('/Teacher/notes/:teacherId', getNotes);                      // Get notes list for a teacher

// Notice Routes
router.post("/NoticeCreate", noticeCreate);
router.get("/NoticeList/:id", noticeList);
router.delete("/Notices/:id", deleteNotices);
router.delete("/Notice/:id", deleteNotice);
router.put("/Notice/:id", updateNotice);

// Complain Routes
router.post("/ComplainCreate", complainCreate);
router.get("/ComplainList/:id", complainList);

// Class Routes
router.post("/SclassCreate", sclassCreate);
router.get("/SclassList/:id", sclassList);
router.get("/Sclass/:id", getSclassDetail);
router.get("/Sclass/Students/:id", getSclassStudents);
router.delete("/Sclasses/:id", deleteSclasses);
router.delete("/Sclass/:id", deleteSclass);

// Subject Routes
router.post("/SubjectCreate", subjectCreate);
router.get("/AllSubjects/:id", allSubjects);
router.get("/ClassSubjects/:id", classSubjects);
router.get("/FreeSubjectList/:id", freeSubjectList);
router.get("/Subject/:id", getSubjectDetail);
router.delete("/Subject/:id", deleteSubject);
router.delete("/Subjects/:id", deleteSubjects);
router.delete("/SubjectsClass/:id", deleteSubjectsByClass);

module.exports = router;
