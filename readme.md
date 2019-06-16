## Cateva cuvinte despre implementare
	Logica backend-ului se afla in controller-ul BookController, mapata prin rute de tip API.
	Frontend-ul este realizat in ReactJS.

## Instructiuni de instalare

Dupa ce s-a downloadat tot proiectul, se ruleaza:<br>
	- <b>composer install</b><br>
	- <b>npm install</b><br>
	- <b>php artisan key:generate</b><br>
	- <b>php artisan migrate:fresh</b><br>
	- <b>php artisan db:seed</b><br>
	
Apoi, in <b>Controllers/BookController</b>, in functia <b>getOrigin()</b>, se va edita acel path in concordanta cu path-ul /public al serverului celui care testeaza, sa nu uitati de extensia de la final <b>/images</b>
La final, se editeaza in <b>resources/js/helpers/index.js</b> variabila <b>serverName</b> in functie de adresa pe care va fi configurat serverul.

## Rularea proiectului

Proiectul se ruleaza prin 2 comenzi:<br>
	-<b>npm run dev</b><br>
	-<b>php artisan serve</b><br>
