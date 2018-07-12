create table inventory (
    id int primary key auto_increment,
    product_name varchar(50) not null,
    product_description varchar(225),
    quantity int default 0,
    price float not null,
    cost float not null
);

insert into inventory (product_name, product_description, price, cost) values 
("Sombrero", "A hat", 1.00, 0.50), 
("Santa Claus Hat", "A cooler hat", 3000.00, 0.00),
("Buret", "I don't event know this brand", 20.00, 14.00),
("Baseball Hat", "Blue Jays!", 20.00, 10.00),
("Fedora", "New and old!", 40.00, 20.00),
("TopHat", "Posh!", 1000.00, 500.00);

-- HOW TO: alter table 
-- alter table TABLE_NAME
-- modify column cost int not null;
-- modify - used in mysql, alter column for sql server

-- add column NEW_COLUMN_NAME type
-- drop column