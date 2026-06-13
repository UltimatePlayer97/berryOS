<script>
  import { onMount } from "svelte";

  /**
   * @typedef {object} WindowProps
   * @property {string} [title]
   * @property {boolean} [isOpen]
   * @property {() => void} [onClose]
   * @property {import('svelte').Snippet} [children]
   */

  /** @type {WindowProps} */
  let { title = "", isOpen = false, onClose = () => {}, children } = $props();

  /** @type {HTMLDivElement | undefined} */
  let windowElement = undefined;

  /** @type {HTMLDivElement | undefined} */
  let headerElement = undefined;

  function getNextZIndex() {
    const dynamicWindow = /** @type {*} */ (globalThis.window);

    if (!dynamicWindow.biggestIndex) {
      dynamicWindow.biggestIndex = 10;
    }
    dynamicWindow.biggestIndex++;
    return String(dynamicWindow.biggestIndex);
  }

  onMount(() => {
    let initialX = 0,
      initialY = 0,
      currentX = 0,
      currentY = 0;

    /** @param {MouseEvent} e */
    function startDragging(e) {
      // Prevent drag tracking if a user clicks specifically on the close button node
      if (/** @type {HTMLElement} */ (e.target).closest(".close-btn-target")) {
        return;
      }

      e.preventDefault();
      initialX = e.clientX;
      initialY = e.clientY;
      document.onmouseup = stopDragging;
      document.onmousemove = elementDrag;

      if (windowElement) {
        windowElement.style.zIndex = getNextZIndex();
      }
    }

    /** @param {MouseEvent} e */
    function elementDrag(e) {
      e.preventDefault();
      currentX = initialX - e.clientX;
      currentY = initialY - e.clientY;
      initialX = e.clientX;
      initialY = e.clientY;

      if (windowElement) {
        windowElement.style.top = windowElement.offsetTop - currentY + "px";
        windowElement.style.left = windowElement.offsetLeft - currentX + "px";
      }
    }

    function stopDragging() {
      document.onmouseup = null;
      document.onmousemove = null;
    }

    if (headerElement) {
      headerElement.onmousedown = startDragging;
    }
  });

  function handleMouseDown() {
    if (windowElement) {
      windowElement.style.zIndex = getNextZIndex();
    }
  }
</script>

<div
  bind:this={windowElement}
  role="dialog"
  aria-label={title}
  tabindex="-1"
  class="os-window absolute top-[calc(50%-200px)] left-[calc(50%-400px)] w-200 rounded-[24px] overflow-hidden flex flex-col shadow-2xl select-none outline-none"
  class:hidden={!isOpen}
  onmousedown={handleMouseDown}
>
  <div
    bind:this={headerElement}
    class="flex justify-between items-center px-5 h-12 border-b border-(--app-border) cursor-move relative bg-transparent"
  >
    <div class="flex gap-2 items-center z-10">
      <button
        type="button"
        onclick={onClose}
        class="close-btn-target w-3 h-3 rounded-full bg-[#ff5f56] hover:brightness-90 transition-all cursor-pointer border-0 p-0 outline-none"
        aria-label="Close Window"
      ></button>
      <div class="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
      <div class="w-3 h-3 rounded-full bg-[#27c93f]"></div>
    </div>

    <p
      class="absolute inset-0 flex items-center justify-center m-0 pointer-events-none text-[13px] font-semibold tracking-wide opacity-80"
    >
      {title}
    </p>

    <div class="w-14"></div>
  </div>

  <div class="p-6 overflow-y-auto max-h-[calc(100vh-200px)]">
    {@render children?.()}
  </div>
</div>
