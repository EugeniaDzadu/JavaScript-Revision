document.getElementById("btnSearch").addEventListener("click", function() {
    const searchButton = document.getElementById("btnSearch");
    const verse = document.getElementById("txtVerse").value.trim(); // Trim spaces
    const loader = document.querySelector('.loader');
    const reference = document.getElementById('reference');
    const preview = document.getElementById('preview');
    
    // Disable the search button
    searchButton.disabled = true;

    // Show the loader
    loader.style.display = 'block';
    reference.innerHTML = '';
    preview.innerHTML = '';

    // Check if the trimmed input is empty
    if (verse.length > 0) {
        console.log('hello');
        
        // Fetch the verse from API
        fetch(`https://bible-api.com/${verse}`)
        .then(response => response.json())
        .then(data => {
            loader.style.display = 'none'; // Hide the loader here
            //This button is set to false because of the alert message that already pops up
            searchButton.disabled = false 

            // Checking if the API will return an error
            if (data.error) {
                alert('Invalid Bible verse reference.');
            } else {
                // Display the reference and verse text
                reference.innerHTML = `${data.reference}`;
                preview.innerHTML = `${data.text}`;
            }
            
        })
        .catch(error => {
            loader.style.display = 'none';
            searchButton.disabled = false; 
            alert('Please try again!!');
            console.error('Error:', error);
        });
        
    } else {
        loader.style.display = 'none';
        searchButton.disabled = false
        alert('Please enter a valid verse.');
    }
});
