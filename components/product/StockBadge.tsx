import type { StockStatus } from "@/types/product";

const LABEL: Record<StockStatus, string> = {
  in_stock: "In stock",
  low_stock: "Low stock",
  out_of_stock: "Out of stock",
  preorder: "Pre-order",
};

const CLASS: Record<StockStatus, string> = {
  in_stock: "text-ndy-mist",
  low_stock: "text-ndy-fog",
  out_of_stock: "text-ndy-ash line-through",
  preorder: "text-ndy-fog",
};

export function StockBadge({ status }: { status: StockStatus }) {
  return <span className={`text-xs ${CLASS[status]}`}>{LABEL[status]}</span>;
}
