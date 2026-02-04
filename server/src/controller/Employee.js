import { prisma } from "../../db/prisma.js";

const EmployeeController = {
  getAllCandidate: async (req, res) => {
    try {
      const employees = await prisma.employee.findMany({
        orderBy: { createdAt: "desc" },
      });
      res.json({ status: "ok", data: employees });
    } catch (error) {
      res.status(500).json({ status: "error", message: error });
    }
  },

  createEmployee: async (req, res) => {
    try {
      const payload = {
        employeeId: req.body.employeeId,
        fullName: req.body.fullName,
        gender: req.body.gender,
        email: req.body.email,
        phone: req.body.phone || null,
        department: req.body.department,
        position: req.body.position,
        joinDate: new Date(req.body.joinDate),
        status: req.body.status || "ACTIVE",
        address: req.body.address || null,
        birthDate: req.body.birthDate ? new Date(req.body.birthDate) : null,
        salary: req.body.salary ? Number(req.body.salary) : null,
      };

      const employee = await prisma.employee.create({ data: payload });
      return res.status(201).json({ status: "ok", data: employee });
    } catch (error) {
      if (error?.code === "P2002") {
        return res.status(409).json({
          status: "error",
          message: "Employee ID atau email sudah terpakai",
        });
      }
      return res.status(500).json({
        status: "error",
        message: "Server error",
        detail: error.message,
      });
    }
  },
};

export default EmployeeController;
