## Описание запросов к серверу

### USER

##### Регистрация POST: host/api/users/registration

* Входные данные:

<table class="tg">
<thead>
  <tr>
    <td rowspan="4">req.body</td>
    <td>email</td>
    <td>string</td>
  </tr>
  <tr>
    <td>username<br></td>
    <td>string</td>
  </tr>
  <tr>
    <td>password</td>
    <td>string</td>
  </tr>
  <tr>
    <td>? is_admin</td>
    <td>boolean (false)</td>
  </tr>
</thead>
</table>

* Возвращаемые данные:

<table class="tg">
<thead>
  <tr>
    <td>jwt токен</td>
    <td>string</td>
  </tr>
  <tr>
    <td>ошибка</td>
    <td>Error (server/src/error/apiError.ts)</td>
  </tr>
</thead>
</table>

<br />

##### Вход POST: host/api/users/login

* Входные данные

<table class="tg">
<thead>
  <tr>
    <td rowspan="2">req.body</td>
    <td>email</td>
    <td>string</td>
  </tr>
  <tr>
    <td>password</td>
    <td>string</td>
  </tr>
</thead>
</table>

* Возвращаемые данные:

<table class="tg">
<thead>
  <tr>
    <td>jwt токен</td>
    <td>string</td>
  </tr>
  <tr>
    <td>ошибка</td>
    <td>Error (server/src/error/apiError.ts)</td>
  </tr>
</thead>
</table>

<br />

##### Поиск одного пользователя : host/api/users/find

* Входные данные

<table class="tg">
<thead>
  <tr>
    <td rowspan="2">req.body</td>
    <td>email</td>
    <td>string</td>
  </tr>
  <tr>
    <td>password</td>
    <td>string</td>
  </tr>
</thead>
</table>

* Возвращаемые данные:

<table class="tg">
<thead>
  <tr>
    <td rowspan="6">user JSON</td>
    <td>id</td>
    <td>number</td>
  </tr>
  <tr>
    <td>is_admin</td>
    <td>boolean</td>
  </tr>
  <tr>
    <td>username</td>
    <td>string</td>
  </tr>
  <tr>
    <td>email</td>
    <td>string</td>
  </tr>
  <tr>
    <td>password (хэш)</td>
    <td>string</td>
  </tr>
  <tr>
    <td>photo</td>
    <td>string</td>
  </tr>
   <tr>
    <td>ошибка</td>
    <td></td>
    <td>Error (server/src/error/apiError.ts)</td>
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
    <td rowspan="8">req.body</td>
    <td>title</td>
    <td>string</td>
  </tr>
  <tr>
    <td>status</td>
    <td>string</td>
  </tr>
  <tr>
    <td>description</td>
    <td>string</td>
  </tr>
  <tr>
    <td>year</td>
    <td>number</td>
  </tr>
  <tr>
    <td>coverImg</td>
    <td>file</td>
  </tr>
</thead>
</table>

* Возвращаемые данные:

<table class="tg">
<thead>
  <tr>
    <td rowspan="8">req.body</td>
    <td>title</td>
    <td>string</td>
  </tr>
  <tr>
    <td>status</td>
    <td>string</td>
  </tr>
  <tr>
    <td>description</td>
    <td>string</td>
  </tr>
  <tr>
    <td>year</td>
    <td>number</td>
  </tr>
  <tr>
    <td>coverImg</td>
    <td>file</td>
  </tr>
  <tr>
    <td>? genres</td>
    <td>string[ ]</td>
  </tr>
  <tr>
    <td>? authors</td>
    <td>string[ ]</td>
  </tr>
  <tr>
    <td>? chapters</td>
    <td>string[ ]</td>
  </tr>
</thead>
</table>