import createInputListComponent from "./section-list-component.js";

// ตัวคอนเทนเนอร์ที่เก็บทุกส่วน (section) บนหน้า
const sectionsContainer = document.querySelector(".app-sections-container");
// เทมเพลตสำหรับคัดลอก (clone) ส่วนใหม่
const sectionTemplate = document.querySelector(".app-tmp-section");

// ตัวนับแบบง่าย (ไม่จำเป็นแต่ใช้ได้เมื่อขยายฟังก์ชัน)
let sectionCount = 1;

// อัปเดตหมายเลขของส่วนที่แสดง (1, 2, 3...) หลังเพิ่ม/ลบ
const updateSectionNumbers = () => {
  const sections = sectionsContainer.querySelectorAll(".app-cmp-section");
  sections.forEach((section, index) => {
    const sectionNumberElem = section.querySelector(".app-section-number");
    if (sectionNumberElem) {
      sectionNumberElem.textContent = index + 1;
    }
  });
};

// เปิด/ปิดการใช้งานปุ่มลบส่วน: เมื่อเหลือเพียงหนึ่งส่วน ให้ปิดการใช้งานปุ่มลบนั้น
const updateRemoveButtons = () => {
  const sections = sectionsContainer.querySelectorAll(".app-cmp-section");
  const removeButtons = sectionsContainer.querySelectorAll(
    ".app-cmd-remove-section"
  );

  removeButtons.forEach((btn) => {
    btn.disabled = sections.length === 1;
  });
};

// สร้างและแนบส่วนใหม่ที่คัดลอกจากเทมเพลต
const createSection = () => {
  sectionCount++;
  const newSection = sectionTemplate.content.cloneNode(true);
  const sectionElem = newSection.querySelector(".app-cmp-section");

  // เริ่มต้นคอมโพเนนต์ input-list ภายในส่วนใหม่ เพื่อจัดการอินพุต/ผลลัพธ์ของตัวเอง
  createInputListComponent(sectionElem);

  sectionsContainer.appendChild(sectionElem);

  updateSectionNumbers();
  updateRemoveButtons();
};

// ลบส่วนเฉพาะเมื่อมีมากกว่าหนึ่งส่วน (ตามข้อกำหนด)
const removeSection = (sectionElem) => {
  const sections = sectionsContainer.querySelectorAll(".app-cmp-section");

  if (sections.length > 1) {
    sectionElem.remove();
    updateSectionNumbers();
    updateRemoveButtons();
  }
};

// การมอบหมายเหตุการณ์: จัดการการคลิกปุ่มลบส่วนภายในคอนเทนเนอร์
sectionsContainer.addEventListener("click", (e) => {
  if (e.target?.closest(".app-cmd-remove-section")) {
    const section = e.target.closest(".app-cmp-section");
    removeSection(section);
  }
});

// การมอบหมายเหตุการณ์ระดับทั่วไปเพื่อสร้างส่วนใหม่จากปุ่ม "Add another section"
document.addEventListener("click", (e) => {
  if (e.target?.classList.contains("app-cmd-add-section")) {
    createSection();
  }
});

// เริ่มต้นส่วนแรกบนหน้าเมื่อโหลด เพื่อให้มีอินพุตหนึ่งรายการและใช้งานได้
const firstSection = sectionsContainer.querySelector(".app-cmp-section");
if (firstSection) {
  createInputListComponent(firstSection);
}

// ตรวจสอบให้แน่ใจว่าปุ่มลบถูกเปิด/ปิดอย่างถูกต้องตอนเริ่มต้น
updateRemoveButtons();
