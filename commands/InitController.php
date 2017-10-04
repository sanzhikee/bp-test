<?php
/**
 * @link http://www.yiiframework.com/
 * @copyright Copyright (c) 2008 Yii Software LLC
 * @license http://www.yiiframework.com/license/
 */

namespace app\commands;

use app\models\Main;
use yii\console\Controller;

/**
 * This controller for init Main Class db architecture
 */
class InitController extends Controller
{

    public function actionIndex()
    {
        $main = new Main(true);
    }
}
