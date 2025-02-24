const isHTMLTextAreaElement = (element: Element | null) =>
  element instanceof HTMLTextAreaElement;

const showToast = () => {
  const toast = document.getElementById("toast");

  toast?.classList.add("show");

  setTimeout(() => {
    toast?.classList.remove("show");
  }, 1500);
};

const getInputValue = (element: Element | null) => {
  if (isHTMLTextAreaElement(element)) {
    return element.value;
  }

  throw new Error("HTMLElement is not HTMLTextAreaElement");
};

document.getElementById("generate")?.addEventListener("click", () => {
  const userConfig = getInputValue(document.getElementById("userConfig"));
  const submodulesList = getInputValue(
    document.getElementById("submodulesList")
  );

  Neutralino.events.dispatch("generate", { userConfig, submodulesList });
});

Neutralino.events.on("generated", (event: CustomEvent) => {
  const { result } = event.detail;

  const outputInput = document.getElementById("output");

  if (isHTMLTextAreaElement(outputInput)) {
    const modal = document.getElementById("modal");

    outputInput.value = result;
    modal?.classList.add("show");
  }
});

document.getElementById("copy")?.addEventListener("click", () => {
  const text = getInputValue(document.getElementById("output"));

  Neutralino.events.dispatch("copy", { text });

  showToast();
});

document.getElementById("modal-close")?.addEventListener("click", () => {
  const modal = document.getElementById("modal");
  const resultInput = document.getElementById("output");

  modal?.classList.remove("show");
  if (isHTMLTextAreaElement(resultInput)) {
    resultInput.value = "";
  }
});
