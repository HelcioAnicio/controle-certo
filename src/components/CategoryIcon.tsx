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
      style={{
        flexShrink: 0,
        width: size,
        height: size,
        borderRadius: "50%",
        background: `${color}22`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* eslint-disable-next-line react-hooks/static-components -- Icon is a lookup from a fixed component map, not created during render */}
      <Icon size={Math.round(size * 0.5)} color={color} />
    </div>
  );
}
