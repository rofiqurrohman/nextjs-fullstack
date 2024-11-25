const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  // Utility untuk hash password
  const hashPassword = async (password) => await bcrypt.hash(password, 10);

  // 1. Seed Admin
  console.log("Creating Admin...");
  const adminUser = await prisma.user.create({
    data: {
      email: "admin@school.com",
      password: await hashPassword("admin123"),
      role: "ADMIN",
      Admin: {
        create: { name: "Admin User" },
      },
    },
  });

  // 2. Seed Teachers
  console.log("Creating Teachers...");
  const teacher1 = await prisma.teacher.create({
    data: {
      name: "Teacher one",
      user: {
        create: {
          email: "teacher1@school.com",
          password: await hashPassword("teacher123"),
          role: "TEACHER",
        },
      },
    },
  });

  const teacher2 = await prisma.teacher.create({
    data: {
      name: "Teacher two",
      user: {
        create: {
          email: "teacher2@school.com",
          password: await hashPassword("teacher123"),
          role: "TEACHER",
        },
      },
    },
  });

  // 3. Seed Students
  console.log("Creating Students...");
  const students = [];
  for (let i = 1; i <= 5; i++) {
    const student = await prisma.student.create({
      data: {
        name: `Student ${i}`,
        user: {
          create: {
            email: `student${i}@school.com`,
            password: await hashPassword("student123"),
            role: "STUDENT",
          },
        },
      },
    });
    students.push(student);
  }

  // 4. Seed Parents
  console.log("Creating Parents...");
  for (let i = 1; i <= 5; i++) {
    await prisma.parent.create({
      data: {
        name: `Parent ${i}`,
        user: {
          create: {
            email: `parent${i}@school.com`,
            password: await hashPassword("parent123"),
            role: "PARENT",
          },
        },
      },
    });
  }

  // 5. Seed Class
  console.log("Creating Class...");
  const classA = await prisma.class.create({
    data: {
      name: "Class A",
      teacherId: teacher1.id,
      Students: {
        connect: students.map((student) => ({ id: student.id })),
      },
    },
  });

  // 6. Seed Subjects
  console.log("Creating Subjects...");
  const subjects = [];
  const subjectNames = [
    "Mathematics",
    "Science",
    "History",
    "Geography",
    "English",
    "Physical Education",
  ];

  for (let i = 0; i < subjectNames.length; i++) {
    const subject = await prisma.subject.create({
      data: {
        name: subjectNames[i],
        classId: classA.id,
        teacherId: i % 2 === 0 ? teacher1.id : teacher2.id,
      },
    });
    subjects.push(subject);
  }

//   7. Seed Schedules
  console.log("Creating Schedules...");
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
//   const times = [
//     { start: "08:00", end: "09:30" },
//     { start: "09:45", end: "11:15" },
//     { start: "13:00", end: "14:30" },
//   ];
  const schedules = [];
  for (const subject of subjects) {
    for (const day of days) {
    //   for (const time of times) {
        const schedule = await prisma.schedule.create({
          data: {
            day,
            startTime: new Date(),
            endTime: new Date(),
            subjectId: subject.id,
            classId: classA.id,
            teacherId: subject.teacherId,
          },
        });
        schedules.push(schedule);
    //   }
    }
  }

  // 8. Seed Attendance
  console.log("Creating Attendance...");
//   console.log("Attendance students", students);
  
  for (const schedule of schedules) {
    for (const student of students) {
      await prisma.attendance.create({
        data: {
          date: new Date(),
          status: Math.random() > 0.2 ? "PRESENT" : "ABSENT", // 80% chance present
          studentId: student.id,
          scheduleId: schedule.id,
        },
      });
    }
  }

  // 9. Seed Exams
  console.log("Creating Exams...");
  const exams = [];
  for (const subject of subjects) {
    const exam = await prisma.exam.create({
      data: {
        title: `${subject.name} Midterm`,
        date: new Date(),
        subjectId: subject.id,
        maxScore: Math.random() > 0.2 ? 9 : 5.6,
      },
    });
    exams.push(exam);
  }

  // 9. Seed Results/Grades
  console.log("Creating Results...");
  for (const exam of exams) {
    for (const student of students) {
      await prisma.result.create({
        data: {
          grade: "A", 
          score: Math.floor(Math.random() * 41) + 60, // Random score between 60-100
          studentId: student.id,
          examId: exam.id,
        },
      });
    }
  }

  console.log("Seeding completed!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
