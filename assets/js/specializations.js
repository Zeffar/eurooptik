document.addEventListener('DOMContentLoaded', function() {
  // Select all buttons and content paragraphs within the specializations section
  const buttons = document.querySelectorAll('#specialitati .specialitati-buttons button');
  const contents = document.querySelectorAll('#specialitati .specialitati-content p');

  // Function to handle the click event
  function switchTab(clickedButton) {
    // Make the clicked button active and others inactive
    buttons.forEach(button => {
      button.classList.remove('active');
    });
    clickedButton.classList.add('active');

    // Get the target content ID from the button's data attribute
    const targetContentId = clickedButton.getAttribute('data-content');
    
    // Show the target content and hide others
    contents.forEach(content => {
      if (content.id === targetContentId) {
        content.classList.add('active');
      } else {
        content.classList.remove('active');
      }
    });
  }

  // Add a click event listener to each button
  buttons.forEach(button => {
    button.addEventListener('click', function() {
      switchTab(this);
    });
  });

  // Automatically activate the first button and its content on page load
  if (buttons.length > 0) {
    switchTab(buttons[0]);
  }
});