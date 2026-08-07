import { requireUser } from "@/lib/auth";
import { listCategories, listSubcategories } from "@/prisma/categories";
import { listBudgets } from "@/prisma/budgets";
import CategoryCard from "@/components/CategoryCard";
import ModalTriggerButton from "@/components/ModalTriggerButton";

export default async function CategoriasPage() {
  const user = await requireUser();
  const [categories, subcategories, budgets] = await Promise.all([
    listCategories(user.id),
    listSubcategories(user.id),
    listBudgets(user.id),
  ]);
  const budgetBySubcategoryId = new Map(
    budgets.map((b) => [b.subcategoryId, Number(b.monthlyAmount)]),
  );

  return (
    <div className="flex flex-col gap-4">
      <ModalTriggerButton modal="novaCategoria" ctx={{ kind: "categoria" }}>
        + Nova categoria
      </ModalTriggerButton>

      <div className="flex max-w-[600px] flex-col gap-3">
        {categories.map((cat) => (
          <CategoryCard
            key={cat.id}
            category={cat}
            subcategories={subcategories.filter((s) => s.categoryId === cat.id)}
            budgetBySubcategoryId={budgetBySubcategoryId}
          />
        ))}
      </div>
    </div>
  );
}
