var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// hooks/useModal.ts
import { atom, useRecoilState } from 'recoil';
import { useCallback, useEffect } from 'react';
export var modalStackState = atom({
    key: 'modalStackState',
    default: [],
});
export var useModal = function () {
    var _a = useRecoilState(modalStackState), modalStack = _a[0], setModalStack = _a[1];
    var openModal = useCallback(function (modalId) {
        setModalStack(function (prevStack) { return __spreadArray(__spreadArray([], prevStack, true), [modalId], false); });
        window.history.pushState({ modalId: modalId }, '', '');
    }, [setModalStack]);
    console.log('modalStack', modalStack);
    var closeModal = useCallback(function () {
        setModalStack(function (prevStack) {
            var newStack = __spreadArray([], prevStack, true);
            newStack.pop(); // Remove the top modal
            var previousModalId = newStack[newStack.length - 1];
            window.history.pushState({ modalId: previousModalId || 'root' }, '', '');
            return newStack;
        });
    }, [setModalStack]);
    var handlePopstate = useCallback(function (event) {
        var _a;
        if ((_a = event.state) === null || _a === void 0 ? void 0 : _a.modalId) {
            setModalStack(function (prevStack) {
                var newStack = __spreadArray([], prevStack, true);
                while (newStack.length && newStack[newStack.length - 1] !== event.state.modalId) {
                    newStack.pop();
                }
                return newStack;
            });
        }
        else {
            // If no modalId is present, close all modals (typically this happens when the user navigates back to the root state)
            setModalStack([]);
        }
    }, [setModalStack]);
    useEffect(function () {
        window.addEventListener('popstate', handlePopstate);
        return function () {
            window.removeEventListener('popstate', handlePopstate);
        };
    }, [handlePopstate]);
    return {
        openModal: openModal,
        closeModal: closeModal,
        modalStack: modalStack,
    };
};
