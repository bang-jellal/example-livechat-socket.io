<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <!-- CSRF Token -->
  <meta name="csrf-token" content="{{ csrf_token() }}">

  <title>{{ config('app.name', 'Laravel') }}</title>

  <!-- Scripts -->
  <script src="{{ asset('js/app.js') }}" defer></script>

  <!-- Fonts -->
  <link rel="dns-prefetch" href="https://fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css?family=Raleway:300,400,600" rel="stylesheet" type="text/css">

  <!-- Styles -->
  <link href="{{ asset('css/style.css') }}" rel="stylesheet">
</head>
<body>
<div id="app">
  <nav class="navbar navbar-expand-md navbar-light navbar-laravel">
    <div class="container">
      <ul class="pages">
        <li class="chat page">
          <div class="chatArea">
            <ul class="messages"></ul>
          </div>
          <input class="inputMessage" placeholder="Type here..." />
        </li>

        <li class="login page">
          <div class="form">
            <h3 class="title">Halo, siapa namamu ?</h3>
            <input class="usernameInput" type="text" maxlength="14" />
          </div>
        </li>
      </ul>

    </div>
  </nav>

  <main class="py-4">
    @yield('content')
  </main>
</div>
</body>
</html>