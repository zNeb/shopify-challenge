import {
  useRef,
  useState,
  useEffect,
  useLayoutEffect,
} from 'react';
import 'resize-observer-polyfill/dist/ResizeObserver.global';

export default function usePlusMenu(data: any) {
  const isClient = typeof window !== 'undefined';
  const ref = useRef<any>(null); //  nav
  const plusRef = useRef<any>(null); // Button
  const menuRef = useRef<any>(null); // menu
  const hiddenRef = useRef<any>(null); // hiddenMenu
  const observerRef = useRef<any>(null);
  const [showHidden, setShowHidden] = useState(false);
  const [state, setState] = useState({
    ref,
    plusRef,
    menuRef,
    hiddenRef,
    visibleItems: data,
    hiddenItems: [],
  });

  observerRef.current = isClient
  && new ResizeObserver((entries) => {
    let { width } = entries[0].contentRect;
    width += 1;
    let visible = 0;

    if (ref.current?.children && hiddenRef.current?.children) {
      const elementArray = Array.prototype.concat.call(
        ref.current.children,
        hiddenRef.current.children,
      );
      // eslint-disable-next-line no-restricted-syntax
      for (const element of elementArray) {
        // eslint-disable-next-line no-restricted-syntax
        for (const child of element) {
          const anchor = child.children[0];
          const span = child.children[0].children[0];
          const anchorStyle = window.getComputedStyle(anchor);
          width -= span.offsetWidth
            + (parseFloat(anchorStyle.paddingLeft)
            + parseFloat(anchorStyle.paddingRight));
          if (width > 0) {
            visible += 1;
          } else {
            break;
          }
        }
      }
    }

    setState({
      ref,
      plusRef,
      menuRef,
      hiddenRef,
      visibleItems: [
        ...data
          .slice(0, visible),
        ...data
          .slice(visible)
          .map((i: any) => ({ ...i, hidden: true })),
      ],
      hiddenItems: data.slice(visible),
    });
  });

  const useIsomorphicLayoutEffect = isClient ? useLayoutEffect : useEffect;
  useIsomorphicLayoutEffect(() => {
    const element = ref.current;
    if (element && observerRef.current) {
      observerRef.current.observe(element);
    }
    return () => observerRef.current?.unobserve(element);
  }, [ref]);

  useEffect(() => {
    const listener = (event: any) => {
      if ((!menuRef.current || menuRef.current.contains(event.target))
      || (!plusRef.current || plusRef.current.contains(event.target))
      ) return;
      event.stopPropagation();
      setShowHidden(false);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [menuRef]);

  return {
    ...state, ref, plusRef, menuRef, hiddenRef, showHidden, setShowHidden,
  };
}
