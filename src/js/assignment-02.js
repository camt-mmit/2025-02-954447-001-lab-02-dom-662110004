import createInputListComponent from "./input-list-component.js";

const sectionsContainer = document.querySelector(".app-sections-container");
const sectionTemplate = document.querySelector(".app-tmp-section");

let sectionCount = 1;

const updateSectionNumbers = () => {
  const sections = sectionsContainer.querySelectorAll(".app-cmp-section");
  sections.forEach((section, index) => {
    const sectionNumberElem = section.querySelector(".app-section-number");
    if (sectionNumberElem) {
      sectionNumberElem.textContent = index + 1;
    }
  });
};

const updateRemoveButtons = () => {
  const sections = sectionsContainer.querySelectorAll(".app-cmp-section");
  const removeButtons = sectionsContainer.querySelectorAll(
    ".app-cmd-remove-section"
  );

  removeButtons.forEach((btn) => {
    btn.disabled = sections.length === 1;
  });
};

const createSection = () => {
  sectionCount++;
  const newSection = sectionTemplate.content.cloneNode(true);
  const sectionElem = newSection.querySelector(".app-cmp-section");

  createInputListComponent(sectionElem);

  sectionsContainer.appendChild(sectionElem);

  updateSectionNumbers();
  updateRemoveButtons();
};

const removeSection = (sectionElem) => {
  const sections = sectionsContainer.querySelectorAll(".app-cmp-section");

  if (sections.length > 1) {
    sectionElem.remove();
    updateSectionNumbers();
    updateRemoveButtons();
  }
};

document.addEventListener("click", (e) => {
  if (e.target?.closest(".app-cmd-add-number-input")) {
    const section = e.target.closest(".app-cmp-section");
    if (section && section.parentElement === sectionsContainer) {
      return;
    }
  }
});

sectionsContainer.addEventListener("click", (e) => {
  if (e.target?.closest(".app-cmd-remove-section")) {
    const section = e.target.closest(".app-cmp-section");
    removeSection(section);
  }
});

document.addEventListener("click", (e) => {
  if (e.target?.classList.contains("app-cmd-add-section")) {
    createSection();
  }
});

const firstSection = sectionsContainer.querySelector(".app-cmp-section");
if (firstSection) {
  createInputListComponent(firstSection);
}

updateRemoveButtons();
