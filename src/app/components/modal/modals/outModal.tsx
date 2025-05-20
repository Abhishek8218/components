import { atom, useRecoilState } from 'recoil';
import { useCallback, useEffect } from 'react';

/**
 * Atom to hold the stack of currently opened modal IDs.
 * Each string represents a modal or bottom sheet identifier.
 */
export const modalStackState = atom<string[]>({
  key: 'modalStackState',
  default: [],
});

/**
 * useModal Hook – for managing nested modal stacks with browser history support.
 *
 * 🧠 Why this is needed:
 * In web-based apps, especially SPAs, when you open nested modals or bottom sheets,
 * the browser's back button often fails to close them in order — it might change the route
 * while modals remain open, leading to broken or mismatched UI.
 *
 * ✅ This hook solves that by:
 * - Pushing each opened modal (or bottom sheet) into browser history
 * - Handling `popstate` events to close the modals one-by-one as the user presses back
 * - Ensuring route changes only happen **after** all modals are closed
 *
 * 📱 You can use this to mimic **Android-style bottom sheet behavior** on the web:
 * When you open a bottom sheet, pressing the back button should close it first —
 * not change the page underneath. This hook gives you that native-like experience.
 *
 * 📄 See usage in:
 * `src/app/components/modal/modals/outModal.tsx`
 */
export const useModal = () => {
  const [modalStack, setModalStack] = useRecoilState(modalStackState);

  /**
   * Opens a modal or bottom sheet by adding its ID to the stack
   * and syncing that state to browser history.
   */
  const openModal = useCallback((modalId: string) => {
    setModalStack((prevStack) => [...prevStack, modalId]);
    window.history.pushState({ modalId }, '', '');
  }, [setModalStack]);

  /**
   * Closes the most recently opened modal or sheet.
   * Updates the browser history to reflect the previous state.
   */
  const closeModal = useCallback(() => {
    setModalStack((prevStack) => {
      const newStack = [...prevStack];
      newStack.pop(); // Remove the top modal
      const previousModalId = newStack[newStack.length - 1];
      window.history.pushState({ modalId: previousModalId || 'root' }, '', '');
      return newStack;
    });
  }, [setModalStack]);

  /**
   * Listens to browser back/forward navigation and pops modals from stack accordingly.
   * Makes sure only the right modal remains open.
   */
  const handlePopstate = useCallback((event: PopStateEvent) => {
    if (event.state?.modalId) {
      setModalStack((prevStack) => {
        const newStack = [...prevStack];
        while (newStack.length && newStack[newStack.length - 1] !== event.state.modalId) {
          newStack.pop();
        }
        return newStack;
      });
    } else {
      // If no modalId in state, assume we should clear all modals
      setModalStack([]);
    }
  }, [setModalStack]);

  /**
   * Attach and clean up browser history listener on mount/unmount.
   */
  useEffect(() => {
    window.addEventListener('popstate', handlePopstate);
    return () => {
      window.removeEventListener('popstate', handlePopstate);
    };
  }, [handlePopstate]);

  return {
    openModal,
    closeModal,
    modalStack,
  };
};
