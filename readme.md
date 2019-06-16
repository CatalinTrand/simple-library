## Cateva cuvinte despre implementare
	Logica backend-ului se afla in controller-ul BookController, mapata prin rute de tip API.
	Frontend-ul este realizat in ReactJS.

## Instructiuni de instalare

Dupa ce s-a downloadat tot proiectul, se ruleaza:
	- <b>composer install</b>
	- <b>npm install</b>
	- <b>php artisan key:generate</b>
	- <b>php artisan migrate:fresh</b>
	- <b>php artisan db:seed</b>
	
Apoi, in <b>Controllers/BookController</b>, in functia <b>getOrigin()</b>, se va edita acel path in concordanta cu path-ul /public al serverului celui care testeaza, sa nu uitati de extensia de la final <b>/images</b>
La final, se editeaza in <b>resources/js/helpers/index.js</b> variabila <b>serverName</b> in functie de adresa pe care va fi configurat serverul.

## Rularea proiectului

Proiectul se ruleaza prin 2 comenzi:
	-<b>npm run dev</b>
	-<b>php artisan serve</b>
