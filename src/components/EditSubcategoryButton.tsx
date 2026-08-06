"use client";

import { TbPencil } from "react-icons/tb";
import { useModal } from "./providers/ModalProvider";
import type { Subcategory } from "@/prisma/categories";

export default function EditSubcategoryButton({
  subcategory,
  categoryName,
}: {
  subcategory: Subcategory;
  categoryName: string;
}) {
  const { openModal } = useModal();
  return (
    <button
      type="button"
      onClick={() =>
        openModal("novaCategoria", {
          kind: "editarSubcategoria",
          id: subcategory.id,
          categoryId: subcategory.categoryId,
          categoryName,
          name: subcategory.name,
          type: subcategory.type,
          icon: subcategory.icon,
        })
      }
      className="flex border-none bg-transparent text-xs text-text"
    >
      <TbPencil size={13} />
    </button>
  );
}
