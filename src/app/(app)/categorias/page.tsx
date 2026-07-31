import { requireUser } from "@/lib/auth";
import { listCategories, listSubcategories } from "@/prisma/categories";
import CategoryCard from "@/components/CategoryCard";
import ModalTriggerButton from "@/components/ModalTriggerButton";

export default async function CategoriasPage() {
  const user = await requireUser();
  const [categories, subcategories] = await Promise.all([
    listCategories(user.id),
    listSubcategories(user.id),
  ]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <ModalTriggerButton modal="novaCategoria" ctx={{ kind: "categoria" }}>
        + Nova categoria
      </ModalTriggerButton>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {categories.map((cat) => (
          <CategoryCard
            key={cat.id}
            category={cat}
            subcategories={subcategories.filter((s) => s.categoryId === cat.id)}
          />
        ))}
      </div>
    </div>
  );
}
