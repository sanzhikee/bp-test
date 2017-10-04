<?php
/**
 * Created by PhpStorm.
 * User: sanzhar
 * Date: 04.10.17
 * Time: 23:07
 */

namespace app\controllers;


use app\models\Main;
use yii\rest\Controller;

class DataController extends Controller
{
    public function behaviors()
    {
        $parent = parent::behaviors();
        unset($parent['contentNegotiator']['formats']['application/xml']);

        return $parent;
    }
    public function actionIndex()
    {
        $main = new Main(false);
        $data = $main->getData();
        if(empty($data['categories']) && empty($data['files'])){
            return "error";
        }

        return $main->getData();
    }
}