(function ($) {
    'use strict';

    $.HSCore.components.HSFileAttachment = {
        initFileUpload: function () {
            // Unbind any previously bound 'change' events to avoid double binding
            $('.js-file-attachment').off('change').on('change', function (event) {
                var inputElement = $(this);
                var inputElementId = inputElement.attr('id');  // Get the ID of the clicked input
                var actionUrl = $('#urlOfUploadControllerAction').val(); // Get the base upload URL
                var fullUrl = actionUrl + '/' + inputElementId;  // Append the file input's ID to the URL

                // Check if a file was selected
                if (inputElement[0].files.length > 0) {
                    // Create a FormData object to hold the file and send it via AJAX
                    var formData = new FormData();
                    formData.append(inputElementId, inputElement[0].files[0]);

                    // Send the file to the server via AJAX
                    $.ajax({
                        url: fullUrl,  // Use the dynamically constructed URL
                        type: 'POST',
                        data: formData,
                        processData: false,  // Prevent jQuery from converting the data into a query string
                        contentType: false,  // Set contentType to false as we're sending FormData
                        headers: {
                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')  // Ensure CSRF token is included
                        },
                        success: function (response) {
                            console.log('File uploaded successfully');
                            // Display a success message or update the UI
                            location.reload(); // Reload the page on success
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            console.log('Error uploading file: ' + errorThrown);
                            // Handle any errors (e.g., display an error message to the user)
                        }
                    });
                } else {
                    console.log('No file selected');
                }
            });
        }
    };

    // Call the method on document ready
    $(document).ready(function () {
        $.HSCore.components.HSFileAttachment.initFileUpload();
    });
})(jQuery);
