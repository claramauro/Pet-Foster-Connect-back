
Table animal {
id integer [primary key]
name text
gender text
race text
species text
age number
size text
description text
url_image text
available boolean
}

Table user {
id integer [primary key]
firstname text
lastname text
name text
email text
password text
adress text
zip_code text
city text
department text
phone_number text
description text
url_image text
role text

}


Table request {
   id integer [primary key]
   status text(50)
   user_id integer
   animal_id integer
}

Table animalHasUser{
  id integer [primary key]
  user_id integer
  animal_id integer
}

Ref : user.id < request.user_id
Ref : animal.id < request.animal_id
Ref : animal.id < animalHasUser.animal_id
Ref : user.id < animalHasUser.user_id