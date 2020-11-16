<?php

// Родительский класс, содержащий основную логику, для всех репозиториев. Обмен данными с БД.

namespace app\repositories;

use app\main\Container;
use app\entities\Entity;

abstract class Repository
{
    abstract protected function getTableName():string;
    abstract protected function getEntityName():string;

    // Подключение контейнера.
    protected $container;
    public function setContainer(Container $container)
    {
        $this->container = $container;
    }
    // Подключение к БД.
    protected function getDB()
    {
        return $this->container->db;
    }

    // Методы получения данных из БД.
    public function getOneWhere($key, $value)
    {
        $tableName = $this->getTableName();
        $sql = "SELECT * FROM $tableName WHERE $key = :$key ";
        $params = [":$key" => $value];
        return $this->getDB()->getObject($sql, $this->getEntityName(), $params);
    }

    public function getAll()
    {
        $tableName = $this->getTableName();
        $sql = "SELECT * FROM `$tableName`";
        return $this->getDB()->getAllObjects($sql, $this->getEntityName());
    }

    public function getAllWhere($key, $value)
    {
        $tableName = $this->getTableName();
        $sql = "SELECT * FROM $tableName WHERE $key = :$key ";
        $params = [":$key" => $value];
        return $this->getDB()->getAllObjects($sql, $this->getEntityName(), $params);
    }

    // Методы для вставки, обновления (сохранения) данных в БД.
    protected function insert(Entity $entity)
    {
        $fields = [];
        $params = [];
        foreach ($entity as $fieldName => $value) {
            if ($fieldName == 'id') {
                continue;
            }
            $fields[] = $fieldName;
            $params[":{$fieldName}"] = $value;
        }

        $sql = sprintf(
            "INSERT INTO %s (%s) VALUES (%s)",
            $this->getTableName(),
            implode(',', $fields),
            implode(',', array_keys($params))
        );

        $this->getDB()->execute($sql, $params);
        $entity->id = $this->getDB()->getLastId();
        return $entity;
    }

    protected function update(Entity $entity)
    {

        $fields = [];
        $params = [];
        foreach ($entity as $fieldName => $value) {
            $params[":{$fieldName}"] = $value;
            if ($fieldName == 'id') {
                continue;
            }
            $fields[] = "{$fieldName} = :{$fieldName}";
        }

        $sql = "UPDATE " . $this->getTableName() . " SET " . implode(',', $fields) . " WHERE id = :id";
        $this->getDB()->execute($sql, $params);
        return $entity;
    }

    public function save(Entity $entity)
    {
        if (empty($entity->id)) {
            return $this->insert($entity);
        }
        return $this->update($entity);
    }

    // Удаление данных из БД.
    public function delete($id)
    {
        $tableName = $this->getTableName();
        $sql = "DELETE FROM $tableName WHERE id = :id";
        $params = [':id' => $id];
        $this->getDB()->execute($sql, $params);
    }
}
