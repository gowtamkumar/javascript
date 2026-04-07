# SQL (RDBMS - Relational Database Management System)

# https://www.geeksforgeeks.org/sql/sql-ddl-dql-dml-dcl-tcl-commands/

## query type:

# 1. DDL(Data Definition Language)

      1. CREATE
      2. DROP
      3. ALTER

# 2.DML(Data Manipulation Language)

    1. UPDATE
    2. DELETE
    3. INSERT

# 3. DQL(Data Query Language)

    1. SELECT

# DCL(Data Control Language)

    1.  gRANT,
    2.  REVOKE

# TCL(Transaction Control Language)

# id

serial,
bigserial

# posgresql data type

# Advance query for insert data:

    DO $$
    BEGIN
        FOR i IN 1..100 LOOP
            INSERT INTO products(name, price) VALUES('product' || i, ROUND(random() * (100 - 1) + 1));
        END LOOP;
    END $$;

# query explanin analyze;

    EXPLAIN ANALYZE
    SELECT * FROM products

# unique b-tree index

## trim,ltrim,rtrim,substring,concat,||,replace,left,right,

## relation,join,normaliztion(1NF,2NF,3NF), composeit key

## how to write in sql composit key

## dependency in table

## ERD Basics

# pagination

    #offset pabe pagination.
    offset,offset base problem,
    # curser base pagination

## connection pool most important
