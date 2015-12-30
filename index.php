<?php
//mysql_connect('localhost','root','');
//mysql_select_db('devil');
#mysql_query('insert into tracking (server) values("'.htmlspecialchars($_SERVER['REMOTE_ADDR']).'")') or die('sorry');
?>
<html>
<head>
<title>Kill the Devil ^^</title>
<link type="text/css" href="css/game.css" rel="stylesheet" />
</head>
	<body>
	<div class="top-bar">
		<div style="float: left"><h1 id="title">Kill all the devils!</h1></div>
		<div style="float: left; margin: 30px 0px 0px 20px;">Killed: <span id="killed">0</span></div>
		<div style="float: left; margin: 30px 0px 0px 20px;">Missed: <span id="missed">0</span></div>
		<div style="float: left; margin: 30px 0px 0px 20px;">Angels saved: <span id="saved">0</span></div>
		<div style="float: right;"><h1>00:<label id="minutes">00</label>:<label id="seconds">00</label></h1></div>
	</div>
		<div id="game"></div>
		<script type="text/javascript" src="js/game.js"></script>
	</body>


</html>
