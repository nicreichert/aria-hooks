import { FocusTrapFactory } from "../utils/focusTrapFactory";

export class ModalController {
  private focusTrap: FocusTrapFactory;
  private modalRef: HTMLDivElement;
  private isOpen: boolean;
  private onDismiss: () => void;
  private id: string;

  constructor(onDismiss: () => void, id?: string) {
    this.onDismiss = onDismiss;
    this.id = id;
  }

  setModalRef = (modal: HTMLDivElement) => (this.modalRef = modal);

  onOpen = () => {
    if (this.isOpen) {
      return;
    }

    const modal = this.modalRef || document.getElementById(this.id);

    if (modal) {
      this.focusTrap = new FocusTrapFactory(this.modalRef);
      this.focusTrap.mount();
    }

    window.addEventListener("keydown", this.handleKeyPress);
    window.addEventListener("touchstart", this.handleClick);
    window.addEventListener("mousedown", this.handleClick);

    this.isOpen = true;
  };

  onClose = () => {
    if (!this.isOpen) {
      return;
    }

    this.focusTrap?.destroy();

    window.removeEventListener("keydown", this.handleKeyPress);
    window.removeEventListener("touchstart", this.handleClick);
    window.removeEventListener("mousedown", this.handleClick);

    this.onDismiss?.();

    this.isOpen = false;
  };

  handleKeyPress = (ev: KeyboardEvent) => {
    if (ev.key === "Escape") {
      ev.stopPropagation();
      this.onClose();
    }
  };

  handleClick = (e: MouseEvent) => {
    if (!this.modalRef.contains(e.target as HTMLElement)) {
      this.onClose();
    }
  };
}

// const [isOpen, setIsOpen] = React.useState(true);
// const modalRef = React.useRef<HTMLDivElement>();

// const handleClose = React.useCallback(() => {
//   setIsOpen(false);
// }, []);

// React.useEffect(() => {
//   if (!focused) {
//     return;
//   }

//   const focusTrap = new FocusTrapFactory(modalRef.current);

//   const handleAnimationEnd = (e: AnimationEvent) => {
//     if (e.animationName === WrapperFadeOut.getName()) {
//       focusTrap.destroy();
//       onDismiss();
//     }
//   };

//   const handleKeyPress = (ev: KeyboardEvent) => {
//     if (ev.key === "Escape") {
//       ev.stopPropagation();
//       handleClose();
//     }
//   };

//   const handleClick = (e: MouseEvent) => {
//     if (
//       !modalRef.current.contains(e.target as HTMLElement) &&
//       !document.getElementById("overlays")?.contains(e.target as HTMLElement)
//     ) {
//       handleClose();
//     }
//   };

//   focusTrap.mount();

//   modalRef.current.addEventListener("animationend", handleAnimationEnd);

//   window.addEventListener("keydown", handleKeyPress);
//   window.addEventListener("touchstart", handleClick);
//   window.addEventListener("mousedown", handleClick);

//   return () => {
//     window.removeEventListener("keydown", handleKeyPress);
//     window.removeEventListener("touchstart", handleClick);
//     window.removeEventListener("mousedown", handleClick);
//   };
// }, [focused]);
