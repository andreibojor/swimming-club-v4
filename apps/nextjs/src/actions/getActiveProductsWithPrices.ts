import type { ProductWithPrice } from "@/types";

import { createServerSupabaseClient } from "./createServerSupabaseClient";

const getActiveProductsWithPrices = async (): Promise<ProductWithPrice[]> => {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("products")
    .select("*, prices(*)")
    .eq("active", true)
    .eq("prices.active", true)
    .order("metadata->index")
    .order("unit_amount", { foreignTable: "prices" });

  if (error) console.log(error);

  return (data as any) || [];
};

export default getActiveProductsWithPrices;
