import { Suspense } from "react";
import { requireUser } from "@/lib/auth";
import { ensureDefaultCategories, listCategories, listSubcategories } from "@/prisma/categories";
import { CategoriesProvider } from "@/components/providers/CategoriesProvider";
import { ToastProvider } from "@/components/providers/ToastProvider";
import { ModalProvider } from "@/components/providers/ModalProvider";
import AppShell from "@/components/AppShell";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser();
  await ensureDefaultCategories(user.id);
  const [categories, subcategories] = await Promise.all([
    listCategories(user.id),
    listSubcategories(user.id),
  ]);

  const name = (user.user_metadata?.name as string | undefined)?.trim() || user.email || "Você";
  const email = user.email ?? "";

  return (
    <CategoriesProvider categories={categories} subcategories={subcategories}>
      <ToastProvider>
        <ModalProvider>
          <Suspense fallback={null}>
            <AppShell name={name} email={email}>
              {children}
            </AppShell>
          </Suspense>
        </ModalProvider>
      </ToastProvider>
    </CategoriesProvider>
  );
}
