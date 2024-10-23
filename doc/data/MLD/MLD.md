Table animal {
id integer [primary key]
name text
gender text
race text
age number
size text
description text
url_image text
available boolean
family_id integer
type_id integer
association_id integer
}

Table association {
id integer [primary key]
name text
email text
password text
adress text
phone_number text
description text
url_image text
role_id integer
location_id integer
}

Table family {
id integer [primary key]
firstname text
lastname text
email text
password text
adress text
phone_number text
description text
url_image text
status text
role_id integer
location_id integer
}

Table type {
 id integer [primary key]
 name text(128) 
}

Table location {
 id integer [primary key]
 department_number number
 department_name text(128)
}

Table request {
   id integer [primary key]
   status text(50)
   family_id integer
   animal_id integer
}

Table role {
id integer [primary key]
name text(128) 
}

Ref : role.id < family.role_id
Ref : location.id < family.location_id
Ref : family.id < animal.family_id
Ref : type.id < animal.type_id
Ref : role.id < association.role_id
Ref : location.id < association.location_id
Ref : association.id < animal.association_id
Ref : family.id < request.family_id
Ref : animal.id < request.animal_id
