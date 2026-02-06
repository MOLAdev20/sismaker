import { prisma } from "../../db/prisma.js";

const EmployeeController = {
  getAllEmployee: async (req, res) => {
    const { dept, gender, q } = req.query;

    const where = {
      ...(dept ? { department: dept } : {}),
      ...(gender ? { gender } : {}),
      ...(q
        ? {
            OR: [
              { fullName: { contains: q } },
              { position: { contains: q } },
              { employeeId: { contains: q } },
            ],
          }
        : {}),
    };

    try {
      const employees = await prisma.employee.findMany({
        orderBy: { createdAt: "desc" },
        where,
      });

      const getActive = employees.filter((e) => e.status == "ACTIVE").length;
      const getInactive = employees.filter(
        (e) => e.status == "INACTIVE",
      ).length;

      res.json({
        status: "ok",
        data: employees,
        stat: {
          total: employees.length,
          active: getActive,
          inactive: getInactive,
        },
      });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  },

  getEmployeeById: async (req, res) => {
    try {
      const { id } = req.params;
      const employee = await prisma.employee.findUnique({
        where: { id: Number(id) },
      });

      if (!employee) {
        return res.status(404).json({
          status: "error",
          message: "Employee not found",
        });
      }

      return res.json({ status: "ok", data: employee });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Server error",
        detail: error.message,
      });
    }
  },

  deleteEmployee: async (req, res) => {
    try {
      const { id } = req.params;
      const employee = await prisma.employee.delete({
        where: { id: Number(id) },
      });

      if (!employee) {
        return res.status(404).json({
          status: "error",
          message: "Employee not found",
        });
      }

      return res.json({ status: "ok", data: employee });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Server error",
        detail: error.message,
      });
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
      console.log(error);
      if (error?.code === "P2002") {
        return res.status(409).json({
          status: "conflict",
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

  editEmployee: async (req, res) => {
    try {
      const { id } = req.params;

      const payload = {
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

      const employee = await prisma.employee.update({
        where: { id: Number(id) },
        data: payload,
      });
      return res.status(201).json({ status: "ok", data: employee });
    } catch (error) {
      console.log(error);
      if (error?.code === "P2002") {
        return res.status(409).json({
          status: "conflict",
          message: "Email sudah terpakai",
        });
      }
      return res.status(500).json({
        status: "error",
        message: "Server error",
        detail: error.message,
      });
    }
  },

  validateInput: async (req, res) => {
    const typeOfValidation = req.params.type;

    let where = { email: req.body.value };

    if (typeOfValidation == "employeeId") {
      where = { employeeId: req.body.value };
    }

    const isAny = await prisma.employee.findFirst({ where });

    if (isAny) {
      return res.status(409).json({
        status: 409,
        conflict: typeOfValidation,
      });
    }

    return res.status(200).json({ message: "oke" });
  },
};

export default EmployeeController;
