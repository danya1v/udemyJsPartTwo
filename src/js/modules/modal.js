function modal(){
   const modalTrigger = document.querySelectorAll("[data-modal]"),
    modal = document.querySelector(".modal");
  let wasOpened = false;

  function openModal() {
    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";
    // clearInterval(modalTimerId);
    wasOpened = true;
  }

  function closeModal() {
    modal.classList.remove("show");
    modal.classList.add("hide");
    document.body.style.overflow = "visible";
  }

  modalTrigger.forEach((btn) => {
    btn.addEventListener("click", openModal);
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.getAttribute("data-close") == "") {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && modal.classList.contains("show")) {
      closeModal();
    }
  });

  function showModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
        document.documentElement.scrollHeight &&
      wasOpened === false
    ) {
      openModal();
      window.removeEventListener("scroll", showModalByScroll);
    }
  }
  // const modalTimerId = setTimeout(openModal, 8000);
  window.addEventListener("scroll", showModalByScroll);
}


export default modal;