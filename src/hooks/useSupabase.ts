"use client";

import { useState } from "react";
import { supabase } from "../services/supabase";

export default function useSupabase() {
  const [client] = useState(() => supabase);

  return client;
}
