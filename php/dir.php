<?php
$filenameList = getFileList($_POST['dir_path']);
echo json_encode($filenameList);

function getFileList($url)
{
    $filenameList = [];
    foreach (glob($url . '/*') as $filename) {
        $p = pathinfo($filename);
        $filenameList[] = $p['filename'].".".$p['extension'];
    }
    return $filenameList;
}
