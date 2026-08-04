import { defineContract } from '@prisma-next/postgres/contract-builder';
import { rlsEnabled } from '@prisma-next/postgres/contract-builder';

export const contract = defineContract(
  {},
  ({ field, model, rel }) => {
    const Category = model('Category', {
      fields: {
        id: field.id.uuidv7String(),
        userId: field.text(),
        name: field.text(),
        color: field.text(),
        icon: field.text(),
        createdAt: field.temporal.createdAt(),
        updatedAt: field.temporal.updatedAt(),
      },
      relations: {
        subcategories: rel.hasMany('Subcategory', { by: 'categoryId' }),
      },
    });

    const Subcategory = model('Subcategory', {
      fields: {
        id: field.id.uuidv7String(),
        userId: field.text(),
        categoryId: field.uuidString(),
        name: field.text(),
        type: field.text(),
        icon: field.text(),
        createdAt: field.temporal.createdAt(),
        updatedAt: field.temporal.updatedAt(),
      },
      relations: {
        category: rel.belongsTo(Category, { from: 'categoryId', to: 'id' }),
        transactions: rel.hasMany('Transaction', { by: 'subcategoryId' }),
        fixedExpenses: rel.hasMany('FixedExpense', { by: 'subcategoryId' }),
      },
    });

    const FixedExpense = model('FixedExpense', {
      fields: {
        id: field.id.uuidv7String(),
        userId: field.text(),
        subcategoryId: field.uuidString(),
        name: field.text(),
        estimatedAmount: field.decimal(),
        dueDay: field.int(),
        active: field.boolean().default(true),
        createdAt: field.temporal.createdAt(),
        updatedAt: field.temporal.updatedAt(),
      },
      relations: {
        subcategory: rel.belongsTo(Subcategory, { from: 'subcategoryId', to: 'id' }),
        transactions: rel.hasMany('Transaction', { by: 'fixedExpenseId' }),
      },
    });

    const Transaction = model('Transaction', {
      fields: {
        id: field.id.uuidv7String(),
        userId: field.text(),
        type: field.text(),
        subcategoryId: field.uuidString(),
        fixedExpenseId: field.uuidString().optional(),
        description: field.text().optional(),
        amount: field.decimal(),
        isFixed: field.boolean().default(false),
        periodMonth: field.text(),
        dueDate: field.dateTime().optional(),
        paidAmount: field.decimal().optional(),
        paidDate: field.dateTime().optional(),
        createdAt: field.temporal.createdAt(),
        updatedAt: field.temporal.updatedAt(),
      },
      relations: {
        subcategory: rel.belongsTo(Subcategory, { from: 'subcategoryId', to: 'id' }),
        // Deleting a fixed-expense template detaches (rather than blocks
        // deleting) the transactions it already generated, so paid history
        // survives even after the recurring template is removed.
        fixedExpense: rel
          .belongsTo(FixedExpense, { from: 'fixedExpenseId', to: 'id' })
          .sql({ fk: { onDelete: 'setNull' } }),
      },
    });

    const Budget = model('Budget', {
      fields: {
        id: field.id.uuidv7String(),
        userId: field.text(),
        subcategoryId: field.uuidString(),
        monthlyAmount: field.decimal(),
        createdAt: field.temporal.createdAt(),
        updatedAt: field.temporal.updatedAt(),
      },
      relations: {
        subcategory: rel.belongsTo(Subcategory, { from: 'subcategoryId', to: 'id' }),
      },
    });

    const UserSettings = model('UserSettings', {
      fields: {
        id: field.id.uuidv7String(),
        userId: field.text().unique(),
        monthStartDay: field.int().default(1),
        createdAt: field.temporal.createdAt(),
        updatedAt: field.temporal.updatedAt(),
      },
    });

    return {
      models: { Category, Subcategory, FixedExpense, Transaction, UserSettings, Budget },
      // RLS is enabled with no policies: only the trusted server-side Postgres
      // connection (table owner, bypasses RLS) reads/writes these tables. This
      // keeps Supabase's anon/authenticated PostgREST roles locked out by
      // default, matching Supabase's own default-enabled RLS on new tables.
      entities: [
        rlsEnabled(Category),
        rlsEnabled(Subcategory),
        rlsEnabled(FixedExpense),
        rlsEnabled(Transaction),
        rlsEnabled(UserSettings),
        rlsEnabled(Budget),
      ],
    };
  },
);
