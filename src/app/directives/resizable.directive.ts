import { Directive, ElementRef, Renderer2 } from "@angular/core";

@Directive({
  selector: "[appResizable]",
  standalone: true,
})
export class ResizableDirective {
  private resizing: boolean = false;
  private startX: number = 0;
  private startY: number = 0;
  private startWidth: number = 0;
  private startHeight: number = 0;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.initialize();
  }

  private initialize() {
    const resizer = this.renderer.createElement("div");
    this.renderer.setStyle(resizer, "width", "10px");
    this.renderer.setStyle(resizer, "height", "10px");
    this.renderer.setStyle(resizer, "border-radius", "50%");
    this.renderer.setStyle(resizer, "background", "gray");
    this.renderer.setStyle(resizer, "position", "absolute");
    this.renderer.setStyle(resizer, "right", "0");
    this.renderer.setStyle(resizer, "bottom", "0");
    this.renderer.setStyle(resizer, "margin", "10px");
    this.renderer.setStyle(resizer, "cursor", "nwse-resize");

    this.renderer.appendChild(this.el.nativeElement, resizer);
    this.renderer.setStyle(this.el.nativeElement, "position", "relative");

    this.renderer.listen(resizer, "mousedown", (event: MouseEvent) =>
      this.onMouseDown(event)
    );
    this.renderer.listen(resizer, "touchstart", (event: TouchEvent) =>
      this.onTouchStart(event)
    );
  }

  private onMouseDown(event: MouseEvent) {
    this.startResizing(event.clientX, event.clientY);
  }

  private onTouchStart(event: TouchEvent) {
    const touch = event.touches[0];
    this.startResizing(touch.clientX, touch.clientY);
    event.preventDefault();
  }

  private startResizing(clientX: number, clientY: number) {
    this.resizing = true;
    this.startX = clientX;
    this.startY = clientY;
    this.startWidth = this.el.nativeElement.offsetWidth;
    this.startHeight = this.el.nativeElement.offsetHeight;

    document.addEventListener("mousemove", this.onMouseMove);
    document.addEventListener("mouseup", this.onMouseUp);
    document.addEventListener("touchmove", this.onTouchMove);
    document.addEventListener("touchend", this.onTouchEnd);
  }

  private onMouseMove = (event: MouseEvent) => {
    if (!this.resizing) return;
    this.resizeElement(event.clientX, event.clientY);
  };

  private onTouchMove = (event: TouchEvent) => {
    if (!this.resizing) return;
    const touch = event.touches[0];
    this.resizeElement(touch.clientX, touch.clientY);
    event.preventDefault();
  };

  private resizeElement(clientX: number, clientY: number) {
    const newWidth = this.startWidth + (clientX - this.startX);
    const newHeight = this.startHeight + (clientY - this.startY);

    this.renderer.setStyle(this.el.nativeElement, "width", `${newWidth}px`);
    this.renderer.setStyle(this.el.nativeElement, "height", `${newHeight}px`);
  }

  private onMouseUp = () => {
    this.stopResizing();
  };

  private onTouchEnd = () => {
    this.stopResizing();
  };

  private stopResizing() {
    this.resizing = false;
    document.removeEventListener("mousemove", this.onMouseMove);
    document.removeEventListener("mouseup", this.onMouseUp);
    document.removeEventListener("touchmove", this.onTouchMove);
    document.removeEventListener("touchend", this.onTouchEnd);
  }
}
