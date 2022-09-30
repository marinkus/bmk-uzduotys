<?php

$str = 'Semionas Semionovičius užsidėjęs akinius žiūri į pušį ir mato: pušyje sėdi mužikas ir rodo jam kumštį. 
Semionas Semionovičius nusiėmęs akinius žiūri į pušį ir mato, kad pušyje niekas nesėdi. 
Semionas Semionovičius užsidėjęs akinius žiūri į pušį ir vėl mato, kad pušyje sėdi mužikas ir rodo jam kumštį. 
Semionas Semionovičius nusiėmęs akinius vėl mato, kad pušyje niekas nesėdi. 
Semionas Semionovičius, vėl užsidėjęs akinius, žiūri į pušį ir vėl mato, kad pušyje sėdi mužikas ir rodo jam kumštį. 
Semionas Semionovičius nenori tikėti šiuo reiškiniu ir šį reiškinį laiko optine apgaule.';
$str = str_replace(',', '', $str).str_replace('.', '', $str);
$arrOfWords = explode(' ', $str,);


echo '<pre>';

$arr = array_count_values($arrOfWords);
arsort($arr);

print_r($arr);

// SQL

    $host = '127.0.0.1';
    $db   = 'bmk';
    $user = 'root';
    $pass = '';
    $charset = 'utf8mb4';

    $dsn = "mysql:host=$host;dbname=$db;charset=$charset";
    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];

    $pdo = new PDO($dsn, $user, $pass, $options);

    $sql = "
INSERT INTO words 
(zodis, pasikartojimu_kiekis)
 VALUES (?, ?)
";
    $count = 5;
    foreach ($arr as $key => $value) {
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$key, $value]);
        $count--;
        if ($count === 0) {
            die;
        }
    }

