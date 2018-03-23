<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>Wolfplex sandbox</title>
    <link rel="Stylesheet" href="/css/sandbox.css" type="text/css" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
</head>
<body>
<div id="SandBox"></div>
<div id="Items">
<p>[ <?php
	$txts = glob('*.txt');
	foreach ($txts as $txt) {
		$links[] = '<a href="' . $txt . '">' . $txt . '</a>';
	}
	echo implode(' | ', $links);
?> ]</p>
<p>This folder contains text forms to fill.</p>
</div>
</body>
</html>
