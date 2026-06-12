document.addEventListener('DOMContentLoaded', () => {
  const modalOverlay = document.getElementById('modal-overlay');
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });
  
  // Attach close modal to close button if exists
  const btnClose = document.getElementById('modal-close');
  if (btnClose) {
    btnClose.addEventListener('click', closeModal);
  }
});

function openModal(pdfPath, title) {
  const modalOverlay = document.getElementById('modal-overlay');
  const modalObject = document.getElementById('modal-object');
  const modalFallbackLink = document.getElementById('modal-fallback-link');
  const modalTitle = document.getElementById('modal-title');
  const modalDownload = document.getElementById('modal-download');
  const modalNewTab = document.getElementById('modal-new-tab');
  
  if (!modalOverlay || !modalObject) return;
  
  if (modalTitle) {
    modalTitle.textContent = title;
  }
  
  const filename = pdfPath.split('/').pop() || 'document.pdf';
  if (modalDownload) {
    modalDownload.href = pdfPath;
    modalDownload.setAttribute('download', filename);
  }
  
  if (modalNewTab) {
    modalNewTab.href = pdfPath;
  }
  
  if (modalFallbackLink) {
    modalFallbackLink.href = pdfPath;
  }
  
  // Refresh object to ensure proper rendering
  const parent = modalObject.parentNode;
  const newObject = modalObject.cloneNode(true);
  newObject.data = pdfPath;
  parent.replaceChild(newObject, modalObject);
  
  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modalOverlay = document.getElementById('modal-overlay');
  
  if (!modalOverlay) return;
  
  modalOverlay.classList.remove('active');
  document.body.style.overflow = 'auto';
  
  setTimeout(() => {
      const modalObject = document.getElementById('modal-object');
      if (modalObject) {
         const parent = modalObject.parentNode;
         const newObject = modalObject.cloneNode(true);
         newObject.removeAttribute('data');
         parent.replaceChild(newObject, modalObject);
      }
  }, 300);
}
