<?php
/**
 * Created by JetBrains PhpStorm.
 * User: tjmonsi
 * Date: 10/7/13
 * Time: 8:12 PM
 * To change this template use File | Settings | File Templates.
 */

// This automatically sets you to go do the second interface
if (!isset($_COOKIE["user"])){
    $message = "Please use a username";
    header("Location: index.php?message=".$message);
    exit;
}

if (!isset($_COOKIE["interface"])){
    $message = "Interface is not set";
    header("Location: index.php?message=".$message);
    exit;
}

if (!isset($_COOKIE["acp"])) {

}

// checks if first interface was already tested (and subsequently, second interface)
//if (isset($_COOKIE["done1"])){
//    header("Location: page5.php");
//    exit;
//}

if (isset($_COOKIE["block"]) && isset($_COOKIE["max_blocks"])) {
    $block_num = intval($_COOKIE["block"]);
    $block_num = $block_num+1;
    $max_blocks = intval($_COOKIE["max_blocks"]);
    $numbers = $max_blocks*2;
    if (($numbers)<=$block_num) {


        header("Location: page5.php");
        exit;
    } else {
        setcookie("block", strval($block_num), time()+(3600*3));
    }


} else if (isset($_COOKIE["done1"])){
    header("Location: page5.php");
    exit;
} else {
    setcookie("done1", "true", time()+(3600*3));
}

// sets cookie that first interface was already tested


header("Location: page3.php");