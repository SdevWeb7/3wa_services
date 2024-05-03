import { create } from "zustand";

const createSelectors = (_store) => {
   let store = _store;
   store.use = {};
   for (let k of Object.keys(store.getState())) {
      store.use[k] = () => store((s) => s[k]);
   }
   return store;
}

export const useAppStore = createSelectors(create((set) => ({
   user: null,
   updateUser(user) {
      set({user: user});
   },
   toasts: [],
   setToasts(toasts) {
      set({toasts: toasts});
   },
   addToast(type, message) {
      set((prev) => ({toasts: [...prev.toasts, {type: type, message: message}]}));
   }
})));