import { parse_ps } from './parse_ps';

var file;

//document.addEventListener("DOMContentLoaded", main);

//function main()
window.onload = function()
{
    //await wdr();
    //testing();
    
    const file_input = document.getElementById('file-input');
    const analize_button = this.document.getElementById('analyze-button');
    
    
    
    file_input.addEventListener('change', on_choose_file);
    analize_button.addEventListener('click', on_click_analyze);
    /*{
        e.preventDefault();

        alert("mydebug");
    });*/
}

function on_choose_file()
{
    console.log('Selected file:', this.files[0]);
    
    var reader = new FileReader();
    reader.addEventListener('load',
    function (e)
    {
        file = e.target.result;
    });
    
    reader.readAsText(this.files[0]);
}

function on_click_analyze()
{
    if(!file)
    {
        var err_msg = "No file is loaded";
        alert(err_msg);
        console.error(err_msg);
        return;
    }
    
    console.log("Parsed:\n", parse_ps(file));
}