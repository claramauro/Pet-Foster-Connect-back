Table animal {
id integer [primary key]
species text
name text
gender text
race text
age number
size text
description text
url_image text
available boolean
association_id integer
family_id integer
}

Table user{
id integer [primary key]
email text
password text
association_id integer
family_id integer
role text
}

Table family {
id integer [primary key]
name text
adress text
zip_code text
city text
department text
phone_number text
description text
url_image text
}

Table association {
id integer [primary key]
name text
adress text
zip_code text
city text
department text
phone_number text
description text
url_image text
}

Table request {
id integer [primary key]
status text
animal_id integer
family_id integer
association_id integer
}

Ref : family.id < animal.family_id
Ref : association.id < animal.association_id
Ref : family.id < request.family_id
Ref : animal.id < request.animal_id
Ref : family.id < user.family_id
Ref : association.id < user.association_id
