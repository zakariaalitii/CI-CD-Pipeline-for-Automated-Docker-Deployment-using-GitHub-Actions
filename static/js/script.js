

    var submitBtn = document.getElementById('submit-btn');
    var loginForm = document.getElementById('login-form');
    
    submitBtn.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default form submission
        
        var email = loginForm.email.value;
        var password = loginForm.password.value;
        
        if (email.trim() === '' || password.trim() === '') {
            alert('Please enter both email and password.');
        } else {
            loginForm.submit(); // Submit the form if validation passes
        }
    });



  var animation = bodymovin.loadAnimation({
    container: document.getElementById('animContainer'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'https://assets3.lottiefiles.com/temp/lf20_iRxzMr.json', // lottie file path
    
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid meet',
      }
  })
  
  var animation = bodymovin.loadAnimation({
    container: document.getElementById('animationCon'),
    path:"https://assets2.lottiefiles.com/packages/lf20_N147L2Vh4e.json",
    render: 'svg',
    loop:true,
    autoplay:true,
    name:'demo animation'
})
 


document.getElementById("submit-btn").addEventListener("click",function(){
    this.classList.add("loading");
    this.innerHTML = "<i class='fa fa-refresh fa-spin' class='icon' ></i> Logging In";
    setTimeout(function() {
        submitBtn.innerHTML = "Submit"; // Restore the button text
        submitBtn.classList.remove("loading");
        
    }, 4000);
})



// Assuming you have a JavaScript function to handle the error and show the flash message
function showError(message) {
    // Get the flash message element
    var flashMessage = document.querySelector('.flash-message.error');
  
    // Set the error message
    flashMessage.innerHTML = '<p>' + message + '</p>';
  
    // Show the flash message
    flashMessage.style.display = 'block';
  
    // Automatically hide the flash message after 4 seconds
    setTimeout(function() {
      flashMessage.style.display = 'none';
    }, 4000);
  }
  
  // Example usage:
  // Call the showError function when an error occurs
  showError('User not found');
  


  