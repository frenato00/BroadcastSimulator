To run the project I sugest oppening with VS Code and using the extension Live Now to start the project locally.
<img width="781" height="678" alt="image" src="https://github.com/user-attachments/assets/b9ce1197-51ae-44ee-b55a-b5da5affa36b" />

## How to use:

To toggle activation of nodes left click them
Left clicking elsewhere adds a new node
To delete a node right click
Over the mouse on top of a node to show its max range of comunications

By default a connectivity tree is displayed with green lines when both nodes are in range of one another and yellow if the connection is one directional. Keep in mind this is currently only for the purpose of ilustration as I feel it might be helpful to design the network, I intend for the actual success of comunications to be slightly more nuanced. If the need arises we can change it in the future to better reflect how actual network comunication is behaving (open discussion) 

On the floating Gui you can toggle the display of all node comunication ranges by checking/unchecking showRanges
You can toggle the display of the network connectivity throw the checkbox showConnections
The connectivity tree line thickness can also be adjusted on the slider

## Next steps

I just made a toy, now it's time to make the nodes communicate

TODO:
 - add queues for each node (receive and send)
 - on the network broadcast messages between nodes given the range
 - add a preview (static page or floating view) of the message content of a node (overing on top or maybe selection is preferable?)
 - make frequency and speed of comunication ajustable? I believe this could be useful both as demonstration and for learning purposes.
 - extend Node class to acomodate our need for the more powerfull nodes, could be as simple as a different color and a way to log messages directly when received 

Nice to have:
 - Option for grid displayed in the background
 - Movement on the page and zoom (may be possible with p5 transforms but probably need to change some display mode and change the default network node spawn)

