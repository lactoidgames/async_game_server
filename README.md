async_game_server
=================

Usage

~~~bash
telnet localhost 8080
~~~

Connect to a game channel
~~~
{"type":"join","channel":"game123"}
~~~

Send a message

~~~bash
{"type":"message","channel":"game123","data":"woot"}
~~~
