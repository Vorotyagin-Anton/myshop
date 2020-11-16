<?php

// сервис для подключения и взаимодействия с БД.

namespace app\services;

class DB
{
    private $config;
    private $connection;

    // В config.php указаны параметры подключения к БД.
    public function __construct($config)
    {
        $this->config = $config;
    }

    // подключение к БД. 
    private function getConnection()
    {
        if (empty($this->connection)) {
            $this->connection = new \PDO(
                $this->getSdn(),
                $this->config['login'],
                $this->config['password']
            );

            $this->connection->setAttribute(
                \PDO::ATTR_DEFAULT_FETCH_MODE,
                \PDO::FETCH_ASSOC
            );
        }

        return $this->connection;
    }
    // Получаем параметры подключения к БД из config.php
    private function getSdn()
    {
        return sprintf(
            "%s:host=%s;dbname=%s;charset=%s",
            $this->config['driver'],
            $this->config['host'],
            $this->config['db'],
            $this->config['charset']
        );
    }
    // Подготовка и выполнение запроса.
    private function query($sql, $params = [])
    {
        $PDOStatement = $this->getConnection()->prepare($sql);
        $PDOStatement->execute($params);
        return $PDOStatement;
    }


    // Методы для взаимодействия с БД
    public function find($sql, $params = [])
    {
        return $this->query($sql, $params)->fetch();
    }

    public function findAll($sql, $params = [])
    {
        return $this->query($sql, $params)->fetchAll();
    }

    public function get($sql, $params = [])
    {
        $PDOStatement = $this->query($sql, $params);
        return $PDOStatement->fetch();
    }

    public function getAll($sql, $params = [])
    {
        $PDOStatement = $this->query($sql, $params);
        return $PDOStatement->fetchAll();
    }

    public function getObject($sql, $className, $params = [])
    {
        $PDOStatement = $this->query($sql, $params);
        $PDOStatement->setFetchMode(\PDO::FETCH_CLASS, $className);
        return $PDOStatement->fetch();
    }

    public function getAllObjects($sql, $className, $params = [])
    {
        $PDOStatement = $this->query($sql, $params);
        $PDOStatement->setFetchMode(\PDO::FETCH_CLASS, $className);
        return $PDOStatement->fetchAll();
    }

    public function execute($sql, $params = [])
    {
        $this->query($sql, $params);
    }

    public function getLastId()
    {
        return $this->getConnection()->lastInsertId();
    }
}
