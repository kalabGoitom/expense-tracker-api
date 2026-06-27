import { prisma } from "../config/db.js";

const createExpense = async (req, res) => {
  try {
    const { description, amount, type } = req.body;

    const expense = await prisma.expense.create({
      data: {
        description: description,
        amount: Number(amount),
        type: type,
        userId: req.user.id,
      },
    });

    res.status(201).json({
      expense,
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};

const getAllExpenses = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;

    const expenses = await prisma.expense.findMany({
      where: {
        userId: req.user.id,
      },
      skip,
      take: limitNumber,
      orderBy: {
        createdAt: "desc",
      },
    });

    const totalExpenses = await prisma.expense.count({
      where: {
        userId: req.user.id,
      },
    });

    res
      .status(200)
      .json({
        page: pageNumber,
        limit: limitNumber,
        totalExpenses,
        totalPages: Math.ceil(totalExpenses / limitNumber),
        expenses,
      });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};

const getExpense = async (req, res) => {
  try {
    const expenseId = req.params.id;
    const expense = await prisma.expense.findFirst({
      where: {
        id: expenseId,
        userId: req.user.id,
      },
    });

    if (!expense)
      return res.status(404).json({
        msg: `expense record not found!`,
      });

    res.status(200).json({
      expense,
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};

const updateExpense = async (req, res) => {
  try {
    const expenseId = req.params.id;
    const { description, amount, type } = req.body;

    const expenseExists = await prisma.expense.findFirst({
      where: {
        id: expenseId,
        userId: req.user.id,
      },
    });

    if (!expenseExists)
      return res.status(404).json({
        msg: "expense record not found",
      });

    const expense = await prisma.expense.update({
      where: {
        id: expenseId,
        userId: req.user.id,
      },
      data: req.body,
    });

    if (!expense)
      return res.status(404).json({
        msg: "expense record not found",
      });

    res.status(200).json({
      expense,
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const expenseId = req.params.id;

    const expenseExists = await prisma.expense.findFirst({
      where: {
        id: expenseId,
        userId: req.user.id,
      },
    });

    if (!expenseExists)
      return res.status(404).json({
        msg: "expense record not found",
      });

    const expense = await prisma.expense.delete({
      where: {
        id: expenseId,
        userId: req.user.id,
      },
    });

    res.status(200).json({
      msg: "expense record deleted successfuly!",
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};

const deleteAllExpense = async (req, res) => {
  try {
    const expenses = await prisma.expense.deleteMany({
      where: {
        userId: req.user.id,
      },
    });
    res.status(200).json({
      msg: "All expense records deleted!",
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};

const summery = async (req, res) => {
  try {
    const totalIncome = await prisma.expense.aggregate({
      where: {
        userId: req.user.id,
        type: "INCOME",
      },
      _sum: {
        amount: true,
      },
    });

    const totalExpense = await prisma.expense.aggregate({
      where: {
        userId: req.user.id,
        type: "EXPENSE",
      },
      _sum: {
        amount: true,
      },
    });

    const income = Number(totalIncome._sum.amount || 0);
    const expense = Number(totalExpense._sum.amount || 0);

    const balance = income - expense;

    res.status(200).json({
      totalIncome: income,
      totalExpense: expense,
      balance,
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};

export {
  createExpense,
  getAllExpenses,
  getExpense,
  updateExpense,
  deleteAllExpense,
  deleteExpense,
  summery,
};
