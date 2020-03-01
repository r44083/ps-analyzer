# ps-analyzer
Web-based interactive analyzer of "ps -l" linux output

Convert the following format:
```
S   UID   PID  PPID   VSZ   RSS TTY   STIME TIME     CMD
S     0  2168  2165 31616 19580 0:0   Feb21 00:02:30 hg6d -d
S  1009  3961  2168  5120  3660 0:0   Feb21 00:00:42 /usr/sbin/dhcpd -f -cf /o
```

To:
```
["hg6d -d", 0, 2168, 2165, 31616, 19580, 00:02:30], 
["/usr/sbin/dhcpd -f -cf /o", 1009, 3961, 2168, 5120, 3660, 00:00:42]
```

And draws beautiful diagrams.

## How to build:
1. `npm install`
2. `npx webpack`

## How to use:
1. Collect data
```sh
while :; do ps -l && sleep 60; done >> /tmp/ps.log
```
2. Dump data from board (in case of embedded linux)
```sh
tftp -p -l /tmp/ps.log -r ps.log $(arp -n -i BR_LAN | grep -o -m 1 '\([0-9]\{1,3\}\.\)\{3\}[0-9]\{1,3\}')
```
3. Analyze it
```sh
chrome ./ps-analyzer/build/index.html
```

## ps -l fields description:
```
S     - Process status code
UID   - Username of the process's owner
PID   - Process ID number
PPID  - ID number of the process's parent process
VSZ   - Virtual memory usage (Virtual Set Size)
RSS   - Real memory usage (Resident Set Size)
TTY   - Terminal associated with the process
STIME - Time when the process started
CMD   - Name of the process, including arguments, if any
```