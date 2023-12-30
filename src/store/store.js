const { create } = require("zustand");
import { devtools, persist } from "zustand/middleware";
import toggleSidebarSlice from "./slices/toggleSidebarSlice";
import dashboardHeaderMenuClickedSlice from "./slices/dashboardHeaderMenuClickedSlice";

const useStore = create(
  devtools((...a) => ({
    ...toggleSidebarSlice(...a),
    ...dashboardHeaderMenuClickedSlice(...a),
  }))
);

export default useStore;
