<?php
/**
 * Created by PhpStorm.
 * User: sanzhar
 * Date: 04.10.17
 * Time: 20:46
 */

namespace app\models;


use yii\db\Migration;
use yii\db\Query;

/**
 * Class Main
 * @package app\models
 */
class Main
{
    /**
     * Main constructor.
     * @param bool $init
     */
    function __construct(bool $init)
    {
        if($init) {
            $this->create();
            $this->loadData();
        }
    }

    /**
     * function to init db architecture
     */
    protected function create()
    {
        $migration = new Migration();

        $migration->createTable('directory', [
            'id' => $migration->primaryKey(),
            'name' => $migration->string(255)->notNull(),
            'parent_id' => $migration->integer()->null(),
        ]);

        $migration->createTable('filelist', [
            'id' => $migration->primaryKey(),
            'name' => $migration->string(255)->notNull(),
            'directory_id' => $migration->integer(),
        ]);

        $migration->addForeignKey('fk_file_to_directory', 'filelist',
            'directory_id', 'directory', 'id', 'CASCADE', 'RESTRICT');
    }

    /**
     * load files and directories from root directory
     */
    protected function loadData()
    {
        $rootDirectory = __DIR__.'/../tmp/files';
        $this->scanDir($rootDirectory);
    }

    /**
     * Return files and directories data as array
     * @return array
     */
    public function getData()
    {
        $query = new Query();

        return [
            'directories' => $query->select('*')
                ->from('directory')
                ->orderBy(['id' => SORT_ASC,'name' => SORT_ASC])->all(),
            'files' => $query->select('*')
                ->from('filelist')
                ->orderBy(['name' => SORT_ASC])->all()
        ];
    }

    /**
     * @param $dir
     * @param null $parent
     */
    private function scanDir($dir, $parent = null){
        $files = scandir($dir);

        if(!is_null($parent)){
            $query = new Query();
            $parentId = $query->select('id')
                ->from('directory')
                ->where(['name' => $parent])
                ->orderBy(['id' => SORT_DESC])->one();
        }
        foreach($files as $key => $value){
            if($value != "." && $value != ".."){
                $path = realpath($dir.DIRECTORY_SEPARATOR.$value);

                if(!is_dir($path)) {
                    if(preg_match("/^[a-zA-Z0-9.-].*[.](?!exe$).*$/",$value)) {
                        if (is_null($parent)) {
                            \Yii::$app->db->createCommand()
                                ->insert('filelist', [
                                    'name' => $value,
                                ])
                                ->execute();
                        } else {
                            \Yii::$app->db->createCommand()
                                ->insert('filelist', [
                                    'name' => $value,
                                    'directory_id' => $parentId['id']
                                ])
                                ->execute();
                        }
                    }
                } elseif($value != "." && $value != "..") {
                    if(is_null($parent)){
                        \Yii::$app->db->createCommand()
                            ->insert('directory', [
                                'name' => $value,
                            ])
                            ->execute();
                    }else{
                        \Yii::$app->db->createCommand()
                            ->insert('directory', [
                                'name' => $value,
                                'parent_id' => $parentId['id']
                            ])
                            ->execute();
                    }
                    $this->scanDir($path, basename($path));
                }
            }
        }
    }
}