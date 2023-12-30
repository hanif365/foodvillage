import { produce } from "immer";

const toggleSidebarSlice = (set) => ({
  isSidebarCollapsed: false,
  toggleSidebar: () =>
    set(
      produce((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
      false,
      "toggleSidebarSlice/toggleSidebar"
    ),
});
export default toggleSidebarSlice;
