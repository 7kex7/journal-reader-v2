## Описание запросов к серверу

{
  "email": "sec@mail.com",
  "username": "second_user",
  "password": "1234"
}

{
  "title": "first title",
  "description": "it is very first journal",
  "year": 1984,
  "status": "in work",
  "genres": ["drama", "сёнен"],
  "authors": ["7kex7"]
}


### USER

##### Регистрация POST: host/api/users/registration

* Входные данные:

<table class="tg">
<thead>
  <tr>
    <td class="tg-0pky" rowspan="4">req.body</td>
    <td class="tg-0pky">email</td>
    <td class="tg-0lax">string</td>
  </tr>
  <tr>
    <td class="tg-0pky">username<br></td>
    <td class="tg-0lax">string</td>
  </tr>
  <tr>
    <td class="tg-0pky">password</td>
    <td class="tg-0lax">string</td>
  </tr>
  <tr>
    <td class="tg-0pky">? is_admin</td>
    <td class="tg-0lax">boolean (false)</td>
  </tr>
</thead>
</table>

* Возвращаемые данные:

<table class="tg">
<thead>
  <tr>
    <td class="tg-0pky">jwt токен</td>
    <td class="tg-0lax">string</td>
  </tr>
  <tr>
    <td class="tg-0pky">ошибка</td>
    <td class="tg-0pky">Error (server/src/error/apiError.ts)</td>
  </tr>
</thead>
</table>

<br />

##### Вход POST: host/api/users/login

* Входные данные

<table class="tg">
<thead>
  <tr>
    <td class="tg-0pky" rowspan="2">req.body</td>
    <td class="tg-0pky">email</td>
    <td class="tg-0lax">string</td>
  </tr>
  <tr>
    <td class="tg-0pky">password</td>
    <td class="tg-0lax">string</td>
  </tr>
</thead>
</table>

* Возвращаемые данные:

<table class="tg">
<thead>
  <tr>
    <td class="tg-0pky">jwt токен</td>
    <td class="tg-0lax">string</td>
  </tr>
  <tr>
    <td class="tg-0pky">ошибка</td>
    <td class="tg-0pky">Error (server/src/error/apiError.ts)</td>
  </tr>
</thead>
</table>

<br />

##### Поиск одного пользователя : host/api/users/find

* Входные данные

<table class="tg">
<thead>
  <tr>
    <td class="tg-0pky" rowspan="2">req.body</td>
    <td class="tg-0pky">email</td>
    <td class="tg-0lax">string</td>
  </tr>
  <tr>
    <td class="tg-0pky">password</td>
    <td class="tg-0lax">string</td>
  </tr>
</thead>
</table>

* Возвращаемые данные:

<table class="tg">
<thead>
  <tr>
    <td class="tg-0pky" rowspan="6">user JSON</td>
    <td class="tg-0pky">id</td>
    <td class="tg-0lax">number</td>
  </tr>
  <tr>
    <td class="tg-0pky">is_admin</td>
    <td class="tg-0lax">boolean</td>
  </tr>
  <tr>
    <td class="tg-0pky">username</td>
    <td class="tg-0lax">string</td>
  </tr>
  <tr>
    <td class="tg-0pky">email</td>
    <td class="tg-0lax">string</td>
  </tr>
  <tr>
    <td class="tg-0pky">password (хэш)</td>
    <td class="tg-0lax">string</td>
  </tr>
  <tr>
    <td class="tg-0pky">photo</td>
    <td class="tg-0lax">string</td>
  </tr>
   <tr>
    <td class="tg-0pky">ошибка</td>
    <td class="tg-0pky"></td>
    <td class="tg-0pky">Error (server/src/error/apiError.ts)</td>
  </tr>
</thead>
</table>

<hr />

### JOURNAL

##### Создание POST: host/api/journals/create

* Входные данные

<table class="tg">
<thead>
  <tr>
    <td class="tg-0pky" rowspan="7">req.body</td>
    <td class="tg-0pky">title</td>
    <td class="tg-0lax">string</td>
  </tr>
  <tr>
    <td class="tg-0pky">status</td>
    <td class="tg-0lax">string</td>
  </tr>
  <tr>
    <td class="tg-0pky">description</td>
    <td class="tg-0lax">string</td>
  </tr>
  <tr>
    <td class="tg-0pky">year</td>
    <td class="tg-0lax">number</td>
  </tr>
  <tr>
    <td class="tg-0pky">coverImg</td>
    <td class="tg-0lax">file</td>
  </tr>
  <tr>
    <td class="tg-0pky">? genres</td>
    <td class="tg-0lax">string[ ]</td>
  </tr>
  <tr>
    <td class="tg-0pky">? authors</td>
    <td class="tg-0lax">string[ ]</td>
  </tr>
</thead>
</table>