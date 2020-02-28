/*
Convert the following format:
S   UID   PID  PPID   VSZ   RSS TTY   STIME TIME     CMD
S     0  2168  2165 31616 19580 0:0   Feb21 00:02:30 hg6d -d
S  1009  3961  2168  5120  3660 0:0   Feb21 00:00:42 /usr/sbin/dhcpd -f -cf /o

To:
["hg6d -d", 0, 2168, 2165, 31616, 19580, 00:02:30], 
["/usr/sbin/dhcpd -f -cf /o", 1009, 3961, 2168, 5120, 3660, 00:00:42]

S     - Process status code
UID   - Username of the process's owner
PID   - Process ID number
PPID  - ID number of the process's parent process
VSZ   - Virtual memory usage (Virtual Set Size)
RSS   - Real memory usage (Resident Set Size)
TTY   - Terminal associated with the process
STIME - Time when the process started
CMD   - Name of the process, including arguments, if any
*/
export function parse_ps(file)
{
    //console.log("Input file:\n", file);
    
    var lines = file.split('\n');
    
    var header_index = find_header(lines);
    if (header_index == -1)
    {
        var err_msg = "Can't parse this file. Is it \"ps -l\" output?";
        alert(err_msg);
        console.error(err_msg);
        return;
    }
    
    // CMD field value can contain spaces, so parse it separately
    var cmd_offset = lines[header_index].indexOf('CMD');
    
    lines.splice(0, header_index + 1);
    
    var res = new Array();
    for(var i = 0; i < lines.length; i++)
    {
        var line = lines[i].split(/(\s+)/);
        var line_filtered = line.filter(function (el)
        {
            el.replace(" ", "");
            return el != "";
        });
        
        var element = new Map();
        var opts = ['S', 'UID', 'PID', 'PPID', 'VSZ', 'RSS', 'TTY', 'STIME', 'TIME', 'CMD'];
        for(var opt = 0; opt < opts.length; opt++)
            element.set(opts[opt], line_filtered[opt]);
        res.push(element);
    }
    
    
    
    return res;
    /*return [
        {CMD: 'hg6d -d', UID: '0', PID: '2168', PPID: '2165', VSZ: '31616', RSS: '19580', TTY: '0:0', STIME: '00:02:30', S: 'S'},
        {CMD: '/usr/sbin/dhcpd -f -cf /o', UID: '1009', PID: '3961', PPID: '2168', VSZ: '5120', RSS: '3660', TTY: '0:0', STIME: '00:00:42', S: 'S'}
    ];*/
}

/* Find the following header (spacing between columns may be different)
"S   UID   PID  PPID   VSZ   RSS TTY   STIME TIME     CMD"
*/
function find_header(lines)
{
    for(var i = 0; i < lines.length; i++)
    {
        if(lines[i].replace(/\s/g, "") === "SUIDPIDPPIDVSZRSSTTYSTIMETIMECMD")
            return i;
    }
    
    return -1;
}