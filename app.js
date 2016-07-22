$( document ).ready(function() {

    // Global variables
    var swatches = $('#colors').find('.color-swatch');

    // Create initial backgrounds & labels
    $(swatches).each(function(){
        // Get hex
        var swatchHex = $(this).attr('data-hex');
        // Fill background
        $(this).css({'background' : '#' + swatchHex});
        // Change label
        $(this).find('.color-code').text(swatchHex);
    });


    // Choose format
    $('.format-option').click(function(){
        // Variables
        var format = $(this).attr('data-format');
        var label = $(this).text();

        // Change input value
        $('#format input').val(format);

        // Change selected value
        $('#format span').text(label);

        // Refresh labels if needed
        $(swatches).each(function(){
            var swatchHex = $(this).attr('data-hex');
            if($('#format input').val() != 'hex'){

                // Get value of hex
                var result = parseInt(swatchHex, 16);
                // Parse each element
                var r = (result >> 16) & 255;
                var g = (result >> 8) & 255;
                var b = result & 255;
                // Return value
                var rgbVal = r + ", " + g + ", " + b;

                // Change labels to RGB
                $(this).find('.color-code').text(rgbVal);
            } else {

                // Change labels to HEX
                $(this).find('.color-code').text(swatchHex);
            }


        });
        return false;
    });


    // Click to clipboard
    $('.color-swatch').click(
        function(){
            var swatchHex = $(this).attr('data-hex');
            var swatchCode = $(this).find('.color-code').text();

            if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
                alert('Sorry, safari is not supported');
                $(this).children('.color-code').select();
            } else {

            // Create temp element
            var $temp = $("<input>");
            $("body").append($temp);
            // Add value to temp element
            $temp.val(swatchCode).select();
            // Copy to clipboard
            document.execCommand("copy");
            $temp.remove();

            // Successfull copy
            $(function(){
                $('#success').css({'background' : '#' + swatchHex });
                $('#success').find('p').text(swatchCode);
                $('#success').fadeIn('fast').delay(1000).fadeOut('fast');
            });

        }
    });


}); // End document.ready
