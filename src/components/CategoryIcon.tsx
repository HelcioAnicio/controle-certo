import { iconFor } from "@/lib/icons";

export default function CategoryIcon({
  icon,
  color,
  size = 32,
}: {
  icon: string;
  color: string;
  size?: number;
}) {
  const Icon = iconFor(icon);
  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-full"
      style={{ width: size, height: size, background: `${color}22` }}
    >
      {/* eslint-disable-next-line react-hooks/static-components -- Icon is a lookup from a fixed component map, not created during render */}
      <Icon size={Math.round(size * 0.5)} color={color} />
    </div>
  );
}
