import { STATUS_META, type TxStatus } from "@/lib/finance";
import { cn } from "@/lib/cn";

export default function StatusBadge({ status }: { status: TxStatus }) {
  const meta = STATUS_META[status];
  return (
    <span
      className={cn(
        "whitespace-nowrap rounded-full px-[9px] py-[3px] text-[11px] font-semibold",
        meta.bgClass,
        meta.textClass,
      )}
    >
      {meta.label}
    </span>
  );
}
