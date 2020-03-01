var TableParser = require('table-parser');

window.onload = function()
{
    const file_input = document.getElementById('file-input');
    const analize_button = this.document.getElementById('analyze-button');
    
    analize_button.addEventListener('click', function(e)
    {
        if(!file_input.files[0])
        {
            const err_msg = 'No file is loaded';
            alert(err_msg);
            console.error(err_msg);
            return;
        }
        
        const reader = new FileReader();
        reader.addEventListener('load', function (e)
        {
            const header = e.target.result.match(/^.*[\r]?\n/m);
            let splitted = e.target.result.split(header);
            if(splitted.length <= 2)
            {
                const err_msg = 'Incorrect format. Does file have \"S   UID   PID ...\" header?';
                alert(err_msg);
                console.error(err_msg);
                return;
            }
            splitted.shift(); // Remove first empty element
            
            let parsed = [];
            splitted.forEach(function(elem, index, arr) {
                let ps_parsed = TableParser.parse(header + elem);
                if(ps_parsed.length === 0)
                    console.warn('Incorrect format in line', index);
                else
                    parsed.push(ps_parsed);
                
                console.log('TODO: Progress bar + %');
            });
            
            console.log('Parsed:\n', parsed);
        });
        
        reader.readAsText(file_input.files[0]);
    });
}