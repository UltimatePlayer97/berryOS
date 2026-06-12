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
  class="absolute top-[calc(50%-200px)] left-[calc(50%-400px)] w-200 bg-[#1e1e2e] rounded-[25px] overflow-hidden flex flex-col shadow-2xl select-none outline-none"
  class:hidden={!isOpen}
  onmousedown={handleMouseDown}
>
  <div
    bind:this={headerElement}
    class="flex justify-between items-center px-4 py-2 bg-black/40 backdrop-blur-md border border-black cursor-move"
  >
    <button
      type="button"
      aria-label="Close window"
      class="cursor-pointer text-2xl font-bold text-[#f38ba8] bg-[#f38ba8]/10 w-12.5 h-12.5 inline-flex items-center justify-center rounded transition-colors hover:bg-[#f38ba8]/30 border-0 p-0 normal-case outline-none"
      onclick={onClose}
    >
      &times;
    </button>
    <p class="m-0 font-medium text-[#cdd6f4]">{title}</p>
    <div class="w-12.5"></div>
  </div>

  <div class="border border-black p-5 text-[#cdd6f4]">
    {@render children?.()}
  </div>
</div>
